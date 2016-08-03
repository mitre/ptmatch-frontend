import { renderComponent, expect } from '../test_helper';
import NewRunModal from '../../src/components/Modal/NewRunModal';

describe('NewRunModal', () => {
  let component;

  beforeEach(() => {
    const props = {
      title: 'New Benchmark Run',
      context: {id: '1', name: 'Test Context', type: 'benchmark'},
      recordMatchingSystems: [{id: '1234', name: 'Matchy Matcherton', selected: true}],
      recordSets: [
        {id: '1', name: 'Sample 1'},
        {id: '3', name: 'Sample 2'},
        {id: '5', name: 'Sample 3'}
      ],
      runCreator: () => 1 + 1
    };
    component = renderComponent(NewRunModal, props);
  });

  it('will display the selected record matching system', () => {
    expect(component.find('.selected-rms').first()).to.have.text('Matchy Matcherton');
  });

  it('will display the record sets', () => {
    expect(component.find('.list-group-item').length).to.equal(3);
  });

  it('lets a user select a record set', () => {
    expect(component.find('.list-group-item').first()).to.not.have.class('active');
    component.find(".list-group-item").first().simulate("click");
    expect(component.find('.list-group-item').first()).to.have.text('Sample 1');
    expect(component.find('.list-group-item').first()).to.have.class('active');
  });
});
