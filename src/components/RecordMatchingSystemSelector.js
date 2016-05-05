import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchRMSIfNeeded, selectRMS } from '../actions/recordMatchingSystems';

class RecordMatchingSystemSelector extends Component {
  componentDidMount() {
    this.props.fetchRMSIfNeeded();
  }

  render() {
    return (
      <div className="panel-group" role="tablist">
        <div className="panel panel-default">
          <div className="panel-heading" role="tab" id="matchingSystemHeading">
            <h4 className="panel-title">Matching Systems: {this.props.selectedRMS}</h4>
            <a role="button" data-toggle="collapse" href="#matchingSystemList">
             Open
            </a>
          </div>
          <div id="matchingSystemList" className="panel-collapse collapse" role="tabpanel">
            <ul className="list-group">
              {this.props.recordMatchingSystems.map(matchingSystem => {
                return (
                <li className="list-group-item"
                    key={matchingSystem.id}
                    onClick={() => this.props.selectRMS(matchingSystem)}>{matchingSystem.name}</li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

RecordMatchingSystemSelector.displayName = 'RecordMatchingSystemSelector';

RecordMatchingSystemSelector.propTypes = {
  recordMatchingSystems: PropTypes.array.isRequired,
  selectedRMS: PropTypes.string,
  fetchRMSIfNeeded: PropTypes.func,
  selectRMS: PropTypes.func
};

const mapStateToProps = (state) => {
  var props = {};
  if (state.recordMatchingSystems) {
    props.recordMatchingSystems = state.recordMatchingSystems;
  } else {
    props.recordMatchingSystems = [];
  }
  if (state.selectedRecordMatchingSystem.name !== undefined) {
    props.selectedRMS = state.selectedRecordMatchingSystem.name;
  } else {
    props.selectedRMS = "All";
  }
  return props;
};

export default connect(mapStateToProps, { fetchRMSIfNeeded, selectRMS })(RecordMatchingSystemSelector);
