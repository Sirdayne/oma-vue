<template>
  <div>
    <div v-if="spinner" class="spinner-container">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div v-else-if="totalMatchCount" class="confidence-matching-edit">
      <div v-if="loading" class="confidence-matching-edit-spinner">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <div class="confidence-matching-back" @click="backUploadSummary">
        <v-icon color="primary">keyboard_arrow_left</v-icon>
        Back to Upload Summary
      </div>
      <div class="confidence-matching-edit__heading">
        Need more information
      </div>
      <notification v-if="notification" @close="notification = false" type="alert" icon="access_time">
        Processing...
      </notification>
      <notification v-if="error" @close="error = false" type="error">
        <div v-html="error"></div>
      </notification>
      <div v-if="!loading && !error" class="confidence-matching-edit__sub-heading">
        Record from batch upload
      </div>
      <div v-else class="confidence-matching-edit__empty"></div>
      <div class="confidence-matching-edit__container">
        <div class="confidence-matching-edit-box">
          <div class="confidence-matching-edit-box__company">
            <div class="confidence-matching-edit-box__company__title">{{ card.companyName }}</div>
            <div class="confidence-matching-edit-box__company__text">
              {{ card.address1 }}<br/>
              {{ card.city }}, {{ card.state }}, {{ card.country }}
            </div>
          </div>
          <div class="confidence-matching-edit-box__pagination">
            <v-btn color="primary" outlined @click="prevRecord">
              <v-icon style="margin-right: 8px">keyboard_arrow_left</v-icon>
              Previous record
            </v-btn>
            <div class="confidence-matching-edit-box__pagination__page">{{ record }} / {{ totalMatchCount }}</div>
            <v-btn color="primary" outlined @click="nextRecord">
              Skip and go to next record
              <v-icon  style="margin-left: 8px">keyboard_arrow_right</v-icon>
            </v-btn>
          </div>
        </div>
        <div v-if="currentStep === 'edit'" class="confidence-matching-edit-form mct-form">
          <div class="confidence-matching-edit-form__text">
            Review the company details below and<br/>
            resubmit to search the Insight directory.
          </div>
          <div class="mct-input">
            <label for="company-name">Company Name</label>
            <input v-model="form.companyName" type="text" name="company-name" data-label="Company Name">
          </div>
          <div class="mct-input">
            <label for="address">Address</label>
            <input v-model="form.address1" type="text" name="address" data-label="Address">
          </div>
          <div class="mct-input">
            <label for="city">City</label>
            <input v-model="form.city" type="text" name="city" data-label="City">
          </div>
          <div class="mct-input">
            <label for="state">State</label>
            <input v-model="form.state" type="text" name="state" data-label="State">
            <select
              v-if="false"
              v-model="form.state"
              class="select"
              name="state"
              data-label="State"
            >
              <option v-for="option in states" :value="option" :key="option">
                {{ option }}
              </option>
            </select>
          </div>
          <div class="mct-input">
            <label for="country">Country</label>
            <input v-model="form.country" type="text" name="country" data-label="Country">
            <select
              v-if="false"
              v-model="form.country"
              class="select"
              name="country"
              data-label="Country"
            >
              <option v-for="option in countries" :value="option" :key="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
        <div v-if="currentStep === 'success'" class="confidence-matching-edit-form confidence-matching-edit-form__success">
          <div class="confidence-matching-edit-form__success__title">
            Success!<br/>
            Integrity found a match.
          </div>
          <div class="confidence-matching-edit-form__success__text">
            The result has automatically been added to your high confidence matches.
          </div>
        </div>
      </div>
      <footer-block v-if="currentStep === 'edit'" @click="postRecord ()">
        <div>
          Submit the edits to find a match in the Track Directory
          <v-icon color="white">keyboard_arrow_right</v-icon>
        </div>
      </footer-block>
      <footer-block v-if="currentStep === 'success'" @click="nextRecord()">
        <div>
          Continue to the next record
          <v-icon color="white">keyboard_arrow_right</v-icon>
        </div>
      </footer-block>
    </div>
    <template v-else>
      <div class="confidence-matching-back" @click="backUploadSummary">
        <v-icon color="primary">keyboard_arrow_left</v-icon>
        Back to Upload Summary
      </div>
      <div class="confidence-matching-table__title">
        <h4>
          No data
        </h4>
      </div>
    </template>
  </div>
</template>

<script>
import FooterBlock from '@/components/partials/Footer'
import Notification from '@/components/partials/Notification'
import { errorHandler } from '@/plugins/CustomAPI'

export default {
  components: {
    Notification,
    FooterBlock
  },
  props: ['type', 'fileUploadId'],
  data: () => ({
    currentStep: 'edit',
    spinner: true,
    loading: false,
    notification: false,
    error: null,
    record: 1,
    totalMatchCount: 0,
    form: {
      companyName: '',
      address1: '',
      city: '',
      state: '',
      country: ''
    },
    card: {
      companyName: '',
      address1: '',
      city: '',
      state: '',
      country: ''
    },
    states: ['Michigan'],
    countries: ['USA'],
    vendorUploadId: null
  }),
  computed: {
    getOnboardingData () {
      return this.$store.getters.getOnboardingData
    }
  },
  created () {
    this.viewDetailResults()
    // this.getLikelyMatches()
  },
  methods: {
    backUploadSummary () {
      this.$emit('backUploadSummary')
    },
    setStatusFinish () {
      this.$emit('setStatusFinish')
    },
    viewDetailResults () {
      this.spinner = true
      const type = 'likelymatch'
      const PAGE_SIZE = 1
      this.$API.viewDetailResults({
        qs: [['type', type], ['page', this.record], ['pageSize', PAGE_SIZE]],
        fileUploadId: this.fileUploadId
      }).then(res => {
        if (res && res.result && res.result.length > 0) {
          this.setForm(res.result[0])
        }
        this.totalMatchCount = res && res.totalMatchCount ? res.totalMatchCount : 0
        this.spinner = false
      }).fail(err => {
        this.spinner = false
        errorHandler(err)
      })
    },
    getLikelyMatches () {
      this.spinner = true
      this.$API.getLikelyMatches({
        orgId: this.getOnboardingData.organization.id
      }).then(res => {
        this.spinner = false
      }).fail(err => {
        this.spinner = false
        errorHandler(err)
      })
    },
    setForm (result) {
      this.form = this.$lodash.cloneDeep(result)
      this.card = this.$lodash.cloneDeep(result)
      this.vendorUploadId = result.vendorUploadId ? result.vendorUploadId : null
    },
    showError (err) {
      this.error = err.message ? err.message : 'Something went wrong'
      this.error += err.traceId ? `<div class="trace-id">{Trace id: ${err.traceId}}</div>` : ''
    },
    postRecord () {
      this.loading = true
      this.notification = true
      this.$API.convertLmToHc({
        orgId: this.getOnboardingData.organization.id,
        vendorUploadId: this.vendorUploadId,
        data: this.form
      }).then(() => {
        this.currentStep = 'success'
        this.loading = false
        this.notification = false
      }).fail(err => {
        this.showError(err.responseJSON)
        this.loading = false
        this.notification = false
      })
    },
    prevRecord () {
      this.error = null
      if (this.record > 1) {
        this.record--
        this.viewDetailResults()
      }
      this.currentStep = 'edit'
    },
    nextRecord () {
      this.error = null
      if (this.record === this.totalMatchCount) {
        this.setStatusFinish()
      } else {
        this.record++
        this.viewDetailResults()
        this.currentStep = 'edit'
      }
    }
  }
}
</script>
