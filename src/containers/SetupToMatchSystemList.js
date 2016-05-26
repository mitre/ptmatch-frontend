import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import MatchingSystemThumbnail from '../components/MatchingSystemThumbnail';
import IndividualResult from '../components/IndividualResult';
import NewJobModal from '../components/NewJobModal';
import _ from 'lodash';

import { selectRMS } from '../actions/recordMatchingSystems';

export class SetupToMatchSystemList extends Component {
  isMatchingSystemSelected() {
    return this.props.selectedRMS.name !== undefined;
  }

  isFormatSelected() {
    return this.props.selectedRecordSet.name !== undefined;
  }

  formatParams() {
    return this.props.selectedRecordSet.parameters.parameter.map((param) => {
      return <div key={param.name}>{param.name} : {param.valueString.substr(0,20)}</div>;
    });
  }

  displayFormatHeader() {
    if (this.isFormatSelected()) {
      return (
        <div className="panel-heading row">
          <h3 className="panel-title col-xs-3">
            {this.props.selectedRecordSet.name}
          </h3>

          <div className="format-piece col-xs-3">
            {this.formatParams()}
          </div>

          <button className="btn btn-primary pull-right" data-toggle="modal" data-target="#newJobModal">New Run</button>
          <NewJobModal recordSet={this.props.selectedRecordSet} recordMatchingSystems={this.props.recordMatchingSystems}
                       selectedRecordMatchingSystem={this.props.selectedRMS} selectRMSFunc={this.props.selectRMS}/>
        </div>
      );
    }
  }

  displayRMSHeader() {
    if (this.isMatchingSystemSelected()) {
      return (
        <div className="panel-heading">
          <h3 className="panel-title">
            {this.props.selectedRMS.name}
          </h3>
        </div>
      );
    }
  }

  latestMetrics() {
    const byRMS = _.groupBy(this.props.metrics, (m) => m.recordMatchSystemInterfaceId);
    const latestByRMS = _.mapValues(byRMS, (metricsList) => {
      const sortedML = _.sortBy(metricsList, (item) => new Date(item.meta.createdOn));
      return _.last(sortedML);
    });
    return _.values(latestByRMS);
  }

  displayBody() {
    if (this.isFormatSelected()) {
      if (this.isMatchingSystemSelected()) {
        if (this.props.selectedJob.masterRecordSetId !== undefined) {
          return (<IndividualResult recordSet={this.props.selectedRecordSet}
                                    recordMatchingSystem={this.props.selectedRMS}
                                    job={this.props.selectedJob}/>);
        } else {
          return (<p>Loading Job...</p>);
        }
      } else {
        if (this.props.metrics.length > 0) {
          return this.latestMetrics().map(function(m) {
            let rms = this.props.recordMatchingSystems.find((r) => r.id === m.recordMatchSystemInterfaceId);
            return (<MatchingSystemThumbnail metrics={m.metrics} recordMatchingSystem={rms} jobId={m.id} key={m.id} />);
            }, this);
        } else {
          return (<p>Loading matching metrics...</p>);
        }
      }
    } else {
      return (<p>Please select a format.</p>);
    }
  }

  render() {
    return (
      <div className="panel panel-default setup-to-match-system-list">
        {this.displayFormatHeader()}
        {this.displayRMSHeader()}

        <div className="panel-body">
          {this.displayBody()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let props = {};
  if (state.recordMatchingSystems) {
    props.recordMatchingSystems = state.recordMatchingSystems;
  } else {
    props.recordMatchingSystems = [];
  }
  if (state.selectedRecordMatchingSystem.name !== undefined) {
    props.selectedRMS = state.selectedRecordMatchingSystem;
  } else {
    props.selectedRMS = {};
  }
  if (state.recordSets) {
    props.recordSets = state.recordSets;
  } else {
    props.recordSets = [];
  }
  if (state.selectedJob) {
    props.selectedJob = state.selectedJob;
  } else {
    props.selectedJob = {};
  }
  if (state.selectedRecordSet.name !== undefined) {
    props.selectedRecordSet = state.selectedRecordSet;
    let m = state.metrics[props.selectedRecordSet.id];
    if (m !== undefined) {
      props.metrics = m;
    } else {
      props.metrics = [];
    }
  } else {
    props.metrics = [];
    props.selectedRecordSet = {};
  }
  return props;
};

SetupToMatchSystemList.propTypes = {
  recordMatchingSystems: PropTypes.array.isRequired,
  selectedRMS: PropTypes.object,
  recordSets: PropTypes.array.isRequired,
  metrics: PropTypes.array,
  selectedRecordSet: PropTypes.object,
  selectedJob: PropTypes.object,
  selectRMS: PropTypes.func
};

SetupToMatchSystemList.displayName = 'SetupToMatchSystemList';

export default connect(mapStateToProps, {selectRMS})(SetupToMatchSystemList);
