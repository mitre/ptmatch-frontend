import React, { Component, PropTypes } from 'react';
import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';

// This is an abstract class, expected to be subclassed by the two different
// context types. Child classes are expected to implement the modalBody
// function.
class NewRunModal extends Component {
  selectRMS(matchingSystem) {
    this.setState({selectedRMS: matchingSystem});
  }

  selectRecordSet(recordSet) {
    this.setState({selectedRecordSet: recordSet});
  }

  handleNoteChange(event) {
    this.setState({note: event.target.value});
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

  buildRun() {
    const recordSetId = this.state.selectedRecordSet.id;
    const recordMatchSystemInterfaceId = this.state.selectedRMS.id;
    const contextId = this.props.context.id;
    const note = this.state.note;
    this.props.runCreator(recordMatchSystemInterfaceId, recordSetId, contextId, note);
  }

  modalId() {
    return this.props.title.replace(/\s/g, '');
  }

  render() {
    return (
      <div className="modal fade" tabIndex="-1" role="dialog" id={this.modalId()}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>

            <div className="modal-body">
              {this.modalBody()}

              <label>Note:</label>
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

NewRunModal.propTypes = {
  context: contextProps.isRequired,
  recordSets: PropTypes.arrayOf(recordSetProps).isRequired,
  recordMatchingSystems: PropTypes.arrayOf(recordMatchingSystemProps).isRequired,
  runCreator: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default NewRunModal;
