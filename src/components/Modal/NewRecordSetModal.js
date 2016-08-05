import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import Modal from './Modal';

export default class NewRecordSet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      resourceType: 'Patient',
      parameters: { resourceType: 'Parameters', parameter: []}
    };
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
      <Modal modalId="newRecordSetModal"
             modalTitle="New Record Set"
             defaultButtonText="Cancel"
             primaryButtonText="Create"
             primaryButtonOnClick={(e) => this.handleSubmit(e)}
             formName="newRecordSetForm">
        <div className="new-record-set-modal modal-input-group">
          <div className="input-group">
            <span className="input-group-addon" id="name">
              <FontAwesome name="database" fixedWidth={true} /> Name
            </span>
            <input name="name" type="text" className="form-control" aria-describedby="name"
                   onChange={(e) => this.handleFieldChange(e, 'name')}/>
          </div>

          <div className="input-group">
            <span className="input-group-addon" id="description">
              <FontAwesome name="file-text-o" fixedWidth={true} /> Description
            </span>
            <input name="description" type="text" className="form-control" aria-describedby="name"
                   onChange={(e) => this.handleFieldChange(e, 'description')}/>
          </div>

          {this.state.parameters.parameter.map((param, i) => {
            return (
              <div className="parameters" key={i}>
                <div className="input-group">
                  <span className="input-group-addon" id="parameterName">
                    <FontAwesome name="cog" fixedWidth={true} /> Parameter Name
                  </span>
                  <input name="parameterName" type="text" className="form-control" aria-describedby="name"
                         onChange={(e) => this.handleParameterNameChange(e, i)}/>
                </div>

                <div className="input-group">
                  <span className="input-group-addon" id="parameterValue">
                    <FontAwesome name="cog" fixedWidth={true} /> Parameter Value
                  </span>
                  <input name="parameterValue" type="text" className="form-control" aria-describedby="name"
                         onChange={(e) => this.handleParameterValueChange(e, i)}/>
                </div>
              </div>
            );
          })}

          <div>
            <div className="btn btn-primary add-parameter-button" onClick={() => this.handleAddParameter()}>
              <FontAwesome name="plus-circle" /> Add Parameter
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

NewRecordSet.displayName = 'NewRecordSet';

NewRecordSet.propTypes = {
  createRecordSet: PropTypes.func
};
