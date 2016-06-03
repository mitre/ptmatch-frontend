import fetch from 'isomorphic-fetch';
import {retrieve} from './index';

import {
  REQUEST_RECORD_SET,
  SELECT_RECORD_SET
} from './types';

export function fetchRecordSetsIfNeeded() {
  return {type: REQUEST_RECORD_SET, payload: retrieve('/RecordSet')};
}

export function createRecordSet(recordSet) {
  fetch('/RecordSet', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(recordSet)
  });
  return {type: REQUEST_RECORD_SET, payload: retrieve('/RecordSet')};
}

export function selectRecordSet(recordSet) {
  return {type: SELECT_RECORD_SET, recordSet: recordSet};
}
