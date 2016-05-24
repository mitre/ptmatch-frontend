import fetch from 'isomorphic-fetch';
import {retrieve} from './index';

import {
  SELECT_RMS,
  RECEIVE_RMS
} from './types';

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
