import React from 'react';
import NewRunModal from './NewRunModal';

class NewChallengeRunModal extends NewRunModal {
  constructor(props) {
    super(props);
    let preselectedRecordSet = props.recordSets.find((recordSet) => recordSet.selected === true);
    if (preselectedRecordSet === undefined) {
      this.state = {preselectedRecordSet: false, selectedRMS: {id: "-1"}, selectedRecordSet: {id: "-1"}};
    } else {
      this.state = {preselectedRecordSet: true, selectedRMS: {id: "-1"}, selectedRecordSet: preselectedRecordSet};
    }
  }

  componentWillReceiveProps(nextProps) {
    let preselectedRecordSet = nextProps.recordSets.find((recordSet) => recordSet.selected === true);
    if (preselectedRecordSet === undefined) {
      this.setState({preselectedRecordSet: false, selectedRecordSet: {id: "-1"}});
    } else {
      this.setState({preselectedRecordSet: true, selectedRecordSet: preselectedRecordSet});
    }
  }

  recordSetDisplay() {
    if (this.state.preselectedRecordSet) {
      return (
        <div>
          <label>Record Set: </label>
          <div>{this.state.selectedRecordSet.name}</div>
          <br/>
        </div>
      );
    } else {
      return (
        <ul className="list-group">
          {this.props.recordSets.map(recordSet => {
            return (
              <li className={this.classForRecordSet(recordSet)}
                  onClick={() => this.selectRecordSet(recordSet)}
                  key={recordSet.id}>{recordSet.name}</li>
            );
          })}
        </ul>
      );
    }
  }

  modalBody() {
    return(
      <div>
        {this.recordSetDisplay()}

        <label>Choose Matching System:</label>
        <ul className="list-group">
          {this.props.recordMatchingSystems.map(rms => {
            return (
              <li className={this.classForRMS(rms)}
                  onClick={() => this.selectRMS(rms)}
                  key={rms.id}>{rms.name}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

NewChallengeRunModal.displayName = 'NewChallengeRunModal';

export default NewChallengeRunModal;
