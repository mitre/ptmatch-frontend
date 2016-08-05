import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import _ from 'lodash';

import CollapsiblePanel from './CollapsiblePanel';

import recordMatchingSystemProps from '../prop-types/record_matching_system';
import { runProps } from '../prop-types/run';

class MatchingSystemList extends Component {
  lastUpdatedOn(rms) {
    const runs = _.filter(_.values(this.props.matchRuns), {'recordMatchSystemInterfaceId': rms.id});

    if (_.isEmpty(runs)) {
      return "-";
    }
    const lastRun = _.last(_.sortBy(runs, (r) => new Date(r.meta.createdOn)));
    return moment(lastRun.meta.createdOn).fromNow().toUpperCase();
  }

  render() {
    return (
      <CollapsiblePanel panelTitle="Matching Systems"
                        panelIcon="sitemap"
                        buttonText="New Record Matching System"
                        modalTarget="#newRecordMatchingSystemModal">
        <div className="list-group">
          {_.values(this.props.recordMatchingSystems).map((rms) => {
            let className = "list-group-item";

            if (rms.selected) {
              className += " active";
            }

            return (
              <div className={className} key={rms.id}>
                <div className="row rms-list">
                  <div className="col-md-5 rms-name">
                    <input type="checkbox"
                           id={rms.id}
                           className="css-checkbox"
                           onClick={() => this.props.selectRMS(rms.id)} />
                    <label htmlFor={rms.id} className="css-label css-label-box checkbox-label">{rms.name}</label>
                  </div>

                  <div className="col-md-6 rms-last-updated">
                    <FontAwesome name="clock-o" /> {this.lastUpdatedOn(rms)}
                  </div>

                  <div className="col-md-1 rms-edit-link">
                    <a href="#"><FontAwesome name="link" className="icon-link" /></a>
                    <a href="#"><FontAwesome name="edit" className="icon-link" /></a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CollapsiblePanel>
    );
  }
}

MatchingSystemList.displayName = "MatchingSystemList";

MatchingSystemList.propTypes = {
  recordMatchingSystems: PropTypes.objectOf(recordMatchingSystemProps).isRequired,
  matchRuns: PropTypes.objectOf(runProps),
  selectRMS: PropTypes.func.isRequired
};

export default MatchingSystemList;
