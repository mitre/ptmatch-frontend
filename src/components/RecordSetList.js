import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import _ from 'lodash';

import CollapsiblePanel from './CollapsiblePanel';

import recordSetProps from '../prop-types/record_set';

export default class RecordSetList extends Component {
  render() {
    return (
      <CollapsiblePanel panelTitle="Record Sets"
                        panelIcon="database"
                        buttonText="New Record Set"
                        modalTarget="#newRecordSetModal">
        <div className="list-group">
          {_.values(this.props.recordSets).map((rs) => {
            let className = "list-group-item";

            if (rs.selected) {
              className += " active";
            }

            return (
              <div className={className} key={rs.id}>
                <div className="row rs-list">
                  <div className="col-md-5 rs-name">
                    <input type="checkbox"
                           id={rs.id}
                           className="css-checkbox"
                           onClick={() => this.props.selectRecordSet(rs.id)} />
                         <label htmlFor={rs.id} className="css-label css-label-box checkbox-label">{rs.name}</label>
                  </div>

                  <div className="col-md-6 rs-last-updated">
                    <FontAwesome name="clock-o" /> {moment(rs.meta.createdOn).fromNow().toUpperCase()}
                  </div>

                  <div className="col-md-1 rs-edit-link">
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

RecordSetList.displayName = "RecordSetList";

RecordSetList.propTypes = {
  recordSets: PropTypes.objectOf(recordSetProps).isRequired,
  selectRecordSet: PropTypes.func.isRequired
};
