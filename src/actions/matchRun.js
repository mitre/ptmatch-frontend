import fetch from 'isomorphic-fetch';

import { retrieve } from './index';

import {
  REQUEST_MATCH_RUN,
  REQUEST_MATCH_RUNS,
  CREATE_MATCH_RUN,
  REQUEST_LINKS
} from './types';

export function fetchMatchRun(jobId) {
  return {type: REQUEST_MATCH_RUN,
          payload: retrieve(`/RecordMatchRun/${jobId}`)};
}

export function fetchMatchRuns() {
  return {type: REQUEST_MATCH_RUNS,
          payload: retrieve('/RecordMatchRunMetrics')};
}

export function fetchLinks(runId, category=null, limit=10) {
  if (category) {
    return {type: REQUEST_LINKS,
            payload: retrieve(`/RecordMatchRunLinks/${runId}?category=${category}&limit=${limit}`,
                              {runId: runId, category})};
  } else {
    return {type: REQUEST_LINKS,
            payload: retrieve(`/RecordMatchRunLinks/${runId}`, {runId: runId})};
  }
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
