import React, { Component, PropTypes } from 'react';

class NewContextModal extends Component {
  handleSubmit(form) {
    const name = form.name.value;
    const description = form.description.value;
    const type = form.type.value;
    this.props.contextCreator(name, description, type);
  }

  render() {
    return (
      <div className="modal fade" tabIndex="-1" role="dialog" id="newContextModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <form className="newContextForm">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">New Record Match Context</h4>
              </div>
              <div className="modal-body">
                <div className="input-group">
                  <span className="input-group-addon" id="name">Name</span>
                  <input name="name" type="text" className="form-control" aria-describedby="name"/>
                </div>
                <div className="input-group">
                  <span className="input-group-addon" id="description">Description</span>
                  <input name="description" type="textarea" className="form-control" aria-describedby="description"/>
                </div>
                <div className="input-group">
                  <select name="type">
                    <option value="challenge">challenge</option>
                    <option value="benchmark">benchmark</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => this.handleSubmit(e.target.form)}>Create Context</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

NewContextModal.displayName = 'NewContextModal';

NewContextModal.propTypes = {
  contextCreator: PropTypes.func.isRequired
};

export default NewContextModal;
