<template>
  <v-container pa-0>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4">
        <div class="dashboard__tile dashboard__tile--chart">
          <div class="d-flex justify-space-between align-center">
            <div class="dashboard__tile__header">Compliance Alerts</div>
            <!-- <div class="dashboard__tile__export cursor-pointer">Export</div> -->
          </div>
          <div
            class="text-center py-5"
            v-if="spinner.complianceAlerts">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
          <div v-if="!spinner.complianceAlerts && complianceAlerts">
            <div class="dashboard__tile__line__row">
              <div class="dashboard__tile__line__value">{{ complianceAlerts.noofSanctions }}</div>
              <div class="dashboard__tile__line__type">Sanctions</div>
            </div>
            <div class="dashboard__tile__line__row">
              <div class="dashboard__tile__line__value">{{ complianceAlerts.noofAdverseMedia }}</div>
              <div class="dashboard__tile__line__type">Adverse Media</div>
            </div>
            <div class="dashboard__tile__line__row">
              <div class="dashboard__tile__line__value">{{ complianceAlerts.noofFinancialRegulator }}</div>
              <div class="dashboard__tile__line__type">Financial Regulator</div>
            </div>
            <div class="dashboard__tile__line__row">
              <div class="dashboard__tile__line__value">{{ complianceAlerts.noofLawEnforcement }}</div>
              <div class="dashboard__tile__line__type">Legal/Law Enforcement</div>
            </div>
            <div class="dashboard__tile__line__row">
              <div class="dashboard__tile__line__value">{{ complianceAlerts.noofInsolvency }}</div>
              <div class="dashboard__tile__line__type">Insolvency</div>
            </div>
            <div class="dashboard__tile__line__row">
              <div class="dashboard__tile__line__value">{{ complianceAlerts.noofPEP }}</div>
              <div class="dashboard__tile__line__type">Politically Exposed Persons</div>
            </div>
            <div class="dashboard__tile__line__row">
              <div class="dashboard__tile__line__value">{{ complianceAlerts.noofDisqualifiedDirector }}</div>
              <div class="dashboard__tile__line__type">Disqualified Director</div>
            </div>
            <div class="dashboard__tile__line__row">
              <div class="dashboard__tile__line__value">{{ complianceAlerts.noofCorporateBusiness }}</div>
              <div class="dashboard__tile__line__type">Corporate/Business</div>
            </div>
            <div class="dashboard__tile__line__row">
              <div class="dashboard__tile__line__value">{{ complianceAlerts.noOfIdV }}</div>
              <div class="dashboard__tile__line__type">ID Verification</div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4">
        <div class="dashboard__tile dashboard__tile--chart">
          <div class="d-flex justify-space-between align-center">
            <div class="dashboard__tile__header">Credit Risk</div>
            <!-- <div class="dashboard__tile__export cursor-pointer">Export</div> -->
          </div>
          <div class="dashboard__tile__chart">
            <div
              class="text-center py-5"
              v-if="spinner.riskChart">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <doughnut-chart :chart-data="riskChartData" :height="340" v-if="!spinner.riskChart && riskChartData"></doughnut-chart>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4">
        <div class="dashboard__tile dashboard__tile--chart">
          <div class="d-flex justify-space-between align-center">
            <div class="dashboard__tile__header">Adverse Media</div>
            <!-- <div class="dashboard__tile__export cursor-pointer">Export</div> -->
          </div>
          <div
            class="text-center py-5"
            v-if="spinner.adverseMediaAlerts">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
          <div v-if="!spinner.adverseMediaAlerts && adverseMediaAlerts">
            <div class="dashboard__tile__line__row">
              <div class="dashboard__tile__line__value">{{ adverseMediaAlerts.noofCompaniesWithAdverseMediaAlerts }}</div>
              <div class="dashboard__tile__line__type">Adverse Media Reported</div>
            </div>
            <div class="dashboard__tile__line__row">
              <div class="dashboard__tile__line__value">{{ adverseMediaAlerts.noofAdverseMediaAlerts }}</div>
              <div class="dashboard__tile__line__type">Total Adverse Media Reports</div>
            </div>
            <div class="dashboard__tile__line__row">
              <div class="dashboard__tile__line__value">{{ adverseMediaAlerts.averageAdverseMediaAlerts }}</div>
              <div class="dashboard__tile__line__type">Average Reports per Company</div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4">
        <div class="dashboard__tile dashboard__tile--chart">
          <div class="d-flex justify-space-between align-center">
            <div class="dashboard__tile__header">Revenue Distribution</div>
            <!-- <div class="dashboard__tile__export cursor-pointer">Export</div> -->
          </div>
          <div class="dashboard__tile__chart">
            <div
              class="text-center py-5"
              v-if="spinner.revenueChart">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <doughnut-chart :chart-data="revenueChartData" :height="340" v-if="!spinner.revenueChart && revenueChartData"></doughnut-chart>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4">
        <div class="dashboard__tile dashboard__tile--chart">
          <div class="d-flex justify-space-between align-center">
            <div class="dashboard__tile__header">Geographical Distribution</div>
            <!-- <div class="dashboard__tile__export cursor-pointer">Export</div> -->
          </div>
          <div class="dashboard__tile__chart">
            <div
              class="text-center py-5"
              v-if="spinner.geographicalChart">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <doughnut-chart :chart-data="geographicalChartData" :height="340" v-if="!spinner.geographicalChart && geographicalChartData"></doughnut-chart>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4">
        <div class="dashboard__tile dashboard__tile--chart">
          <div class="d-flex justify-space-between align-center">
            <div class="dashboard__tile__header">Industry Classification</div>
            <!-- <div class="dashboard__tile__export cursor-pointer">Export</div> -->
          </div>
          <div class="dashboard__tile__chart">
            <div
              class="text-center py-5"
              v-if="spinner.industryChart">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <doughnut-chart :chart-data="industryChartData" :options="industryChartOptions" :height="340" v-if="!spinner.industryChart && industryChartData"></doughnut-chart>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DoughnutChart from '@/plugins/DoughnutChart.js'
