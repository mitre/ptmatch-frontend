
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
      contextCreator: () => 1 + 1 //do nothing
    };
    component = renderComponent(ContextList, props);
  });

  it('will display the title', () => {
    expect(component.find(".list-group-item").first()).to.have.text('Test Context');
  });

  it('will select the first item when clicked', () => {
    component.find(".list-group-item").first().simulate("click");
    expect(selectedId).to.equal('1');
  });

  it('will display the selected item as active', () => {
    expect(component.find(".active")).to.have.text('Selected Context');
  });

});
