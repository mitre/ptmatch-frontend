import { expect } from '../test_helper';
import restructureResults from '../../src/middlewares/restructure_results';
import { REQUEST_MATCH_RUN_FULFILLED, REQUEST_LINKS } from '../../src/actions/types';
import MockStore from '../mock_store';

describe('restructureResults', () => {
  it('will request the links if metrics are present', () => {
    const store = new MockStore();
    const mr = {id: '1233', metrics: {matchCount: 15}};
    const action = {type: REQUEST_MATCH_RUN_FULFILLED, payload: mr};
    const next = (a) => {
      expect(a.payload.status).to.equal('responded');
    };
    restructureResults(store)(next)(action);
    expect(store.dispatchedActions.length).to.equal(2);
    expect(store.dispatchedActions[0].type).to.equal(REQUEST_LINKS);
  });

  it('will return an empty array of links when there is are no metrics', () => {
    const mr = {id: '1233', note: 'test'};
    const action = {type: REQUEST_MATCH_RUN_FULFILLED, payload: mr};
    const next = (a) => {
      expect(a.payload.links).to.be.empty;
      expect(a.payload.status).to.equal('no-response');
    };
    restructureResults()(next)(action);
  });
});
