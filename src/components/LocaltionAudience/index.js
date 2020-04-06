import React, { Component } from "react";
import Styles from "./index.style";
import ReactHighmaps from 'react-highcharts/ReactHighmaps.src';

class AgeRangeChart extends Component {
  render() {
    const data = [{"code":"AFG","value":53,"name":"Afghanistan"},{"code":"ALB","value":105,"name":"Albania"},{"code":"DZA","value":17,"name":"Algeria"},{"code":"ASM","value":278,"name":"American Samoa"},{"code":"AND","value":164,"name":"Andorra"},{"code":"AGO","value":23,"name":"Angola"},{"code":"ATG","value":229,"name":"Antigua and Barbuda"},{"code":"ARG","value":16,"name":"Argentina"},{"code":"ARM","value":103,"name":"Armenia"},{"code":"ABW","value":582,"name":"Aruba"},{"code":"AUS","value":3,"name":"Australia"},{"code":"AUT","value":106,"name":"Austria"},{"code":"AZE","value":118,"name":"Azerbaijan"},{"code":"BHS","value":39,"name":"Bahamas, The"},{"code":"BHR","value":1848,"name":"Bahrain"},{"code":"BGD","value":1252,"name":"Bangladesh"},{"code":"BRB","value":663,"name":"Barbados"},{"code":"BLR","value":47,"name":"Belarus"},{"code":"BEL","value":375,"name":"Belgium"},{"code":"BLZ","value":16,"name":"Belize"},{"code":"BEN","value":96,"name":"Benin"},{"code":"BMU","value":1307,"name":"Bermuda"},{"code":"BTN","value":21,"name":"Bhutan"},{"code":"BOL","value":10,"name":"Bolivia"},{"code":"BIH","value":69,"name":"Bosnia and Herzegovina"},{"code":"BWA","value":4,"name":"Botswana"},{"code":"BRA","value":25,"name":"Brazil"},{"code":"VGB","value":204,"name":"British Virgin Islands"},{"code":"BRN","value":80,"name":"Brunei Darussalam"},{"code":"BGR","value":66,"name":"Bulgaria"},{"code":"BFA","value":68,"name":"Burkina Faso"},{"code":"BDI","value":410,"name":"Burundi"},{"code":"CPV","value":134,"name":"Cabo Verde"},{"code":"KHM","value":89,"name":"Cambodia"},{"code":"CMR","value":50,"name":"Cameroon"},{"code":"CAN","value":4,"name":"Canada"},{"code":"CYM","value":253,"name":"Cayman Islands"},{"code":"CAF","value":7,"name":"Central African Republic"},{"code":"TCD","value":11,"name":"Chad"},{"code":"CHI","value":866,"name":"Channel Islands"},{"code":"CHL","value":24,"name":"Chile"},{"code":"CHN","value":147,"name":"China"},{"code":"COL","value":44,"name":"Colombia"},{"code":"COM","value":428,"name":"Comoros"},{"code":"COD","value":35,"name":"Congo, Dem. Rep."},{"code":"COG","value":15,"name":"Congo, Rep."},{"code":"CRI","value":95,"name":"Costa Rica"},{"code":"CIV","value":75,"name":"Cote d'Ivoire"},{"code":"HRV","value":75,"name":"Croatia"},{"code":"CUB","value":110,"name":"Cuba"},{"code":"CUW","value":360,"name":"Curacao"},{"code":"CYP","value":127,"name":"Cyprus"},{"code":"CZE","value":137,"name":"Czech Republic"},{"code":"DNK","value":136,"name":"Denmark"},{"code":"DJI","value":41,"name":"Djibouti"},{"code":"DMA","value":98,"name":"Dominica"},{"code":"DOM","value":220,"name":"Dominican Republic"},{"code":"ECU","value":66,"name":"Ecuador"},{"code":"EGY","value":96,"name":"Egypt, Arab Rep."},{"code":"SLV","value":306,"name":"El Salvador"},{"code":"GNQ","value":44,"name":"Equatorial Guinea"},{"code":"EST","value":31,"name":"Estonia"},{"code":"ETH","value":102,"name":"Ethiopia"},{"code":"FRO","value":35,"name":"Faroe Islands"},{"code":"FJI","value":49,"name":"Fiji"},{"code":"FIN","value":18,"name":"Finland"},{"code":"FRA","value":122,"name":"France"},{"code":"PYF","value":77,"name":"French Polynesia"},{"code":"GAB","value":8,"name":"Gabon"},{"code":"GMB","value":201,"name":"Gambia, The"},{"code":"GEO","value":54,"name":"Georgia"},{"code":"DEU","value":237,"name":"Germany"},{"code":"GHA","value":124,"name":"Ghana"},{"code":"GIB","value":3441,"name":"Gibraltar"},{"code":"GRC","value":83,"name":"Greece"},{"code":"GRL","value":0,"name":"Greenland"},{"code":"GRD","value":316,"name":"Grenada"},{"code":"GUM","value":302,"name":"Guam"},{"code":"GTM","value":155,"name":"Guatemala"},{"code":"GIN","value":50,"name":"Guinea"},{"code":"GNB","value":65,"name":"Guinea-Bissau"},{"code":"GUY","value":4,"name":"Guyana"},{"code":"HTI","value":394,"name":"Haiti"},{"code":"HND","value":81,"name":"Honduras"},{"code":"HKG","value":6997,"name":"Hong Kong SAR, China"},{"code":"HUN","value":108,"name":"Hungary"},{"code":"ISL","value":3,"name":"Iceland"},{"code":"IND","value":445,"name":"India"},{"code":"IDN","value":144,"name":"Indonesia"},{"code":"IRN","value":49,"name":"Iran, Islamic Rep."},{"code":"IRQ","value":86,"name":"Iraq"},{"code":"IRL","value":69,"name":"Ireland"},{"code":"IMN","value":147,"name":"Isle of Man"},{"code":"ISR","value":395,"name":"Israel"},{"code":"ITA","value":206,"name":"Italy"},{"code":"JAM","value":266,"name":"Jamaica"},{"code":"JPN","value":348,"name":"Japan"},{"code":"JOR","value":107,"name":"Jordan"},{"code":"KAZ","value":7,"name":"Kazakhstan"},{"code":"KEN","value":85,"name":"Kenya"},{"code":"KIR","value":141,"name":"Kiribati"},{"code":"PRK","value":211,"name":"Korea, Dem. People’s Rep."},{"code":"KOR","value":526,"name":"Korea, Rep."},{"code":"XKX","value":167,"name":"Kosovo"},{"code":"KWT","value":227,"name":"Kuwait"},{"code":"KGZ","value":32,"name":"Kyrgyz Republic"},{"code":"LAO","value":29,"name":"Lao PDR"},{"code":"LVA","value":32,"name":"Latvia"},{"code":"LBN","value":587,"name":"Lebanon"},{"code":"LSO","value":73,"name":"Lesotho"},{"code":"LBR","value":48,"name":"Liberia"},{"code":"LBY","value":4,"name":"Libya"},{"code":"LIE","value":235,"name":"Liechtenstein"},{"code":"LTU","value":46,"name":"Lithuania"},{"code":"LUX","value":225,"name":"Luxembourg"},{"code":"MAC","value":20406,"name":"Macao SAR, China"},{"code":"MKD","value":83,"name":"Macedonia, FYR"},{"code":"MDG","value":43,"name":"Madagascar"},{"code":"MWI","value":192,"name":"Malawi"},{"code":"MYS","value":95,"name":"Malaysia"},{"code":"MDV","value":1392,"name":"Maldives"},{"code":"MLI","value":15,"name":"Mali"},{"code":"MLT","value":1365,"name":"Malta"},{"code":"MHL","value":295,"name":"Marshall Islands"},{"code":"MRT","value":4,"name":"Mauritania"},{"code":"MUS","value":622,"name":"Mauritius"},{"code":"MEX","value":66,"name":"Mexico"},{"code":"FSM","value":150,"name":"Micronesia, Fed. Sts."},{"code":"MDA","value":108,"name":"Moldova"},{"code":"MCO","value":19250,"name":"Monaco"},{"code":"MNG","value":2,"name":"Mongolia"},{"code":"MNE","value":46,"name":"Montenegro"},{"code":"MAR","value":79,"name":"Morocco"},{"code":"MOZ","value":37,"name":"Mozambique"},{"code":"MMR","value":81,"name":"Myanmar"},{"code":"NAM","value":3,"name":"Namibia"},{"code":"NRU","value":652,"name":"Nauru"},{"code":"NPL","value":202,"name":"Nepal"},{"code":"NLD","value":505,"name":"Netherlands"},{"code":"NCL","value":15,"name":"New Caledonia"},{"code":"NZL","value":18,"name":"New Zealand"},{"code":"NIC","value":51,"name":"Nicaragua"},{"code":"NER","value":16,"name":"Niger"},{"code":"NGA","value":204,"name":"Nigeria"},{"code":"NAC","value":20,"name":"North America"},{"code":"MNP","value":120,"name":"Northern Mariana Islands"},{"code":"NOR","value":14,"name":"Norway"},{"code":"OMN","value":14,"name":"Oman"},{"code":"PAK","value":251,"name":"Pakistan"},{"code":"PLW","value":47,"name":"Palau"},{"code":"PAN","value":54,"name":"Panama"},{"code":"PNG","value":18,"name":"Papua New Guinea"},{"code":"PRY","value":17,"name":"Paraguay"},{"code":"PER","value":25,"name":"Peru"},{"code":"PHL","value":347,"name":"Philippines"},{"code":"POL","value":124,"name":"Poland"},{"code":"PRT","value":113,"name":"Portugal"},{"code":"PRI","value":385,"name":"Puerto Rico"},{"code":"QAT","value":221,"name":"Qatar"},{"code":"ROU","value":86,"name":"Romania"},{"code":"RUS","value":9,"name":"Russian Federation"},{"code":"RWA","value":483,"name":"Rwanda"},{"code":"WSM","value":69,"name":"Samoa"},{"code":"SMR","value":553,"name":"San Marino"},{"code":"STP","value":208,"name":"Sao Tome and Principe"},{"code":"SAU","value":15,"name":"Saudi Arabia"},{"code":"SEN","value":80,"name":"Senegal"},{"code":"SRB","value":81,"name":"Serbia"},{"code":"SYC","value":206,"name":"Seychelles"},{"code":"SLE","value":102,"name":"Sierra Leone"},{"code":"SGP","value":7909,"name":"Singapore"},{"code":"SXM","value":1177,"name":"Sint Maarten (Dutch part)"},{"code":"SVK","value":113,"name":"Slovak Republic"},{"code":"SVN","value":103,"name":"Slovenia"},{"code":"SLB","value":21,"name":"Solomon Islands"},{"code":"SOM","value":23,"name":"Somalia"},{"code":"ZAF","value":46,"name":"South Africa"},{"code":"ESP","value":93,"name":"Spain"},{"code":"LKA","value":338,"name":"Sri Lanka"},{"code":"KNA","value":211,"name":"St. Kitts and Nevis"},{"code":"LCA","value":292,"name":"St. Lucia"},{"code":"MAF","value":592,"name":"St. Martin (French part)"},{"code":"VCT","value":281,"name":"St. Vincent and the Grenadines"},{"code":"SDN","value":17,"name":"Sudan"},{"code":"SUR","value":4,"name":"Suriname"},{"code":"SWZ","value":78,"name":"Swaziland"},{"code":"SWE","value":24,"name":"Sweden"},{"code":"CHE","value":212,"name":"Switzerland"},{"code":"SYR","value":100,"name":"Syrian Arab Republic"},{"code":"TJK","value":63,"name":"Tajikistan"},{"code":"TZA","value":63,"name":"Tanzania"},{"code":"THA","value":135,"name":"Thailand"},{"code":"TLS","value":85,"name":"Timor-Leste"},{"code":"TGO","value":140,"name":"Togo"},{"code":"TON","value":149,"name":"Tonga"},{"code":"TTO","value":266,"name":"Trinidad and Tobago"},{"code":"TUN","value":73,"name":"Tunisia"},{"code":"TUR","value":103,"name":"Turkey"},{"code":"TKM","value":12,"name":"Turkmenistan"},{"code":"TCA","value":37,"name":"Turks and Caicos Islands"},{"code":"TUV","value":370,"name":"Tuvalu"},{"code":"UGA","value":207,"name":"Uganda"},{"code":"UKR","value":78,"name":"Ukraine"},{"code":"ARE","value":111,"name":"United Arab Emirates"},{"code":"GBR","value":271,"name":"United Kingdom"},{"code":"USA","value":35,"name":"United States"},{"code":"URY","value":20,"name":"Uruguay"},{"code":"UZB","value":75,"name":"Uzbekistan"},{"code":"VUT","value":22,"name":"Vanuatu"},{"code":"VEN","value":36,"name":"Venezuela, RB"},{"code":"VNM","value":299,"name":"Vietnam"},{"code":"VIR","value":294,"name":"Virgin Islands (U.S.)"},{"code":"PSE","value":756,"name":"West Bank and Gaza"},{"code":"YEM","value":52,"name":"Yemen, Rep."},{"code":"ZMB","value":22,"name":"Zambia"},{"code":"ZWE","value":42,"name":"Zimbabwe"}]

    var config = {
      chart: {
        height: 300,
        map: 'custom/world',
        borderWidth: 1
      },

      colors: ['rgba(19,64,117,0.05)', 'rgba(19,64,117,0.2)', 'rgba(19,64,117,0.4)',
        'rgba(19,64,117,0.5)', 'rgba(19,64,117,0.6)', 'rgba(19,64,117,0.8)', 'rgba(19,64,117,1)'
      ],

      title: {
        text: 'Population density by country (/km²)'
      },

      mapNavigation: {
        enabled: true
      },

      colorAxis: {
        dataClasses: [{
          to: 3
        }, {
          from: 3,
          to: 10
        }, {
          from: 10,
          to: 30
        }, {
          from: 30,
          to: 100
        }, {
          from: 100,
          to: 300
        }, {
          from: 300,
          to: 1000
        }, {
          from: 1000
        }]
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            borderWidth: 0,
            showInLegend: true
        }
    },
      series: [{
        data: data,
        joinBy: ['iso-a3', 'code'],
        animation: true,
        name: 'Population density',
        states: {
          hover: {
            color: '#a4edba'
          }
        },
        tooltip: {
          valueSuffix: '/km²'
        },
        shadow: false
      }]
    };
    
    return (
      <Styles>
        <ReactHighmaps config={config} ref="chart"></ReactHighmaps>
      </Styles>
    );
  }
}

export default AgeRangeChart;
