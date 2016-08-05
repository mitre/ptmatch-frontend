import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { createRMS, selectRMS } from '../actions/recordMatchingSystems';

import MatchingSystemList from '../components/MatchingSystemList';
import MatchingSystemInfo from '../components/MatchingSystemInfo';
import PageHeader from '../components/Header/PageHeader';
import NewRecordMatchingSystemModal from '../components/Modal/NewRecordMatchingSystemModal';

import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import { runProps } from '../prop-types/run';

class MatchingSystems extends Component {
  render() {
    return (
      <div className="matching-systems">
        <PageHeader title="Matching Systems" />
        <MatchingSystemList {...this.props} />
        <NewRecordMatchingSystemModal createRMS={this.props.createRMS} />

        {_.values(this.props.recordMatchingSystems).filter((rms) => rms.selected === true).map((rms) => {
          return (
            <MatchingSystemInfo recordMatchingSystem={rms} key={rms.id} />
          );
        })}
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
