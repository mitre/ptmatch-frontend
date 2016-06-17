import React, { Component, PropTypes } from 'react';
import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';

import { createRun } from '../actions/matchRun';

class NewBenchmarkRunModal extends Component {
  constructor(props) {
    super(props);
    let preselectedRMS = props.recordMatchingSystems.find((rms) => rms.selected === true);
    if (preselectedRMS === undefined) {
      this.state = {preselectedRMS: false, selectedRMS: {id: "-1"}, selectedRecordSet: {id: "-1"}};
    } else {
      this.state = {preselectedRMS: true, selectedRMS: preselectedRMS, selectedRecordSet: {id: "-1"}};
    }
  }

  componentWillReceiveProps(nextProps) {
    let preselectedRMS = nextProps.recordMatchingSystems.find((rms) => rms.selected === true);
    if (preselectedRMS === undefined) {
      this.setState({preselectedRMS: false, selectedRMS: {id: "-1"}});
    } else {
      this.setState({preselectedRMS: true, selectedRMS: preselectedRMS});
    }
  }

  selectRMS(matchingSystem) {
    this.setState({selectedRMS: matchingSystem});
  }

  selectRecordSet(recordSet) {
    this.setState({selectedRecordSet: recordSet});
  }

  classForRMS(matchingSystem) {
    if (this.state.selectedRMS.id === matchingSystem.id) {
      return "list-group-item active";
    } else {
      return "list-group-item";
    }
  }

  classForRecordSet(recordSet) {
    if (this.state.selectedRecordSet.id === recordSet.id) {
      return "list-group-item active";
    } else {
      return "list-group-item";
    }
  }

  rmsDisplay() {
    if (this.state.preselectedRMS) {
      return <p>Record Matching System: {this.state.selectedRMS.name}</p>;
    } else {
      return <ul className="list-group">
      {this.props.recordMatchingSystems.map(matchingSystem => {
        return (
        <li className={this.classForRMS(matchingSystem)}
            onClick={() => this.selectRMS(matchingSystem)}
            key={matchingSystem.id}>{matchingSystem.name}</li>
        );
      })}
      </ul>;
    }
  }

  handleNoteChange(event) {
    this.setState({note: event.target.value});
  }

  buildRun() {
    const recordSetId = this.state.selectedRecordSet.id;
    const recordMatchSystemInterfaceId = this.state.selectedRMS.id;
    const contextId = this.props.context.id;
    const note = this.state.note;
    createRun(recordMatchSystemInterfaceId, recordSetId, contextId, note);
  }

  render() {
    return (
      <div className="modal fade" tabIndex="-1" role="dialog" id="newBenchmarkRunModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">New Record Match Run</h4>
            </div>
            <div className="modal-body">
              {this.rmsDisplay()}
              <ul className="list-group">
              {this.props.recordSets.map(recordSet => {
                return (
                <li className={this.classForRecordSet(recordSet)}
                    onClick={() => this.selectRecordSet(recordSet)}
                    key={recordSet.id}>{recordSet.name}</li>
                );
              })}
              </ul>
              <p>Note: </p>
              <input type="text" value={this.state.note} onChange={(e) => this.handleNoteChange(e)} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.buildRun()}>Run Job</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewBenchmarkRunModal.displayName = 'NewBenchmarkRunModal';

NewBenchmarkRunModal.propTypes = {
  context: contextProps.isRequired,
  recordSets: PropTypes.arrayOf(recordSetProps).isRequired,
  recordMatchingSystems: PropTypes.arrayOf(recordMatchingSystemProps).isRequired
};

export default NewBenchmarkRunModal;
