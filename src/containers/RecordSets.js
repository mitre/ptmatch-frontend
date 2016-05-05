import React, { Component } from 'react';
import RecordSetSelector from '../components/RecordSetSelector';

class RecordMatchingSystems extends Component {

  render() {
    return (
    <div className="container">
      <RecordSetSelector/>
    </div>
    );
  }
}

RecordMatchingSystems.displayName = 'RecordMatchingSystems';

export default RecordMatchingSystems;
