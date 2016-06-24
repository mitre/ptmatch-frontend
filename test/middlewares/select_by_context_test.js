import { expect } from '../test_helper';
import MockStore from '../mock_store';
import selectByContext from '../../src/middlewares/select_by_context';
import {
  REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED,
  SELECT_RECORD_SET, SELECT_RMS
} from '../../src/actions/types';
import matchRun from '../fixtures/match_job';

describe('selectByContext', () => {
  it('will dispatch the appropriate selections', () => {
    const action = {type: REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED, payload: [matchRun]};
    const next = () => {
      1 + 1; //do nothing
    };
    let mockStore = new MockStore({contexts: {"572cd29c1cd462994f3be5fd": {id: "572cd29c1cd462994f3be5fd", selected: true}}});
    selectByContext(mockStore)(next)(action);
    let recordSets = mockStore.dispatchedActions.find((a) => a.type === SELECT_RECORD_SET).payload;
    expect(recordSets).to.eql(["572a18ae1cd46222f049108e"]);
    let rmss = mockStore.dispatchedActions.find((a) => a.type === SELECT_RMS).payload;
    expect(rmss).to.eql(["571f7fc11cd46222f0491082"]);
  });
});
