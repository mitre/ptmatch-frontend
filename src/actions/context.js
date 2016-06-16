import {retrieve} from './index';

import {
  REQUEST_CONTEXT,
  SELECT_CONTEXT,
  CREATE_CONTEXT
} from './types';

export function fetchContexts() {
  return {type: REQUEST_CONTEXT, payload: retrieve('/RecordMatchContext')};
}

export function selectContext(contextId) {
  return {type: SELECT_CONTEXT, contextId: contextId};
}

export function createContext(name, description, type) {
  const postPromise = new Promise((resolve) => {
    fetch('/RecordMatchContext', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({name, description, type})
    }).then(response => response.json()).then(json => resolve(json));
  });
  return {type: CREATE_CONTEXT, payload: postPromise};
}
