// This bundle restructures the response of the ReordmatchRun endpoint. When
// responses from this endpoint contain match results, they are nested deeply
// in FHIR bundles, and may span multiple FHIR bundles. This middleware
// flattens things out into something that should be easier for components to
// use.
import {
  REQUEST_MATCH_RUN_FULFILLED,
  REQUEST_MATCH_RUNS_FULFILLED,
  CREATE_MATCH_RUN_FULFILLED
} from '../actions/types';

import { fetchLinks } from '../actions/matchRun';

import _ from 'lodash';

function restructure(payload, store) {
  let newPayload = {
    id: payload.id,
    meta: payload.meta,
    note: payload.note,
    recordMatchContextId: payload.recordMatchContextId,
    metrics: payload.metrics,
    status: payload.status,
    recordMatchSystemInterfaceId: payload.recordMatchSystemInterfaceId,
    masterRecordSetId: payload.masterRecordSetId
  };
  if (_.isEmpty(payload.metrics)) {
    newPayload.links = [];
    newPayload.status = 'no-response';
  } else {
    newPayload.links = [];
    newPayload.status = 'responded';
    if (payload.metrics.matchCount > 10) {
      store.dispatch(fetchLinks(payload.id, "best", 5));
      store.dispatch(fetchLinks(payload.id, "worst", 5));
    } else {
      store.dispatch(fetchLinks(payload.id));
    }
  }

  return newPayload;
}

export default function(store) {
  return next => action => {
    switch (action.type) {
      case REQUEST_MATCH_RUN_FULFILLED:
      case CREATE_MATCH_RUN_FULFILLED:
        action.payload = restructure(action.payload, store);
        break;
      case REQUEST_MATCH_RUNS_FULFILLED:
        action.payload = action.payload.map((p) => restructure(p, store));
        break;
    }

    return next(action);
  };
}
