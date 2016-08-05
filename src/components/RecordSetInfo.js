import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import CollapsiblePanel from './CollapsiblePanel';

import recordSetProps from '../prop-types/record_set';

export default class RecordSetInfo extends Component {
  render() {
    let panelTitle = <span>{this.props.recordSet.name} <a href="#"><FontAwesome name="link" /></a></span>;

    return (
      <CollapsiblePanel panelTitle={panelTitle} panelIcon="database">
        <div className="panel panel-default record-set-info">
          <table className="table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{this.props.recordSet.name}</td>
              </tr>

              <tr>
                <th>Description</th>
                <td>{this.props.recordSet.description}</td>
              </tr>
            </tbody>
          </table>

          <table className="table">
            <thead>
              <tr>
                <th>Parameter Name</th>
                <th>Parameter Value</th>
              </tr>
            </thead>

            <tbody>
              {this.props.recordSet.parameters.parameter.map((p, i) => {
                return (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.valueString}</td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CollapsiblePanel>
    );
  }
}

RecordSetInfo.propTypes = {
  recordSet: recordSetProps.isRequired
};
