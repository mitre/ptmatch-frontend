import { expect } from '../test_helper';
import { REQUEST_RMS_FULFILLED } from '../../src/actions/types';
import { recordMatchingSystems } from '../../src/reducers';


describe('reducers', () => {
  it('receives record macthing systems', () => {
    const action = {type: REQUEST_RMS_FULFILLED, payload: ['a record macthing system']};
    const state = recordMatchingSystems([], action);
    expect(state.length).to.equal(1);
  });
});
