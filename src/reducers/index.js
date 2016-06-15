import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import _ from 'lodash';
import { REQUEST_RMS_FULFILLED, REQUEST_RECORD_SET_FULFILLED,
         REQUEST_METRICS_FULFILLED,
         REQUEST_CONTEXT_FULFILLED, SELECT_CONTEXT,
         REQUEST_MATCH_RUN_FULFILLED,
         REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED } from '../actions/types';

function idReducer(payloadArray) {
  return _.reduce(payloadArray, (state, obj) => {
    state[obj.id] = obj;
    return state;}, {});
}

export function recordMatchingSystems(state = {}, action) {
  switch (action.type) {
    case REQUEST_RMS_FULFILLED:
      return idReducer(action.payload);
    default:
      return state;
  }
}

function recordSets(state = {}, action) {
  switch (action.type) {
    case REQUEST_RECORD_SET_FULFILLED:
      return idReducer(action.payload);
    default:
      return state;
  }
}

function metrics(state = {}, action) {
  switch (action.type) {
    case REQUEST_METRICS_FULFILLED:
      let metricsClone = Object.assign({}, state);
      //masterRecordSetId will be the same across the entire array, so we can
      //just grab the first one
      let masterRecordSetId = action.payload[0].masterRecordSetId;
      metricsClone[masterRecordSetId] = action.payload.slice(0);
      return metricsClone;
    default:
      return state;
  }
}

function matchRuns(state = {}, action) {
  switch (action.type) {
    case REQUEST_MATCH_RUN_FULFILLED:
      let matchRunClone = Object.assign({}, state);
      let matchRunId = action.payload.id;
      matchRunClone[matchRunId] = Object.assign({}, action.payload);
      return matchRunClone;
    case REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED:
      return idReducer(action.payload);
    default:
      return state;
  }
}

export function contexts(state = {}, action) {
  switch (action.type) {
    case REQUEST_CONTEXT_FULFILLED:
      return idReducer(action.payload);
    case SELECT_CONTEXT:
      let clonedState = Object.assign({}, state);
      _.values(clonedState).forEach((ctx) => ctx.selected = false);
      clonedState[action.contextId].selected = !clonedState[action.contextId].selected;
      return clonedState;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  recordMatchingSystems,
  recordSets,
  metrics,
  matchRuns,
  contexts,
  routing: routeReducer
});

export default rootReducer;
