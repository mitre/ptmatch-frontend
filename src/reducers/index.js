import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
//import immutable from 'immutable';
import { RECEIVE_RMS, SELECT_RMS } from '../actions/recordMatchingSystems';
import { RECEIVE_RECORD_SET, SELECT_RECORD_SET } from '../actions/recordSet';


function recordMatchingSystems(state = [], action) {
  switch (action.type) {
    case RECEIVE_RMS:
      // calling slice(0) creates a clone of the array
      return action.payload.slice(0);
    default:
      return state;
  }
}

function recordSets(state = [], action) {
  switch (action.type) {
    case RECEIVE_RECORD_SET:
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

const rootReducer = combineReducers({
  recordMatchingSystems,
  recordSets,
  selectedRecordSet,
  selectedRecordMatchingSystem,
  routing: routeReducer
});

export default rootReducer;
