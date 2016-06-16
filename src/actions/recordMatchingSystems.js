import fetch from 'isomorphic-fetch';
import {retrieve} from './index';

import {
  REQUEST_RMS
} from './types';

export function fetchRMSIfNeeded() {
  return {type: REQUEST_RMS,
          payload: retrieve('/RecordMatchSystemInterface')};
}

export function createRMS(rms) {
  fetch('/RecordMatchSystemInterface', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(rms)
  });
  return {type: REQUEST_RMS, payload: retrieve('/RecordMatchSystemInterface')};
}
