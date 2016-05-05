import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchRMSIfNeeded, selectRMS } from '../actions/recordMatchingSystems';

class RecordMatchingSystemSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {chevronClass: "rotate fa fa-chevron-right pull-right"};
  }

  componentDidMount() {
    this.props.fetchRMSIfNeeded();
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
      <div className="panel-group" role="tablist" id="record-matching-system-selector">
        <div className="panel panel-default">
          <div className="panel-heading"
               data-toggle="collapse"
               href="#matchingSystemList"
               role="tab"
               id="matchingSystemHeading"
               onClick={() => this.toggleChevron()}>
            <div className="col-xs-3 panel-heading-label">
              <i className="fa fa-sitemap" aria-hidden="true"></i>
              <span>MATCHING SYSTEMS</span>
            </div>

            <div className="col-xs-9 panel-heading-selection">
              {this.props.selectedRMS}
              <i className={this.state.chevronClass} aria-hidden="true"></i>
            </div>
          </div>

          <div id="matchingSystemList" className="panel-collapse collapse" role="tabpanel">
            <ul className="list-group">
              {this.props.recordMatchingSystems.map(matchingSystem => {
                return (
                <li className="list-group-item"
                    key={matchingSystem.id}
                    onClick={() => this.props.selectRMS(matchingSystem)}>{matchingSystem.name}</li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

RecordMatchingSystemSelector.displayName = 'RecordMatchingSystemSelector';

RecordMatchingSystemSelector.propTypes = {
  recordMatchingSystems: PropTypes.array.isRequired,
  selectedRMS: PropTypes.string,
  fetchRMSIfNeeded: PropTypes.func,
  selectRMS: PropTypes.func
};

const mapStateToProps = (state) => {
  var props = {};
  if (state.recordMatchingSystems) {
    props.recordMatchingSystems = state.recordMatchingSystems;
  } else {
    props.recordMatchingSystems = [];
  }
  if (state.selectedRecordMatchingSystem.name !== undefined) {
    props.selectedRMS = state.selectedRecordMatchingSystem.name;
  } else {
    props.selectedRMS = "All";
  }
  return props;
};

export default connect(mapStateToProps, { fetchRMSIfNeeded, selectRMS })(RecordMatchingSystemSelector);
