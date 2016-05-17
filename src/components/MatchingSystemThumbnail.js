import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectJobAndRMS } from '../actions/matchJob';

class MatchingSystemThumbnail extends Component {
  render() {
    return (
      <div className="col-md-3 rms-thumbnail" key={this.props.recordMatchingSystem.id} onClick={() => this.props.selectJobAndRMS(this.props.jobId, this.props.recordMatchingSystem)}>
        <p>F: {this.props.metrics.f1}</p>
        <p>Precision: {this.props.metrics.precision}</p>
        <p>Recall: {this.props.metrics.recall}</p>
        <p>MAP: {this.props.metrics.MAP}</p>
        <p className="rms-name">{this.props.recordMatchingSystem.name}</p>
      </div>
    );
  }
}

MatchingSystemThumbnail.displayName = 'MatchingSystemThumbnail';

MatchingSystemThumbnail.propTypes = {
  metrics: PropTypes.shape({
    f1: PropTypes.number,
    precision: PropTypes.number,
    recall: PropTypes.number,
    MAP: PropTypes.number
  }),
  recordMatchingSystem: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  jobId: PropTypes.string,
  selectJobAndRMS: PropTypes.func
};

export default connect(null, {selectJobAndRMS})(MatchingSystemThumbnail);
