import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
//import immutable from 'immutable';
import { RECEIVE_RMS } from '../actions/recordMatchingSystems';


function recordMatchingSystems(state = [], action) {
  switch (action.type) {
    case RECEIVE_RMS:
      // calling slice(0) creates a clone of the array
      return action.payload.slice(0);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  recordMatchingSystems,
  routing: routeReducer
});

export default rootReducer;
