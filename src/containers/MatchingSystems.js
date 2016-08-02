import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import { runProps } from '../prop-types/run';

import { createRMS, selectRMS } from '../actions/recordMatchingSystems';

import MatchingSystemList from '../components/MatchingSystemList';
import MatchingSystemInfo from '../components/MatchingSystemInfo';
import PageHeader from '../components/Header/PageHeader';
import NewRecordMatchingSystemModal from '../components/NewRecordMatchingSystemModal';

import _ from 'lodash';

class MatchingSystems extends Component {
  render() {
    return (
      <div className="dashboard">

      <PageHeader title="Matching Systems" />
      <div className="row">
        <div className="col-md-12">
          <MatchingSystemList {...this.props} />
          <button className="btn btn-primary pull-right" data-toggle="modal" data-target="#newRMS">New Record Matching System</button>
          <NewRecordMatchingSystemModal createRMS={this.props.createRMS} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {_.values(this.props.recordMatchingSystems).filter((rms) => rms.selected === true).map((rms) => {
            return <MatchingSystemInfo recordMatchingSystem={rms} key={rms.id} />;
          })}
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
  createRMS: PropTypes.func,
  selectRMS: PropTypes.func
};

function mapStateToProps(state) {
  return {contexts: state.contexts,
          recordSets: state.recordSets,
          recordMatchingSystems: state.recordMatchingSystems,
          matchRuns: state.matchRuns};
}

export default connect(mapStateToProps, { createRMS, selectRMS })(MatchingSystems);
