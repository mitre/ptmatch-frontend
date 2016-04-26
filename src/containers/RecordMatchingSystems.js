import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchRMSIfNeeded } from '../actions/recordMatchingSystems';

class RecordMatchingSystems extends Component {
  componentDidMount() {
    this.props.fetchRMSIfNeeded();
  }
  
  render() {
    return (        
    <div className="container">
        <h1>List of record matching systems</h1>
        <ul>
          {this.props.recordMatchingSystems.map(rms => <li>{rms.name}</li>)}
        </ul>
    </div>
    );
  }
}

RecordMatchingSystems.displayName = 'RecordMatchingSystems';

RecordMatchingSystems.propTypes = {
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

export default connect(mapStateToProps, { fetchRMSIfNeeded })(RecordMatchingSystems);