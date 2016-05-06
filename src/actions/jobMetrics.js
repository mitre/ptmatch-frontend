import {retrieve} from './index';

export const REQUEST_METRICS = 'REQUEST_METRICS';
export const RECEIVE_METRICS = 'RECEIVE_METRICS';

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