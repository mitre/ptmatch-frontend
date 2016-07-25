import { renderComponent, expect } from '../test_helper';
import MatchLinks from '../../src/components/MatchLinks';

describe('MatchLinks', () => {

  it('will display a list of links', () => {
    const props = {
      links: [{source: 'http://foo.com/1', target: 'http://foo.com/2', score: 0.75},
              {source: 'http://foo.com/3', target: 'http://foo.com/4', score: 0.66}],
      patients: {}
    };
    let component = renderComponent(MatchLinks, props);
    expect(component.find(".panel-link").length).to.equal(2);
    expect(component.find("h2")).to.not.exist;
  });

  it('will display a list of links in the right categories', () => {
    const props = {
      links: [{source: 'http://foo.com/1', target: 'http://foo.com/2', score: 0.75, type: 'best'},
              {source: 'http://foo.com/3', target: 'http://foo.com/4', score: 0.66, type: 'worst'}],
      patients: {}
    };
    let component = renderComponent(MatchLinks, props);
    expect(component.find("h2").first()).to.have.text('Top 5');
    expect(component.find("h2").last()).to.have.text('Bottom 5');
  });
});
