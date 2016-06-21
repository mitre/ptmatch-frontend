import {
  REQUEST_MATCH_RUN_FULFILLED,
  REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED
} from '../actions/types';

import { fetchPatients } from '../actions/patient';

// This middleware is expected to run after restructureResults. It will look
// at all of the links in a given match run and dispatch an action to fetch them
// if they are not already in the store.
const fetchLinks = store => next => action => {
  if (action.type === REQUEST_MATCH_RUN_FULFILLED &&
      action.payload.links !== undefined) {
    dispatchFetchLinks(store, action.payload.links);
  }

  if (action.type === REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED) {
    action.payload.forEach((p) => dispatchFetchLinks(store, p.links));
  }

  return next(action);
};

export function dispatchFetchLinks(store, links) {
  const ids = extractIdsToFetch(store, links);
  store.dispatch(fetchPatients(ids));
}

export function extractIdsToFetch(store, links) {
  let idsToFetch = [];
  links.forEach((l) => {
    idsToFetch.push(idFromLink(l.source), idFromLink(l.target));
  });
  return idsToFetch.filter((id) => id !== undefined && store.getState().patients[id] === undefined);

}

const patientIdRegExp = /Patient\/(\w+)$/;
export function idFromLink(url) {
  const match = patientIdRegExp.exec(url);
  if (match) {
    return match[1];
  }
}

export default fetchLinks;
