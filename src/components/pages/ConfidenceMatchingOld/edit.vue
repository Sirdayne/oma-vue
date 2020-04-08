<template>
  <div>
    <div v-if="spinner" class="spinner-container">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div class="confidence-matching-edit" v-else>
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
      <notification v-if="loading" type="alert" icon="access_time">
        Message talking about submitting record edits taking a second...
      </notification>
      <notification v-if="error" type="error">
        No match was found. Edit the fields below to find a match.
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
            <div class="confidence-matching-edit-box__pagination__page">{{ record + 1}} / {{ results.length }}</div>
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
    error: false,
    record: 0,
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
    results: [],
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
    // this.viewDetailResults()
    this.getLikelyMatches()
  },
  methods: {
    backUploadSummary () {
      this.$emit('backUploadSummary')
    },
    viewDetailResults () {
      this.spinner = true
      this.$API.viewDetailResults({
        qs: [['type', this.type]],
        fileUploadId: this.fileUploadId
      }).then(res => {
        this.results = res && res.result && res.result.length > 0 ? res.result : []
        this.setForm()
        this.spinner = false
      }).fail(err => {
        this.spinner = false
        if (err && err.status === 404) {
          this.results = []
        } else {
          this.setForm()
          errorHandler(err)
        }
      })
    },
    getLikelyMatches () {
      this.spinner = true
      this.$API.getLikelyMatches({
        orgId: this.getOnboardingData.organization.id
      }).then(res => {
        this.results = res && res.results && res.results.length > 0 ? res.results : []
        this.setForm()
        this.spinner = false
      }).fail(err => {
        this.spinner = false
        if (err && err.status === 404) {
          this.results = []
        } else {
          this.setForm()
          errorHandler(err)
        }
      })
    },
    setForm () {
      this.form = this.$lodash.cloneDeep(this.results[this.record])
      this.card = this.$lodash.cloneDeep(this.results[this.record])
      this.vendorUploadId = this.results[this.record].vendorUploadId
    },
    postRecord () {
      this.loading = true
      this.$API.convertLmToHc({
        orgId: this.getOnboardingData.organization.id,
        vendorUploadId: this.vendorUploadId,
        data: this.form
      }).then(() => {
        this.currentStep = 'success'
        this.loading = false
      }).fail(() => {
        this.error = true
        this.loading = false
      })
    },
    prevRecord () {
      this.record = this.record === 0 ? this.record : this.record - 1
      this.setForm()
      this.currentStep = 'edit'
    },
    nextRecord () {
      if (this.record + 1 === this.results.length) {
        this.backUploadSummary()
      } else {
        this.record++
        this.setForm()
        this.currentStep = 'edit'
      }
    }
  }
}
</script>
