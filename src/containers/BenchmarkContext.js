import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import { runProps } from '../prop-types/run';

import RunHistoryChart from "../components/RunHistoryChart";
import NewBenchmarkRunModal from "../components/NewBenchmarkRunModal";
import MatchLinks from '../components/MatchLinks';

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
      return (
        <div className="loader">
          <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
  }

  links() {
    if (this.props.matchRuns.length > 0) {
      return <MatchLinks links={_.last(this.props.matchRuns).links} />;
    } else {
      return <p>Loading links</p>;
    }
  }

  render() {
    return (
      <div className="panel panel-show">
        <div className="panel-heading">
          <div className="row">
            <h3 className="panel-title col-xs-5">
              {this.props.context.name}
            </h3>

            <div className="col-xs-3">
              <span className="format-piece">Type: {this.props.context.type}</span>
            </div>

            <button className="btn btn-primary pull-right" data-toggle="modal" data-target="#newBenchmarkRunModal">New Run</button>

            <NewBenchmarkRunModal context={this.props.context}
                                  recordSets={this.props.allRecordSets}
                                  recordMatchingSystems={this.props.recordMatchingSystems}/>
          </div>
        </div>


        <div className="panel-body">
          <div className="run-history-chart">
            {this.chart()}
          </div>
          {this.links()}
        </div>
      </div>
    );
  }
}

BenchmarkContext.displayName = 'BenchmarkContext';

BenchmarkContext.propTypes = {
  context: contextProps.isRequired,
  recordSets: PropTypes.arrayOf(recordSetProps),
  allRecordSets: PropTypes.arrayOf(recordSetProps),
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
  const allRecordSets = _.values(state.recordSets);

  return {matchRuns, recordMatchingSystems, recordSets, allRecordSets};
}

export default connect(mapStateToProps, { fetchMatchRunsByContext })(BenchmarkContext);
