import React, { Component } from 'react';

import Header from '../components/Header/Header.js';

export default class App extends Component {
  render() {
    const { children } = this.props; //eslint-disable-line
    return (
        <div className="container">
        <Header />
        {children}
        </div>
    );
  }
}

App.displayName = 'App';
