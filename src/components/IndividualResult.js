import React, { Component, PropTypes } from 'react';

class IndividualResult extends Component {
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
            {this.props.job.links.map((l) => {
              return (
                <tr key={l.source}>
                  <td>Record A: {l.source}</td>
                  <td>Record B: {l.target}</td>
                  <td>Score: {l.score}</td>
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
  })
};

export default IndividualResult;
