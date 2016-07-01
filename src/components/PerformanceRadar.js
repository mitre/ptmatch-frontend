import React, { Component, PropTypes } from 'react';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';

const chartOptions = {
  legend: {display: false},
  scale: {
    pointLabels: {fontSize: 12},
    ticks: {
      max: 1,
      maxTicksLimit: 4,
      showLabelBackdrop: false,
      beginAtZero: true
    }
  }
};

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
        datasets: [{
          data: this.props.chartData,
          backgroundColor: "rgba(76, 215, 192, 0.75)",
          borderColor: "rgba(76, 215, 192, 1)",
          borderWidth: "5",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "rgba(76, 215, 192, 1)",
          pointBorderWidth: "2",
          pointRadius: "4",
          radius: "4",
          pointHoverRadius: "6"
        }]
      },
      options: chartOptions
    });
  }

  componentWillUnmount() {
    this.chart.destroy();
  }
}

PerformanceRadar.propTypes = {
  chartData: PropTypes.array.isRequired
};

PerformanceRadar.displayName = "PerformanceRadar";

export default PerformanceRadar;
