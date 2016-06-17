import React, { Component, PropTypes } from 'react';

class MatchLinks extends Component {
  render() {
    return <table className="table table-hover results-detail">
      <thead>
        <tr>
          <th>Record URL</th>
          <th>Record URL</th>
          <th>Score</th>
        </tr>
      </thead>

      <tbody>
        {this.props.links.map((l) => {
          return (
            <tr key={l.source}>
              <td>Record A: {l.source}</td>
              <td>Record B: {l.target}</td>
              <td>Score: {l.score}</td>
            </tr>
          );
        })}
      </tbody>
    </table>;
  }
}

MatchLinks.displayName = 'MatchLinks';

MatchLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    score: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired
  }))
};

export default MatchLinks;
