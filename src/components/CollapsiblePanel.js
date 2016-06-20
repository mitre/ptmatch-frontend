import React, { Component, PropTypes } from 'react';

import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';

class CollapsiblePanel extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      open: true,
      chevronToggle: false
    };
  }

  render() {
    let panelTitleClassNames = classNames('fa', 'fa-fw', 'fa-' + this.props.panelIcon);
    let chevronClassNames = classNames('fa', 'fa-chevron-down', 'pull-right', 'rotate', { left: this.state.chevronToggle});

    return (
      <div className="panel panel-collapsible">
        <div className="panel-heading">
          <a onClick={ ()=> this.setState({ open: !this.state.open, chevronToggle: !this.state.chevronToggle })}>
            <span className="panel-title">
              <i className={panelTitleClassNames} aria-hidden="true"></i>
              {this.props.panelTitle}
            </span>
            <i className={chevronClassNames}></i>
          </a>
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
  children: PropTypes.element.isRequired
};

export default CollapsiblePanel;
