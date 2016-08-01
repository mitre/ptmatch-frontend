import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import recordSetProps from '../prop-types/record_set';

import RecordSetList from '../components/RecordSetList';
import PageHeader from '../components/Header/PageHeader';

class RecordSets extends Component {
  render() {
    return (
      <div className="dashboard">

        <PageHeader title="Record Sets" />
        <div className="row">
          <div className="col-md-12">
            <RecordSetList {...this.props} />
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

RecordSets.displayName = 'RecordSets';

RecordSets.propTypes = {
  recordSets: PropTypes.objectOf(recordSetProps),
};

function mapStateToProps(state) {
  return {recordSets: state.recordSets};
}

export default connect(mapStateToProps)(RecordSets);
