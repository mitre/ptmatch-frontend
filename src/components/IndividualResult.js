import React, { Component, PropTypes } from 'react';

class IndividualResult extends Component {
  recordMatches() {
    let matchResponses = this.props.job.responses.filter((resp) => {
      let resourceEntries = resp.message.entry.filter((e) => e.resource !== undefined);
      let matchEvent = resourceEntries.find((e) => e.resource.event !== undefined && e.resource.event.code === "record-match");
      return matchEvent !== undefined;
    });
    return matchResponses[0].message.entry.filter((e) => e.link !== undefined);
  }
  
  render() {
    return (
      <div key={this.props.job.id}>
        <p>Record Set Name: {this.props.recordSet.name}</p>
        <p>F: {this.props.job.metrics.F}</p>
        <p>F-Precision: {this.props.job.metrics.FPrecision}</p>
        <p>F-Recall: {this.props.job.metrics.FRecall}</p>
        <p>MAP: {this.props.job.metrics.MAP}</p>
        <p>{this.props.recordMatchingSystem.name}</p>
        {this.recordMatches().map((rm) => {
            return (<div>
               <p>Record A: {rm.fullUrl}</p>
               <p>Score: {rm.search.score}</p>
               <p>Record B: {rm.link.find((l) => l.relation === "related").url}</p>
            </div>);
        })}
      </div>
    );
  }
}

IndividualResult.displayName = 'IndividualResult';

IndividualResult.propTypes = {
  job: PropTypes.object,
  recordMatchingSystem: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  recordSet: PropTypes.object
};

export default IndividualResult;