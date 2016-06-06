import React, { Component, PropTypes } from 'react';
import PerformanceRadar from "./PerformanceRadar";
import moment from 'moment';

class MatchingSystemThumbnail extends Component {
  render() {
    return (
      <div onClick={this.props.onClick} className="col-md-3 rms-thumbnail" key={this.props.recordMatchingSystem.id}>
        <PerformanceRadar datasets={[{data: [this.props.metrics.f1, this.props.metrics.precision,
                         this.props.metrics.MAP, this.props.metrics.recall],
                         backgroundColor: "rgba(112,218,201,0.5)"}]}/>
        <p className="rms-name">{this.props.recordMatchingSystem.name}</p>
        <p className="last-run-age"><i className="fa fa-clock-o" aria-hidden="true"></i> {moment(this.props.createdOn).fromNow().toUpperCase()}</p>
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
  onClick: PropTypes.func,
  createdOn: PropTypes.string.isRequired
};

export default MatchingSystemThumbnail;
