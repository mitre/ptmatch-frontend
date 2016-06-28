import fetch from 'isomorphic-fetch';

import { retrieve } from './index';

import {
  REQUEST_MATCH_RUN,
  REQUEST_MATCH_RUNS_BY_CONTEXT,
  CREATE_MATCH_RUN
} from './types';

export function fetchMatchRun(jobId) {
  return {type: REQUEST_MATCH_RUN,
          payload: retrieve(`/RecordMatchRun/${jobId}`)};
}

export function fetchMatchRunsByContext(contextId) {
  return {type: REQUEST_MATCH_RUNS_BY_CONTEXT,
          payload: retrieve(`/RecordMatchRun?recordMatchContextId=${contextId}`)};
}

export function createRun(recordMatchSystemInterfaceId, masterRecordSetId, recordMatchContextId, note) {
  const p = new Promise((resolve) => {
    fetch('/RecordMatchRun', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({recordMatchSystemInterfaceId, masterRecordSetId,
                          recordMatchContextId, note,
                          matchingMode: 'deduplication', recordResourceType: 'Patient'})
    }).then(req => req.json())
      .then(json => resolve(json));
  });
  return {type: CREATE_MATCH_RUN, payload: p};
}
