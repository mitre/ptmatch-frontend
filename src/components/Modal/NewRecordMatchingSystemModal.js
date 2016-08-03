import React, { Component, PropTypes } from 'react';

export default class NewRecordMatchingSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', description: '', destinationEndpoint: '',
      serverEndpoint: '', responseEndpoint: ''};
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
      <div className="modal fade" tabIndex="-1" role="dialog" id="newRMS">
        <div className="modal-dialog">
          <div className="modal-content">
            <form className="newSystemForm">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">New Record Macthing System</h4>
              </div>
              <div className="modal-body">
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
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={(e) => this.handleSubmit(e.target.form)}>Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

NewRecordMatchingSystem.propTypes = {
  createRMS: PropTypes.func
};

NewRecordMatchingSystem.displayName = 'NewRecordMatchingSystem';
