import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchRecordSetsIfNeeded, selectRecordSet } from '../actions/recordSet';

class RecordSetSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {chevronClass: "rotate fa fa-chevron-right pull-right"};
  }

  componentDidMount() {
    this.props.fetchRecordSetsIfNeeded();
  }

  toggleChevron() {
    let chevronClass = this.state.chevronClass;
    if (chevronClass === "rotate fa fa-chevron-right pull-right") {
      this.setState({chevronClass: "rotate fa fa-chevron-right pull-right right"});
    } else {
      this.setState({chevronClass: "rotate fa fa-chevron-right pull-right"});
    }
  }

  render() {
    return (
      <div className="panel-group" role="tablist" id="record-set-selector">
        <div className="panel panel-default">
          <div className="panel-heading"
               data-toggle="collapse"
               href="#recordSetList"
               role="tab"
               id="recordSetHeading"
               onClick={() => this.toggleChevron()}>

            <div className="col-xs-3 panel-heading-label">
              <i className="fa fa-cogs" aria-hidden="true"></i>
              <span>FORMATS</span>
            </div>

            <div className="col-xs-9 panel-heading-selection">
              {this.props.selectedRecordSetName}
              <i className={this.state.chevronClass} aria-hidden="true"></i>
            </div>
          </div>

          <div id="recordSetList" className="panel-collapse collapse" role="tabpanel">
            <ul className="list-group">
              {this.props.recordSets.map(recordSet => {
                return (
                <li className="list-group-item"
                    key={recordSet.id}
                    onClick={() => this.props.selectRecordSet(recordSet)}>{recordSet.name}</li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

RecordSetSelector.displayName = 'RecordSetSelector';

RecordSetSelector.propTypes = {
  recordSets: PropTypes.array.isRequired,
  selectedRecordSetName: PropTypes.string,
  fetchRecordSetsIfNeeded: PropTypes.func,
  selectRecordSet: PropTypes.func
};

const mapStateToProps = (state) => {
  var props = {};
  if (state.recordSets) {
    props.recordSets = state.recordSets;
  } else {
    props.recordSets = [];
  }
  if (state.selectedRecordSet.name !== undefined) {
    props.selectedRecordSetName = state.selectedRecordSet.name;
  } else {
    props.selectedRecordSetName = "All";
  }
  return props;
};

// function toggleChevron() {
//   $("#record-set-selector .rotate").toggleClass("right");
// }

export default connect(mapStateToProps, { fetchRecordSetsIfNeeded, selectRecordSet })(RecordSetSelector);
