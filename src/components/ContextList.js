import React, { Component, PropTypes } from 'react';

import contextProps from '../prop-types/context';
import NewContextModal from './NewContextModal';
import _ from 'lodash';

class ContextList extends Component {
  render() {
    return (<div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Context</h3>
              </div>
              <div className="panel-body">
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
            </div>);
  }
}

ContextList.displayName = "ContextList";

ContextList.propTypes = {
  contexts: PropTypes.objectOf(contextProps).isRequired,
  selector: PropTypes.func.isRequired,
  contextCreator: PropTypes.func.isRequired
};

export default ContextList;
