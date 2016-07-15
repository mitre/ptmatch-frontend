import React, { Component, PropTypes } from 'react';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';

const chartOptions = {
  scales: {
    xAxes: [{
      display: false
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
        maxTicksLimit: 5
      }
    }]
  }
};

const datasetOptions = {
  fill: false,
  pointBorderColor: "#FFF",
  pointBorderWidth: "3",
  pointRadius: "6",
  radius: "6",
  pointHoverRadius: "7",
  lineTension: 0
};

const lineBorderColors = [
  "#658999",
  "#FF8889",
  "#4CD7C0",
  "#97BBCD"
];

class RunHistoryChart extends Component {
  render() {
    return (<canvas/>);
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    const ctx = el.getContext("2d");

    this.chart = new Chart(ctx, {
      type: 'line',
      data: this.formatChartData(this.props.chartData),
      options: chartOptions
    });
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  componentWillUpdate(nextProps) {
    if (this.props.chartData.labels.length != nextProps.chartData.labels.length) {
      this.chart.data.labels = nextProps.chartData.labels;
    }
    this.chart.data.datasets = this.formatChartData(nextProps.chartData);
    this.chart.update();
  }

  formatChartData(chartData) {
    return {
      labels: chartData.labels,
      datasets: chartData.datasets.map((dataset, index) => {
        let color = lineBorderColors[index % (lineBorderColors.length - 1)];
        return Object.assign({
          pointBackgroundColor: color,
          borderColor: color,
          backgroundColor: color
        }, datasetOptions, dataset);
      })
    };
  }
}

RunHistoryChart.propTypes = {
  chartData: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.number),
      label: PropTypes.string.isRequired
    })).isRequired
  }).isRequired
};

RunHistoryChart.displayName = "RunHistoryChart";

export default RunHistoryChart;
