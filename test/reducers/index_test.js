import { expect } from '../test_helper';
import { REQUEST_RMS_FULFILLED, REQUEST_CONTEXT_FULFILLED,
         SELECT_CONTEXT, REQUEST_LINKS_FULFILLED,
         REQUEST_PATIENTS_FULFILLED } from '../../src/actions/types';
import { contexts, recordMatchingSystems,
         patients, matchRuns } from '../../src/reducers';


describe('reducers', () => {
  it('receives record macthing systems', () => {
    const action = {type: REQUEST_RMS_FULFILLED, payload: [{id: '1', name: 'FRIL'}]};
    const state = recordMatchingSystems({}, action);
    expect(state['1'].name).to.equal('FRIL');
  });

  it('receives contexts', () => {
    const action = {type: REQUEST_CONTEXT_FULFILLED, payload: [{id: '1', name: 'FRIL; Male Patients'}]};
    const state = contexts({}, action);
    expect(state['1'].name).to.equal('FRIL; Male Patients');
  });

  it('can select a context', () => {
    const action = {type: SELECT_CONTEXT, contextId: '1'};
    const state = contexts({'1': {id: '1', name: 'FRIL'}}, action);
    expect(state['1'].selected).to.be.true;
  });

  it('can receive a list of patients', () => {
    const action = {type: REQUEST_PATIENTS_FULFILLED, payload: {entry: [{resource: {id: '1', gender: 'male'}}]}};
    const state = patients({}, action);
    expect(state['1'].gender).to.equal('male');
  });

  it('will preserve previously retrieved patients', () => {
    const action = {type: REQUEST_PATIENTS_FULFILLED, payload: {entry: [{resource: {id: '2', gender: 'female'}}]}};
    const state = patients({'1': {id: '1', gender: 'male'}}, action);
    expect(state['1'].gender).to.equal('male');
    expect(state['2'].gender).to.equal('female');
  });

  it('will add links to a match run', () => {
    const action = {type: REQUEST_LINKS_FULFILLED, payload: [
      [{source: 'http://foo.com/1', target: 'http://foo.com/2', score: 0.75}],
      {runId: '1'}
    ]};
    const state = matchRuns({'1': {id: '1'}}, action);
    expect(state['1'].links.length).to.equal(1);
    expect(state['1'].links[0].source).to.equal('http://foo.com/1');
  });

  it('will add links to a match run with the provided category', () => {
    const action = {type: REQUEST_LINKS_FULFILLED, payload: [
      [{source: 'http://foo.com/1', target: 'http://foo.com/2', score: 0.75}],
      {runId: '1', category: 'best'}
    ]};
    const state = matchRuns({'1': {id: '1'}}, action);
    expect(state['1'].links.length).to.equal(1);
    expect(state['1'].links[0].source).to.equal('http://foo.com/1');
    expect(state['1'].links[0].type).to.equal('best');
  });
});
