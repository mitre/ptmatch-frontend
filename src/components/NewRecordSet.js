import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createRecordSet } from '../actions/recordSet';

class NewRecordSet extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', description: '', resourceType: 'Patient', parameters: {resourceType: 'Parameters', parameter: []}};
  }

  handleFieldChange(e, field) {
    let newState = {};
    newState[field] =  e.target.value;
    this.setState(newState);
  }

  handleParameterNameChange(e, i) {
    let parametersClone = this.state.parameters.parameter.slice(0);
    let newParameterName = e.target.value;
    let oldParameterValue = parametersClone[i].valueString; 
    parametersClone[i] = {name: newParameterName, valueString: oldParameterValue};
    this.setState({parameters: {resourceType: 'Parameters', parameter: parametersClone}});
  }

  handleParameterValueChange(e, i) {
    let parametersClone = this.state.parameters.parameter.slice(0);
    let oldParameterName = parametersClone[i].name;
    let newParameterValue = e.target.value; 
    parametersClone[i] = {name: oldParameterName, valueString: newParameterValue};
    this.setState({parameters: {resourceType: 'Parameters', parameter: parametersClone}});
  }
  
  handleAddParameter() {
    let parametersClone = this.state.parameters.parameter.slice(0);
    parametersClone[parametersClone.length] = {name: '', valueString: ''};
    this.setState({parameters: {resourceType: 'Parameters', parameter: parametersClone}});
  }

  handleSubmit(e) {
    e.preventDefault();    
    this.props.createRecordSet(this.state);
  }
  
  
  render() {
    return (        
      <div className="panel panel-default">
        <div className="panel-heading">New Record Matching System</div>
        <div className="panel-body">
          <form className="newRecordSet" onSubmit={(e) => this.handleSubmit(e)}>
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
            {this.state.parameters.parameter.map((param, i) => {
            return (<div className="row">
              <label>
                Parameter Name
                <input
                  type="text"
                  onChange={(e) => this.handleParameterNameChange(e, i)}
                />
              </label>
               <label>
                Parameter Value
                <input
                  type="text"
                  onChange={(e) => this.handleParameterValueChange(e, i)}
                />
              </label>
            </div>);
            })}
            <div className="row">
              <p onClick={() => this.handleAddParameter()}>Add Parameter</p>
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

NewRecordSet.propTypes = {
  createRecordSet: PropTypes.func
};

NewRecordSet.displayName = 'NewRecordSet';

export default connect(null, {createRecordSet})(NewRecordSet);