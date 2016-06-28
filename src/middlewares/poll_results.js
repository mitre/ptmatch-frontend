// If a match run has no results, request it again in 2 seconds
import {
  REQUEST_MATCH_RUN_FULFILLED,
  REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED,
  CREATE_MATCH_RUN_FULFILLED
} from '../actions/types';

import { fetchMatchRun } from '../actions/matchRun';

const TWO_SECONDS = 2000;

const pollResults = store => next => action => {
  switch (action.type) {
    case REQUEST_MATCH_RUN_FULFILLED:
    case CREATE_MATCH_RUN_FULFILLED:
      if (action.payload.responses === undefined) {
        setTimeout(() => {
          store.dispatch(fetchMatchRun(action.payload.id));
        }, TWO_SECONDS);
      }
      break;
    case REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED:
      action.payload.forEach((p) => {
        if (p.responses === undefined) {
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
