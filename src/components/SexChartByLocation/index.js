import React, { Component } from "react";
import Styles from "./index.style";
import ReactHighcharts from "react-highcharts";

class SexChartByLocation extends Component {
  render() {
    const categories =
      (this.props.data.locationRange.length > 0 &&
        this.props.data.locationRange
          .sort((a, b) =>
            Number(a.locationRate) < Number(b.locationRate) ? 1 : -1
          )
          .map(item => item.location[0].name)) ||
      [];
    let seriesChart =
      (this.props.data.locationRange &&
        this.props.data.locationRange
          .sort((a, b) =>
            Number(a.locationRate) < Number(b.locationRate) ? 1 : -1
          )
          .map(item => item.locationRate)) ||
      [];
    if (seriesChart.length > 5) {
      const newLocationRange = seriesChart.slice(0, 5);
      seriesChart = newLocationRange;
    }
    const config = {
      chart: {
        backgroundColor: "transparent",
        animation: !1,
        height: 300,
        type: "bar"
      },
      title: {
        text: "AUDIENCE LOCATION",
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
        bar: {
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
          data: seriesChart,
          color: "rgb(124, 181, 236)"
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

export default SexChartByLocation;
