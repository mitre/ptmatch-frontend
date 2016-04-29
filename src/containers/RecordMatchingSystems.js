import React, { Component } from 'react';
import ListRecordMatchingSystems from '../components/ListRecordMatchingSystems';
import NewRecordMatchingSystem from '../components/NewRecordMatchingSystem';

class RecordMatchingSystems extends Component {
  
  render() {
    return (        
    <div className="container">
      <ListRecordMatchingSystems/>
      <NewRecordMatchingSystem/>
    </div>
    );
  }
}

RecordMatchingSystems.displayName = 'RecordMatchingSystems';

export default RecordMatchingSystems;