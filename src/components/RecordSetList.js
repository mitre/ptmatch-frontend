import React, { Component, PropTypes } from 'react';

import recordSetProps from '../prop-types/record_set';
import _ from 'lodash';

class RecordSetList extends Component {
  render() {
    return (<div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Record Sets</h3>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {_.values(this.props.recordSets).map((rs) => {
                    let className = "list-group-item";
                    if (rs.selected) {
                      className += " active";
                    }
                    return (<li className={className} key={rs.id}>{rs.name}</li>);
                  })}
                </ul>
              </div>
            </div>);
  }
}

RecordSetList.displayName = "RecordSetList";

RecordSetList.propTypes = {
  recordSets: PropTypes.objectOf(recordSetProps).isRequired
};

export default RecordSetList;
