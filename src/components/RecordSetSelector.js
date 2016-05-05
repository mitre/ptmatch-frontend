import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchRecordSetsIfNeeded, selectRecordSet } from '../actions/recordSet';

class RecordSetSelector extends Component {
  componentDidMount() {
    this.props.fetchRecordSetsIfNeeded();
  }

  render() {
    return (
      <div className="panel-group" role="tablist">
        <div className="panel panel-default">
          <div className="panel-heading" role="tab" id="recordSetHeading">
            <h4 className="panel-title">Data Set: {this.props.selectedRecordSetName}</h4>
            <a role="button" data-toggle="collapse" href="#recordSetList">
             Open
            </a>
          </div>
          <div id="recordSetList" className="panel-collapse collapse" role="tabpanel">
            <ul className="list-group">
              {this.props.recordSets.map(recordSet => {
                return (
                <li className="list-group-item"
                    key={recordSet.id}
                    onClick={() => this.props.selectRecordSet(recordSet)}>{recordSet.name}</li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

RecordSetSelector.displayName = 'RecordSetSelector';

RecordSetSelector.propTypes = {
  recordSets: PropTypes.array.isRequired,
  selectedRecordSetName: PropTypes.string,
  fetchRecordSetsIfNeeded: PropTypes.func,
  selectRecordSet: PropTypes.func
};

const mapStateToProps = (state) => {
  var props = {};
  if (state.recordSets) {
    props.recordSets = state.recordSets;
  } else {
    props.recordSets = [];
  }
  if (state.selectedRecordSet.name !== undefined) {
    props.selectedRecordSetName = state.selectedRecordSet.name;
  } else {
    props.selectedRecordSetName = "All";
  }
  return props;
};

export default connect(mapStateToProps, { fetchRecordSetsIfNeeded, selectRecordSet })(RecordSetSelector);
