import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchRecordSetsIfNeeded } from '../actions/recordSet';

class ListRecordSets extends Component {
  componentDidMount() {
    this.props.fetchRecordSetsIfNeeded();
  }
  
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">List of record sets </h3>
        </div>
        <div className="panel-body">  
          <ul>
            {this.props.recordSets.map(recordSet => <li>{recordSet.name}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

ListRecordSets.displayName = 'ListRecordSets';

ListRecordSets.propTypes = {
  recordSets: PropTypes.array.isRequired,
  fetchRecordSetsIfNeeded: PropTypes.func
};

const mapStateToProps = (state) => {
  var props = {};
  if (state.recordSets) {
    props.recordSets = state.recordSets;
  } else {
    props.recordSets = [];
  }
  return props;
};

export default connect(mapStateToProps, { fetchRecordSetsIfNeeded })(ListRecordSets);