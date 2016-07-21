// If a match run has no metrics, request it again in 2 seconds
import {
  REQUEST_MATCH_RUN_FULFILLED,
  REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED,
  CREATE_MATCH_RUN_FULFILLED
} from '../actions/types';

import _ from 'lodash';

import { fetchMatchRun } from '../actions/matchRun';

const TWO_SECONDS = 2000;

const pollResults = store => next => action => {
  switch (action.type) {
    case REQUEST_MATCH_RUN_FULFILLED:
    case CREATE_MATCH_RUN_FULFILLED:
      if (_.isEmpty(action.payload.metrics)) {
        setTimeout(() => {
          store.dispatch(fetchMatchRun(action.payload.id));
        }, TWO_SECONDS);
      }
      break;
    case REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED:
      action.payload.forEach((p) => {
        if (_.isEmpty(p.metrics)) {
          setTimeout(() => {
            store.dispatch(fetchMatchRun(p.id));
          }, TWO_SECONDS);
        }
      });
      break;
  }
  return next(action);
};

export default pollResults;
