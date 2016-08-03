import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import RunHistoryChart from "../components/RunHistoryChart";
import NewRunModal from "../components/Modal/NewRunModal";
import MatchLinks from '../components/MatchLinks';
import CollapsiblePanel from '../components/CollapsiblePanel';

import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import patientProps from '../prop-types/patient';
import { runProps } from '../prop-types/run';

import { createRun } from '../actions/matchRun';

export class BenchmarkContext extends Component {
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
    return {
      labels: _.map(this.completedRuns(), (mr) => {
        const recordSet = this.props.recordSets.find((rs) => rs.id === mr.masterRecordSetId);
        return recordSet ? recordSet.name : 'Unknown';
      }),
      datasets: [{ label: 'Duplicates', data: this.completedRuns().map((mr) => mr.metrics.matchCount) }]
    };
  }

  chart() {
    if (this.props.matchRuns.length > 0) {
      return <RunHistoryChart chartData={this.lineChartData()} />;
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
      <CollapsiblePanel panelTitle={this.props.context.name}
                        panelIcon="line-chart"
                        subtitle="Subtitle Goes Here"
                        subtitleIcon="sitemap"
                        buttonText="New Run"
                        modalTarget="#newRunModal"
                        creator={this.props.contextCreator}>

        <div className="panel-body">
          {this.inProgressHeader()}

          <div className="run-history-chart">
            {this.chart()}
          </div>

          {this.links()}

          <NewRunModal title="New Benchmark Run"
                       context={this.props.context}
                       recordSets={this.props.recordSets}
                       recordMatchingSystems={this.props.recordMatchingSystems}
                       runCreator={(recordMatchSystemInterfaceId, masterRecordSetId, recordMatchContextId, note) => {
                                    this.props.createRun(recordMatchSystemInterfaceId, masterRecordSetId, recordMatchContextId, note);
                                  }}/>
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
  matchRuns: PropTypes.arrayOf(runProps),
  fetchMatchRunsByContext: PropTypes.func,
  createRun: PropTypes.func,
  selectRecordSet: PropTypes.func
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
