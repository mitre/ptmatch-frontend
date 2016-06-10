import {retrieve} from './index';

import {
  REQUEST_CONTEXT,
  SELECT_CONTEXT
} from './types';

export function fetchContexts() {
  return {type: REQUEST_CONTEXT, payload: retrieve('/RecordMatchContext')};
}

export function selectContext(contextId) {
  return {type: SELECT_CONTEXT, contextId: contextId};
}
