import React, { Component, PropTypes } from 'react';

import contextProps from '../prop-types/context';
import NewContextModal from './NewContextModal';
import CollapsiblePanel from './CollapsiblePanel';
import _ from 'lodash';

class ContextList extends Component {
  constructor(...args) {
    super(...args);

    this.state = {};
  }

  render() {
    return (
      <CollapsiblePanel panelTitle="Context" panelIcon="key">
        <div>
          <ul className="list-group">
            {_.values(this.props.contexts).map((c) => {
              let className = "list-group-item";
              if (c.selected) {
                className += " active";
              }
              return (<li className={className} key={c.id} onClick={() => this.props.selector(c.id)}>{c.name}</li>);
            })}
          </ul>

          <button className="btn btn-primary pull-right" data-toggle="modal" data-target="#newContextModal">New Context</button>

          <NewContextModal contextCreator={this.props.contextCreator}/>
        </div>
      </CollapsiblePanel>
    );
  }
}

ContextList.displayName = "ContextList";

ContextList.propTypes = {
  contexts: PropTypes.objectOf(contextProps).isRequired,
  selector: PropTypes.func.isRequired,
  contextCreator: PropTypes.func.isRequired
};

export default ContextList;
