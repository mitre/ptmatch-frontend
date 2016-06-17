import { expect } from '../test_helper';
import { REQUEST_RMS_FULFILLED, REQUEST_CONTEXT_FULFILLED,
         SELECT_CONTEXT, SELECT_RMS } from '../../src/actions/types';
import { contexts, recordMatchingSystems } from '../../src/reducers';


describe('reducers', () => {
  it('receives record macthing systems', () => {
    const action = {type: REQUEST_RMS_FULFILLED, payload: [{id: '1', name: 'FRIL'}]};
    const state = recordMatchingSystems({}, action);
    expect(state['1'].name).to.equal('FRIL');
  });

  it('selects record matching systems', () => {
    const action = {type: SELECT_RMS, payload: ['1']};
    const state = recordMatchingSystems({'1': {id: '1', name: 'FRIL'},
                                         '2': {id: '2', name: 'ChoiceMaker', selected: true}}, action);
    expect(state['1'].selected).to.equal(true);
    expect(state['2'].selected).to.equal(false);
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
});
