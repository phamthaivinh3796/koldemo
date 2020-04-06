import React, { Component } from "react";
import Styles from "./index.style";
import ReactHighcharts from "react-highcharts";

class AgeRangeChart extends Component {
  render() {
    this.props.data &&
      this.props.data.ageRange.sort((a, b) => {
        const sortA = Number(a.ageGroup.slice(0, 1));
        const sortB = Number(b.ageGroup.slice(0, 1));
        return sortA - sortB;
      });

    const categories =
      (this.props.data.ageRange.length > 0 &&
        this.props.data.ageRange.map(item => item.ageGroup)) ||
      [];
    const seriesChart =
      (this.props.data.ageRange.length > 0 &&
        this.props.data.ageRange.map(item => item.value)) ||
      [];
    const config = {
      chart: {
        backgroundColor: "transparent",
        animation: !1,
        height: 300,
        type: "column"
      },
      title: {
        text: "AUDIENCE AGE-RANGE",
        style: {
          color: "#deefde",
          fontSize: 15,
          fontWeight: "bold",
          fontFamily: "Nunito"
        }
      },
      subtitle: !1,
      tooltip: {
        shared: true,
        useHTML: true
      },
      xAxis: {
        categories: categories,
        lineColor: "#dee2e626",
        lineWidth: 1,
        tickColor: "#dee2e626",
        tickWidth: 0,
        gridLineWidth: 1,
        gridLineColor: "#dee2e626",
        labels: {
          style: {
            color: "#FFFFFF"
          }
        }
      },
      yAxis: {
        title: !1,
        lineColor: "#dee2e626",
        lineWidth: 1,
        tickColor: "#dee2e626",
        tickWidth: 0,
        gridLineColor: "#dee2e626",
        startOnTick: false,
        labels: {
          style: {
            color: "#FFFFFF"
          }
        }
      },
      credits: !1,
      legend: !1,
      plotOptions: {
        column: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false
          },
          shadow: {
            color: "rgb(0,0,0)",
            offsetX: 2,
            offsetY: 1,
            opacity: 0.1,
            width: 5
          },
          borderWidth: 0
        }
      },
      series: [
        {
          name: "Audience",
          data: seriesChart
        }
      ]
    };
    return (
      <Styles>
        <ReactHighcharts config={config} ref="chart"></ReactHighcharts>
      </Styles>
    );
  }
}

export default AgeRangeChart;
