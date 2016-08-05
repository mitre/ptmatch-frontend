import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import Modal from './Modal';

export default class NewRecordMatchingSystem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      destinationEndpoint: '',
      serverEndpoint: '',
      responseEndpoint: ''
    };
  }

  handleSubmit(form) {
    var newRms = {};
    var fields = ['name', 'description', 'destinationEndpoint', 'serverEndpoint', 'responseEndpoint'];
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      newRms[field] = form[field].value;
    }

    this.props.createRMS(newRms);
  }

  render() {
    return (
      <Modal modalId="newRecordMatchingSystemModal"
             modalTitle="New Record Matching System"
             defaultButtonText="Cancel"
             primaryButtonText="Create"
             primaryButtonOnClick={(e) => this.handleSubmit(e.target.form)}
             formName="newRecordMatchingSystemForm">
        <div className="new-context-modal modal-input-group">
          <div className="input-group">
            <span className="input-group-addon" id="rmsName">
              <FontAwesome name="sitemap" fixedWidth={true} /> Name
            </span>
            <input name="name" type="text" className="form-control" aria-describedby="name"/>
          </div>

          <div className="input-group">
            <span className="input-group-addon" id="rmsDescription">
              <FontAwesome name="file-text-o" fixedWidth={true} /> Description
            </span>
            <input name="description" type="text" className="form-control" aria-describedby="name"/>
          </div>

          <div className="input-group">
            <span className="input-group-addon" id="destinationEndpoint">
              <FontAwesome name="laptop" fixedWidth={true} /> Destination Endpoint
            </span>
            <input name="destinationEndpoint" type="text" className="form-control" aria-describedby="name"/>
          </div>

          <div className="input-group">
            <span className="input-group-addon" id="serverEndpoint">
              <FontAwesome name="laptop" fixedWidth={true} /> Server Endpoint
            </span>
            <input name="serverEndpoint" type="text" className="form-control" aria-describedby="name"/>
          </div>

          <div className="input-group">
            <span className="input-group-addon" id="responseEndpoint">
              <FontAwesome name="laptop" fixedWidth={true} /> Response Endpoint
            </span>
            <input name="responseEndpoint" type="text" className="form-control" aria-describedby="name"/>
          </div>
        </div>
      </Modal>
    );
  }
}

NewRecordMatchingSystem.propTypes = {
  createRMS: PropTypes.func
};

NewRecordMatchingSystem.displayName = 'NewRecordMatchingSystem';
