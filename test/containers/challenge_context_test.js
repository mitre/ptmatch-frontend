import { expect } from '../test_helper';
import { mapStateToProps } from '../../src/containers/ChallengeContext';


describe('ChallengeContext', () => {
  let state;

  beforeEach(() => {
    state = {
      recordSets: {'1': {id: '1', name: 'Test Record Set'}},
      recordMatchingSystems: {
        '1': {id: '1', name: 'Match System 1'},
        '2': {id: '2', name: 'Match System 2'},
        '3': {id: '3', name: 'Match System 3'}
      },
      matchRuns: {
        '1': {id: '1', note: 'Run 1', recordMatchSystemInterfaceId: '1', recordSetId: '1', recordMatchContextId: '5'},
        '2': {id: '2', note: 'Run 2', recordMatchSystemInterfaceId: '1', recordSetId: '1', recordMatchContextId: '5'},
        '3': {id: '3', note: 'Run 3', recordMatchSystemInterfaceId: '2', recordSetId: '1', recordMatchContextId: '5'},
        '4': {id: '4', note: 'Run 4', recordMatchSystemInterfaceId: '2', recordSetId: '1', recordMatchContextId: '5'},
        '5': {id: '5', note: 'Run 5', recordMatchSystemInterfaceId: '2', recordSetId: '1', recordMatchContextId: '6'}
      }
    };
  });

  it('will map state to props', () => {
    const stateProps = mapStateToProps(state, {context: {id: '5', name: 'Test Context'}});
    expect(stateProps.recordSet.name).to.equal('Test Record Set');
    expect(stateProps.recordMatchingSystems.length).to.equal(2);
    expect(stateProps.matchRunsByRMS['1'].length).to.equal(2);
    expect(stateProps.matchRunsByRMS['3']).to.be.undefined;
  });
});
