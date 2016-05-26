// This bundle restructures the response of the ReordMatchJob endpoint. When
// responses from this endpoint contain match results, they are nested deeply
// in FHIR bundles, and may span multiple FHIR bundles. This middleware
// flattens things out into something that should be easier for components to
// use.
import { REQUEST_MATCH_JOB_FULFILLED } from '../actions/types';

export default function() {
  return next => action => {
    if (action.type === REQUEST_MATCH_JOB_FULFILLED &&
        action.payload.responses !== undefined) {
      let newPayload = {
        id: action.payload.id,
        meta: action.payload.meta,
        note: action.payload.note,
        recordMatchConfigurationId: action.payload.recordMatchConfigurationId,
        metrics: action.payload.metrics,
        status: action.payload.status,
        recordMatchSystemInterfaceId: action.payload.recordMatchSystemInterfaceId,
        masterRecordSetId: action.payload.masterRecordSetId
      };
      let matchResponses = action.payload.responses.filter((resp) => {
        let resourceEntries = resp.message.entry.filter((e) => e.resource !== undefined);
        let matchEvent = resourceEntries.find((e) => e.resource.event !== undefined && e.resource.event.code === "record-match");
        return matchEvent !== undefined;
      });
      let allEntries = matchResponses.reduce((acc, currentValue) => acc.concat(...currentValue.message.entry), []);
      let links = allEntries.filter((e) => e.link !== undefined);
      newPayload.links = links.map((l) => {
        const source = l.fullUrl;
        const target = l.link.find((nl) => nl.relation === "related").url;
        const score = l.search.score;
        return {source, target, score};
      });
      action.payload = newPayload;
    }

    return next(action);
  };
}
