import { expect } from '../test_helper';
import restructureResults from '../../src/middlewares/restructure_results';
import { REQUEST_MATCH_RUN_FULFILLED } from '../../src/actions/types';
import matchRun from '../fixtures/match_job';

describe('restructureResults', () => {
  it('will extract the match results from a FHIR bundle', () => {
    const action = {type: REQUEST_MATCH_RUN_FULFILLED, payload: matchRun};
    const next = (a) => {
      expect(a.payload.links.length).to.equal(1);
      const link = a.payload.links[0];
      expect(link.source).to.equal('http://acme.com/popHealth/Patient/5');
    };
    restructureResults()(next)(action);
  });

  it('will return an empty array of links when there is no response', () => {
    const mr = {id: '1233', note: 'test'};
    const action = {type: REQUEST_MATCH_RUN_FULFILLED, payload: mr};
    const next = (a) => {
      expect(a.payload.links).to.be.empty;
    };
    restructureResults()(next)(action);
  });
});
