import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Radar } from "react-chartjs";

import { fetchmatchRun } from '../actions/matchRun';
import { selectRMS } from '../actions/recordMatchingSystems';

class MatchingSystemThumbnail extends Component {
  render() {
    return (
      <div className="col-md-3 rms-thumbnail" key={this.props.recordMatchingSystem.id}
           onClick={() => {
             this.props.fetchmatchRun(this.props.jobId);
             this.props.selectRMS(this.props.recordMatchingSystem);
           }}>
        <Radar data={{
          labels : ["F", "Precision", "MAP", "Recall"],
          datasets: [{data: [this.props.metrics.f1, this.props.metrics.precision,
                           this.props.metrics.MAP, this.props.metrics.recall],
                      fillColor:"rgba(112,218,201,0.5)"}]}}/>
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
  fetchmatchRun: PropTypes.func,
  selectRMS: PropTypes.func
};

export default connect(null, { fetchmatchRun, selectRMS })(MatchingSystemThumbnail);
