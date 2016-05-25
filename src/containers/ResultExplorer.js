import React, { Component, PropTypes } from 'react';
import CollapsibleSelector from '../components/CollapsibleSelector';
import SetupToMatchSystemList from './SetupToMatchSystemList';
import { connect } from 'react-redux';

import { fetchRMSIfNeeded, selectRMS } from '../actions/recordMatchingSystems';
import { fetchRecordSetsIfNeeded, selectRecordSet } from '../actions/recordSet';
import { fetchMetricsIfNeeded } from '../actions/matchJob';

class ResultExplorer extends Component {
  componentDidMount() {
    this.props.fetchRMSIfNeeded();
    this.props.fetchRecordSetsIfNeeded();
  }

  render() {
    return (
    <div className="container">
      <CollapsibleSelector itemsToSelect={this.props.recordSets} selectedName={this.props.selectedRecordSetName}
                           title="FORMATS" name="recordSet" selectFunction={(recordSet) => {
                             this.props.selectRecordSet(recordSet);
                             this.props.fetchMetricsIfNeeded(recordSet.id);
                           }}/>
      <CollapsibleSelector itemsToSelect={this.props.recordMatchingSystems} selectedName={this.props.selectedRMSName}
                           title="MATCHING SYSTEMS" name="recordMatchingSystem" selectFunction={this.props.selectRMS}/>
      <SetupToMatchSystemList />
    </div>
    );
  }
}

ResultExplorer.displayName = 'ResultExplorer';

ResultExplorer.propTypes = {
  recordMatchingSystems: PropTypes.array.isRequired,
  selectedRMS: PropTypes.object,
  selectedRMSName: PropTypes.string,
  fetchRMSIfNeeded: PropTypes.func,
  selectRMS: PropTypes.func,
  recordSets: PropTypes.array.isRequired,
  selectedRecordSetName: PropTypes.string,
  selectedRecordSet: PropTypes.object,
  fetchRecordSetsIfNeeded: PropTypes.func,
  fetchMetricsIfNeeded: PropTypes.func,
  selectRecordSet: PropTypes.func
};

const mapStateToProps = (state) => {
  var props = {};
  if (state.recordMatchingSystems) {
    props.recordMatchingSystems = state.recordMatchingSystems;
  } else {
    props.recordMatchingSystems = [];
  }
  if (state.selectedRecordMatchingSystem.name !== undefined) {
    props.selectedRMSName = state.selectedRecordMatchingSystem.name;
    props.selectedRMS = state.selectedRecordMatchingSystem;
  } else {
    props.selectedRMSName = "All";
  }
  if (state.recordSets) {
    props.recordSets = state.recordSets;
  } else {
    props.recordSets = [];
  }
  if (state.selectedRecordSet.name !== undefined) {
    props.selectedRecordSetName = state.selectedRecordSet.name;
    props.selectedRecordSet = state.selectedRecordSet;
  } else {
    props.selectedRecordSetName = "All";
  }
  return props;
};

export default connect(mapStateToProps, { fetchRMSIfNeeded, selectRMS, fetchRecordSetsIfNeeded,
                                          selectRecordSet, fetchMetricsIfNeeded })(ResultExplorer);
