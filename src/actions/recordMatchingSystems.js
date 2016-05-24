import fetch from 'isomorphic-fetch';
import {retrieve} from './index';

export const REQUEST_RMS = 'REQUEST_RMS';
export const RECEIVE_RMS = 'RECEIVE_RMS';
export const SELECT_RMS = 'SELECT_RMS';

function shouldFetchRMS(state) {
  const rms = state.recordMatchingSystems;
  if (rms.length === 0 && ! rms.isFetching) {
    return true;
  } else {
    return false;
  }
}

export function fetchRMSIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchRMS(getState())) {
      dispatch({type: REQUEST_RMS});
      return dispatch(retrieve(RECEIVE_RMS, '/RecordMatchSystemInterface'));
    }
  };
}

export function createRMS(rms) {
  return (dispatch) => {
    fetch('/RecordMatchSystemInterface', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(rms)
    });
    return dispatch(retrieve(RECEIVE_RMS, '/RecordMatchSystemInterface'));
  };
}

export function selectRMS(rms) {
  return {type: SELECT_RMS, recordMatchingSystem: rms};
}
