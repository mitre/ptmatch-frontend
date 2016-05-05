import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchRMSIfNeeded, selectRMS } from '../actions/recordMatchingSystems';

class RecordMatchingSystemSelector extends Component {
  componentDidMount() {
    this.props.fetchRMSIfNeeded();
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
               onClick={toggleChevron}>
            <div className="col-xs-3 panel-heading-label">
              <i className="fa fa-sitemap" aria-hidden="true"></i>
              <span>MATCHING SYSTEMS</span>
            </div>

            <div className="col-xs-9 panel-heading-selection">
              {this.props.selectedRMS}
              <i className="rotate fa fa-chevron-right pull-right" aria-hidden="true"></i>
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

function toggleChevron() {
  $(".record-matching-system-selector.rotate").toggleClass("right");
}

export default connect(mapStateToProps, { fetchRMSIfNeeded, selectRMS })(RecordMatchingSystemSelector);
