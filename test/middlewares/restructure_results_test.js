import { expect } from '../test_helper';
import restructureResults from '../../src/middlewares/restructure_results';
import { REQUEST_MATCH_JOB_FULFILLED } from '../../src/actions/types';
import matchRun from '../fixtures/match_job';

describe('restructureResults', () => {
  it('will extract the match results from a FHIR bundle', () => {
    const action = {type: REQUEST_MATCH_JOB_FULFILLED, payload: matchRun};
    const next = (a) => {
      expect(a.payload.links.length).to.equal(1);
      const link = a.payload.links[0];
      expect(link.source).to.equal('http://acme.com/popHealth/Patient/5');
    };
    restructureResults()(next)(action);
  });
});
