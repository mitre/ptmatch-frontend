import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import MatchingSystemThumbnail from '../components/MatchingSystemThumbnail';
import RunList from '../components/RunList';

import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import { runProps } from '../prop-types/run';
import patientProps from '../prop-types/patient';

import { fetchMatchRunsByContext } from '../actions/matchRun';

class ChallengeContext extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedRMS: -1};
  }

  componentWillMount() {
    this.props.fetchMatchRunsByContext(this.props.context.id);
  }

  formatParams() {
    if (this.props.recordSet) {
      return this.props.recordSet.parameters.parameter.map((param) => {
        return <div key={param.name}>{param.name} : {param.valueString.substr(0,20)}</div>;
      });
    } else {
      return <div/>;
    }
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
  recordSet: recordSetProps,
  recordMatchingSystems: PropTypes.arrayOf(recordMatchingSystemProps),
  matchRunsByRMS: PropTypes.objectOf(PropTypes.arrayOf(runProps)),
  patients: PropTypes.objectOf(patientProps),
  fetchMatchRunsByContext: PropTypes.func
};

export function mapStateToProps(state, ownProps) {
  const contextId = ownProps.context.id;
  const matchRunsForContext = _.values(state.matchRuns).filter((mr) => mr.recordMatchContextId === contextId);
  if (matchRunsForContext.length === 0) {
    return {recordMatchingSystems: []};
  } else {
    const recordMatchingSystems = _.uniq(matchRunsForContext.map((mr) => state.recordMatchingSystems[mr.recordMatchSystemInterfaceId]));
    // We can grab the record set off of the first run since it should be the same
    // across all runs since this is a challange context.
    const recordSet = state.recordSets[matchRunsForContext[0].recordSetId];
    const matchRunsByRMS = _.groupBy(matchRunsForContext, 'recordMatchSystemInterfaceId');
    const patients = state.patients;
    return {matchRunsByRMS, recordMatchingSystems, recordSet, patients};
  }
}

export default connect(mapStateToProps, { fetchMatchRunsByContext })(ChallengeContext);
