import React, { Component } from 'react';
import CollapsiblePanel from './CollapsiblePanel';
import recordSetProps from '../prop-types/record_set';

class RecordSetInfo extends Component {
  render() {
    return (
      <CollapsiblePanel panelTitle="Record Set" panelIcon="database">
        <div className="panel panel-default">
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

export default RecordSetInfo;
