import React, { Component } from 'react';
import CollapsiblePanel from './CollapsiblePanel';
import recordMatchingSystemProps from '../prop-types/record_matching_system';

class MatchingSystemInfo extends Component {
  render() {
    return (
      <CollapsiblePanel panelTitle="Matching System" panelIcon="sitemap">
        <div className="panel panel-default">
          <table className="table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{this.props.recordMatchingSystem.name}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{this.props.recordMatchingSystem.description}</td>
              </tr>
              <tr>
                <th>Destination Endpoint</th>
                <td>{this.props.recordMatchingSystem.destinationEndpoint}</td>
              </tr>
              <tr>
                <th>Server Endpoint</th>
                <td>{this.props.recordMatchingSystem.serverEndpoint}</td>
              </tr>
              <tr>
                <th>Response Endpoint</th>
                <td>{this.props.recordMatchingSystem.responseEndpoint}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CollapsiblePanel>
    );
  }
}

MatchingSystemInfo.propTypes = {
  recordMatchingSystem: recordMatchingSystemProps.isRequired
};

export default MatchingSystemInfo;
