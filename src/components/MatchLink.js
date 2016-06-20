import React, { Component, PropTypes } from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import { retrieve } from '../actions/index';

class MatchLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingSource: true,
      loadingTarget: true,
      sourceName: null,
      sourceDOB: null,
      sourceStreetAddress: null,
      sourceCityStateZipAddress: null,
      targetName: null,
      targetDOB: null,
      targetStreetAddress: null,
      targetCityStateZipAddress: null
    };
  }

  componentDidMount() {
    retrieve(this.props.source).then((response) => {
      this.setState({
        sourceName: extractName(response),
        sourceDOB: extractDOB(response),
        sourceStreetAddress: extractStreetAddress(response),
        sourceCityStateZipAddress: extractCityStateZipAddress(response),
        loadingSource: false
      });
    });

    retrieve(this.props.target).then((response) => {
      this.setState({
        targetName: extractName(response),
        targetDOB: extractDOB(response),
        targetStreetAddress: extractStreetAddress(response),
        targetCityStateZipAddress: extractCityStateZipAddress(response),
        loadingTarget: false
      });
    });
  }

  render() {
    return (
      <Accordion className="panel-link">
        <Panel header={
                <div className="row">
                  <div className="col-xs-5">{this.state.loadingSource ? this.loadingTag() : this.state.sourceName}</div>
                  <div className="col-xs-5">{this.state.loadingSource ? this.loadingTag() : this.state.targetName}</div>
                  <div className="col-xs-2">{this.state.loadingSource ? this.loadingTag() : this.props.score}</div>
                </div>
               }
               eventKey="1">
          <div className="row">
            <div className="col-xs-5">
              <div className="row">
                <label className="col-xs-3">URL:</label>
                <div className="col-xs-9">
                  <a href={this.props.source} target="_blank"><i className="fa fa-link" aria-hidden="true"></i></a>
                </div>
              </div>

              <div className="row">
                <label className="col-xs-3">DOB:</label>
                <div className="col-xs-9">{this.state.loadingSource ? this.loadingTag() : this.state.sourceDOB}</div>
              </div>

              <div className="row">
                <label className="col-xs-3">Address:</label>
                <div className="col-xs-9">{this.state.loadingSource ? this.loadingTag() : this.state.sourceStreetAddress}</div>
                <div className="col-xs-offset-3 col-xs-9">{this.state.loadingSource ? this.loadingTag() : this.state.sourceCityStateZipAddress}</div>
              </div>
            </div>

            <div className="col-xs-5">
              <div className="row">
                <label className="col-xs-3">URL:</label>
                <div className="col-xs-9">
                  <a href={this.props.target} target="_blank"><i className="fa fa-link" aria-hidden="true"></i></a>
                </div>
              </div>

              <div className="row">
                <label className="col-xs-3">DOB:</label>
                <div className="col-xs-9">{this.state.loadingSource ? this.loadingTag() : this.state.targetDOB}</div>
              </div>

              <div className="row">
                <label className="col-xs-3">Address:</label>
                <div className="col-xs-9">{this.state.loadingSource ? this.loadingTag() : this.state.targetStreetAddress}</div>
                <div className="col-xs-offset-3 col-xs-9">{this.state.loadingSource ? this.loadingTag() : this.state.targetCityStateZipAddress}</div>
              </div>
            </div>
          </div>
        </Panel>
      </Accordion>
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

function extractDOB(response) {
  return response.birthDate;
}

function extractStreetAddress(response) {
  return response.address[0].line[0];
}

function extractCityStateZipAddress(response) {
  let city = response.address[0].city;
  let state = response.address[0].state;
  let postalCode = response.address[0].postalCode;

  return `${city}, ${state} ${postalCode}`;
}
