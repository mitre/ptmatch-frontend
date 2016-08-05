import fetch from 'isomorphic-fetch';
import {retrieve} from './index';

import {
  REQUEST_RMS, CREATE_RMS, SELECT_RMS
} from './types';

export function fetchRMSIfNeeded() {
  return {type: REQUEST_RMS,
          payload: retrieve('/RecordMatchSystemInterface')};
}

export function selectRMS(rmsId) {
  return {type: SELECT_RMS, payload: rmsId};
}

export function createRMS(rms) {
  return {type: CREATE_RMS, payload: new Promise((resolve) => {
    fetch('/RecordMatchSystemInterface', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(rms)
    }).then(req => req.json()).then(json => resolve(json));
  })};
}
