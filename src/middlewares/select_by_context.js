// When match runs come in, check to see if a context is selected. Then, based
// on the context type and the results of the runs, dispatch actions to select
// the appropriate record sets and record matching systems
import {
  REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED,
  SELECT_RECORD_SETS, SELECT_RMS
} from '../actions/types';
import _ from 'lodash';


const selectByContext = store => next => action => {
  if (action.type === REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED) {
    const firstRun = action.payload[0];
    if (firstRun !== undefined) {
      const selectedContext = store.getState().contexts[firstRun.recordMatchContextId];
      if (selectedContext === undefined || selectedContext.selected !== true) {
        console.warn(`Got runs for context ${firstRun.recordMatchContextId} but did not exist or was selected`);  // eslint-disable-line
      }
      const selectedRecordSets = _.map(action.payload, 'masterRecordSetId');
      const selectedRMS = _.map(action.payload, 'recordMatchSystemInterfaceId');
      store.dispatch({type: SELECT_RECORD_SETS, payload: selectedRecordSets});
      store.dispatch({type: SELECT_RMS, payload: selectedRMS});
    }
  }

  return next(action);
};

export default selectByContext;
