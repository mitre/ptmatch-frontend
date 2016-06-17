import React, { Component, PropTypes } from 'react';

import CollapsiblePanel from './CollapsiblePanel';
import recordSetProps from '../prop-types/record_set';
import _ from 'lodash';

class RecordSetList extends Component {
  render() {
    return (
      <CollapsiblePanel panelTitle="Record Sets">
                <ul className="list-group">
                  {_.values(this.props.recordSets).map((rs) => {
                    let className = "list-group-item";
                    if (rs.selected) {
                      className += " active";
                    }
                    return (<li className={className} key={rs.id}>{rs.name}</li>);
                  })}
                </ul>
      </CollapsiblePanel>
    );
  }
}

RecordSetList.displayName = "RecordSetList";

RecordSetList.propTypes = {
  recordSets: PropTypes.objectOf(recordSetProps).isRequired
};

export default RecordSetList;
