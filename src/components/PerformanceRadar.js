import React, { Component, PropTypes } from 'react';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';

class PerformanceRadar extends Component {
  render() {
    return (<canvas/>);
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    const ctx = el.getContext("2d");
    this.chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels : ["F", "Precision", "MAP", "Recall"],
        datasets: this.props.datasets
      },
      options: {legend: {display: false},
                scale: {ticks: {max: 1, maxTicksLimit: 4}}}
    });
  }

  componentWillUnmount() {
    this.chart.destroy();
  }
}

PerformanceRadar.propTypes = {
  datasets: PropTypes.array.isRequired
};

PerformanceRadar.displayName = "PerformanceRadar";

export default PerformanceRadar;
