import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchContexts, selectContext, createContext } from '../actions/context';
import { fetchRecordSetsIfNeeded } from '../actions/recordSet';
import { fetchRMSIfNeeded } from '../actions/recordMatchingSystems';
import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';

import ChallengeContext from './ChallengeContext';
import BenchmarkContext from './BenchmarkContext';
import ContextList from '../components/ContextList';
import RecordSetList from '../components/RecordSetList';
import MatchingSystemList from '../components/MatchingSystemList';

class Dashboard extends Component {
  render() {
    return (<div className="row">
              <div className="col-md-4">
                <ContextList contexts={this.props.contexts}
                             selector={this.props.selectContext}
                             contextCreator={this.props.createContext}/>
                <RecordSetList recordSets={this.props.recordSets} />
                <MatchingSystemList recordMatchingSystems={this.props.recordMatchingSystems} />
              </div>

              <div className="col-md-8">
                {this.selectedChallengeContexts().map((sc) => {
                  return (<ChallengeContext context={sc} key={sc.id} />);
                })}
                {this.selectedBenchmarkContexts().map((sc) => {
                  return (<BenchmarkContext context={sc} key={sc.id} />);
                })}
              </div>
            </div>);
  }

  selectedChallengeContexts() {
    return _.values(this.props.contexts).filter((c) => c.selected === true && c.type === 'challenge');
  }

  selectedBenchmarkContexts() {
    return _.values(this.props.contexts).filter((c) => c.selected === true && c.type === 'benchmark');
  }

  componentWillMount() {
    this.props.fetchContexts();
    this.props.fetchRecordSetsIfNeeded();
    this.props.fetchRMSIfNeeded();
  }
}

Dashboard.displayName = 'Dashboard';

Dashboard.propTypes = {
  fetchContexts: PropTypes.func,
  fetchRecordSetsIfNeeded: PropTypes.func,
  fetchRMSIfNeeded: PropTypes.func,
  selectContext: PropTypes.func,
  createContext: PropTypes.func,
  contexts: PropTypes.objectOf(contextProps),
  recordSets: PropTypes.objectOf(recordSetProps),
  recordMatchingSystems: PropTypes.objectOf(recordMatchingSystemProps)
};

function mapStateToProps(state) {
  return {contexts: state.contexts,
          recordSets: state.recordSets,
          recordMatchingSystems: state.recordMatchingSystems};
}

export default connect(mapStateToProps, { fetchContexts,
        fetchRecordSetsIfNeeded, fetchRMSIfNeeded, selectContext,
        createContext })(Dashboard);
