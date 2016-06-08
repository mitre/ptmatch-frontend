import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import MatchingSystemThumbnail from '../components/MatchingSystemThumbnail';
import RunList from '../components/RunList';
import NewJobModal from '../components/NewJobModal';
import _ from 'lodash';

import { selectRMS } from '../actions/recordMatchingSystems';
import { fetchMatchRun } from '../actions/matchRun';


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
      if (this.isMatchingSystemSelected() && this.props.metrics.length > 0) {
        return (<RunList runs={this.props.metrics} recordMatchingSystem={this.props.selectedRMS} matchRuns={this.props.matchRuns}/>);
      } else {
        if (this.props.metrics.length > 0) {
          return this.latestMetrics().map(function(m) {
            let rms = this.props.recordMatchingSystems.find((r) => r.id === m.recordMatchSystemInterfaceId);
            return (<MatchingSystemThumbnail metrics={m.metrics} recordMatchingSystem={rms}
                                             jobId={m.id} key={m.id} createdOn={m.meta.createdOn}
                                             onClick={() => {
                                               this.props.fetchMatchRun(m.id);
                                               this.props.selectRMS(rms);}}/>);
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
  props.recordMatchingSystems = state.recordMatchingSystems;
  props.recordSets = state.recordSets;
  props.matchRuns = state.matchRuns;
  if (state.selectedRecordMatchingSystem.name !== undefined) {
    props.selectedRMS = state.selectedRecordMatchingSystem;
  } else {
    props.selectedRMS = {};
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
  matchRuns: PropTypes.object,
  selectedRecordSet: PropTypes.object,
  selectRMS: PropTypes.func,
  fetchMatchRun: PropTypes.func
};

SetupToMatchSystemList.displayName = 'SetupToMatchSystemList';

export default connect(mapStateToProps, {selectRMS, fetchMatchRun})(SetupToMatchSystemList);
