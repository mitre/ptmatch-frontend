import React, { Component, PropTypes } from 'react';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';

class RunHistoryChart extends Component {
  render() {
    return (<canvas />);
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    const ctx = el.getContext("2d");

    this.chart = new Chart(ctx, {
      type: 'line',
      data: this.props.data,
      options: {
        fillColor: '#658999'
      }
    });
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  componentWillUpdate(nextProps) {
    if (this.props.data.labels.length != nextProps.data.labels.length) {
      this.chart.data.labels = nextProps.data.labels;
    }
    nextProps.data.datasets[0].data.forEach((dataPoint, index) => {
      this.chart.data.datasets[0].data[index] = dataPoint;
    });
    this.chart.update();
  }
}

RunHistoryChart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.number),
      label: PropTypes.string.isRequired
    })).isRequired
  }).isRequired
};

RunHistoryChart.displayName = "RunHistoryChart";

export default RunHistoryChart;
