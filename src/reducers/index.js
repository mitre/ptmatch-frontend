import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import _ from 'lodash';
import { REQUEST_RMS_FULFILLED, REQUEST_RECORD_SET_FULFILLED,
         REQUEST_CONTEXT_FULFILLED, SELECT_CONTEXT, CREATE_CONTEXT_FULFILLED,
         REQUEST_MATCH_RUN_FULFILLED, CREATE_MATCH_RUN_FULFILLED,
         SELECT_RMS, SELECT_RECORD_SETS, SELECT_RECORD_SET,
         REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED,
         REQUEST_PATIENTS_FULFILLED } from '../actions/types';

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
    case SELECT_RECORD_SETS:
      return resetSelect(state, action.payload);
    case SELECT_RECORD_SET:
      let clonedState = Object.assign({}, state);
      clonedState[action.payload].selected = true;
      return clonedState;
    default:
      return state;
  }
}

function matchRuns(state = {}, action) {
  let matchRunClone;
  switch (action.type) {
    case REQUEST_MATCH_RUN_FULFILLED:
    case CREATE_MATCH_RUN_FULFILLED:
      matchRunClone = Object.assign({}, state);
      let matchRunId = action.payload.id;
      matchRunClone[matchRunId] = Object.assign({}, action.payload);
      return matchRunClone;
    case REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED:
      matchRunClone = Object.assign({}, state);
      action.payload.forEach((mr) => matchRunClone[mr.id] = mr);
      return matchRunClone;
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

export function patients(state = {}, action) {
  switch (action.type) {
    case REQUEST_PATIENTS_FULFILLED:
      let clonedState = Object.assign({}, state);
      action.payload.entry.forEach((e) => clonedState[e.resource.id] = e.resource);
      return clonedState;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  recordMatchingSystems,
  recordSets,
  matchRuns,
  contexts,
  patients,
  routing: routeReducer
});

export default rootReducer;
