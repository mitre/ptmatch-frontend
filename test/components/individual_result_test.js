import { expect, renderComponent } from '../test_helper';
import IndividualResult from '../../src/components/IndividualResult';

describe('IndividualResult', () => {
  let component;

  beforeEach(() => {
    const recordMatchingSystem = {id: '1234', name: 'Matchy Matcherton'};
    const job = {
      id: '5678',
      metrics: {
          "f1" : 0.899999976158142,
          "recall" : 0.889999985694885,
          "precision" : 0.910000026226044,
          "MAP" : 0.790000021457672
      },
      links: [{source: 'http://foo.com/1', target: 'http://foo.com/1', score: 0.7}]
    };
    component = renderComponent(IndividualResult, {recordMatchingSystem, job});
  });

  it('will show the metrics', () => {
    expect(component.find('.results-overview p').first()).to.have.text('F: 0.899999976158142');
  });

  it('will show a list of links', () => {
    expect(component.find('td').first()).to.have.text('Record A: http://foo.com/1');
  });
});
