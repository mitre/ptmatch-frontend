import {retrieve} from './index';
import {selectRMS} from './recordMatchingSystems';

export const REQUEST_METRICS = 'REQUEST_METRICS';
export const RECEIVE_METRICS = 'RECEIVE_METRICS';

export const RECEIVE_MATCH_JOB = 'RECEIVE_MATCH_JOB';

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