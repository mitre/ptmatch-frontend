import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchRMSIfNeeded } from '../actions/recordMatchingSystems';

class ListRecordMatchingSystems extends Component {
  componentDidMount() {
    this.props.fetchRMSIfNeeded();
  }
  
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">List of record matching systems</h3>
        </div>
        <div className="panel-body">  
          <ul>
            {this.props.recordMatchingSystems.map(rms => <li>{rms.name}</li>)}
          </ul>
        </div>
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