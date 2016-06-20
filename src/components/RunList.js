import React, { Component, PropTypes } from 'react';
import PerformanceRadar from "./PerformanceRadar";
import RunHistoryChart from "./RunHistoryChart";
import MatchLinks from "./MatchLinks";
import _ from 'lodash';

class RunList extends Component {
  mostRecentRun() {
    return _.last(this.props.runs);
  }

  lineChartData() {
    let data = {};
    data.labels = _.times(this.props.runs.length, (i) => `Run ${i + 1}`);
    data.datasets = _.map(['f1', 'precision', 'recall'], (term) => {
      let set = {label: term};
      set.data = _.map(this.props.runs, (run) => run.metrics[term]);
      return set;
    });
    return data;
  }

  render() {
    return (
      <div key={this.mostRecentRun().id}>
        <div className="results-overview">
          <PerformanceRadar datasets={[{data: [this.mostRecentRun().metrics.f1, this.mostRecentRun().metrics.precision,
                             this.mostRecentRun().metrics.MAP, this.mostRecentRun().metrics.recall],
                            backgroundColor:"rgba(112,218,201,0.5)"}]}/>
        </div>
        <div className="run-history-chart">
          <RunHistoryChart data={this.lineChartData()} />
        </div>
        <MatchLinks links={this.mostRecentRun().links} />
      </div>
    );
  }
}

RunList.displayName = 'RunList';

RunList.propTypes = {
  runs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    metrics: PropTypes.shape({
      f1: PropTypes.number,
      precision: PropTypes.number,
      recall: PropTypes.number,
      MAP: PropTypes.number
    }),
    links: PropTypes.arrayOf(PropTypes.shape({
      source: PropTypes.string,
      target: PropTypes.string,
      score: PropTypes.number
    }))
  })),
  recordMatchingSystem: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })
};

export default RunList;
