import React, { Component, PropTypes } from 'react';

import CollapsiblePanel from './CollapsiblePanel';
import recordSetProps from '../prop-types/record_set';
import _ from 'lodash';
import moment from 'moment';

class RecordSetList extends Component {
  render() {
    return (
      <CollapsiblePanel panelTitle="Record Sets" panelIcon="database">
        <div className="list-group">
          {_.values(this.props.recordSets).map((rs) => {
            let className = "list-group-item";
            if (rs.selected) {
              className += " active";
            }
            return (<div className={className} key={rs.id}>
                      <div className="row">
                        <p className="col-md-3">{rs.name}</p>
                        <p className="col-md-3">
                          <i className="fa fa-clock-o" aria-hidden="true"></i>
                          {moment(rs.meta.createdOn).fromNow().toUpperCase()}
                        </p>
                      </div>
                    </div>);
          })}
        </div>
      </CollapsiblePanel>
    );
  }
}

RecordSetList.displayName = "RecordSetList";

RecordSetList.propTypes = {
  recordSets: PropTypes.objectOf(recordSetProps).isRequired
};

export default RecordSetList;
