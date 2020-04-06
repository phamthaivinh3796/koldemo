import React, { Component } from "react";
import Styles from "./index.style";
import ReactHighcharts from 'react-highcharts';
import moment from 'moment';

class AgeRangeChart extends Component {
  render() {
    const categories = (this.props.data.followerGrowths.length > 0 && this.props.data.followerGrowths.map(item => moment(item.recordAt).format('DD-MM-YYYY'))) || [];
    const seriesChart = (this.props.data.followerGrowths.length > 0 && this.props.data.followerGrowths.map(item => item.value)) || [];
    const config = {
      chart: {
        backgroundColor: "transparent",
        height: 250,
        type: 'spline'
      },
      title: {
        text: 'FOLLOWERS GROWTH',
        style: {
          color: '#deefde',
          fontSize: 15,
          fontWeight: 'bold',
          fontFamily: 'Nunito'
        }
      },
      subtitle: !1,
      tooltip: {
        shared: true,
        useHTML: true
      },
      xAxis: {
        categories: categories,
        lineColor: '#dee2e626',
        lineWidth: 1,
        tickColor: '#dee2e626',
        tickWidth: 0,
        gridLineWidth: 1,
        gridLineColor: '#dee2e626',
        labels: {
          style: {
            color: '#FFFFFF'
          }
        }
      },
      yAxis: {
        title: !1,
        lineColor: '#dee2e626',
        lineWidth: 1,
        tickColor: '#dee2e626',
        tickWidth: 0,
        gridLineColor: '#dee2e626',
        startOnTick: false,
        labels: {
          style: {
            color: '#FFFFFF'
          }
        }
      },
      credits: !1,
      legend: !1,
      plotOptions: {
        spline: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            shadow: {
              color: 'rgb(0,0,0)',
              offsetX: 2,
              offsetY: 1,
              opacity: 0.1,
              width: 5
            },
            borderWidth: 0
        }
      },
      series: [{
        name: 'Audience',
        data: seriesChart
    }]
    }
    return (
      <Styles>
        <ReactHighcharts config={config} ref="chart"></ReactHighcharts>
      </Styles>
    );
  }
}

export default AgeRangeChart;
