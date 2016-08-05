import React, { Component, PropTypes } from 'react';
import { Accordion, Panel } from 'react-bootstrap';

import { runProps } from '../prop-types/run';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import patientProps from '../prop-types/patient';

import { idFromLink } from '../middlewares/fetch_links';

export default class MatchLink extends Component {
  sourcePatient() {
    const sourceId = idFromLink(this.props.source);
    return this.props.patients[sourceId];
  }

  targetPatient() {
    const targetId = idFromLink(this.props.target);
    return this.props.patients[targetId];
  }

  render() {
    return (
      <Accordion className="match-link-header">
        <Panel eventKey="1" className="match-link-header-panel" header={
          <div className="row">
            <div className="col-xs-5 match-link-header-panel-text">{extractName(this.sourcePatient())}</div>
            <div className="col-xs-5 match-link-header-panel-text">{extractName(this.targetPatient())}</div>
            <div className="col-xs-1 match-link-header-panel-text">{this.props.score}</div>
          </div>}>

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
                <div className="col-xs-9">{extractDOB(this.sourcePatient())}</div>
              </div>

              <div className="row">
                <label className="col-xs-3">Address:</label>
                <div className="col-xs-9">{extractStreetAddress(this.sourcePatient())}</div>
                <div className="col-xs-offset-3 col-xs-9">{extractCityStateZipAddress(this.sourcePatient())}</div>
              </div>
            </div>

            <div className="col-xs-7">
              <div className="row">
                <label className="col-xs-3">URL:</label>
                <div className="col-xs-9">
                  <a href={this.props.target} target="_blank"><i className="fa fa-link" aria-hidden="true"></i></a>
                </div>
              </div>

              <div className="row">
                <label className="col-xs-3">DOB:</label>
                <div className="col-xs-9">{extractDOB(this.targetPatient())}</div>
              </div>

              <div className="row">
                <label className="col-xs-3">Address:</label>
                <div className="col-xs-9">{extractStreetAddress(this.targetPatient())}</div>
                <div className="col-xs-offset-3 col-xs-9">{extractCityStateZipAddress(this.targetPatient())}</div>
              </div>
            </div>
          </div>
        </Panel>
      </Accordion>
    );
  }
}

MatchLink.displayName = 'MatchLink';

MatchLink.propTypes = {
  source: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  patients: PropTypes.objectOf(patientProps).isRequired
};

function loadingTag() {
  return (
    <div className="loader">
      <i className="fa fa-spinner fa-spin fa-fw"></i>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function extractName(patient) {
  if (patient) {
    let familyName = patient.name[0].family[0];
    let givenName = patient.name[0].given[0];

    return `${familyName}, ${givenName}`;
  } else {
    return loadingTag();
  }

}

function extractStreetAddress(patient) {
  if (patient) {
    return patient.address[0].line[0];
  } else {
    return loadingTag();
  }
}

function extractDOB(patient) {
  if (patient) {
    return patient.birthDate;
  } else {
    return loadingTag();
  }
}

function extractCityStateZipAddress(patient) {
  if (patient) {
    let city = patient.address[0].city;
    let state = patient.address[0].state;
    let postalCode = patient.address[0].postalCode;

    return `${city}, ${state} ${postalCode}`;
  } else {
    return loadingTag();
  }
}
