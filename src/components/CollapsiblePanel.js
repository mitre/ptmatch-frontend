import React, { Component, PropTypes } from 'react';

import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

export default class CollapsiblePanel extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      open: true,
      chevronToggle: false
    };
  }

  panelButton() {
    if (this.props.buttonText) {
      return (
        <button className="btn btn-primary btn-panel pull-right"
                data-toggle="modal"
                data-target={this.props.modalTarget}>
          {this.props.buttonText}
        </button>
      );
    }
  }

  panelSubtitle() {
    if (this.props.subtitle) {
      return (
        <span className="panel-subtitle pull-right">
          <FontAwesome name={this.props.subtitleIcon} /> {this.props.subtitle}
        </span>
      );
    }
  }

  render() {
    let chevronClassNames = classNames('fa', 'fa-chevron-down', 'rotate', { left: this.state.chevronToggle});

    return (
      <div className="panel panel-collapsible">
        <div className="panel-heading">
          <span className="panel-title">
            <FontAwesome name={this.props.panelIcon} /> {this.props.panelTitle}
          </span>

          <a onClick={ ()=> this.setState({ open: !this.state.open, chevronToggle: !this.state.chevronToggle })}
             className="pull-right">
            <i className={chevronClassNames}></i>
          </a>

          {this.panelButton()}

          {this.panelSubtitle()}
        </div>

        <Collapse className="panel-collapse" in={this.state.open}>
          <div className="panel-body">
            {this.props.children}
          </div>
        </Collapse>
      </div>
    );
  }
}

CollapsiblePanel.displayName = "CollapsiblePanel";

CollapsiblePanel.propTypes = {
  panelTitle: PropTypes.string.isRequired,
  panelIcon: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  creator: PropTypes.func,
  subtitle: PropTypes.string,
  subtitleIcon: PropTypes.string,
  buttonText: PropTypes.string,
  modalTarget: PropTypes.string
};
