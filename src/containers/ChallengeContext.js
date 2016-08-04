import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import MatchingSystemThumbnail from '../components/MatchingSystemThumbnail';
import NewRunModal from '../components/Modal/NewRunModal';
import RunList from '../components/RunList';
import CollapsiblePanel from '../components/CollapsiblePanel';

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
      selectedRMS: -1
    };
  }

  selectRMS(rmsId) {
    this.setState({selectedRMS: rmsId});
  }

  displayBody() {
    if (this.state.selectedRMS !== -1) {
      let selectedRMS = this.props.recordMatchingSystems[this.state.selectedRMS];
      let runs = this.props.matchRunsByRMS[this.state.selectedRMS];
      return (
        <RunList recordMatchingSystem={selectedRMS}
                 runs={runs}
                 patients={this.props.patients}/>
      );
    } else {
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

  render() {
    return (
      <CollapsiblePanel panelTitle={this.props.context.name}
                        panelIcon="users"
                        subtitle={this.state.itemBeingTested}
                        subtitleIcon="database"
                        buttonText="New Run"
                        modalTarget="#newRunModal">

        <div className="panel-body">
          {this.displayBody()}

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
  fetchMatchRunsByContext: PropTypes.func,
  createRun: PropTypes.func
};

export function mapStateToProps(state, ownProps) {
  const contextId = ownProps.context.id;
  const matchRunsForContext = _.values(state.matchRuns).filter((mr) => mr.recordMatchContextId === contextId);
  if (matchRunsForContext.length === 0) {
    return {recordMatchingSystems: [], recordSets: []};
  } else {
    const recordMatchingSystems = _.uniq(matchRunsForContext.map((mr) => state.recordMatchingSystems[mr.recordMatchSystemInterfaceId]));
    const allRecordMatchingSystems = _.values(state.recordMatchingSystems);
    const matchRunsByRMS = _.groupBy(matchRunsForContext, 'recordMatchSystemInterfaceId');
    const patients = state.patients;
    const recordSets = _.values(state.recordSets);
    return {matchRunsByRMS, recordMatchingSystems, patients, recordSets, allRecordMatchingSystems};
  }
}

export default connect(mapStateToProps, { createRun })(ChallengeContext);
