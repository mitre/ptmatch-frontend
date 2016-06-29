import React from 'react';
import NewRunModal from './NewRunModal';

class NewBenchmarkRunModal extends NewRunModal {
  constructor(props) {
    super(props);
    let preselectedRMS = props.recordMatchingSystems.find((rms) => rms.selected === true);
    if (preselectedRMS === undefined) {
      this.state = {preselectedRMS: false, selectedRMS: {id: "-1"}, selectedRecordSet: {id: "-1"}};
    } else {
      this.state = {preselectedRMS: true, selectedRMS: preselectedRMS, selectedRecordSet: {id: "-1"}};
    }
  }

  componentWillReceiveProps(nextProps) {
    let preselectedRMS = nextProps.recordMatchingSystems.find((rms) => rms.selected === true);
    if (preselectedRMS === undefined) {
      this.setState({preselectedRMS: false, selectedRMS: {id: "-1"}});
    } else {
      this.setState({preselectedRMS: true, selectedRMS: preselectedRMS});
    }
  }

  rmsDisplay() {
    if (this.state.preselectedRMS) {
      return (
        <div>
          <label>Record Matching System: </label>
          <div>{this.state.selectedRMS.name}</div>
          <br/>
        </div>
      );
    } else {
      return (
        <ul className="list-group">
          {this.props.recordMatchingSystems.map(matchingSystem => {
            return (
              <li className={this.classForRMS(matchingSystem)}
                  onClick={() => this.selectRMS(matchingSystem)}
                  key={matchingSystem.id}>{matchingSystem.name}</li>
            );
          })}
        </ul>
      );
    }
  }

  modalBody() {
    return(
      <div>
        {this.rmsDisplay()}

        <label>Choose Dataset:</label>
        <ul className="list-group">
          {this.props.recordSets.map(recordSet => {
            return (
              <li className={this.classForRecordSet(recordSet)}
                  onClick={() => this.selectRecordSet(recordSet)}
                  key={recordSet.id}>{recordSet.name}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

NewBenchmarkRunModal.displayName = 'NewBenchmarkRunModal';

export default NewBenchmarkRunModal;
