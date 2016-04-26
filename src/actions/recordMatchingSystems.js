import fetch from 'isomorphic-fetch';

export const REQUEST_RMS = 'REQUEST_RMS';
export const RECEIVE_RMS = 'RECEIVE_RMS';

export function receiveResponse(eventType, json) {
  return {
    type: eventType,
    payload: json
  };
}

function retrieve(event, url) {
  return dispatch => {
    return fetch(url, {credentials: 'same-origin'})
      .then(req => req.json())
      .then(json => dispatch(receiveResponse(event, json)));
  };
}

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