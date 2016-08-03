import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import Modal from './Modal';

export default class NewContextModal extends Component {
  handleSubmit(form) {
    const name = form.contextName.value;
    const description = form.contextDescription.value;
    const type = form.contextType.value;

    this.props.contextCreator(name, description, type);
  }

  render() {
    return (
      <Modal modalId="newContextModal"
             modalTitle="New Context"
             defaultButtonText="Cancel"
             primaryButtonText="Create Context"
             primaryButtonOnClick={(e) => this.handleSubmit(e.target.form)}
             formName="newContextForm">
        <div className="new-context-modal modal-input-group">
          <div className="input-group">
            <span className="input-group-addon" id="contextName">
              <FontAwesome name="key" fixedWidth={true} /> Context Name
            </span>
            <input name="contextName" type="text" className="form-control" aria-describedby="name"/>
          </div>

          <div className="input-group">
            <span className="input-group-addon" id="contextDescription">
              <FontAwesome name="file-text-o" fixedWidth={true} /> Context Description
            </span>
            <input name="contextDescription" type="textarea" className="form-control" aria-describedby="description"/>
          </div>

          <div className="input-group">
            <span className="input-group-addon" id="contextType">
              <FontAwesome name="cog" fixedWidth={true} /> Context Type
            </span>

            <FontAwesome name="caret-down" className="select-caret" />

            <select name="contextType">
              <option value="challenge">challenge</option>
              <option value="benchmark">benchmark</option>
            </select>
          </div>
        </div>
      </Modal>
    );
  }
}

NewContextModal.displayName = 'NewContextModal';

NewContextModal.propTypes = {
  contextCreator: PropTypes.func.isRequired
};
