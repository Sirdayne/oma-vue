<template>
  <div class="manage-subscription">
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <div class="manage-subscription__block">
          <section-divider>Upgrade Subscription</section-divider>
          <div class="manage-subscription__text">
            <template v-if="details && details.subscriptionStatus !== 'INACTIVE'">
              If at anytime you would like to upgrade your account to the Enterprise version of Intregity, you may contact our sales team at (XXX) XXX-XXXX. Our office hours are between 9AM-5PM EST.
            </template>
            <template v-else>
              <div class="pb-1">
                <strong>You currently have Limited Access which includes the following features:</strong>
                <ul class="manage-subscription__list mt-3 mb-10">
                  <li v-if="!details">View your own company profile</li>
                  <li>Search the Trade Directory for individual companies</li>
                  <li>Upload your master list to find all of your trading partners</li>
                </ul>
                <strong>Subscribe to take control of risk and compliance within your supply chain by:</strong>
                <ul class="manage-subscription__list mt-3">
                  <li>Monitoring risk and compliance data</li>
                  <li>Accessing analytics about your trading partners</li>
                  <li>Receiving real-time alerts about risks and compliance data changes</li>
                </ul>
              </div>
              <div class="manage-subscription__button">
                <v-btn
                  color="primary"
                  outlined
                  @click="$router.push('/pricing')"
                >
                  View Pricing Plans
                </v-btn>
              </div>
            </template>
          </div>
        </div>
        <div
          class="manage-subscription__block"
          v-if="details && (details.subscriptionStatus === 'ACTIVE' || details.subscriptionStatus === 'PENDING_INACTIVE')">
          <section-divider>
            <template v-if="details.subscriptionStatus === 'ACTIVE'">Cancel Subscription</template>
            <template v-else-if="details.subscriptionStatus === 'PENDING_INACTIVE'">Reactivate Subscription</template>
          </section-divider>
          <div class="manage-subscription__text">
            <template v-if="details.subscriptionStatus === 'ACTIVE'">
              If you wish to cancel your Integrity subscription click the “Cancel Subscription” button below to deactivate your account. If you change your mind and wish to use Integrity again after the account is suspended, log back in and choose a pricing model to reactivate your account. You will also have to re-monitor all companies.
            </template>
            <template v-else-if="details.subscriptionStatus === 'PENDING_INACTIVE'">
              Your Integrity subscription was recently cancelled. You may revert these changes to continue getting Monitoring alerts and compliance information.
            </template>
          </div>
          <div class="manage-subscription__note">
            <template v-if="details.subscriptionStatus === 'ACTIVE'">
              <strong>Please Note:</strong> Your account cancellation requires a 90 day notice.
            </template>
            <template v-else-if="details.subscriptionStatus === 'PENDING_INACTIVE'">
              Please Note: You have until {{ $moment(details.subscriptionEndDate).format('MM/DD/YYYY') }} to reactivate your subscripton without interruption.
            </template>
          </div>
          <div class="manage-subscription__button">
            <v-btn
              color="primary"
              outlined
              @click="modal.subscriptionCancel.show = true"
              v-if="details.subscriptionStatus === 'ACTIVE'"
            >
              Cancel Subscription
            </v-btn>
            <v-btn
              color="primary"
              @click="modal.subscriptionReactivate.show = true"
              v-if="details.subscriptionStatus === 'PENDING_INACTIVE'"
            >
              Reactivate Subscription
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="manage-subscription__export"
      >
        <div class="manage-subscription__export__error-box">
          <notification type="error" v-if="error.export">
            {{ error.export }}
          </notification>
        </div>
        <div class="manage-subscription__block">
          <section-divider>Export Data</section-divider>
          <div class="manage-subscription__text">
            Download a backup of your enhanced Master List for safekeeping.
          </div>
          <div class="manage-subscription__button">
            <v-btn
              color="primary"
              @click="masterListExport()">Export Master List</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-dialog
      v-model="modal.subscriptionCancel.show"
      persistent
      max-width="570"
    >
      <v-card
        class="settings__modal">
        <v-card-title>
          <div class="d-flex flex-row align-center justify-space-between modal__header">
            <div>
              Are you sure?
            </div>
            <div class="modal__header__icon">
              <v-icon @click="modal.subscriptionCancel.show = false">
                highlight_off
              </v-icon>
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          By cancelling your account, your entire organization will lose access to the Intregity application on <strong>{{ $moment().add(90, 'days').format('MM/DD/YYYY') }}</strong>.
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between">
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-btn
                color="primary"
                block
                @click="subscriptionCancel()"
                :loading="spinner.subscriptionCancel"
              >
                Cancel Subscription
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-btn
                text
                color="primary"
                block
                @click="modal.subscriptionCancel.show = false"
              >
                Keep using Integrity
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="modal.subscriptionCancelled.show"
      persistent
      max-width="570"
    >
      <v-card
        class="settings__modal">
        <v-card-title>
          <div class="d-flex flex-row align-center justify-space-between modal__header">
            <div>
              Account cancelled
            </div>
            <div class="modal__header__icon">
              <v-icon @click="modal.subscriptionCancelled.show = false">
                highlight_off
              </v-icon>
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          Your account has successfuly been cancelled. You will still be able to use your Integrity account until <strong>{{ $moment().add(90, 'days').format('MM/DD/YYYY') }}</strong>.
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between">
          <v-btn
            text
            color="primary"
            block
            @click="modal.subscriptionCancelled.show = false"
          >
            Back to Manage Subscription
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="modal.subscriptionReactivate.show"
      persistent
      max-width="570"
    >
      <v-card
        class="settings__modal">
        <v-card-title>
          <div class="d-flex flex-row align-center justify-space-between modal__header">
            <div>
              Reactivate now
            </div>
            <div class="modal__header__icon">
              <v-icon @click="modal.subscriptionReactivate.show = false">
                highlight_off
              </v-icon>
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          Reactivate your subscription now to keep up to date on Compliance Alerts on your Monitored Companies.
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between">
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-btn
                color="primary"
                block
                @click="subscriptionReactivate()"
                :loading="spinner.subscriptionReactivate"
              >
                Reactivate Subscription
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-btn
                text
                color="primary"
                block
                @click="modal.subscriptionReactivate.show = false"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="modal.subscriptionReactivated.show"
      persistent
      max-width="570"
    >
      <v-card
        class="settings__modal">
        <v-card-title>
          <div class="d-flex flex-row align-center justify-space-between modal__header">
            <div>
              Account reactivated
            </div>
            <div class="modal__header__icon">
              <v-icon @click="modal.subscriptionReactivated.show = false">
                highlight_off
              </v-icon>
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          Congratulations! Your account has successfuly been reactivated. <template v-if="details && details.subscriptionEndDate">Your next billing cycle will occur on <strong>{{ $moment(details.subscriptionEndDate).format('MM/DD/YYYY') }}</strong></template>.
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between">
          <v-btn
            text
            color="primary"
            block
            @click="modal.subscriptionReactivated.show = false"
          >
            Back to Manage Subscription
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Notification from '@/components/partials/Notification'
import SectionDivider from '@/components/partials/SectionDivider'
import { errorHandler } from '@/plugins/CustomAPI'

