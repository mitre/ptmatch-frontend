import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { SELECT_RECORD_SET } from '../actions/types';

import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import patientProps from '../prop-types/patient';
import { runProps } from '../prop-types/run';

import RunHistoryChart from "../components/RunHistoryChart";
import NewBenchmarkRunModal from "../components/NewBenchmarkRunModal";
import MatchLinks from '../components/MatchLinks';

import { fetchMatchRunsByContext, createRun } from '../actions/matchRun';

export class BenchmarkContext extends Component {

  componentWillMount() {
    this.props.fetchMatchRunsByContext(this.props.context.id);
  }

  completedRuns() {
    return this.props.matchRuns.filter((mr) => mr.status === 'responded');
  }

  unfinishedRuns() {
    return this.props.matchRuns.filter((mr) => mr.status === 'no-response');
  }

  inProgressHeader() {
    if (this.unfinishedRuns().length > 0) {
      const runningJob = _.last(this.unfinishedRuns());
      return <div className="well">Running a job against {this.props.recordSets.find((rs) => rs.id === runningJob.masterRecordSetId).name}...</div>;
    }
  }

  lineChartData() {
    let data = {};
    data.labels = _.map(this.completedRuns(), (mr) => {
      const recordSet = this.props.recordSets.find((rs) => rs.id === mr.masterRecordSetId);
      if (recordSet) {
        return recordSet.name;
      } else {
        return 'Unknown';
      }
    });
    data.datasets = [{label: 'Duplicates', data: this.completedRuns().map((mr) => mr.metrics.matchCount)}];
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
      return <MatchLinks links={_.last(this.completedRuns()).links}
                         patients={this.props.patients} />;
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

            <button className="btn btn-primary pull-right" data-toggle="modal" data-target="#NewBenchmarkRun">New Run</button>

            <NewBenchmarkRunModal title="New Benchmark Run"
                                  context={this.props.context}
                                  recordSets={this.props.recordSets}
                                  recordMatchingSystems={this.props.recordMatchingSystems}
                                  runCreator={(recordMatchSystemInterfaceId, masterRecordSetId, recordMatchContextId, note) => {
                                                this.props.createRun(recordMatchSystemInterfaceId, masterRecordSetId, recordMatchContextId, note);
                                                this.props.selectRecordSet(masterRecordSetId);
                                              }}/>
          </div>
        </div>


        <div className="panel-body">
          {this.inProgressHeader()}
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
  patients: PropTypes.objectOf(patientProps),
  recordSets: PropTypes.arrayOf(recordSetProps),
  recordMatchingSystems: PropTypes.arrayOf(recordMatchingSystemProps),
  matchRuns: PropTypes.arrayOf(runProps),
  fetchMatchRunsByContext: PropTypes.func,
  createRun: PropTypes.func,
  selectRecordSet: PropTypes.func
};

function selectRecordSet(recordSetId) {
  return {type: SELECT_RECORD_SET, payload: recordSetId};
}

export function mapStateToProps(state, ownProps) {
  const contextId = ownProps.context.id;
  const matchRuns = _.sortBy(
    _.values(state.matchRuns).filter((mr) => mr.recordMatchContextId === contextId),
    (mr) => new Date(mr.meta.createdOn));
  // All runs should have the same matching system, so we can grab the id for the
  // first one
  let recordMatchingSystems = _.values(state.recordMatchingSystems);
  const recordSets = _.values(state.recordSets);
  const patients = state.patients;

  return {matchRuns, recordMatchingSystems, recordSets, patients};
}

export default connect(mapStateToProps, { fetchMatchRunsByContext, createRun, selectRecordSet })(BenchmarkContext);
