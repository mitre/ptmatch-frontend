import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <Link className="logo navbar-brand" to="/">
              <span><img className="header-logo" alt="PCOR logo" src="assets/images/logo-3x.png" width="25px" /></span>
              <span>PCOR Patient Matching</span>
            </Link>
          </div>

          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  Name <span className="caret"></span>
                </a>

                <ul className="dropdown-menu">
                  <li><a href="#">Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Header.displayName = 'Header';

export default Header;