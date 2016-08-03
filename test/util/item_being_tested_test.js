import { expect } from '../test_helper';
import itemBeingTested from '../../src/util/ItemBeingTested';

describe('ItemBeingTested', () => {
  it('should find the right item for the context', () => {
    const context = {id: 'c', name: 'Night Vale Benchmark', type: 'benchmark'};
    const matchRuns = {'mr': {id: 'mr', recordMatchContextId: 'c', recordMatchSystemInterfaceId: 'rms'}};
    const matchSystems = {'rms': {id: 'rms', name: 'FRIL'}};
    const rmsUnderTestName = itemBeingTested(context, matchRuns, {}, matchSystems);
    expect(rmsUnderTestName).to.equal('FRIL');
  });
});
