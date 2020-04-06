import React, { Component } from "react";
import Styles from "./index.style";
import ReactHighcharts from 'react-highcharts';

class GenderPercent extends Component {
  render() {
    const seriesChart = (this.props.data.genderRange.length > 0 && this.props.data.genderRange.map(item => {
      return {
        name: item.gender === 'male' ? 'Male' : 'Female',
        y: item.value,
        color: item.gender === 'male' ? 'rgb(124, 181, 236)' : '#FF8080'
    }
    })) || [];
    const config = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor: "transparent",
        height: 300,
      },
      title: {
        text: 'GENDER',
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
      credits: !1,
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        itemMarginTop: -5,
        itemMarginBottom: 0,
        itemStyle: {
          color: '#F1F1F1',
        }
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            borderWidth: 0,
            shadow: {
              color: 'rgb(0,0,0)',
              offsetX: 2,
              offsetY: 1,
              opacity: 0.1,
              width: 5
            },
            innerSize: '40%',
            showInLegend: true
        }
    },
      series: [{
        name: 'Audiences',
        colorByPoint: true,
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

export default GenderPercent;
