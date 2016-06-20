import React, { Component, PropTypes } from 'react';
import MatchLink from './MatchLink';

class MatchLinks extends Component {
  render() {
    return (
      <table className="table table-hover results-detail">
        <thead>
          <tr>
            <th>Source Name</th>
            <th>Source DOB</th>
            <th>Source Address</th>

            <th>Target Name</th>
            <th>Target DOB</th>
            <th>Target Address</th>

            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {this.props.links.map((l) => {
            return (
              <MatchLink key={l.source} source={l.source} target={l.target} score={l.score} />
            );
          })}
        </tbody>
      </table>
    );
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
