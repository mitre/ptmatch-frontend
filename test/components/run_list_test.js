import { expect } from '../test_helper';
import RunList from '../../src/components/RunList';

describe('RunList', () => {
  let component;

  beforeEach(() => {
    const recordMatchingSystem = {id: '1234', name: 'Matchy Matcherton'};
    const runs = [{
      id: '1234',
      metrics: {
          "f1" : 0.89,
          "recall" : 0.889999985694885,
          "precision" : 0.910000026226044,
          "MAP" : 0.790000021457672
      },
      links: [{source: 'http://foo.com/1', target: 'http://foo.com/1', score: 0.7}]
    },
    {
      id: '5678',
      metrics: {
          "f1" : 0.90,
          "recall" : 0.889999985694885,
          "precision" : 0.910000026226044,
          "MAP" : 0.790000021457672
      },
      links: [{source: 'http://bar.com/1', target: 'http://bar.com/1', score: 0.7}]
    }
  ];
    component = new RunList({recordMatchingSystem, runs, matchRuns: runs});
  });
});
