import React, { Component, PropTypes } from 'react';

import CollapsiblePanel from './CollapsiblePanel';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import _ from 'lodash';

class MatchingSystemList extends Component {
  render() {
    return (
      <CollapsiblePanel panelTitle="Matching Systems">
        <ul className="list-group">
                  {_.values(this.props.recordMatchingSystems).map((rms) => {
                    let className = "list-group-item";
                    if (rms.selected) {
                      className += " active";
                    }
                    return (<li className={className} key={rms.id}>{rms.name}</li>);
                  })}
        </ul>
      </CollapsiblePanel>
    );
  }
}

MatchingSystemList.displayName = "MatchingSystemList";

MatchingSystemList.propTypes = {
  recordMatchingSystems: PropTypes.objectOf(recordMatchingSystemProps).isRequired
};

export default MatchingSystemList;
