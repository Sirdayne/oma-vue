<template>
  <v-dialog
    v-model="showModal"
    persistent
    max-width="570"
  >
    <spinner v-if="monitoringSpinner || subscriptionSpinner"
             :close="close"
    ></spinner>
    <template v-else>
      <notification v-if="error" @close="error = null" type="error">
        <div v-html="error"></div>
      </notification>
      <stop-monitoring-confirmed v-if="confirmed"
                                 :close="close"
                                 :name="businessName"
                                 :calculated-end-date="calculatedEndDate"
                                 :close-text="closeText"
      >
      </stop-monitoring-confirmed>
      <template v-else-if="isAdmin">
        <template v-if="monitored === 'Y'">
          <stop-monitoring-reminder v-if="isMonitoredForPeriod"
                                    :close="close"
                                    :unmonitor-company="unmonitorCompanyWithConfirmation"
                                    :duration="duration"
                                    :duration-unit="durationUnit"
                                    :name="businessName"
                                    :calculated-end-date="calculatedEndDate"
                                    :close-text="closeText"
                                    :loading="loading"
          >
          </stop-monitoring-reminder>
          <stop-monitoring v-else
                           :close="close"
                           :unmonitor-company="unmonitorCompany"
                           :name="businessName"
                           :close-text="closeText"
                           :loading="loading"
          >
          </stop-monitoring>
        </template>
        <template v-else>
          <reactivate-monitor v-if="subscriptionStatus !== 'ACTIVE'"
                              :close="close"
                              :name="businessName"
                              :subscription-end-date="subscriptionEndDate"
                              :close-text="closeText"
                              :loading="loading"
          >
          </reactivate-monitor>
          <confirm-monitoring-subscription v-else-if="subscriptionPackageId === 2"
                                           :close="close"
                                           :duration="duration"
                                           :duration-unit="durationUnit"
                                           :monitor-company="monitorCompany"
                                           :name="businessName"
                                           :close-text="closeText"
                                           :loading="loading"
          >
          </confirm-monitoring-subscription>
          <confirm-monitoring v-else
                              :close="close"
                              :duration="duration"
                              :duration-unit="durationUnit"
                              :monitor-company="monitorCompany"
                              :name="businessName"
                              :close-text="closeText"
                              :loading="loading"
          >
          </confirm-monitoring>
        </template>
      </template>
      <not-permitted v-else
                     :monitored="monitored"
                     :close="close"
                     :close-text="closeText"
      ></not-permitted>
    </template>
  </v-dialog>
</template>

<script>

import moment from 'moment'
import spinner from '@/components/partials/modals/ModalMonitor/spinner'
import ConfirmMonitoring from '@/components/partials/modals/ModalMonitor/ConfirmMonitoring'
import ConfirmMonitoringSubscription from '@/components/partials/modals/ModalMonitor/ConfirmMonitoringSubscription'
import StopMonitoring from '@/components/partials/modals/ModalMonitor/StopMonitoring'
import StopMonitoringReminder from '@/components/partials/modals/ModalMonitor/StopMonitoringReminder'
import StopMonitoringConfirmed from '@/components/partials/modals/ModalMonitor/StopMonitoringConfirmed'
import NotPermitted from '@/components/partials/modals/ModalMonitor/NotPermitted'
import ReactivateMonitor from '@/components/partials/modals/ModalMonitor/ReactivateMonitor'
import Notification from '@/components/partials/Notification'

