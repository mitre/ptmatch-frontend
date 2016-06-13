import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//import MatchingSystemThumbnail from '../components/MatchingSystemThumbnail';

import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';

class ChallengeContext extends Component {
  render() {
    return (
      <div className="panel panel-default setup-to-match-system-list">
        <div className="panel-heading row">
          <h3 className="panel-title col-xs-3">
            {this.props.context.name}
          </h3>

          <div className="format-piece col-xs-3">

          </div>
        </div>
      </div>
    );
  }
}

ChallengeContext.displayName = 'ChallengeContext';

ChallengeContext.propTypes = {
  context: contextProps.isRequired,
  recordSets: PropTypes.objectOf(recordSetProps).isRequired,
  recordMatchingSystems: PropTypes.objectOf(recordMatchingSystemProps).isRequired
};

export default connect()(ChallengeContext);
