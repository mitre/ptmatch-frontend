import React, { Component, PropTypes } from 'react';

class IndividualResult extends Component {
  recordMatches() {
    let matchResponses = this.props.job.responses.filter((resp) => {
      let resourceEntries = resp.message.entry.filter((e) => e.resource !== undefined);
      let matchEvent = resourceEntries.find((e) => e.resource.event !== undefined && e.resource.event.code === "record-match");
      return matchEvent !== undefined;
    });
    let allEntries = matchResponses.reduce((acc, currentValue) => acc.concat(...currentValue.message.entry), []);
    return allEntries.filter((e) => e.link !== undefined);
  }

  render() {
    return (
      <div key={this.props.job.id}>
        <div className="results-overview">
          <p>F: {this.props.job.metrics.f1}</p>
          <p>Precision: {this.props.job.metrics.precision}</p>
          <p>Recall: {this.props.job.metrics.recall}</p>
          <p>MAP: {this.props.job.metrics.MAP}</p>
        </div>

        <table className="table table-hover results-detail">
          <thead>
            <tr>
              <th>Record URL</th>
              <th>Record URL</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>
            {this.recordMatches().map((rm) => {
              return (
                <tr key={rm.fullUrl}>
                  <td>Record A: {rm.fullUrl}</td>
                  <td>Record B: {rm.link.find((l) => l.relation === "related").url}</td>
                  <td>Score: {rm.search.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
