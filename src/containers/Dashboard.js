import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { selectContext, createContext } from '../actions/context';
import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import { runProps } from '../prop-types/run';

import ChallengeContext from './ChallengeContext';
import BenchmarkContext from './BenchmarkContext';
import ContextList from '../components/ContextList';
import PageHeader from '../components/Header/PageHeader';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <PageHeader title="Dashboard" />

        <ContextList {...this.props}
                     selector={this.props.selectContext}
                     contextCreator={this.props.createContext}/>

        {this.selectedChallengeContexts().map((context) => {
            return (<ChallengeContext context={context} key={context.id} />);
        })}

        {this.selectedBenchmarkContexts().map((context) => {
          return (<BenchmarkContext context={context} key={context.id} />);
        })}
      </div>
    );
  }

  selectedChallengeContexts() {
    return _.values(this.props.contexts).filter((c) => c.selected === true && c.type === 'challenge');
  }

  selectedBenchmarkContexts() {
    return _.values(this.props.contexts).filter((c) => c.selected === true && c.type === 'benchmark');
  }
}

Dashboard.displayName = 'Dashboard';

Dashboard.propTypes = {
  selectContext: PropTypes.func,
  createContext: PropTypes.func,
  contexts: PropTypes.objectOf(contextProps).isRequired,
  recordSets: PropTypes.objectOf(recordSetProps).isRequired,
  recordMatchingSystems: PropTypes.objectOf(recordMatchingSystemProps).isRequired,
  matchRuns: PropTypes.objectOf(runProps).isRequired
};

function mapStateToProps(state) {
  return {
    contexts: state.contexts,
    recordSets: state.recordSets,
    recordMatchingSystems: state.recordMatchingSystems,
    matchRuns: state.matchRuns
  };
}

export default connect(mapStateToProps, { selectContext, createContext })(Dashboard);
