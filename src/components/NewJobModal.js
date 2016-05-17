import React, { Component, PropTypes } from 'react';

import { createJob } from '../actions/matchJob';

class NewJobModal extends Component {
  classForRMS(matchingSystem) {
    if (this.props.selectedRecordMatchingSystem.id === matchingSystem.id) {
      return "list-group-item active";
    } else {
      return "list-group-item";
    }
  }  
  
  render() {
    return (
      <div className="modal fade" tabIndex="-1" role="dialog" id="newJobModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">New Record Match Job</h4>
            </div>
            <div className="modal-body">
              <p>Format: {this.props.recordSet.name}</p>
              <ul className="list-group">
              {this.props.recordMatchingSystems.map(matchingSystem => {
                return (
                <li className={this.classForRMS(matchingSystem)}
                    onClick={() => this.props.selectRMSFunc(matchingSystem)}
                    key={matchingSystem.id}>{matchingSystem.name}</li>
                );
              })}
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => createJob(this.props.selectedRecordMatchingSystem.id, this.props.recordSet.id)}>Run Job</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewJobModal.displayName = 'NewJobModal';

NewJobModal.propTypes = {
  recordMatchingSystems: PropTypes.array.isRequired,
  recordSet: PropTypes.object.isRequired,
  selectedRecordMatchingSystem: PropTypes.object.isRequired,
  selectRMSFunc: PropTypes.func.isRequired
};

export default NewJobModal;