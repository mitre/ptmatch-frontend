import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import Modal from './Modal';

import contextProps from '../../prop-types/context';
import recordSetProps from '../../prop-types/record_set';
import recordMatchingSystemProps from '../../prop-types/record_matching_system';
import { runProps } from '../../prop-types/run';

import ItemBeingTested from '../../util/ItemBeingTested';

import _ from 'lodash';

export default class NewRunModal extends Component {
  constructor(props) {
    super(props);

    let itemBeingTested = ItemBeingTested(this.props.context,
                                          this.props.matchRuns,
                                          _.keyBy(this.props.recordSets, 'id'),
                                          _.keyBy(this.props.recordMatchingSystems, 'id'));
    let state = {
      itemBeingTested: itemBeingTested,
      note: ''
    };
    if (itemBeingTested !== '-') {
      if (this.props.context.type === 'challenge') {
        state.selectedRecordSet = this.props.recordSets.find((rs) => rs.name === itemBeingTested);
      } else {
        state.selectedRMS = this.props.recordMatchingSystems.find((rms) => rms.name === itemBeingTested);
      }
    }
    this.state = state;
  }

  selectRMS(matchingSystemId) {
    const matchingSystem = this.props.recordMatchingSystems.find((rms) => rms.id === matchingSystemId);
    this.setState({selectedRMS: matchingSystem});
  }

  selectRecordSet(recordSetId) {
    const recordSet = this.props.recordSets.find((rs) => rs.id === recordSetId);
    this.setState({selectedRecordSet: recordSet});
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
    if (this.props.context.type === 'challenge' && this.state.itemBeingTested !== '-') {
      return (
        <div className="input-group">
          <span className="input-group-addon">
            <FontAwesome name="database" fixedWidth={true} /> Record Set
          </span>

          <div className="modal-selection">{this.state.itemBeingTested}</div>
        </div>
      );
    } else {
      return (
        <div className="input-group">
          <span className="input-group-addon" id="recordSet">
            <FontAwesome name="database" fixedWidth={true} /> Record Set
          </span>

          <FontAwesome name="caret-down" className="select-caret" />

          <select name="recordSet" onChange={(e) => this.selectRecordSet(e.target.value)}>
            {this.props.recordSets.map(recordSet => {
              return (
                <option value={recordSet.id} key={recordSet.id}>{recordSet.name}</option>
              );
            })}
          </select>
        </div>
      );
    }
  }

  rmsDisplay() {
    if (this.props.context.type === 'benchmark' && this.state.itemBeingTested !== '-') {
      return (
        <div className="input-group">
          <span className="input-group-addon">
            <FontAwesome name="sitemap" fixedWidth={true} /> Record Matching System
          </span>

          <div className="modal-selection">{this.state.itemBeingTested}</div>
        </div>
      );
    } else {
      return (
        <div className="input-group">
          <span className="input-group-addon" id="rms">
            <FontAwesome name="sitemap" fixedWidth={true} /> Record Matching System
          </span>

          <FontAwesome name="caret-down" className="select-caret" />

          <select name="rms" onChange={(e) => this.selectRMS(e.target.value)}>
            {this.props.recordMatchingSystems.map(rms => {
              return (
                <option value={rms.id} key={rms.id}>{rms.name}</option>
              );
            })}
          </select>
        </div>
      );
    }
  }

  noteDisplay() {
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
  runCreator: PropTypes.func.isRequired,
  matchRuns: PropTypes.objectOf(runProps).isRequired
};
