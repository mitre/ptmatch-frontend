import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ListRecordMatchingSystems from '../components/ListRecordMatchingSystems';

class SetupToMatchSystemList extends Component {
  isMatchingSystemSelected() {
    return this.props.selectedRMS.name !== undefined;
  }

  isRecordSetSelected() {
    return this.props.selectedRecordSet.name !== undefined;
  }

  body() {
    if (this.isRecordSetSelected()) {
      return (<ListRecordMatchingSystems/>);
    } else {
      return (<p>Please select a record set</p>);
    }
  }

  render() {
    return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{this.props.selectedRecordSet.name ? this.props.selectedRecordSet.name : ""}</h3>
      </div>
      <div className="panel-body">
        {this.body()}
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  var props = {};
  if (state.recordMatchingSystems) {
    props.recordMatchingSystems = state.recordMatchingSystems;
  } else {
    props.recordMatchingSystems = [];
  }
  if (state.selectedRecordMatchingSystem.name !== undefined) {
    props.selectedRMS = state.selectedRecordMatchingSystem;
  } else {
    props.selectedRMS = {};
  }
  if (state.recordSets) {
    props.recordSets = state.recordSets;
  } else {
    props.recordSets = [];
  }
  if (state.selectedRecordSet.name !== undefined) {
    props.selectedRecordSet = state.selectedRecordSet;
  } else {
    props.selectedRecordSet = {};
  }
  return props;
};

SetupToMatchSystemList.propTypes = {
  recordMatchingSystems: PropTypes.array.isRequired,
  selectedRMS: PropTypes.object,
  recordSets: PropTypes.array.isRequired,
  selectedRecordSet: PropTypes.object
};

SetupToMatchSystemList.displayName = 'SetupToMatchSystemList';

export default connect(mapStateToProps)(SetupToMatchSystemList);
