import { expect } from '../test_helper';
import { RECEIVE_RMS } from '../../src/actions/recordMatchingSystems';
import { recordMatchingSystems } from '../../src/reducers';


describe('reducers', () => {
  it('receives record macthing systems', () => {
    const action = {type: RECEIVE_RMS, payload: ['a record macthing system']};
    const state = recordMatchingSystems([], action);
    expect(state.length).to.equal(1);
  });
});