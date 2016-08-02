import React, { Component, PropTypes } from 'react';

import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';

import NewContextModal from './NewContextModal';

export default class CollapsiblePanel extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      open: true,
      chevronToggle: false
    };
  }

  modalType() {
    if (this.props.panelTitle === "Context") {
      return (
        <NewContextModal contextCreator={this.props.creator}/>
      );
    }
  }

  panelButton() {
    if (this.props.hasButton) {
      return (
        <button className="btn btn-primary btn-panel pull-right"
                data-toggle="modal"
                data-target={`#new${this.props.panelTitle}Modal`}>
          New {this.props.panelTitle}
        </button>
      );
    }
  }

  render() {
    let panelTitleClassNames = classNames('fa', 'fa-fw', 'fa-' + this.props.panelIcon);
    let chevronClassNames = classNames('fa', 'fa-chevron-down', 'rotate', { left: this.state.chevronToggle});

    return (
      <div className="panel panel-collapsible">
        <div className="panel-heading">
          <span className="panel-title">
            <i className={panelTitleClassNames} aria-hidden="true"></i>
            {this.props.panelTitle}
          </span>

          <a onClick={ ()=> this.setState({ open: !this.state.open, chevronToggle: !this.state.chevronToggle })}
             className="pull-right">
            <i className={chevronClassNames}></i>
          </a>

          {this.panelButton()}
        </div>

        <Collapse className="panel-collapse" in={this.state.open}>
          <div className="panel-body">
            {this.props.children}
          </div>
        </Collapse>

        {this.modalType()}
      </div>
    );
  }
}

CollapsiblePanel.displayName = "CollapsiblePanel";

CollapsiblePanel.propTypes = {
  panelTitle: PropTypes.string.isRequired,
  panelIcon: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  creator: PropTypes.func.isRequired,
  hasButton: PropTypes.bool
};
