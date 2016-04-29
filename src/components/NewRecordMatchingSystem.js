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
    this.props.createRMS(this.state);
  }
  
  handleFieldChange(e, field) {
    let newState = {};
    newState[field] =  e.target.value;
    this.setState(newState);
  }
  
  render() {
    return (        
      <div className="panel panel-default">
        <div className="panel-heading">New Record Matching System</div>
        <div className="panel-body">
          <form className="newSystemForm" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="row">
              <label>
                Name
                <input
                  type="text"
                  onChange={(e) => this.handleFieldChange(e, 'name')}
                />
              </label>
            </div>
            <div className="row">
              <label>
                Description
                <input
                  type="text"
                  onChange={(e) => this.handleFieldChange(e, 'description')}
                />
              </label>
            </div>
            <div className="row">
              <label>
                Destination Endpoint
                <input
                  type="text"
                  onChange={(e) => this.handleFieldChange(e, 'destinationEndpoint')}
                />
              </label>
            </div>
            <div className="row">
              <label>
                Server Endpoint
                <input
                  type="text"
                  onChange={(e) => this.handleFieldChange(e, 'serverEndpoint')}
                />
              </label>
            </div>
            <div className="row">
              <label>
                Response Endpoint
                <input
                  type="text"
                  onChange={(e) => this.handleFieldChange(e, 'responseEndpoint')}
                />
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