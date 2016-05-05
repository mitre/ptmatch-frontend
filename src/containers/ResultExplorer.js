import React, { Component } from 'react';
import RecordSetSelector from '../components/RecordSetSelector';
import RecordMatchingSystemSelector from '../components/RecordMatchingSystemSelector';
import SetupToMatchSystemList from './SetupToMatchSystemList';

class ResultExplorer extends Component {

  render() {
    return (
    <div className="container">
      <RecordSetSelector/>
      <RecordMatchingSystemSelector/>
      <SetupToMatchSystemList/>
    </div>
    );
  }
}

ResultExplorer.displayName = 'ResultExplorer';

export default ResultExplorer;
