import React, { Component, PropTypes } from 'react';

import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import { runProps } from '../prop-types/run';

import CollapsiblePanel from './CollapsiblePanel';
import NewContextModal from './NewContextModal';

import _ from 'lodash';
import moment from 'moment';
import itemBeingTestedUtil from '../util/itemBeingTested';

export default class ContextList extends Component {
  constructor(...args) {
    super(...args);

    this.state = {};
  }

  // Provides the name of the record matching system or record set
  // under test, depending on the context.
  itemBeingTested(context) {
    return itemBeingTestedUtil(context, this.props.matchRuns, this.props.recordSets,
                               this.props.recordMatchingSystems);
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
      <CollapsiblePanel panelTitle="Context"
                        panelIcon="key"
                        buttonText="New Context"
                        modalTarget="#newContextModal"
                        creator={this.props.contextCreator}>
        <div>
          <div className="list-group">
            {_.values(this.props.contexts).map((c) => {
              let className = "list-group-item";

              if (c.selected) {
                className += " active";
              }

              return (
                <div className={className} key={c.id}>
                  <div className="row context-list">
                    <div className="col-md-4 context-name">
                      <input type="checkbox"
                             id={c.id}
                             className="css-checkbox"
                             onClick={() => this.props.selector(c.id)} />
                      <label htmlFor={c.id} className="css-label css-label-box checkbox-label">{c.name}</label>
                    </div>

                    <div className="col-md-2 context-type">
                      {contextTypeIcon(c.type)} {c.type}
                    </div>

                    <div className="col-md-3 context-static-item">
                      {itemIcon(c.type)} {this.itemBeingTested(c)}
                    </div>

                    <div className="col-md-2 context-last-updated">
                      <i className="fa fa-clock-o" aria-hidden="true"></i> {this.lastUpdatedOn(c)}
                    </div>

                    <div className="col-md-1 context-edit">
                      <i className="fa fa-edit" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <NewContextModal contextCreator={this.props.creator}/>
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
