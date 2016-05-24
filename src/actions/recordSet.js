import fetch from 'isomorphic-fetch';
import {retrieve} from './index';
import { fetchMetricsIfNeeded } from './matchJob';

import {
  RECEIVE_RECORD_SET,
  SELECT_RECORD_SET
} from './types';

function shouldFetchRecordSet(state) {
  const recordSets = state.recordSets;
  if (recordSets.length === 0 && ! recordSets.isFetching) {
    return true;
  } else {
    return false;
  }
}

export function fetchRecordSetsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchRecordSet(getState())) {
      return dispatch(retrieve(RECEIVE_RECORD_SET, '/RecordSet'));
    }
  };
}

export function createRecordSet(recordSet) {
  return (dispatch) => {
    fetch('/RecordSet', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(recordSet)
    });
    return dispatch(retrieve(RECEIVE_RECORD_SET, '/RecordSet'));
  };
}

export function selectRecordSet(recordSet) {
  return (dispatch) => {
    dispatch(fetchMetricsIfNeeded(recordSet.id));
    return dispatch({type: SELECT_RECORD_SET, recordSet: recordSet});
  };
}
