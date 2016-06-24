import { expect } from '../test_helper';
import {
  REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED,
  REQUEST_PATIENTS
} from '../../src/actions/types';
import fetchLinks, { idFromLink, extractIdsToFetch } from '../../src/middlewares/fetch_links';
import MockStore from '../mock_store';

describe('fetchLinks middleware', () => {
  let store, links;

  beforeEach(() => {
    links = [{source: 'http://localhost/Patient/1234',
                    target: 'http://localhost/Patient/abcd'},
                   {source: 'http://localhost/Patient/9999',
                    target: 'http://localhost/Patient/7777'}
            ];
    store = new MockStore({patients: {'1234' : {id: '1234'}, '5676': {id: '5676'}}});
  });
  it('will be able to pull a patient id from a url', () => {
    const testUrl = 'http://localhost/Patient/1234';
    expect(idFromLink(testUrl)).to.equal('1234');
    const notPatientUrl = 'http://localhost/Condition/1234';
    expect(idFromLink(notPatientUrl)).to.be.undefined;
    const nestedUrl = 'http://localhost/stuff/fhir/Patient/1234';
    expect(idFromLink(nestedUrl)).to.equal('1234');
  });

  it('will extract the right set of ids to fetch', () => {
    const ids = extractIdsToFetch(store, links);
    expect(ids.length).to.equal(3);
    expect(ids).to.include('abcd');
    expect(ids).to.include('9999');
    expect(ids).to.include('7777');
  });

  it('will fetch links based on the match run', () => {
    const action = {type: REQUEST_MATCH_RUNS_BY_CONTEXT_FULFILLED, payload: [{links: links}]};
    const next = () => {
      1 + 1; //do nothing
    };
    fetchLinks(store)(next)(action);
    let actions = store.dispatchedActions.find((a) => a.type === REQUEST_PATIENTS);
    expect(actions).to.exist;
  });
});
