import React, { Component, PropTypes } from 'react';

import { Collapse } from 'react-bootstrap';

class CollapsiblePanel extends Component {
  constructor(...args) {
    super(...args);

    this.state = { open: true };
  }

  render() {
    return (
      <div className="panel panel-collapsible">
        <div className="panel-heading">
          <a onClick={ ()=> this.setState({ open: !this.state.open })}>
            <span className="panel-title">{this.props.panelTitle}</span>
            <i className="fa fa-chevron-down pull-right"></i>
          </a>
        </div>

        <Collapse className="panel-collapse" in={this.state.open}>
          <div className="panel-body">
            <div>
              {this.props.children}
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

CollapsiblePanel.displayName = "CollapsiblePanel";

CollapsiblePanel.propTypes = {
  panelTitle: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

export default CollapsiblePanel;