export default {
  props: {
    details: Object
  },
  components: {
    Notification,
    SectionDivider
  },
  data: () => ({
    error: {
      export: null
    },
    modal: {
      subscriptionReactivate: {
        show: false
      },
      subscriptionReactivated: {
        show: false
      },
      subscriptionCancel: {
        show: false
      },
      subscriptionCancelled: {
        show: false
      }
    },
    spinner: {
      subscriptionReactivate: false,
      subscriptionCancel: false
    }
  }),
  computed: {
    onboardingData () {
      return this.$store.getters.getOnboardingData
    }
  },
  methods: {
    masterListExport () {
      this.$API.downloadMasterList({
        orgId: this.onboardingData.organization.id
      }).then(res => {
        const url = window.URL.createObjectURL(new Blob([res]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'masterCompaniesList.csv')
        document.body.appendChild(link)
        link.click()
      }).fail(err => {
        // for some reasons cui.js treats this query as failed in case of success
        if (err.status === 200) {
          const url = window.URL.createObjectURL(new Blob([err.responseText]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'masterCompaniesList.csv')
          document.body.appendChild(link)
          link.click()
        } else if (err.status === 404) {
          this.error.export = 'Sorry, No Results Found'
        } else if (err.status === 500) {
          this.error.export = 'Sorry, we’re unable to connect to our systems at this time. Please try again later.'
        } else {
          errorHandler(err)
        }
      })
    },
    subscriptionCancel () {
      this.spinner.subscriptionCancel = true
      this.$API.postStopSubscription({
        orgId: this.onboardingData.organization.id,
        data: {
          subscriptionPackageId: 1
        }
      }).then(res => {
        this.spinner.subscriptionCancel = false
        this.modal.subscriptionCancel.show = false
        this.modal.subscriptionCancelled.show = true
        this.details.subscriptionStatus = res.subscriptionStatus
      }).fail(err => {
        this.spinner.subscriptionCancel = false
        this.$store.dispatch('setGenericError', {
          title: 'Something went wrong',
          text: 'Sorry, we’re unable to connect to our systems at this time. Please try again later.',
          btn: 'Retry'
        })
        errorHandler(err)
      })
    },
    subscriptionReactivate () {
      this.spinner.subscriptionCancel = true
      this.$API.postReactivateSubscription({
        orgId: this.onboardingData.organization.id,
        data: {
          subscriptionPackageId: 1
        }
      }).then(res => {
        this.spinner.subscriptionReactivate = false
        this.modal.subscriptionReactivate.show = false
        this.modal.subscriptionReactivated.show = true
        this.details.subscriptionStatus = res.subscriptionStatus
      }).fail(err => {
        this.spinner.subscriptionReactivate = false
        this.$store.dispatch('setGenericError', {
          title: 'Something went wrong',
          text: 'Sorry, we’re unable to connect to our systems at this time. Please try again later.',
          btn: 'Retry'
        })
        errorHandler(err)
      })
    }
  }
}
</script>
