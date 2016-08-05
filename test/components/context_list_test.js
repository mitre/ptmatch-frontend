
import { renderComponent, expect } from '../test_helper';
import ContextList from '../../src/components/ContextList';

describe('ContextList', () => {
  let component;
  let selectedId;

  beforeEach(() => {
    const props = {
      contexts: {'1': {id: '1', name: 'Test Context', type: 'challenge'},
                 '2': {id: '2', name: 'Selected Context', type: 'challenge', selected: true}},
      selector: (id) => selectedId = id,
      recordSets: {
        '1': {id: '1', name: 'Sample 1'},
        '3': {id: '3', name: 'Sample 2'},
        '5': {id: '5', name: 'Sample 3'}
      },
      matchRuns: {
        '1': {id: '1', recordMatchContextId: '1', masterRecordSetId: '3', meta: {createdOn: "2016-05-12T12:45:11.429-04:00"}}
      },
      recordMatchingSystems: {
        '1': {id: '1', name: 'Matchy'}
      },
      contextCreator: () => 1 + 1 //do nothing
    };
    component = renderComponent(ContextList, props);
  });

  it('will display the title', () => {
    expect(component.find(".context-name").first()).to.have.text('Test Context');
  });

  it('will select the first item when clicked', () => {
    component.find(".context-name input").first().simulate("click");
    expect(selectedId).to.equal('1');
  });

  it('will display the selected item as active', () => {
    expect(component.find(".active .context-name").first()).to.have.text('Selected Context');
  });

  it('will show the item being tested', () => {
    expect(component.find(".context-name").first()).to.have.text('Test Context');
    expect(component.find(".context-static-item").first()).to.contain('Sample 2');
  });
});
