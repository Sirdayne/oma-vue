<template>
  <v-container pa-0>
    <template v-if="counts.total && counts.total > 0">
      <v-row class="dashboard__above-tiles" v-if="type === 'monitored'">
        <v-col
          cols="12"
          sm="6"
        >
          <input
            v-model="filter.input"
            type="text"
            class="input input__search"
            :placeholder="`Search the ${counts.total} compan${ counts.total > 1 ? 'ies' : 'y' } you are currently monitoring`">
        </v-col>
        <v-col
          cols="12"
          sm="3"
        >
          <v-btn
            block
            color="primary"
            :loading="spinner.companiesList"
            @click="companiesGet(true)">Search</v-btn>
        </v-col>
        <v-col
          cols="12"
          sm="3"
          class="text-right"
        >
          <v-btn
            color="primary"
            class="dashboard__above-tiles__download-button"
            :loading="spinner.downloadButton"
            @click="CSVDownload()">Download .CSV</v-btn>
        </v-col>
      </v-row>
      <v-row class="dashboard__above-tiles" v-if="type === 'master'">
        <v-col
          cols="12"
          sm="4"
        >
          <input
            v-model="filter.input"
            type="text"
            class="input input__search"
            :placeholder="`Search your master vendor list of ${counts.total} compan${ counts.total > 1 ? 'ies' : 'y' }`">
        </v-col>
        <v-col
          cols="12"
          sm="3"
        >
          <select
            v-model="filter.type"
            class="select">
            <option v-for="option in filterTypes" :value="option.value" :key="option.value">
              {{ option.text }}
            </option>
          </select>
        </v-col>
        <v-col
          cols="12"
          sm="2"
          class="pt-4 pr-md-5"
        >
          <v-btn
            block
            color="primary"
            :loading="spinner.companiesList"
            @click="companiesGet(true)">Search</v-btn>
        </v-col>
        <v-col
          cols="12"
          sm="3"
          class="pt-4 text-right"
        >
          <v-btn
            color="primary"
            class="dashboard__above-tiles__download-button"
            :loading="spinner.downloadButton"
            @click="CSVDownload()">Download .CSV</v-btn>
          <div class="mt-3 dashboard__above-tiles__link float-right">
            <span @click="modal.manageYourFile.show = true">Manage Master List</span>
          </div>
        </v-col>
      </v-row>
      <v-row
        v-if="counts.filtered && counts.filtered > 0">
        <v-col
          cols="12"
          sm="6"
          v-for="company in companiesData"
          :key="type === 'monitored' ? company.monitoringId : company.vendorUploadId">
          <div class="dashboard__tile dashboard__tile--card">
            <div
              class="dashboard__tile__alerts"
              v-show="Number(company.alertCount) > 0">
              <span class="red-oval red-oval--count">{{ company.alertCount }}</span>
            </div>
            <div class="dashboard__tile__header-wrapper d-inline-flex justify-space-between align-center">
              <div class="dashboard__tile__header">
                {{ company.businessName }}
                <div
                class="dashboard__tile__status"
                v-if="company.monitored === 'Y'">Monitored</div>
              </div>
            </div>
            <div class="dashboard__tile__address">
              {{ company.streetAddress }}, {{ company.city }}, {{ company.state }}, {{ company.country }}
            </div>
            <div class="dashboard__tile__url">
              {{ company.url | withoutProtocol }}
            </div>
            <div
              class="dashboard__tile__hoverbox"
              v-if="company.trackId || company.vendorUploadId">
              <v-btn
                class="mr-2"
                v-if="company.trackId"
                @click="profileView(company)">View Profile</v-btn>
              <v-btn
                class="mr-2"
                v-if="company.trackId && company.monitoringId && company.isAllowedStopMonitoring && (type === 'monitored' || (type === 'master' && company.monitored === 'Y'))"
                @click="monitoring(company, 'stop')">Stop Monitoring</v-btn>
              <v-btn
                class="mr-2"
                v-else-if="type === 'master' && company.monitored !== 'Y' && company.trackId && company.isAllowedStartMonitoring"
                @click="monitoring(company, 'start')">Monitor</v-btn>
              <v-btn
                v-if="type === 'master' && company.vendorUploadId"
                @click="remove(company, false)">Remove from list</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <div
        class="generic-error"
        v-else>
        <img src="../../../assets/images/icon-search.svg" class="generic-error__img generic-error__img__no-search" alt="Search">
        <h4 class="generic-error__title">No results found.</h4>
        <p class="generic-error__text">
          Check for possible spelling errors or simplify your search parameters, then try searching again.
        </p>
      </div>
    </template>
    <v-row
      class="text-center"
      v-if="spinner.companiesList">
      <v-col
        cols="12">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <template v-if="companiesData && companiesData.length > 0 && pagination.pages > 1">
      <div class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="pagination.current"
                  class="my-4"
                  :length="pagination.pages"
                  @input="companiesGet(false)"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </template>
    <modal-monitor
      close-text="Back to dashboard"
      :track-id="modal.monitor.trackId"
      :monitored="modal.monitor.monitored"
      :monitoringId="modal.monitor.monitoringId"
      :streetAddress="modal.monitor.streetAddress"
      :businessName="modal.monitor.businessName"
      :city="modal.monitor.city"
      :state="modal.monitor.state"
      :country="modal.monitor.country"
      :zip="modal.monitor.zip"
      :show-modal="modal.monitor.show"
      @success="companiesGet(true)"
      @close="modal.monitor.show = false"></modal-monitor>
    <modal-manage-your-file
      :show-modal="modal.manageYourFile.show"
      @close="modal.manageYourFile.show = false"></modal-manage-your-file>
    <modal-master-list
      close-text="Back to dashboard"
      :show-modal="modal.removeFromMasterList.show"
      :name="modal.removeFromMasterList.company ? modal.removeFromMasterList.company.businessName : ''"
      :vendorUploadId="modal.removeFromMasterList.company ? modal.removeFromMasterList.company.vendorUploadId : ''"
      @success="remove(modal.removeFromMasterList.company, true)"
      @close="modal.removeFromMasterList.show = false"></modal-master-list>
  </v-container>
