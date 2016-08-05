import React, { Component, PropTypes } from 'react';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';

const chartOptions = {
  maintainAspectRatio: true,
  legend: { display: false },
  scale: {
    pointLabels: { fontSize: 12 },
    ticks: {
      max: 1,
      maxTicksLimit: 4,
      showLabelBackdrop: false,
      beginAtZero: true
    }
  }
};

const datasetOptions = {
  backgroundColor: "rgba(76, 215, 192, 0.75)",
  borderColor: "rgba(76, 215, 192, 1)",
  borderWidth: "5",
  pointBorderColor: "#FFF",
  pointBackgroundColor: "rgba(76, 215, 192, 1)",
  pointBorderWidth: "3",
  pointRadius: "6",
  radius: "6",
  pointHoverRadius: "7"
};

export default class PerformanceRadar extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    const ctx = el.getContext("2d");
    this.chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels : ["F", "Precision", "MAP", "Recall"],
        datasets: [ Object.assign({ data: this.props.chartData }, datasetOptions) ]
      },
      options: chartOptions
    });
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return <canvas/>;
  }
}

PerformanceRadar.propTypes = {
  chartData: PropTypes.array.isRequired
};

PerformanceRadar.displayName = "PerformanceRadar";
