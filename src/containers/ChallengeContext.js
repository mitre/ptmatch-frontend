import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import MatchingSystemThumbnail from '../components/MatchingSystemThumbnail';
import NewChallengeRunModal from '../components/NewChallengeRunModal';
import RunList from '../components/RunList';

import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import { runProps } from '../prop-types/run';
import patientProps from '../prop-types/patient';

import { fetchMatchRunsByContext, createRun } from '../actions/matchRun';

class ChallengeContext extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedRMS: -1};
  }

  componentWillMount() {
    this.props.fetchMatchRunsByContext(this.props.context.id);
  }

  selectRMS(rmsId) {
    this.setState({selectedRMS: rmsId});
  }

  displayBody() {
    if (this.state.selectedRMS !== -1) {
      let selectedRMS = this.props.recordMatchingSystems[this.state.selectedRMS];
      let runs = this.props.matchRunsByRMS[this.state.selectedRMS];
      return <RunList recordMatchingSystem={selectedRMS} runs={runs} patients={this.props.patients}/>;
    } else {
      return this.props.recordMatchingSystems.map((rms) => {
        const runs = this.props.matchRunsByRMS[rms.id];
        const lastRun = _.last(_.sortBy(runs, (r) => new Date(r.meta.createdOn)));
        return <MatchingSystemThumbnail recordMatchingSystem={rms} key={rms.id}
                 metrics={lastRun.metrics} createdOn={lastRun.meta.createdOn}
                 onClick={() => this.selectRMS(rms.id)}/>;
      });
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

            <button className="btn btn-primary pull-right" data-toggle="modal" data-target="#NewChallengeRun">New Run</button>

            <NewChallengeRunModal title="New Challenge Run"
                                  context={this.props.context}
                                  recordSets={this.props.recordSets}
                                  recordMatchingSystems={this.props.recordMatchingSystems}
                                  runCreator={this.props.createRun}/>
          </div>
        </div>


        <div className="panel-body">
          {this.displayBody()}
        </div>
      </div>
    );
  }
}

ChallengeContext.displayName = 'ChallengeContext';

ChallengeContext.propTypes = {
  context: contextProps.isRequired,
  recordSets: PropTypes.arrayOf(recordSetProps),
  recordMatchingSystems: PropTypes.arrayOf(recordMatchingSystemProps),
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
    const matchRunsByRMS = _.groupBy(matchRunsForContext, 'recordMatchSystemInterfaceId');
    const patients = state.patients;
    const recordSets = _.values(state.recordSets);
    return {matchRunsByRMS, recordMatchingSystems, patients, recordSets};
  }
}

export default connect(mapStateToProps, { fetchMatchRunsByContext, createRun })(ChallengeContext);