</template>

<script>
import ModalManageYourFile from '@/components/partials/modals/ModalManageYourFile'
import ModalMasterList from '@/components/partials/modals/ModalMasterList'
import ModalMonitor from '@/components/partials/modals/ModalMonitor'
import { errorHandler } from '@/plugins/CustomAPI'

export default {
  components: {
    ModalManageYourFile,
    ModalMasterList,
    ModalMonitor
  },
  props: {
    type: String
  },
  data: () => ({
    companiesData: null,
    counts: {
      filtered: null,
      highconfidence: null,
      likelymatch: null,
      nomatch: null,
      total: null
    },
    filter: {
      input: null,
      type: ''
    },
    modal: {
      manageYourFile: {
        show: false
      },
      removeFromMasterList: {
        company: null,
        show: false
      },
      monitor: {
        businessName: null,
        country: null,
        monitored: 'N',
        monitoringId: null,
        show: false,
        state: null,
        streetAddress: null,
        trackId: null,
        zip: null
      }
    },
    pagination: {
      companiesPerPage: 50,
      current: 1,
      pages: null
    },
    showMasterListModal: false,
    spinner: {
      companiesList: false,
      downloadButton: false
    }
  }),
  computed: {
    filterTypes () {
      return [
        {
          text: `View entire list (${this.counts.total})`,
          value: ''
        },
        {
          text: `Matched (${this.counts.highconfidence})`,
          value: 'highconfidence'
        },
        {
          text: `Likely match (${this.counts.likelymatch})`,
          value: 'likelymatch'
        },
        {
          text: `No match (${this.counts.nomatch})`,
          value: 'nomatch'
        }
      ]
    },
    onboardingData () {
      return this.$store.getters.getOnboardingData
    }
  },
  created () {
    this.spinner.companiesList = true
    this.companiesGet(true)
  },
  methods: {
    masterCompaniesGet () {
      this.spinner.companiesList = true
      this.$API.getMasterCompanies({
        orgId: this.onboardingData.organization.id,
        page: this.pagination.current || 1,
        pageSize: 50,
        companyName: this.filter.input || '',
        matchType: this.filter.type || ''
      }).then(res => {
        if (res.totalMasterCount && res.totalMasterCount > 0) {
          this.companiesData = res.masterList
          this.counts = {
            total: res.totalMasterCount,
            filtered: res.totalSearchCount,
            highconfidence: res.hcCount,
            likelymatch: res.lmCount,
            nomatch: res.nmCount
          }
          this.pagination.pages = Math.ceil(this.counts.filtered / this.pagination.companiesPerPage)
          this.$store.dispatch('setDashboardMasterState', true)
        } else {
          this.pagination.pages = null
          this.$store.dispatch('setDashboardMasterState', false)
        }
        this.spinner.companiesList = false
      }).fail(err => {
        this.spinner.companiesList = false
        if (err.status === 404) {
          this.$store.dispatch('setDashboardMasterState', false)
        } else {
          this.$store.dispatch('setGenericError', {
            title: 'Something went wrong',
            text: 'Sorry, we’re unable to connect to our systems at this time. Please try again later.',
            btn: 'Try Again'
          })
          errorHandler(err)
        }
      })
    },
    monitoredCompaniesGet () {
      this.spinner.companiesList = true
      this.$API.getMonitoredCompanies({
        orgId: this.onboardingData.organization.id,
        page: this.pagination.current || 1,
        pageSize: 50,
        companyName: this.filter.input || ''
      }).then(res => {
        if (res.totalMonitoredCount && res.totalMonitoredCount > 0) {
          this.companiesData = res.monitoredList
          this.counts.total = res.totalMonitoredCount
          this.counts.filtered = res.totalSearchCount
          this.pagination.pages = Math.ceil(this.counts.filtered / this.pagination.companiesPerPage)
          this.$store.dispatch('setDashboardMonitoredState', true)
        } else {
          this.pagination.pages = null
          this.$store.dispatch('setDashboardMonitoredState', false)
        }
        this.spinner.companiesList = false
      }).fail(err => {
        this.spinner.companiesList = false
        if (err.status === 404) {
          this.$store.dispatch('setDashboardMasterState', false)
        } else {
          this.$store.dispatch('setGenericError', {
            title: 'Something went wrong',
            text: 'Sorry, we’re unable to connect to our systems at this time. Please try again later.',
            btn: 'Try Again'
          })
          errorHandler(err)
        }
      })
    },
    companiesGet (fromStart) {
      if (fromStart) {
        this.pagination.current = 1
      }
      this.subscriptionStatusGet()
      if (this.type === 'master') {
        this.masterCompaniesGet()
      } else if (this.type === 'monitored') {
        this.monitoredCompaniesGet()
      }
    },
    subscriptionStatusGet () {
      this.$API.getSubscriptionDetails({
        orgId: this.onboardingData.organization.id
      }).then(res => {
        this.$store.dispatch('setDashboardMonitoredCompaniesCount', res.totalMonitoringCompanyCount)
      }).fail(err => {
        if (err.status !== 404) {
          errorHandler(err)
        }
      })
    },
    CSVDownload () {
      this.spinner.downloadButton = true
      if (this.type === 'master') {
        this.$API.downloadMasterList({
          orgId: this.onboardingData.organization.id
        }).then(res => {
          const url = window.URL.createObjectURL(new Blob([res]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'masterCompaniesList.csv')
          document.body.appendChild(link)
          link.click()
          this.spinner.downloadButton = false
        }).fail(err => {
          this.spinner.downloadButton = false
          // for some reasons cui.js treats this query as failed in case of success
          if (err.status === 200) {
            const url = window.URL.createObjectURL(new Blob([err.responseText]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'masterCompaniesList.csv')
            document.body.appendChild(link)
            link.click()
          } else {
            this.$store.dispatch('setGenericError', {
              title: 'Something went wrong',
              text: 'Your request cannot be completed, please try again.',
              btn: 'Retry'
            })
            errorHandler(err)
          }
        })
      } else if (this.type === 'monitored') {
        this.$API.downloadMonitoredList({
          orgId: this.onboardingData.organization.id
        }).then(res => {
          const url = window.URL.createObjectURL(new Blob([res]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'monitoredCompaniesList.csv')
          document.body.appendChild(link)
          link.click()
          this.spinner.downloadButton = false
        }).fail(err => {
          this.spinner.downloadButton = false
          // for some reasons cui.js treats this query as failed in case of success
          if (err.status === 200) {
            const url = window.URL.createObjectURL(new Blob([err.responseText]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'monitoredCompaniesList.csv')
            document.body.appendChild(link)
            link.click()
          } else {
            this.$store.dispatch('setGenericError', {
              title: 'Something went wrong',
              text: 'Your request cannot be completed, please try again.',
              btn: 'Retry'
            })
            errorHandler(err)
          }
        })
      }
    },
    profileView (company) {
      const query = {
        companyName: company.businessName,
        address1: company.address1,
        city: company.city,
        state: company.state,
        country: company.country,
        zip: company.zip
      }
      this.$router.push({ name: 'CompanyProfile', params: { trackId: company.trackId }, query: query })
    },
    monitoring (company, mode) {
      this.modal.monitor = {
        businessName: company.businessName,
        country: company.country,
        monitored: (mode === 'start') ? 'N' : 'Y',
        monitoringId: company.monitoringId,
        show: true,
        state: company.state,
        streetAddress: company.streetAddress,
        trackId: company.trackId,
        zip: company.zip
      }
    },
    remove (company, confirmed) {
      if (!this.onboardingData.organization.id || !company.vendorUploadId) return
      if (confirmed) {
        this.modal.removeFromMasterList.show = false
        this.companiesGet()
      } else {
        this.modal.removeFromMasterList.company = company
        this.modal.removeFromMasterList.show = true
      }
    }
  }
}
</script>
