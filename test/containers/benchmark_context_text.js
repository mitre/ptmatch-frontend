import { expect } from '../test_helper';
import { mapStateToProps, BenchmarkContext } from '../../src/containers/BenchmarkContext';


describe('BenchmarkContext', () => {
  let state;

  beforeEach(() => {
    state = {
      recordSets: {
        '1': {id: '1', name: 'Sample 1'},
        '3': {id: '3', name: 'Sample 2'},
        '5': {id: '5', name: 'Sample 3'}
      },
      recordMatchingSystems: {
        '1': {id: '1', name: 'Match System 1'}
      },
      matchRuns: {
        '1': {id: '1', note: 'Run 1', recordMatchSystemInterfaceId: '1',
              masterRecordSetId: '1', recordMatchContextId: '1', meta: {createdOn: "2016-06-13T17:45:11.429Z"},
              metrics: {matchCount: 3}},
        '2': {id: '2', note: 'Run 2', recordMatchSystemInterfaceId: '1',
              masterRecordSetId: '3', recordMatchContextId: '1', meta: {createdOn: "2016-06-15T17:45:11.429Z"},
              metrics: {matchCount: 5}, status: 'responded'}, //note this is the last run
        '3': {id: '3', note: 'Run 3', recordMatchSystemInterfaceId: '1',
              masterRecordSetId: '5', recordMatchContextId: '1', meta: {createdOn: "2016-06-14T17:45:11.429Z"},
              metrics: {matchCount: 10}, status: 'responded'}
      }
    };
  });

  it('will map state to props', () => {
    const stateProps = mapStateToProps(state, {context: {id: '1', name: 'Test Context'}});
    expect(stateProps.recordSets.length).to.equal(3);
  });

  it('provides data to the line chart', () => {
    let props = mapStateToProps(state, {context: {id: '1', name: 'Test Context'}});
    props.context = {id: '1', name: 'Test Context'};
    const component = new BenchmarkContext(props);
    const chartData = component.lineChartData();
    expect(chartData.labels).to.eql(['Sample 3', 'Sample 2']);
    expect(chartData.datasets[0].data).to.eql([10, 5]);
  });
});
