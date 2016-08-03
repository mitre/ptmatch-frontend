import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import Modal from './Modal';

import contextProps from '../../prop-types/context';
import recordSetProps from '../../prop-types/record_set';
import recordMatchingSystemProps from '../../prop-types/record_matching_system';

export default class NewRunModal extends Component {
  constructor(props) {
    super(props);

    let preselectedRecordSet = props.recordSets.find((recordSet) => recordSet.selected === true);
    let preselectedRMS = props.recordMatchingSystems.find((rms) => rms.selected === true);

    this.state = Object.assign({ note: '' }, this.defineState(preselectedRecordSet, preselectedRMS));
  }

  componentWillReceiveProps(nextProps) {
    let preselectedRecordSet = nextProps.recordSets.find((recordSet) => recordSet.selected === true);
    let preselectedRMS = nextProps.recordMatchingSystems.find((rms) => rms.selected === true);

    this.setState(this.defineState(preselectedRecordSet, preselectedRMS));
  }

  defineState(preselectedRecordSet, preselectedRMS) {
    let hasPreselectedRecordSet = (preselectedRecordSet !== undefined);
    let hasPreselectedRMS = (preselectedRMS !== undefined);

    return ({
      hasPreselectedRecordSet: hasPreselectedRecordSet,
      selectedRecordSet: (hasPreselectedRecordSet)? preselectedRecordSet : { id: "-1" },
      hasPreselectedRMS: hasPreselectedRMS,
      selectedRMS: (hasPreselectedRMS)? preselectedRMS : { id: "-1" }
    });
  }

  buildRun() {
    const recordSetId = this.state.selectedRecordSet.id;
    const recordMatchSystemInterfaceId = this.state.selectedRMS.id;
    const contextId = this.props.context.id;
    const note = this.state.note;

    this.props.runCreator(recordMatchSystemInterfaceId, recordSetId, contextId, note);
  }

  contextDisplay() {
    return (
      <div className="input-group">
        <span className="input-group-addon">
          <FontAwesome name="key" fixedWidth={true} /> Context
        </span>

        <div className="modal-selection">{this.props.context.name}</div>
      </div>
    );
  }

  recordSetDisplay() {
    if (this.state.hasPreselectedRecordSet) {
      return (
        <div className="input-group">
          <span className="input-group-addon">
            <FontAwesome name="database" fixedWidth={true} /> Record Set
          </span>

          <div className="modal-selection">{this.state.selectedRecordSet.name}</div>
        </div>
      );
    } else {
      return (
        <div className="input-group">
          <span className="input-group-addon" id="recordSet">
            <FontAwesome name="database" fixedWidth={true} /> Record Set
          </span>

          <FontAwesome name="caret-down" className="select-caret" />

          <select name="recordSet">
            {this.props.recordSets.map(recordSet => {
              return (
                <option value={recordSet.name} key={recordSet.id}>{recordSet.name}</option>
              );
            })}
          </select>
        </div>
      );
    }
  }

  rmsDisplay() {
    if (this.state.hasPreselectedRMS) {
      return (
        <div className="input-group">
          <span className="input-group-addon">
            <FontAwesome name="sitemap" fixedWidth={true} /> Record Matching System
          </span>

          <div className="modal-selection">{this.state.selectedRMS.name}</div>
        </div>
      );
    } else {
      return (
        <div className="input-group">
          <span className="input-group-addon" id="rms">
            <FontAwesome name="sitemap" fixedWidth={true} /> Record Matching System
          </span>

          <FontAwesome name="caret-down" className="select-caret" />

          <select name="rms">
            {this.props.recordMatchingSystems.map(rms => {
              return (
                <option value={rms.name} key={rms.id}>{rms.name}</option>
              );
            })}
          </select>
        </div>
      );
    }
  }

  noteDisplay() {
    let note = this.state.note;

    return (
      <div className="input-group">
        <span className="input-group-addon" id="note">
          <FontAwesome name="edit" fixedWidth={true} /> Note
        </span>
        <input name="note"
               type="textarea"
               className="form-control"
               aria-describedby="note"
               value={this.state.note}
               onChange={(e) => this.handleNoteChange(e)} />
      </div>
    );
  }

  handleNoteChange(event) {
    this.setState({ note: event.target.value });
  }

  render() {
    return (
      <Modal modalId="newRunModal"
             modalTitle={this.props.title}
             defaultButtonText="Cancel"
             primaryButtonText="Run Job"
             primaryButtonOnClick={() => this.buildRun()}>
        <div className="new-challenge-run-modal modal-input-group">
          {this.contextDisplay()}
          {this.recordSetDisplay()}
          {this.rmsDisplay()}
          {this.noteDisplay()}
        </div>
      </Modal>
    );
  }
}

NewRunModal.displayName = 'NewRunModal';

NewRunModal.propTypes = {
  title: PropTypes.string.isRequired,
  context: contextProps.isRequired,
  recordSets: PropTypes.arrayOf(recordSetProps).isRequired,
  recordMatchingSystems: PropTypes.arrayOf(recordMatchingSystemProps).isRequired,
  runCreator: PropTypes.func.isRequired
};
