import React, { Component, PropTypes } from 'react';
import MatchLink from './MatchLink';
import patientProps from '../prop-types/patient';

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
              <MatchLink key={l.source}
                         source={l.source}
                         target={l.target}
                         score={l.score}
                         patients={this.props.patients}/>
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
  })).isRequired,
  patients: PropTypes.objectOf(patientProps).isRequired
};

export default MatchLinks;
