import React, { Component, PropTypes } from 'react';

class CollapsibleSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {chevronClass: "rotate fa fa-chevron-right pull-right"};
  }

  toggleChevron() {
    let chevronClass = this.state.chevronClass;
    if (chevronClass === "rotate fa fa-chevron-right pull-right") {
      this.setState({chevronClass: "rotate fa fa-chevron-right pull-right right"});
    } else {
      this.setState({chevronClass: "rotate fa fa-chevron-right pull-right"});
    }
  }

  render() {
    return (
      <div className="panel-group" role="tablist">
        <div className="panel panel-default">
          <div className="panel-heading"
               data-toggle="collapse"
               href={"#" + this.props.name + "List"}
               role="tab"
               id={this.props.name + "Heading"}
               onClick={() => this.toggleChevron()}>
            <div className="col-xs-3 panel-heading-label">
              <i className="fa fa-sitemap" aria-hidden="true"></i>
              <span>{this.props.title}</span>
            </div>

            <div className="col-xs-9 panel-heading-selection">
              {this.props.selectedName}
              <i className={this.state.chevronClass} aria-hidden="true"></i>
            </div>
          </div>

          <div id={this.props.name + "List"} className="panel-collapse collapse" role="tabpanel">
            <ul className="list-group">
              {this.props.itemsToSelect.map(item => {
                return (
                <li className="list-group-item"
                    key={item.id}
                    onClick={() => this.props.selectFunction(item)}>{item.name}</li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

CollapsibleSelector.displayName = 'CollapsibleSelector';

CollapsibleSelector.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  itemsToSelect: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  selectedName: PropTypes.string,
  selectFunction: PropTypes.func
};

export default CollapsibleSelector;
