import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { Collapse } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import MatchLinks from '../components/MatchLinks';
import PerformanceRadar from '../components/PerformanceRadar';

import { runProps } from '../prop-types/run';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import patientProps from '../prop-types/patient';

export default class RunList extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      open: true,
      chevronToggle: false
    };
  }

  displayLinks(run) {
    if (this.props.runs.length > 0) {
      return (
        <MatchLinks links={run.links}
                    patients={this.props.patients} />
      );
    } else {
      return (
        <div className="loader">
          <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
  }

  render() {
    let chevronClassNames = classNames('fa', 'fa-chevron-down', 'rotate', { left: this.state.chevronToggle});

    return (
      <div className="run-list">
        {_.values(this.props.runs).reverse().map((run, index) => {
          return (
            <div className="panel panel-collapsible run-list-item" key={run.id}>
              <div className="run-list-item-header">
                <div className="row panel-title">
                  <div className="col-xs-2 run-list-item-header-run-number">
                    Run {this.props.runs.length - index}
                  </div>

                  <div className="col-xs-4 run-list-item-header-date">
                    <FontAwesome name="calendar-o" /> {moment(run.meta.createdOn).format("llll")}
                  </div>

                  <div className="col-xs-5 run-list-item-header-note">
                    <FontAwesome name="sticky-note-o" /> {run.note}
                  </div>

                  <a onClick={ ()=> this.setState({ open: !this.state.open, chevronToggle: !this.state.chevronToggle })}
                     className="col-xs-1">
                    <i className={chevronClassNames}></i>
                  </a>
                </div>
              </div>

              <Collapse className="panel-collapse" in={this.state.open}>
                <div className="run-list-item-body">
                  <div className="row run-list-item-overview">
                    <div className="col-xs-offset-3 col-xs-4 run-list-item-chart">
                      <PerformanceRadar chartData={[
                         run.metrics.f1,
                         run.metrics.precision,
                         run.metrics.MAP,
                         run.metrics.recall]}/>
                     </div>

                     <div className="col-xs-2 run-list-item-metrics">
                       <div><strong>F1:</strong> {run.metrics.f1}</div>
                       <div><strong>Precision:</strong> {run.metrics.precision}</div>
                       <div><strong>MAP:</strong> {run.metrics.MAP}</div>
                       <div><strong>Recall:</strong> {run.metrics.recall}</div>
                       <div><strong>Links Found:</strong> {run.metrics.matchCount}</div>
                     </div>
                  </div>

                  <div className="panel-body run-list-item-links">
                    {this.displayLinks(run)}
                  </div>
                </div>
              </Collapse>
            </div>
          );
        })}
      </div>
    );
  }
}

RunList.displayName = 'RunList';

RunList.propTypes = {
  runs: PropTypes.arrayOf(runProps).isRequired,
  recordMatchingSystems: PropTypes.arrayOf(recordMatchingSystemProps),
  patients: PropTypes.objectOf(patientProps)
};
