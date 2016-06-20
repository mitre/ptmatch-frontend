import React, { Component, PropTypes } from 'react';
import MatchLink from './MatchLink';

class MatchLinks extends Component {
  render() {
    return (
      <div>
        <div className="row links-header">
          <div className="col-xs-5">Source</div>
          <div className="col-xs-5">Target</div>
          <div className="col-xs-2">Score</div>
        </div>

        <div>
          {this.props.links.map((l) => {
            return (
              <MatchLink key={l.source} source={l.source} target={l.target} score={l.score} />
            );
          })}
        </div>
      </div>
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
