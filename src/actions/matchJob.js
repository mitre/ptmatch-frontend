import fetch from 'isomorphic-fetch';

import {retrieve} from './index';
import {selectRMS} from './recordMatchingSystems';

export const REQUEST_METRICS = 'REQUEST_METRICS';
export const RECEIVE_METRICS = 'RECEIVE_METRICS';

export const RECEIVE_MATCH_JOB = 'RECEIVE_MATCH_JOB';

export const RECEIVE_CONFIGURATIONS = 'RECEIVE_CONFIGURATIONS';

function shouldFetchJobMetrics(state, recordSetId) {
  const metrics = state.metrics;
  if (metrics !== undefined && metrics[recordSetId] !== undefined) {
    return false;
  } else {
    return true;
  }
}

export function fetchMetricsIfNeeded(recordSetId) {
  return (dispatch, getState) => {
    if (shouldFetchJobMetrics(getState(), recordSetId)) {
      dispatch({type: REQUEST_METRICS});
      return dispatch(retrieve(RECEIVE_METRICS, `/RecordMatchJobMetrics?recordSetId=${recordSetId}`));
    }
  };
}

export function fetchMatchJob(jobId) {
  return (dispatch) => {
    return dispatch(retrieve(RECEIVE_MATCH_JOB, `/RecordMatchJob/${jobId}`));
  };  
}

export function selectJobAndRMS(jobId, rms) {
  return (dispatch) => {
    dispatch(selectRMS(rms));
    dispatch(fetchMatchJob(jobId));
  };
}

export function createJob(rmsId, recordSetId) {
  fetch("/RecordMatchConfiguration", {credentials: 'same-origin'})
      .then(req => req.json())
      .then(json => {
        let config = json.find(c => c.recordMatchSystemInterfaceId === rmsId && c.masterRecordSetId === recordSetId);
        if (config !== undefined) {
          fetch('/RecordMatchJob', {
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