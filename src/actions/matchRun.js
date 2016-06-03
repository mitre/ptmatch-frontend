import fetch from 'isomorphic-fetch';

import { retrieve } from './index';

import {
  REQUEST_METRICS,
  REQUEST_MATCH_JOB
} from './types';

export function fetchMetricsIfNeeded(recordSetId) {
  return {type: REQUEST_METRICS,
          payload: retrieve(`/RecordMatchRunMetrics?recordSetId=${recordSetId}`)};
}

export function fetchmatchRun(jobId) {
  return {type: REQUEST_MATCH_JOB,
          payload: retrieve(`/RecordMatchRun/${jobId}`)};
}

export function createJob(rmsId, recordSetId) {
  fetch("/RecordMatchConfiguration", {credentials: 'same-origin'})
      .then(req => req.json())
      .then(json => {
        let config = json.find(c => c.recordMatchSystemInterfaceId === rmsId && c.masterRecordSetId === recordSetId);
        if (config !== undefined) {
          fetch('/RecordMatchRun', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({recordMatchConfigurationId: config.id})
          });
        }
      });
}
