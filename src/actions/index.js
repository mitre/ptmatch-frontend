import fetch from 'isomorphic-fetch';

function receiveResponse(eventType, json) {
  return {
    type: eventType,
    payload: json
  };
}

export function retrieve(event, url) {
  return dispatch => {
    return fetch(url, {credentials: 'same-origin'})
      .then(req => req.json())
      .then(json => dispatch(receiveResponse(event, json)));
  };
}