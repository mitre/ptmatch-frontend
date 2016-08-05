import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';

import MatchingSystemThumbnail from '../components/MatchingSystemThumbnail';
import NewRunModal from '../components/Modal/NewRunModal';
import RunList from '../components/RunList';
import CollapsiblePanel from '../components/CollapsiblePanel';
import PerformanceRadar from '../components/PerformanceRadar';
import RunHistoryChart from "../components/RunHistoryChart";
import MatchLink from '../components/MatchLink';

import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import { runProps } from '../prop-types/run';
import patientProps from '../prop-types/patient';

import ItemBeingTested from '../util/ItemBeingTested';

import { createRun } from '../actions/matchRun';

class ChallengeContext extends Component {
  constructor(props) {
    super(props);

    let itemBeingTested = ItemBeingTested(this.props.context,
                                          this.props.matchRuns,
                                          this.props.recordSets,
                                          this.props.recordMatchingSystems);
    this.state = {
      itemBeingTested: itemBeingTested,
      selectedRMS: -1,
      runs: [],
      mostRecentRun: {}
    };
  }

  selectRMS(rmsId) {
    this.setState({
      selectedRMS: rmsId,
      runs: this.props.matchRunsByRMS[rmsId],
      mostRecentRun: _.last(this.props.matchRunsByRMS[rmsId])
    });
  }

  displaySubpanel() {
    if (this.state.selectedRMS !== -1) {
      let recordMatchingSystem = _.find(this.props.recordMatchingSystems, ['id', this.state.selectedRMS]).name;

      return (
        <div className="subpanel">
          <div className="subpanel-title">
            <FontAwesome name="sitemap" fixedWidth={true} />
            {recordMatchingSystem}
            <a href="#"><FontAwesome name="link" /></a>
          </div>
        </div>
      );
    }
  }

  displayAlert() {
    if (this.state.selectedRMS !== -1) {
      let isRunning = (this.state.mostRecentRun.status === 'no-response');

      if (isRunning) {
        return (
          <div className="alert alert-danger alert-banner text-center">
            <i className="fa fa-refresh fa-spin"></i>
            {' '}Run {this.props.runs.length} in progress...
          </div>
        );
      }
    }
  }

  displayThumbnails() {
    if (this.state.selectedRMS === -1) {
      return this.props.recordMatchingSystems.map((rms) => {
        const runs = this.props.matchRunsByRMS[rms.id];
        const lastRun = _.last(_.sortBy(runs, (r) => new Date(r.meta.createdOn)));

        return (
          <MatchingSystemThumbnail recordMatchingSystem={rms}
                                   key={rms.id}
                                   metrics={lastRun.metrics}
                                   createdOn={lastRun.meta.createdOn}
                                   onClick={() => this.selectRMS(rms.id)} />
        );
      });
    }
  }

  lineChartData() {
    return {
      labels: _.times(this.state.runs.length, (i) => `Run ${i + 1}`),
      datasets: _.map(['f1', 'precision', 'recall'], (term) => {
        return {
          label: term,
          data: _.map(this.state.runs, (run) => run.metrics[term])
        };
      })
    };
  }

  displayCharts() {
    if (this.state.selectedRMS !== -1) {
      return (
        <div className="row challenge-context-charts">
          <div className="col-xs-5 results-overview-chart">
            <PerformanceRadar chartData={[
               this.state.mostRecentRun.metrics.f1,
               this.state.mostRecentRun.metrics.precision,
               this.state.mostRecentRun.metrics.MAP,
               this.state.mostRecentRun.metrics.recall]}/>
          </div>

          <div className="col-xs-7 run-history-chart">
            <RunHistoryChart chartData={this.lineChartData()} />
          </div>
        </div>
      );
    }
  }

  displayRuns() {
    if (this.state.selectedRMS !== -1) {
      return (
        <RunList runs={this.state.runs}
                 recordMatchingSystem={this.state.selectedRMS}
                 patients={this.props.patients} />
      );
    }
  }

  render() {
    return (
      <CollapsiblePanel panelTitle={this.props.context.name}
                        panelIcon="users"
                        subtitle={this.state.itemBeingTested}
                        subtitleIcon="database"
                        buttonText="New Run"
                        modalTarget="#newRunModal"
                        creator={this.props.contextCreator}>
                        
        <div className="challenge-context">
          {this.displaySubpanel()}
          {this.displayAlert()}
          {this.displayThumbnails()}
          {this.displayCharts()}
          {this.displayRuns()}

          <NewRunModal title="New Challenge Run"
                       context={this.props.context}
                       recordSets={this.props.recordSets}
                       recordMatchingSystems={this.props.allRecordMatchingSystems}
                       runCreator={this.props.createRun}
                       matchRuns={this.props.matchRuns} />
          </div>
      </CollapsiblePanel>
    );
  }
}

ChallengeContext.displayName = 'ChallengeContext';

ChallengeContext.propTypes = {
  context: contextProps.isRequired,
  recordSets: PropTypes.arrayOf(recordSetProps),
  recordMatchingSystems: PropTypes.arrayOf(recordMatchingSystemProps),
  allRecordMatchingSystems: PropTypes.arrayOf(recordMatchingSystemProps),
  matchRuns: PropTypes.objectOf(runProps).isRequired,
  matchRunsByRMS: PropTypes.objectOf(PropTypes.arrayOf(runProps)),
  patients: PropTypes.objectOf(patientProps),
  createRun: PropTypes.func,
  contextCreator: PropTypes.func.isRequired
};

export function mapStateToProps(state, ownProps) {
  const contextId = ownProps.context.id;
  const matchRunsForContext = _.values(state.matchRuns).filter((mr) => mr.recordMatchContextId === contextId);
  const allRecordMatchingSystems = _.values(state.recordMatchingSystems);
  const recordSets = _.values(state.recordSets);
  if (matchRunsForContext.length === 0) {
    return {recordMatchingSystems: [], recordSets, allRecordMatchingSystems};
  } else {
    const recordMatchingSystems = _.uniq(matchRunsForContext.map((mr) => state.recordMatchingSystems[mr.recordMatchSystemInterfaceId]));
    const matchRunsByRMS = _.groupBy(matchRunsForContext, 'recordMatchSystemInterfaceId');
    const patients = state.patients;
    return {matchRunsByRMS, recordMatchingSystems, patients, recordSets, allRecordMatchingSystems};
  }
}

export default connect(mapStateToProps, { createRun })(ChallengeContext);
