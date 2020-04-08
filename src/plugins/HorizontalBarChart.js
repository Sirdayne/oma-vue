import { HorizontalBar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: HorizontalBar,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, {
      legend: {
        display: false
      },
      maintainAspectRatio: true,
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            color: '#7e929f',
            display: false,
            lineWidth: 2
          },
          ticks: {
            fontColor: '#495b67',
            fontFamily: 'aktiv-grotesk, Helvetica, Arial, sans-serif',
            fontSize: 14
          }
        }],
        xAxes: [{
          gridLines: {
            borderDash: [2, 6],
            drawBorder: false,
            lineWidth: 2,
            offsetGridLines: true
          },
          ticks: {
            display: false
          }
        }]
      }
    })
  }
}
