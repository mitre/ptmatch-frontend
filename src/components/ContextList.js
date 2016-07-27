import React, { Component, PropTypes } from 'react';

import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import { runProps } from '../prop-types/run';

import NewContextModal from './NewContextModal';
import CollapsiblePanel from './CollapsiblePanel';

import _ from 'lodash';
import moment from 'moment';

class ContextList extends Component {
  constructor(...args) {
    super(...args);

    this.state = {};
  }

  // Provides the name of the record matching system or record set
  // under test, depending on the context.
  itemBeingTested(context) {
    const runs = _.filter(_.values(this.props.matchRuns), {'recordMatchContextId': context.id});
    if (_.isEmpty(runs)) {
      return "-";
    }
    const firstRun = runs[0];
    switch (context.type) {
      case "benchmark":
        return this.props.recordMatchingSystems[firstRun.recordMatchSystemInterfaceId].name;
      case "challenge":
        return this.props.recordSets[firstRun.masterRecordSetId].name;
    }
  }

  lastUpdatedOn(context) {
    const runs = _.filter(_.values(this.props.matchRuns), {'recordMatchContextId': context.id});
    if (_.isEmpty(runs)) {
      return "-";
    }
    const lastRun = _.last(_.sortBy(runs, (r) => new Date(r.meta.createdOn)));
    return moment(lastRun.meta.createdOn).fromNow().toUpperCase();
  }

  render() {
    return (
      <CollapsiblePanel panelTitle="Context" panelIcon="key">
        <div>
          <div className="list-group">
            {_.values(this.props.contexts).map((c) => {
              let className = "list-group-item";
              if (c.selected) {
                className += " active";
              }
              return (<div className={className} key={c.id} onClick={() => this.props.selector(c.id)}>
                        <div className="row">
                          <p className="col-md-3">{c.name}</p>
                          <p className="col-md-3">{contextTypeIcon(c.type)} {c.type}</p>
                          <p className="col-md-3">{itemIcon(c.type)} {this.itemBeingTested(c)}</p>
                          <p className="col-md-3">
                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                            {this.lastUpdatedOn(c)}
                          </p>
                        </div>
                      </div>);
            })}
          </div>

          <button className="btn btn-primary pull-right" data-toggle="modal" data-target="#newContextModal">New Context</button>

          <NewContextModal contextCreator={this.props.contextCreator}/>
        </div>
      </CollapsiblePanel>
    );
  }
}

function contextTypeIcon(contextType) {
  switch (contextType) {
    case "benchmark":
      return <i className="fa fa-line-chart" aria-hidden="true"></i>;
    case "challenge":
      return <i className="fa fa fa-users" aria-hidden="true"></i>;
  }
}

function itemIcon(contextType) {
  switch (contextType) {
    case "benchmark":
      return <i className="fa fa-sitemap" aria-hidden="true"></i>;
    case "challenge":
      return <i className="fa fa-database" aria-hidden="true"></i>;
  }
}

ContextList.displayName = "ContextList";

ContextList.propTypes = {
  contexts: PropTypes.objectOf(contextProps).isRequired,
  recordSets: PropTypes.objectOf(recordSetProps).isRequired,
  recordMatchingSystems: PropTypes.objectOf(recordMatchingSystemProps).isRequired,
  selector: PropTypes.func.isRequired,
  contextCreator: PropTypes.func.isRequired,
  matchRuns: PropTypes.objectOf(runProps).isRequired
};

export default ContextList;
