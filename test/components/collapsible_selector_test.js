import { renderComponent, expect } from '../test_helper';
import CollapsibleSelector from '../../src/components/CollapsibleSelector';

describe('CollapsibleSelector', () => {
  let component;
  let selectedItem;

  beforeEach(() => {
    const props = {
      title: "Test Select",
      name: "test",
      itemsToSelect: [{id: "1", name: "Item 1"}, {id: "2", name: "Item 2"}],
      selectedName: "All",
      selectFunction: (item) => selectedItem = item
    };
    component = renderComponent(CollapsibleSelector, props);
  });

  it('will display the title', () => {
    expect(component.find(".panel-heading-label span")).to.have.text('Test Select');
  });

  it('will select the first item when clicked', () => {
    component.find(".list-group-item").first().simulate("click");
    expect(selectedItem.id).to.equal("1");
  });
});
