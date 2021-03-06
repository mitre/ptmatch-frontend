import React, { Component, PropTypes } from 'react';
import MatchLink from './MatchLink';
import patientProps from '../prop-types/patient';
import { links } from '../prop-types/run';

export default class MatchLinks extends Component {
  displayLinksHeader() {
    return (
      <div className="row match-links-header">
        <div className="col-xs-5">Source</div>
        <div className="col-xs-5">Target</div>
        <div className="col-xs-2">Score</div>
      </div>
    );
  }

  displayLinks(links) {
    return (
      <div>
        {links.map((l) => {
          return (
            <MatchLink key={l.source}
                       source={l.source}
                       target={l.target}
                       score={l.score}
                       patients={this.props.patients}/>
          );
        })}
      </div>
    );
  }

  render() {
    if (this.props.links.find((l) => l.type === 'best')) {
      return (
        <div>
          <h2>Top 5</h2>
          {this.displayLinksHeader()}
          {this.displayLinks(this.props.links.filter((l) => l.type === 'best'))}

          <h2>Bottom 5</h2>
          {this.displayLinksHeader()}
          {this.displayLinks(this.props.links.filter((l) => l.type === 'worst'))}
        </div>
      );
    } else {
      return (
        <div>
          {this.displayLinksHeader()}
          {this.displayLinks(this.props.links)}
        </div>
      );
    }
  }
}

MatchLinks.displayName = 'MatchLinks';

MatchLinks.propTypes = {
  links: links,
  patients: PropTypes.objectOf(patientProps).isRequired
};
