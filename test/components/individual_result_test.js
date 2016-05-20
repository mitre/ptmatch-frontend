import { expect } from '../test_helper';
import IndividualResult from '../../src/components/IndividualResult';
import matchJob from '../fixtures/match_job';


describe('IndividualResult', () => {
  it('will extract the match results from a FHIR bundle', () => {
    const rms = {id: '1234', name: 'Matchy Matcherton'};
    const ir = new IndividualResult({job: matchJob, recordMatchingSystem: rms});
    const matches = ir.recordMatches();
    expect(matches.length).to.equal(1);
    const match = matches[0];
    expect(match.fullUrl).to.equal('http://acme.com/popHealth/Patient/5');
  });
});