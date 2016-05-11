import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectJobAndRMS } from '../actions/matchJob';

class MatchingSystemThumbnail extends Component {  
  render() {
    return (
      <div className="col-md-4" key={this.props.recordMatchingSystem.id} onClick={() => this.props.selectJobAndRMS(this.props.jobId, this.props.recordMatchingSystem)}>
        <p>F: {this.props.metrics.F}</p>
        <p>F-Precision: {this.props.metrics.FPrecision}</p>
        <p>F-Recall: {this.props.metrics.FRecall}</p>
        <p>MAP: {this.props.metrics.MAP}</p>
        <p>{this.props.recordMatchingSystem.name}</p>
      </div>
    );
  }
}

MatchingSystemThumbnail.displayName = 'MatchingSystemThumbnail';

MatchingSystemThumbnail.propTypes = {
  metrics: PropTypes.shape({
    F: PropTypes.number,
    FPrecision: PropTypes.number,
    FRecall: PropTypes.number,
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