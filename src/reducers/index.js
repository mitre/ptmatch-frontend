import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import _ from 'lodash';
import { REQUEST_RMS_FULFILLED, REQUEST_RECORD_SET_FULFILLED,
         REQUEST_METRICS_FULFILLED,
         REQUEST_CONTEXT_FULFILLED, SELECT_CONTEXT, CREATE_CONTEXT_FULFILLED,
         REQUEST_MATCH_RUN_FULFILLED, SELECT_RMS, SELECT_RECORD_SET,
         REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED } from '../actions/types';

function idReducer(payloadArray) {
  return _.reduce(payloadArray, (state, obj) => {
    state[obj.id] = obj;
    return state;}, {});
}

function resetSelect(state, ids) {
  let clonedState = Object.assign({}, state);
  _.values(clonedState).forEach((obj) => obj.selected = false);
  ids.forEach((id) => clonedState[id].selected = true);
  return clonedState;
}

export function recordMatchingSystems(state = {}, action) {
  switch (action.type) {
    case REQUEST_RMS_FULFILLED:
      return idReducer(action.payload);
    case SELECT_RMS:
      return resetSelect(state, action.payload);
    default:
      return state;
  }
}

function recordSets(state = {}, action) {
  switch (action.type) {
    case REQUEST_RECORD_SET_FULFILLED:
      return idReducer(action.payload);
    case SELECT_RECORD_SET:
      return resetSelect(state, action.payload);
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
  let clonedState = null;
  switch (action.type) {
    case REQUEST_CONTEXT_FULFILLED:
      return idReducer(action.payload);
    case CREATE_CONTEXT_FULFILLED:
      clonedState = Object.assign({}, state);
      clonedState[action.payload.id] = action.payload;
      return clonedState;
    case SELECT_CONTEXT:
      clonedState = Object.assign({}, state);
      _.values(clonedState).forEach((ctx) => ctx.selected = false);
      clonedState[action.contextId].selected = true;
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
