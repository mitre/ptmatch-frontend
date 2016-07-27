import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav.js';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <Nav />
      </header>
    );
  }
}

Header.displayName = 'Header';