export default {
  components: {
    ReactivateMonitor,
    spinner,
    ConfirmMonitoring,
    ConfirmMonitoringSubscription,
    StopMonitoring,
    StopMonitoringReminder,
    StopMonitoringConfirmed,
    NotPermitted,
    Notification
  },
  props: [
    'showModal',
    'fetchCompany',
    'closeText',
    'trackId',
    'monitored',
    'monitoringId',
    'streetAddress',
    'businessName',
    'city',
    'state',
    'country',
    'zip'
  ],
  data: () => ({
    error: null,
    duration: 90,
    durationUnit: 'days',
    subscriptionPackageId: null,
    subscriptionStatus: null,
    subscriptionEndDate: null,
    calculatedEndDate: null,
    isMonitoredForPeriod: false,
    unmonitorWithConfirmation: false,
    confirmed: false,
    monitoringSpinner: true,
    subscriptionSpinner: true,
    loading: false
  }),
  computed: {
    getUserData () {
      return this.$store.getters.getUserData
    },
    getOnboardingData () {
      return this.$store.getters.getOnboardingData
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    }
  },
  watch: {
    'showModal' (val) {
      if (val) {
        this.resetData()
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    success () {
      this.$emit('success')
    },
    resetData () {
      this.unmonitorWithConfirmation = false
      this.confirmed = false
      this.duration = null
      this.durationUnit = null
      this.calculatedEndDate = null
      this.fetchData()
    },
    reFetchData () {
      if (this.fetchCompany) {
        this.fetchCompany()
      }
    },
    fetchData () {
      this.fetchSubscriptionStatus()
      this.fetchMonitoringStatus()
    },
    checkIsMonitoredForPeriod (monitoringStartDate) {
      let now = moment(moment().format('MM/DD/YYYY'))
      this.calculatedEndDate = moment(monitoringStartDate).add(this.duration, this.durationUnit).format('MM/DD/YYYY')
      this.isMonitoredForPeriod = moment(this.calculatedEndDate).isSameOrAfter(now)
    },
    fetchMonitoringStatus () {
      this.monitoringSpinner = true
      const data = {
        orgId: this.getOnboardingData.organization.id,
        monitoringId: this.monitoringId
      }
      this.$API.getMonitoringStatus({
        data
      }).then((res) => {
        if (res) {
          if (res.subscriptionPackage) {
            if (res.subscriptionPackage.duration) {
              this.duration = res.subscriptionPackage.duration
            }
            if (res.subscriptionPackage.durationUnit) {
              this.durationUnit = res.subscriptionPackage.durationUnit
            }
          }
          this.checkIsMonitoredForPeriod(res.monitoringStartDate)
        }
        this.monitoringSpinner = false
      }).fail(() => {
        this.monitoringSpinner = false
      })
    },
    fetchSubscriptionStatus () {
      this.subscriptionSpinner = true
      this.$API.getSubscriptionDetails({
        orgId: this.getOnboardingData.organization.id
      }).then(res => {
        if (res) {
          this.subscriptionStatus = res.subscriptionStatus
          this.subscriptionEndDate = res.subscriptionEndDate ? moment(res.subscriptionEndDate).format('MM/DD/YYYY') : null
          this.subscriptionPackageId = res.actualFreeMonitoredCompanyCount < res.allowedFreeMonitoredCompanyCount ? 1 : res.actualFreeMonitoredCompanyCount >= res.allowedFreeMonitoredCompanyCount ? 2 : null
        }
        this.subscriptionSpinner = false
      }).fail(() => {
        this.subscriptionSpinner = false
      })
    },
    monitorCompany () {
      this.loading = true
      const data = {
        streetAddress: this.streetAddress,
        city: this.city,
        businessName: this.businessName,
        country: this.country,
        cuid: this.getUserData.id,
        orgId: this.getOnboardingData.organization.id,
        state: this.state,
        trackId: this.trackId,
        zip: this.zip,
        subscriptionPackageId: this.subscriptionPackageId
      }
      this.$API.companyMonitorStart({
        data
      }).then(() => {
        this.loading = false
        this.close()
        this.success()
        this.reFetchData()
      }).fail(err => {
        this.loading = false
        this.showError(err.responseJSON)
      })
    },
    unmonitorCompanyWithConfirmation () {
      this.unmonitorWithConfirmation = true
      this.unmonitorCompany()
    },
    unmonitorCompany () {
      this.loading = true
      const data = {
        orgId: this.getOnboardingData.organization.id,
        trackId: this.trackId,
        monitoringId: this.monitoringId
      }
      this.$API.companyMonitorStop({
        data
      }).then(() => {
        this.loading = false
        if (this.unmonitorWithConfirmation) {
          this.confirmed = true
        } else {
          this.close()
        }
        this.success()
        this.reFetchData()
      }).fail(err => {
        this.loading = false
        this.showError(err.responseJSON)
      })
    },
    showError (err) {
      this.error = err.message ? err.message : 'Something went wrong'
      this.error += err.traceId ? `<div class="trace-id">{Trace id: ${err.traceId}}</div>` : ''
    }
  }
}
</script>
