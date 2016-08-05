import React, { Component, PropTypes } from 'react';

import FontAwesome from 'react-fontawesome';

export default class Modal extends Component {
  defaultButton() {
    if (this.props.defaultButtonText) {
      return (
        <button type="button"
                className="btn btn-default"
                data-dismiss="modal"
                onClick={this.props.defaultButtonOnClick}>
          {this.props.defaultButtonText}
        </button>
      );
    }
  }

  primaryButton() {
    if (this.props.primaryButtonText) {
      return (
        <button type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={this.props.primaryButtonOnClick}>
          {this.props.primaryButtonText}
        </button>
      );
    }
  }

  render() {
    return (
      <div className="modal fade" tabIndex="-1" role="dialog" id={this.props.modalId}>
        <div className="modal-dialog">
          <div className="modal-content">
            <form name={this.props.formName} ref="form">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <FontAwesome name="close" />
                </button>

                <h4 className="modal-title">{this.props.modalTitle}</h4>
              </div>

              <div className="modal-body">
                {this.props.children}
              </div>

              <div className="modal-footer">
                {this.defaultButton()}
                {this.primaryButton()}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Modal.displayName = 'Modal';

Modal.propTypes = {
  modalId: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  defaultButtonText: PropTypes.string,
  defaultButtonOnClick: PropTypes.func,
  primaryButtonText: PropTypes.string,
  primaryButtonOnClick: PropTypes.func,
  formName: PropTypes.string
};
