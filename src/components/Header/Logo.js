import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Logo extends Component {
  render() {
    return (
      <Link className="logo navbar-brand" to="/">
        <span><img className="header-logo" alt="PCOR logo" src="assets/images/logo-3x.png" width="25px" /></span>
        <span>PCOR Patient Matching</span>
      </Link>
    )
  }
}

Logo.displayName = 'Logo';
