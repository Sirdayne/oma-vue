<template>
  <div class="company-profile">
    <modal-monitor :show-modal="modalMonitor"
                   :fetch-company="fetchData"
                   @close="modalMonitor = false"
                   close-text="Back to profile"
                   :track-id="getTrackId"
                   :monitored="header.monitored"
                   :monitoring-id="header.monitoringId"
                   :streetAddress="$route.query.address1"
                   :businessName="$route.query.companyName"
                   :city="$route.query.city"
                   :state="$route.query.state"
                   :country="$route.query.country"
                   :zip="$route.query.zip"
    >
    </modal-monitor>
    <modal-master-list :show-modal="modalMasterList"
                       close-text="Back to profile"
                       :name="header.businessName"
                       :vendor-upload-id="vendorUploadId"
                       @close="modalMasterList = false"
    >
    </modal-master-list>
    <div v-if="spinner" class="spinner-container">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div v-else>
      <company-profile-head v-if="getTrackId"
                            :track-id="getTrackId"
                            :header="header"
                            :monitoring-end-date-expire-days="monitoringEndDateExpireDays"
                            @openModalMonitor="openModalMonitor"
                            @openModalMasterList="openModalMasterList"
                            :is-allowed-start-monitoring="monitoringStatus.isAllowedStartMonitoring"
                            :is-allowed-stop-monitoring="monitoringStatus.isAllowedStopMonitoring"
      ></company-profile-head>
      <company-profile-head v-else :header="header"></company-profile-head>
      <div class="company-profile-tabs__white">
        <v-tabs>
          <v-tab><span class="company-profile-tab-title company-profile-tab-title__first">Company Details</span></v-tab>
          <v-tab><span class="company-profile-tab-title company-profile-tab-title__second">Identification and Classification</span></v-tab>
          <v-tab>
          <span class="company-profile-tab">
            <span class="company-profile-tab-title company-profile-tab-title__fourth">Compliance Details</span>
            <template v-if="getTotalComplianceAlerts">
              <span v-if="getTrackId && header.monitored !== 'Y'" class="company-profile__alert company-profile__alert-oval"></span>
              <span v-else class="company-profile__alert">{{ getTotalComplianceAlerts }}</span>
            </template>
          </span>
          </v-tab>
          <v-tab-item>
            <company-details :header="header" :basic="basic" :premium="premium" :is-premium-data="isPremiumData"></company-details>
          </v-tab-item>
          <v-tab-item>
            <identification-classification :basic="basic" :premium="premium" :is-premium-data="isPremiumData"></identification-classification>
          </v-tab-item>
          <v-tab-item v-if="isPremiumData" class="tab-blurred">
            <compliance-details-premium @openModalMonitor="openModalMonitor"></compliance-details-premium>
          </v-tab-item>
          <v-tab-item v-else>
            <compliance-details :compliance-details="complianceDetails" :is-premium-data="isPremiumData"></compliance-details>
          </v-tab-item>
        </v-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyProfileHead from '@/components/pages/CompanyProfile/CompanyProfileHead'
import CompanyDetails from '@/components/pages/CompanyProfile/tabs/CompanyDetails'
import IdentificationClassification from '@/components/pages/CompanyProfile/tabs/IdentificationClassification'
import ComplianceDetails from '@/components/pages/CompanyProfile/tabs/ComplianceDetails'
import ComplianceDetailsPremium from '@/components/pages/CompanyProfile/tabs/ComplianceDetailsPremium'
import SectionDivider from '@/components/partials/SectionDivider'
import FooterBlock from '@/components/partials/Footer'
import SearchBlock from '@/components/partials/Search'
import ModalMonitor from '@/components/partials/modals/ModalMonitor/index'
import ModalMasterList from '@/components/partials/modals/ModalMasterList'
import { errorHandler } from '@/plugins/CustomAPI'
import moment from 'moment'

