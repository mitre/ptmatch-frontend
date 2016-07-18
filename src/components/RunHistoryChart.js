import React, { Component, PropTypes } from 'react';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';
import _ from 'lodash';

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
  constructor(props) {
    super(props);

    this.state = {
      labels: props.chartData.labels,
      datasets: formatChartData(props.chartData.datasets)
    };
  }

  render() {
    return (<canvas/>);
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    const ctx = el.getContext("2d");

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.state.labels,
        datasets: safeDatasets(this.state.datasets)
      },
      options: chartOptions
    });
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  componentDidUpdate() {
    this.chart.data.labels = this.state.labels;
    this.chart.data.datasets = safeDatasets(this.state.datasets);
    this.chart.update();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      labels: nextProps.chartData.labels,
      datasets: formatChartData(nextProps.chartData.datasets)
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(this.state.labels, nextState.labels) && _.isEqual(this.state.datasets, nextState.datasets)) {
      return false;
    }

    return true;
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

function formatChartData(datasets) {
  return datasets.map((dataset, index) => {
    let color = lineBorderColors[index % (lineBorderColors.length - 1)];
    return Object.assign({
      pointBackgroundColor: color,
      borderColor: color,
      backgroundColor: color
    }, datasetOptions, dataset);
  });
}

function safeDatasets(datasets) {
  return datasets.map((dataset) => Object.assign({}, dataset));
}

export default RunHistoryChart;
