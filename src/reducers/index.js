import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
//import immutable from 'immutable';
import { REQUEST_RMS_FULFILLED, SELECT_RMS, REQUEST_RECORD_SET_FULFILLED,
         SELECT_RECORD_SET, REQUEST_METRICS_FULFILLED,
         REQUEST_MATCH_JOB_FULFILLED } from '../actions/types';



export function recordMatchingSystems(state = [], action) {
  switch (action.type) {
    case REQUEST_RMS_FULFILLED:
      // calling slice(0) creates a clone of the array
      return action.payload.slice(0);
    default:
      return state;
  }
}

function recordSets(state = [], action) {
  switch (action.type) {
    case REQUEST_RECORD_SET_FULFILLED:
      // calling slice(0) creates a clone of the array
      return action.payload.slice(0);
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

function selectedJob(state = {}, action) {
  switch (action.type) {
    case REQUEST_MATCH_JOB_FULFILLED:
      return Object.assign({}, action.payload);
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
  selectedJob,
  routing: routeReducer
});

export default rootReducer;
