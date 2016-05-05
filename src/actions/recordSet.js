import fetch from 'isomorphic-fetch';
import {retrieve} from './index';

export const REQUEST_RECORD_SET = 'REQUEST_RECORD_SET';
export const RECEIVE_RECORD_SET = 'RECEIVE_RECORD_SET';
export const SELECT_RECORD_SET = 'SELECT_RECORD_SET';

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
      dispatch({type: REQUEST_RECORD_SET});
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
    return dispatch({type: SELECT_RECORD_SET, recordSet: recordSet});
  };
}
