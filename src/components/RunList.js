import React, { Component, PropTypes } from 'react';
import PerformanceRadar from "./PerformanceRadar";
import RunHistoryChart from "./RunHistoryChart";
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

        <table className="table table-hover results-detail">
          <thead>
            <tr>
              <th>Record URL</th>
              <th>Record URL</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>
            {this.mostRecentRun().links.map((l) => {
              return (
                <tr key={l.source}>
                  <td>Record A: {l.source}</td>
                  <td>Record B: {l.target}</td>
                  <td>Score: {l.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
