import {
  REQUEST_LINKS_FULFILLED
} from '../actions/types';

import { fetchPatients } from '../actions/patient';

// This middleware is expected to run after restructureResults. It will look
// at all of the links in a given match run and dispatch an action to fetch them
// if they are not already in the store.
const fetchLinks = store => next => action => {
  if (action.type === REQUEST_LINKS_FULFILLED) {
    dispatchFetchLinks(store, action.payload[0]);
  }

  return next(action);
};

export function dispatchFetchLinks(store, links) {
  const ids = extractIdsToFetch(store, links);
  if (ids.length > 0) {
    store.dispatch(fetchPatients(ids));
  }
}

export function extractIdsToFetch(store, links=[]) {
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