import HorizontalBarChart from '@/plugins/HorizontalBarChart.js'
import Notification from '@/components/partials/Notification'
import { errorHandler } from '@/plugins/CustomAPI'

export default {
  components: {
    DoughnutChart,
    HorizontalBarChart,
    Notification
  },
  data: () => ({
    adverseMediaAlerts: null,
    complianceAlerts: null,
    creditRisks: [
      { creditRating: 'Very Low Risk', color: '#1e6b1d' },
      { creditRating: 'Low Risk', color: '#439c42' },
      { creditRating: 'Moderate Risk', color: '#ffaf02' },
      { creditRating: 'High Risk', color: '#ff7602' },
      { creditRating: 'Very High Risk', color: '#eb011b' }
    ],
    geographicalChartData: null,
    industryChartData: null,
    industryChartOptions: null,
    NAICScodes: [
      { code: '11', name: 'Agriculture, Forestry, Fishing and Hunting' },
      { code: '21', name: 'Mining, Quarrying, and Oil and Gas Extraction' },
      { code: '22', name: 'Utilities' },
      { code: '23', name: 'Construction' },
      { code: '31', name: 'Manufacturing' },
      { code: '32', name: 'Manufacturing' },
      { code: '33', name: 'Manufacturing' },
      { code: '42', name: 'Wholesale Trade' },
      { code: '44', name: 'Retail Trade' },
      { code: '45', name: 'Retail Trade' },
      { code: '48', name: 'Transportation and Warehousing' },
      { code: '49', name: 'Transportation and Warehousing' },
      { code: '51', name: 'Information' },
      { code: '52', name: 'Finance and Insurance' },
      { code: '53', name: 'Real Estate and Rental and Leasing' },
      { code: '54', name: 'Professional, Scientific, and Technical Services' },
      { code: '55', name: 'Management of Companies and Enterprises' },
      { code: '56', name: 'Administrative and Support and Waste Management and Remediation Services' },
      { code: '61', name: 'Educational Services' },
      { code: '62', name: 'Health Care and Social Assistance' },
      { code: '71', name: 'Arts, Entertainment, and Recreation' },
      { code: '72', name: 'Accommodation and Food Services' },
      { code: '81', name: 'Other Services (except Public Administration)' },
      { code: '92', name: 'Public Administration' }
    ],
    revenueChartData: null,
    riskChartData: null,
    spinner: {
      adverseMediaAlerts: false,
      complianceAlerts: false,
      geographicalChart: false,
      industryChart: false,
      revenueChart: false,
      riskChart: false
    }
  }),
  computed: {
    onboardingData () {
      return this.$store.getters.getOnboardingData
    }
  },
  created () {
    this.fillData()
  },
  methods: {
    fillData () {
      // Industry Classification
      this.spinner.industryChart = true
      this.$API.getIndustryClassifications({
        orgId: this.onboardingData.organization.id
      }).then(res => {
        if (res && res.industryClassifications && res.industryClassifications.length > 0) {
          let chartLabels = []
          let chartData = []
          let tooltips = []
          let count = 0
          let othersData = null
          for (const industry of this.$lodash.orderBy(res.industryClassifications, ['count'], ['desc'])) {
            let NAICScode = this.NAICScodes.find((el, i, arr) => { return el.code === industry.primaryCode })
            if (NAICScode) {
              // don't count unknown codes
              count++
              if (count < 6) {
                let name = NAICScode.name
                let shortName = name.length > 15 ? name.slice(0, 15) + '...' : name
                tooltips.push(name)
                chartLabels.push(shortName)
                chartData.push(Number(industry.count))
              } else {
                othersData += Number(industry.count)
              }
            }
          }
          if (othersData) {
            chartLabels.push('Others')
            chartData.push(othersData)
            tooltips.push('Others')
          }
          this.industryChartData = {
            datasets: [
              {
                backgroundColor: ['#2a40c3', '#00bdef', '#10ccbd', '#feaf01', '#412097', '#6689a0'],
                data: chartData,
                mctTooltips: tooltips
              }
            ],
            labels: chartLabels
          }
          this.industryChartOptions = {
            tooltips: {
              displayColors: false,
              enabled: true,
              callbacks: {
                label: function (tooltipItems, data) {
                  let tooltip = `${data.datasets[tooltipItems.datasetIndex].mctTooltips[tooltipItems.index]}: ${data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index]}`
                  if (tooltip.length > 42) {
                    let len = 42
                    let curr = len
                    let prev = 0
                    let tooltipSplitted = []
                    while (tooltip[curr]) {
                      if (tooltip[curr++] === ' ') {
                        tooltipSplitted.push(tooltip.substring(prev, curr))
                        prev = curr
                        curr += len
                      }
                    }
                    tooltipSplitted.push(tooltip.substr(prev))
                    tooltip = tooltipSplitted
                    // we can't get rid of a color indicators on an extra lines yet
                    // the issue page:
                    // https://github.com/chartjs/Chart.js/pull/2704
                    // that's why "displayColors: false" was added
                  }
                  return tooltip
                }
              }
            }
          }
        }
        this.spinner.industryChart = false
      }).fail(err => {
        this.spinner.industryChart = false
        if (err.status !== 404) {
          errorHandler(err)
        }
      })
      // Revenue Distribution
      this.spinner.revenueChart = true
      this.$API.getRevenueDistribution({
        orgId: this.onboardingData.organization.id
      }).then(res => {
        if (res && res.revenueDistribution) {
          let labels = []
          let values = []
          let labelNames = {
            zeroToTenMillion: '$0-$10M',
            tenToHundredMillion: '$10-$100M',
            hundredToFiveHundredMillion: '$100-$500M',
            fiveHundredMillionToOneBillion: '$500M-$1B',
            overOneBillion: 'Over $1B',
            noRevenueDataAvailable: 'No Revenue Data available'
          }
          for (const property in res.revenueDistribution) {
            labels.push(labelNames[property])
            values.push(res.revenueDistribution[property])
          }
          this.revenueChartData = {
            labels: labels,
            datasets: [
              {
                backgroundColor: ['#2a40c3', '#00bdef', '#10ccbd', '#feaf01', '#412097', '#6689a0'],
                data: values
              }
            ]
          }
        }
        this.spinner.revenueChart = false
      }).fail(err => {
        this.spinner.revenueChart = false
        if (err.status !== 404) {
          errorHandler(err)
        }
      })
      // Geographical Distribution
      this.spinner.geographicalChart = true
      this.$API.getGeographicDistribution({
        orgId: this.onboardingData.organization.id
      }).then(res => {
        if (res && res.geographicDistribution) {
          let chartLabels = []
          let chartData = []
          let count = 0
          let othersData = null
          for (const zone of this.$lodash.orderBy(res.geographicDistribution, ['count'], ['desc'])) {
            count++
            if (count < 6) {
              chartLabels.push(zone.country)
              chartData.push(Number(zone.count))
            } else {
              othersData += Number(zone.count)
            }
          }
          if (othersData) {
            chartLabels.push('Others')
            chartData.push(othersData)
          }
          this.geographicalChartData = {
            labels: chartLabels,
            datasets: [
              {
                backgroundColor: ['#2a40c3', '#00bdef', '#10ccbd', '#feaf01', '#412097', '#6689a0'],
                data: chartData
              }
            ]
          }
        }
        this.spinner.geographicalChart = false
      }).fail(err => {
        this.spinner.geographicalChart = false
        if (err.status !== 404) {
          errorHandler(err)
        }
      })
      // Credit Risk
      this.spinner.riskChart = true
      this.$API.getCreditRisk({
        orgId: this.onboardingData.organization.id
      }).then(res => {
        if (res && res.creditRisk) {
          let chartLabels = []
          let chartColors = []
          let chartData = []
          for (const risk of this.$lodash.orderBy(res.creditRisk, ['count'], ['desc'])) {
            let color = this.creditRisks.find((el, i, arr) => { return el.creditRating === risk.creditRating }).color
            chartLabels.push(risk.creditRating)
            chartColors.push(color)
            chartData.push(risk.count)
          }
          this.riskChartData = {
            labels: chartLabels,
            datasets: [
              {
                backgroundColor: chartColors,
                data: chartData
              }
            ]
          }
        }
        this.spinner.riskChart = false
      }).fail(err => {
        this.spinner.riskChart = false
        if (err.status !== 404) {
          errorHandler(err)
        }
      })
      // Adverse Media
      this.spinner.adverseMediaAlerts = true
      this.$API.getAdverseMediaAlerts({
        orgId: this.onboardingData.organization.id
      }).then(res => {
        if (res && res.adverseMediaAlerts) {
          this.adverseMediaAlerts = res.adverseMediaAlerts
        }
        this.spinner.adverseMediaAlerts = false
      }).fail(err => {
        this.spinner.adverseMediaAlerts = false
        if (err.status !== 404) {
          errorHandler(err)
        }
      })
      // Compliance Alerts
      this.spinner.complianceAlerts = true
      this.$API.getComplianceAlerts({
        orgId: this.onboardingData.organization.id
      }).then(res => {
        if (res && res.complianceAlerts) {
          this.complianceAlerts = res.complianceAlerts
        }
        this.spinner.complianceAlerts = false
      }).fail(err => {
        this.spinner.complianceAlerts = false
        if (err.status !== 404) {
          errorHandler(err)
        }
      })
    }
  }
}
</script>
