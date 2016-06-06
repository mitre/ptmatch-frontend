import React, { Component, PropTypes } from 'react';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';

class RunHistoryChart extends Component {
  render() {
    return (<canvas/>);
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    const ctx = el.getContext("2d");
    this.chart = new Chart(ctx, {
      type: 'line',
      data: this.props.data
    });
  }

  componentWillUnmount() {
    this.chart.destroy();
  }
}

RunHistoryChart.propTypes = {
  data: PropTypes.object.isRequired
};

RunHistoryChart.displayName = "RunHistoryChart";

export default RunHistoryChart;
