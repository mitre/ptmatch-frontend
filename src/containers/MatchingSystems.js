import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import { runProps } from '../prop-types/run';

import { createRMS } from '../actions/recordMatchingSystems';

import MatchingSystemList from '../components/MatchingSystemList';
import PageHeader from '../components/Header/PageHeader';
import NewRecordMatchingSystem from '../components/NewRecordMatchingSystem';

class MatchingSystems extends Component {
  render() {
    return (
      <div className="dashboard">

      <PageHeader title="Matching Systems" />
      <div className="row">
        <div className="col-md-12">
          <MatchingSystemList {...this.props} />
          <NewRecordMatchingSystem createRMS={this.props.createRMS} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">

        </div>
      </div>
      </div>
    );
  }
}

MatchingSystems.displayName = 'MatchingSystems';

MatchingSystems.propTypes = {
  contexts: PropTypes.objectOf(contextProps),
  recordSets: PropTypes.objectOf(recordSetProps),
  recordMatchingSystems: PropTypes.objectOf(recordMatchingSystemProps),
  matchRuns: PropTypes.objectOf(runProps),
  createRMS: PropTypes.func
};

function mapStateToProps(state) {
  return {contexts: state.contexts,
          recordSets: state.recordSets,
          recordMatchingSystems: state.recordMatchingSystems,
          matchRuns: state.matchRuns};
}

export default connect(mapStateToProps, { createRMS })(MatchingSystems);