export default {
  components: {
    CompanyProfileHead,
    CompanyDetails,
    IdentificationClassification,
    ComplianceDetailsPremium,
    ComplianceDetails,
    SectionDivider,
    FooterBlock,
    SearchBlock,
    ModalMonitor,
    ModalMasterList
  },
  data: () => ({
    spinner: true,
    isPremiumData: false,
    modalMonitor: false,
    modalMasterList: false,
    vendorUploadId: null,
    header: {
      setAddress: ''
    },
    basic: {
      businessClassification: {
        SIC: {},
        NAICS: {}
      }
    },
    verification: {
      verificationDetails: {}
    },
    premium: {
      creditRiskData: {},
      revenueData: {},
      executivesData: {
        executivesDetails: [
          {
            address: {}
          }
        ]
      },
      employeesData: {},
      parentCompanyData: {
        parentCompanyDetails: {}
      },
      verificationData: {
        verificationDetails: {}
      },
      complianceAlerts: {},
      complianceData: {
        complianceDataFlag: false,
        complianceDetails: []
      }
    },
    complianceDetails: [],
    monitoringStatus: {
      isAllowedStartMonitoring: false,
      isAllowedStopMonitoring: false
    },
    monitoringEndDateExpireDays: null
  }),
  computed: {
    getTrackId () {
      return this.$route.params.trackId
    },
    getUserData () {
      return this.$store.getters.getUserData
    },
    getOnboardingData () {
      return this.$store.getters.getOnboardingData
    },
    getTotalComplianceAlerts () {
      let quantity = 0
      if (this.complianceDetails && this.complianceDetails.length > 0) {
        this.complianceDetails.forEach(detail => {
          if (detail.complianceAlerts) {
            Object.keys(detail.complianceAlerts).forEach(key => {
              quantity += detail.complianceAlerts[key] ? detail.complianceAlerts[key] : 0
            })
          }
        })
      }
      return quantity
    }
  },
  watch: {
    'getTrackId' (val, oldVal) {
      if (val !== oldVal) {
        this.fetchData()
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    resetData () {
      this.header = {}
      this.basic = {}
      this.premium = {}
      this.complianceDetails = []
    },
    fetchData () {
      this.spinner = true
      this.resetData()
      if (this.getTrackId) {
        this.fetchCompanyDetails()
      } else {
        this.fetchMyCompanyDetails()
      }
    },
    setMonitoringEndDateExpireDays (res) {
      let now = moment(moment().format('MM/DD/YYYY'))
      if (res.monitoringStartDate && res.subscriptionPackage) {
        let calculatedEndDate = moment(res.monitoringStartDate).add(res.subscriptionPackage.duration, res.subscriptionPackage.durationUnit).format('MM/DD/YYYY')
        this.monitoringEndDateExpireDays = res.active && !res.isAllowedStopMonitoring && moment(calculatedEndDate).isSameOrAfter(now) ? moment(calculatedEndDate).diff(now, 'days') : null
      } else {
        this.monitoringEndDateExpireDays = null
      }
    },
    fetchMonitoringStatus () {
      const data = {
        orgId: this.getOnboardingData.organization.id,
        monitoringId: this.header.monitoringId
      }
      this.$API.getMonitoringStatus({
        data
      }).then((res) => {
        if (res) {
          this.monitoringStatus.isAllowedStopMonitoring = res.isAllowedStopMonitoring
          this.monitoringStatus.isAllowedStartMonitoring = res.isAllowedStartMonitoring
          this.setMonitoringEndDateExpireDays(res)
        } else {
          this.monitoringStatus.isAllowedStopMonitoring = false
          this.monitoringStatus.isAllowedStopMonitoring = false
          this.monitoringEndDateExpireDays = null
        }
        this.spinner = false
      }).fail(() => {
        this.monitoringStatus.isAllowedStopMonitoring = false
        this.monitoringStatus.isAllowedStopMonitoring = false
        this.monitoringEndDateExpireDays = null
        this.spinner = false
      })
    },
    setData (res) {
      if (res && !res.fault) {
        this.header = res.headerData ? res.headerData : {}
        this.basic = res.basicData ? res.basicData : {}
        this.premium = res.premiumData ? res.premiumData : {}
        if (this.premium && this.premium.complianceData && this.premium.complianceData.complianceDetails && this.premium.complianceData.complianceDetails.length > 0) {
          this.complianceDetails = this.premium.complianceData.complianceDetails
        } else {
          this.complianceDetails = []
        }
      }
      if (this.header && this.header.address) {
        this.setCompanyProfileAddress(this.header.address)
      }
      this.fetchMonitoringStatus()
    },
    fetchMyCompanyDetails () {
      this.isPremiumData = false
      this.$API.getMyCompanyDetails({
        cuid: this.getUserData.id
      }).then(res => {
        this.setData(res)
        this.spinner = false
      }).fail(err => {
        this.spinner = false
        this.errorHandle(err)
      })
    },
    fetchCompanyDetails () {
      this.isPremiumData = true
      const data = {
        address1: this.$route.query.address1,
        city: this.$route.query.city,
        companyName: this.$route.query.companyName,
        country: this.$route.query.country,
        cuid: this.getUserData.id,
        orgId: this.getOnboardingData.organization.id,
        state: this.$route.query.state,
        trackId: this.getTrackId,
        zip: this.$route.query.zip
      }
      this.$API.getCompanyDetails({
        data
      }).then(res => {
        this.setData(res)
        if (this.header && this.header.monitored === 'Y') {
          this.isPremiumData = false
        }
      }).fail(err => {
        this.errorHandle(err)
      })
    },
    setGenericError () {
      const payload = {
        title: 'Something went wrong',
        text: 'Sorry, we’re unable to connect to our systems at this time. Please try again later.',
        btn: 'Retry'
      }
      this.$store.dispatch('setGenericError', payload)
    },
    errorHandle (err) {
      this.setGenericError()
      errorHandler(err)
    },
    setCompanyProfileAddress (data) {
      let streetAddress = []
      if (data) {
        if (data.streetAddress) {
          streetAddress.push(data.streetAddress)
        }
        if (data.city) {
          streetAddress.push(data.city)
        }
        if (data.state) {
          streetAddress.push(data.state)
        }
        if (data.zip) {
          streetAddress.push(data.zip)
        }
        if (data.country) {
          streetAddress.push(data.country)
        }
        this.header.setAddress = streetAddress.join(', ')
      }
    },
    openModalMasterList () {
      this.modalMasterList = true
    },
    openModalMonitor () {
      this.modalMonitor = true
    }
  }
}
</script>
