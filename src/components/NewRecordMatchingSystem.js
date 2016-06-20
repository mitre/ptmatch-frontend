import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createRMS } from '../actions/recordMatchingSystems';

class NewRecordMatchingSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', description: '', destinationEndpoint: '',
      serverEndpoint: '', responseEndpoint: ''};
  }

  handleSubmit(e) {
    e.preventDefault();
    var newRms = {};
    var fields = ['name', 'description', 'destinationEndpoint', 'serverEndpoint', 'responseEndpoint'];
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      newRms[field] = e.target[field].value;
    }

    this.props.createRMS(newRms);
  }


  render() {
    return (
      <div className="panel panel-show">
        <div className="panel-heading">New Record Matching System</div>
        <div className="panel-body">
          <form className="newSystemForm" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="row">
              <label>
                Name
                <input type="text" name="name"/>
              </label>
            </div>
            <div className="row">
              <label>
                Description
                <input type="text" name="description"/>
              </label>
            </div>
            <div className="row">
              <label>
                Destination Endpoint
                <input type="text" name="destinationEndpoint"/>
              </label>
            </div>
            <div className="row">
              <label>
                Server Endpoint
                <input type="text" name="serverEndpoint"/>
              </label>
            </div>
            <div className="row">
              <label>
                Response Endpoint
                <input type="text" name="responseEndpoint"/>
              </label>
            </div>
            <div className="row">
              <input type="submit" value="Create" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

NewRecordMatchingSystem.propTypes = {
  createRMS: PropTypes.func
};

NewRecordMatchingSystem.displayName = 'NewRecordMatchingSystem';

export default connect(null, {createRMS})(NewRecordMatchingSystem);