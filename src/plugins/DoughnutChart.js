import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    chartData: Object,
    options: Object
  },
  mounted () {
    let options = Object.assign({
      cutoutPercentage: 65,
      legend: {
        position: 'bottom',
        labels: {
          fontSize: 14,
          padding: 11,
          boxWidth: 10,
          usePointStyle: true
        }
      },
      maintainAspectRatio: true,
      responsive: true,
      tooltips: {
        displayColors: false
      }
    }, this.options)
    this.renderChart(this.chartData, options)
  }
}
