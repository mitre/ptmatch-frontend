import React, { Component, PropTypes } from 'react';
import PerformanceRadar from "./PerformanceRadar";
import RunHistoryChart from "./RunHistoryChart";
import MatchLinks from "./MatchLinks";
import _ from 'lodash';

import patientProps from '../prop-types/patient';

class RunList extends Component {
  lineChartData() {
    return {
      labels: _.times(this.props.runs.length, (i) => `Run ${i + 1}`),
      datasets: _.map(['f1', 'precision', 'recall'], (term) => {
        return {
          label: term,
          data: _.map(this.props.runs, (run) => run.metrics[term])
        };
      })
    };
  }

  render() {
    let mostRecentRun = _.last(this.props.runs);
    let isRunning = mostRecentRun.status === 'no-response';

    return (
      <div className="row" key={mostRecentRun.id}>
        {(() => {
          if (isRunning) {
            return (
              <div className="alert alert-danger alert-banner text-center">
                <i className="fa fa-refresh fa-spin"></i>
                {' '}Run {this.props.runs.length} in progress...
              </div>
            );
          }
        })()}
        <div className="col-xs-5 results-overview">
          <PerformanceRadar chartData={[
             mostRecentRun.metrics.f1,
             mostRecentRun.metrics.precision,
             mostRecentRun.metrics.MAP,
             mostRecentRun.metrics.recall]}/>
        </div>

        <div className="col-xs-7 run-history-chart">
          <RunHistoryChart chartData={this.lineChartData()} />
        </div>

        {(() => {
          if (!isRunning) {
            return (
              <div className="col-xs-12">
                <MatchLinks links={mostRecentRun.links} patients={this.props.patients}/>
              </div>
            );
          }
        })()}
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
  }),
  patients: PropTypes.objectOf(patientProps)
};

export default RunList;
