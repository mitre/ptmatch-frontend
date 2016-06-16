import React, { Component, PropTypes } from 'react';

import recordMatchingSystemProps from '../prop-types/record_matching_system';
import _ from 'lodash';

class MatchingSystemList extends Component {
  render() {
    return (<div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Matching Systems</h3>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {_.values(this.props.recordMatchingSystems).map((rms) => {
                    let className = "list-group-item";
                    if (rms.selected) {
                      className += " active";
                    }
                    return (<li className={className} key={rms.id}>{rms.name}</li>);
                  })}
                </ul>
              </div>
            </div>);
  }
}

MatchingSystemList.displayName = "MatchingSystemList";

MatchingSystemList.propTypes = {
  recordMatchingSystems: PropTypes.objectOf(recordMatchingSystemProps).isRequired
};

export default MatchingSystemList;
