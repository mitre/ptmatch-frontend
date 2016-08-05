import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import RunHistoryChart from "../components/RunHistoryChart";
import NewRunModal from "../components/Modal/NewRunModal";
import CollapsiblePanel from '../components/CollapsiblePanel';
import RunList from '../components/RunList';

import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import patientProps from '../prop-types/patient';
import { runProps } from '../prop-types/run';

import ItemBeingTested from '../util/ItemBeingTested';

import { createRun } from '../actions/matchRun';

export class BenchmarkContext extends Component {
  constructor(props) {
    super(props);

    let itemBeingTested = ItemBeingTested(this.props.context,
                                          this.props.matchRuns,
                                          this.props.recordSets,
                                          this.props.recordMatchingSystems);

    this.state = {
      itemBeingTested: itemBeingTested
    };
  }

  completedRuns() {
    return this.props.matchRuns.filter((mr) => mr.status === 'responded');
  }

  unfinishedRuns() {
    return this.props.matchRuns.filter((mr) => mr.status === 'no-response');
  }

  displayAlert() {
    if (this.unfinishedRuns().length > 0) {
      let runningJob = _.last(this.unfinishedRuns());

      return (
        <div className="alert alert-danger alert-banner text-center">
          <i className="fa fa-refresh fa-spin"></i>
          {' '}Running a job against {this.props.recordSets.find((rs) => rs.id === runningJob.masterRecordSetId).name}
        </div>
      );
    }
  }

  lineChartData() {
    return {
      labels: _.map(this.completedRuns(), (mr) => {
        const recordSet = this.props.recordSets.find((rs) => rs.id === mr.masterRecordSetId);
        return recordSet ? recordSet.name : 'Unknown';
      }),
      datasets: [{ label: 'Duplicates', data: this.completedRuns().map((mr) => mr.metrics.matchCount) }]
    };
  }

  displayChart() {
    if (this.props.matchRuns.length > 0) {
      return (
        <div className="run-history-chart">
          <RunHistoryChart chartData={this.lineChartData()} />
        </div>
      );
    } else {
      return (
        <div>
          <div className="loader">
            <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  }

  displayRuns() {
    if (this.props.matchRuns.length > 0) {
      return (
        <RunList runs={this.props.matchRuns}
                 recordMatchingSystem={this.state.itemBeingTested}
                 patients={this.props.patients} />
      );
    } else {
      return (
        <div className="loader">
          <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
  }

  render() {
    return (
      <CollapsiblePanel panelTitle={this.props.context.name}
                        panelIcon="line-chart"
                        subtitle={this.state.itemBeingTested}
                        subtitleIcon="sitemap"
                        buttonText="New Run"
                        modalTarget="#newRunModal">

        <div className="benchmark-context">
          {this.displayAlert()}
          {this.displayChart()}
          {this.displayRuns()}

          <NewRunModal title="New Benchmark Run"
                       context={this.props.context}
                       recordSets={this.props.recordSets}
                       recordMatchingSystems={this.props.recordMatchingSystems}
                       runCreator={(recordMatchSystemInterfaceId, masterRecordSetId, recordMatchContextId, note) => {
                                    this.props.createRun(recordMatchSystemInterfaceId, masterRecordSetId, recordMatchContextId, note);}}
                       matchRuns={this.props.matchRuns} />
        </div>
      </CollapsiblePanel>
    );
  }
}

BenchmarkContext.displayName = 'BenchmarkContext';

BenchmarkContext.propTypes = {
  context: contextProps.isRequired,
  patients: PropTypes.objectOf(patientProps),
  recordSets: PropTypes.arrayOf(recordSetProps),
  recordMatchingSystems: PropTypes.arrayOf(recordMatchingSystemProps),
  matchRuns: PropTypes.arrayOf(runProps).isRequired,
  fetchMatchRunsByContext: PropTypes.func,
  createRun: PropTypes.func,
  selectRecordSet: PropTypes.func,
  contextCreator: PropTypes.func.isRequired
};

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

export default connect(mapStateToProps, { createRun })(BenchmarkContext);
