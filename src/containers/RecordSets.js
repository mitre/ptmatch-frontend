import React, { Component } from 'react';
import ListRecordSets from '../components/ListRecordSets';
import NewRecordSet from '../components/NewRecordSet';

class RecordMatchingSystems extends Component {
  
  render() {
    return (        
    <div className="container">
      <ListRecordSets/>
      <NewRecordSet/>
    </div>
    );
  }
}

RecordMatchingSystems.displayName = 'RecordMatchingSystems';

export default RecordMatchingSystems;