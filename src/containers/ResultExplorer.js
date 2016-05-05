import React, { Component } from 'react';
import RecordSetSelector from '../components/RecordSetSelector';
import RecordMatchingSystemSelector from '../components/RecordMatchingSystemSelector';

class ResultExplorer extends Component {

  render() {
    return (
    <div className="container">
      <RecordSetSelector/>
      <RecordMatchingSystemSelector/>
    </div>
    );
  }
}

ResultExplorer.displayName = 'ResultExplorer';

export default ResultExplorer;
