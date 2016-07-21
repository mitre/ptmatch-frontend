import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import _ from 'lodash';
import { REQUEST_RMS_FULFILLED, REQUEST_RECORD_SET_FULFILLED,
         REQUEST_CONTEXT_FULFILLED, SELECT_CONTEXT, CREATE_CONTEXT_FULFILLED,
         REQUEST_MATCH_RUN_FULFILLED, CREATE_MATCH_RUN_FULFILLED,
         REQUEST_MATCH_RUNS_FULFILLED, REQUEST_LINKS_FULFILLED,
         REQUEST_PATIENTS_FULFILLED } from '../actions/types';

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

function matchRuns(state = {}, action) {
  let matchRunClone, matchRunId;
  switch (action.type) {
    case REQUEST_MATCH_RUN_FULFILLED:
    case CREATE_MATCH_RUN_FULFILLED:
      matchRunClone = Object.assign({}, state);
      matchRunId = action.payload.id;
      matchRunClone[matchRunId] = Object.assign({}, action.payload);
      return matchRunClone;
    case REQUEST_MATCH_RUNS_FULFILLED:
      matchRunClone = Object.assign({}, state);
      action.payload.forEach((mr) => matchRunClone[mr.id] = mr);
      return matchRunClone;
    case REQUEST_LINKS_FULFILLED:
      matchRunClone = Object.assign({}, state);
      matchRunId = action.payload[1].runId;
      let category = action.payload[1].category;
      if (category) {
        let existingLinks = matchRunClone[matchRunId].links;
        if (existingLinks === undefined) {
          existingLinks = [];
        }
        action.payload[0].forEach((l) => {
          l.type = category;
          existingLinks.push(l);
        });
        matchRunClone[matchRunId] = Object.assign(matchRunClone[matchRunId], {links: existingLinks});
      } else {
        matchRunClone[matchRunId] = Object.assign(matchRunClone[matchRunId], {links: action.payload[0]});
      }
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
