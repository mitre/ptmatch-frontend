import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchRMSIfNeeded } from '../actions/recordMatchingSystems';

class ListRecordMatchingSystems extends Component {
  componentDidMount() {
    this.props.fetchRMSIfNeeded();
  }

  render() {
    return (
      <div className="row">
        {this.props.recordMatchingSystems.map(rms => <div className="col-md-4" key={rms.id}><p>{rms.name}</p></div>)}
      </div>
    );
  }
}

ListRecordMatchingSystems.displayName = 'ListRecordMatchingSystems';

ListRecordMatchingSystems.propTypes = {
  recordMatchingSystems: PropTypes.array.isRequired,
  fetchRMSIfNeeded: PropTypes.func
};

const mapStateToProps = (state) => {
  var props = {};
  if (state.recordMatchingSystems) {
    props.recordMatchingSystems = state.recordMatchingSystems;
  } else {
    props.recordMatchingSystems = [];
  }
  return props;
};

export default connect(mapStateToProps, { fetchRMSIfNeeded })(ListRecordMatchingSystems);
