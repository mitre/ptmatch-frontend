import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import _ from 'lodash';
import { REQUEST_RMS_FULFILLED, SELECT_RMS, REQUEST_RECORD_SET_FULFILLED,
         SELECT_RECORD_SET, REQUEST_METRICS_FULFILLED,
         REQUEST_CONTEXT_FULFILLED, SELECT_CONTEXT,
         REQUEST_MATCH_RUN_FULFILLED } from '../actions/types';

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

function selectedRecordSet(state = {}, action) {
  switch (action.type) {
    case SELECT_RECORD_SET:
      return Object.assign({}, action.recordSet);
    default:
      return state;
  }
}

function selectedRecordMatchingSystem(state = {}, action) {
  switch (action.type) {
    case SELECT_RMS:
      return Object.assign({}, action.recordMatchingSystem);
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
      clonedState[action.contextId].selected = true;
      return clonedState;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  recordMatchingSystems,
  recordSets,
  selectedRecordSet,
  selectedRecordMatchingSystem,
  metrics,
  matchRuns,
  contexts,
  routing: routeReducer
});

export default rootReducer;
