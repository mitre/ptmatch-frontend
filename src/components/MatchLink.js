import React, { Component, PropTypes } from 'react';
import { retrieve } from '../actions/index';

class MatchLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingSource: true,
      loadingTarget: true,
      sourceName: null,
      targetName: null
    };
  }

  componentDidMount() {
    retrieve(this.props.source).then((response) => {
      this.setState({
        sourceName: extractName(response),
        loadingSource: false
      });
    });

    retrieve(this.props.target).then((response) => {
      this.setState({
        targetName: extractName(response),
        loadingTarget: false
      });
    });
  }

  render() {
    return (
      <tr>
        <td>{this.state.loadingSource ? this.loadingTag() : this.nameTag(this.state.sourceName, this.props.source)}</td>
        <td>{this.state.loadingTarget ? this.loadingTag() : this.nameTag(this.state.targetName, this.props.target)}</td>
        <td>{this.props.score}</td>
      </tr>
    );
  }

  loadingTag() {
    return (
      <div className="loader">
        <i className="fa fa-spinner fa-spin fa-fw"></i>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  nameTag(name, link) {
    return (
      <a href={link} target="_blank">{name}</a>
    );
  }
}

MatchLink.displayName = 'MatchLink';

MatchLink.propTypes = {
  source: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired
};

export default MatchLink;

function extractName(response) {
  let familyName = response.name[0].family[0];
  let givenName = response.name[0].given[0];

  return `${familyName}, ${givenName}`;
}
