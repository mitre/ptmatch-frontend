import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import recordSetProps from '../prop-types/record_set';

import RecordSetList from '../components/RecordSetList';
import RecordSetInfo from '../components/RecordSetInfo';
import PageHeader from '../components/Header/PageHeader';

import { selectRecordSet } from '../actions/recordSet';
import _ from 'lodash';

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
            {_.values(this.props.recordSets).filter((rs) => rs.selected === true).map((rs) => {
              return <RecordSetInfo recordSet={rs} key={rs.id} />;
            })}
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

export default connect(mapStateToProps, { selectRecordSet })(RecordSets);
