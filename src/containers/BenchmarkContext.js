import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import { runProps } from '../prop-types/run';

import RunHistoryChart from "../components/RunHistoryChart";

import { fetchMatchRunsByContext } from '../actions/matchRun';

export class BenchmarkContext extends Component {

  componentWillMount() {
    this.props.fetchMatchRunsByContext(this.props.context.id);
  }

  lineChartData() {
    let data = {};
    data.labels = _.map(this.props.recordSets, 'name');
    data.datasets = [{label: 'Duplicates', data: this.props.matchRuns.map((mr) => mr.metrics.matchCount)}];
    return data;
  }

  chart() {
    if (this.props.matchRuns.length > 0) {
      return <RunHistoryChart data={this.lineChartData()} />;
    } else {
      return <p>Loading chart data</p>;
    }
  }

  render() {
    return (
      <div className="panel panel-default setup-to-match-system-list">
        <div className="panel-heading row">
          <h3 className="panel-title col-xs-3">
            {this.props.context.name}
          </h3>

          <div className="format-piece col-xs-3">

          </div>
        </div>


        <div className="panel-body">
          <div className="run-history-chart">
            {this.chart()}
          </div>
        </div>
      </div>
    );
  }
}

BenchmarkContext.displayName = 'BenchmarkContext';

BenchmarkContext.propTypes = {
  context: contextProps.isRequired,
  recordSets: PropTypes.arrayOf(recordSetProps),
  recordMatchingSystems: PropTypes.arrayOf(recordMatchingSystemProps),
  matchRuns: PropTypes.arrayOf(runProps),
  fetchMatchRunsByContext: PropTypes.func
};

export function mapStateToProps(state, ownProps) {
  const contextId = ownProps.context.id;
  const matchRuns = _.sortBy(
    _.values(state.matchRuns).filter((mr) => mr.recordMatchContextId === contextId),
    (mr) => new Date(mr.meta.createdOn));
  // All runs should have the same matching system, so we can grab the id for the
  // first one
  let recordMatchingSystems = _.values(state.recordMatchingSystems);
  let recordSets = [];
  if (matchRuns.length > 0) {
    recordSets = matchRuns.map((r) => state.recordSets[r.masterRecordSetId]);
  }

  return {matchRuns, recordMatchingSystems, recordSets};
}

export default connect(mapStateToProps, { fetchMatchRunsByContext })(BenchmarkContext);
