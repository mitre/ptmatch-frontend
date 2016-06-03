import { expect } from '../test_helper';
import { SetupToMatchSystemList } from '../../src/containers/SetupToMatchSystemList';


describe('SetupToMatchSystemList', () => {
  let component;

  beforeEach(() => {
    const props = {
      metrics: [
        {recordMatchSystemInterfaceId: "a", meta: {createdOn: "2016-05-11T16:25:56.041-04:00"}},
        {recordMatchSystemInterfaceId: "a", meta: {createdOn: "2016-05-13T16:25:56.041-04:00"}},
        {recordMatchSystemInterfaceId: "b", meta: {createdOn: "2016-05-11T16:25:56.041-04:00"}}
      ]
    };

    component = new SetupToMatchSystemList(props);
  });

  it('will find the latest metrics', () => {
    const latestMetrics = component.latestMetrics();
    expect(latestMetrics.length).to.equal(2);
    const firstMetric = latestMetrics[0];
    expect(firstMetric.recordMatchSystemInterfaceId).to.equal("a");
    expect(firstMetric.meta.createdOn).to.equal("2016-05-13T16:25:56.041-04:00");
    const secondMetric = latestMetrics[1];
    expect(secondMetric.recordMatchSystemInterfaceId).to.equal("b");
  });
});
