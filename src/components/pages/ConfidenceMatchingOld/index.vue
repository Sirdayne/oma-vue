<template>
  <div class="confidence-matching">
    <div v-if="spinner" class="spinner-container">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <template v-else>
      <edit v-if="status === 'likelymatch'"
               :type="status"
               :file-upload-id="fileUploadId"
               @backUploadSummary="backUploadSummary">
      </edit>
      <no-match v-else-if="status === 'nomatch'" :file-upload-id="fileUploadId" @backUploadSummary="backUploadSummary"></no-match>
      <high-match v-else-if="status === 'highconfidence'" :file-upload-id="fileUploadId" @backUploadSummary="backUploadSummary"></high-match>
      <template v-else>
        <div class="confidence-matching__title">
          <h4>Upload Summary</h4>
          <div v-if="false" class="confidence-matching__title__file">
          {{ fileName }}
          </div>
          <div class="confidence-matching__title__download">
            <v-btn color="primary">Download Enhanced File</v-btn>
          </div>
        </div>
        <div class="confidence-matching__content">
          <div class="confidence-matching__overall">
            <div class="confidence-matching-item">
              <div class="confidence-matching-item__number">{{ totalRecords }}</div>
              <div class="confidence-matching-item__title">Successfully <br/>imported</div>
            </div>
          </div>
          <div class="confidence-matching__container">
            <div class="confidence-matching-items">
              <div class="confidence-matching-item">
                <div class="confidence-matching-item__number">
                  {{ hcCount }}
                  <img class="confidence-matching-item__number__img" src="../../../assets/images/checked.svg">
                </div>
                <div class="confidence-matching-item__title">Matched with <br/>High Confidence</div>
                <v-btn color="primary" outlined @click="setStatus('highconfidence')" :disabled="hcCount === 0">View Records</v-btn>
                <div class="confidence-matching-item__text">These records have been matched with high confidence in the Integrity directory.</div>
              </div>
              <div class="confidence-matching-item">
                <div class="confidence-matching-item__number">
                  {{ lmCount }}
                  <img class="confidence-matching-item__number__img" src="../../../assets/images/checked.svg">
                </div>
                <div class="confidence-matching-item__title">Need more <br/>information</div>
                <v-btn color="primary" outlined @click="setStatus('likelymatch')" :disabled="lmCount === 0">Review & Resubmit</v-btn>
                <div class="confidence-matching-item__text">Likely matches are records that Integrity has found, but requires more info to match with high confidence.</div>
              </div>
              <div class="confidence-matching-item">
                <div class="confidence-matching-item__number">
                  {{ nmCount }}
                  <img class="confidence-matching-item__number__img" src="../../../assets/images/checked.svg">
                </div>
                <div class="confidence-matching-item__title">Marked as <br/>No Match</div>
                <v-btn color="primary" outlined @click="setStatus('nomatch')" :disabled="nmCount === 0">View List</v-btn>
                <div class="confidence-matching-item__text">We were unable to find any matches for these records.</div>
              </div>
            </div>
            <div class="confidence-matching-success">
              <div class="confidence-matching-success__title">
                Congrats headline
              </div>
              <div class="confidence-matching-success__text">
                Maecenas sed diam eget risus varius blandit sit amet non magna. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.<br/>
                <br/>
                Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
              </div>
            </div>
          </div>
        </div>
        <footer-block @click="$router.push('/dashboard')">
          <div>
            Go to Dashboard to see your Master List in action
            <v-icon color="white">keyboard_arrow_right</v-icon>
          </div>
        </footer-block>
      </template>
    </template>
  </div>
</template>

<script>

import NoMatch from '@/components/pages/ConfidenceMatching/NoMatch'
import HighMatch from '@/components/pages/ConfidenceMatching/HighMatch'
import Edit from './edit'
import FooterBlock from '@/components/partials/Footer'
import { errorHandler } from '@/plugins/CustomAPI'

export default {
  components: {
    Edit,
    NoMatch,
    HighMatch,
    FooterBlock
  },
  data () {
    return {
      fileName: '',
      hcCount: 0,
      lmCount: 0,
      nmCount: 0,
      totalRecords: 0,
      status: 'summary',
      fileUploadId: null,
      spinner: true
    }
  },
  computed: {
    getOnboardingData () {
      return this.$store.getters.getOnboardingData
    }
  },
  created () {
    this.viewSummaryResults()
  },
  methods: {
    setStatus (type) {
      this.status = type
    },
    viewSummaryResults () {
      this.spinner = true
      this.$API.viewSummaryResults({
        orgId: this.getOnboardingData.organization.id
      }).then(res => {
        this.fileName = res && res.fileName ? res.fileName : ''
        this.hcCount = res && res.hcCount ? res.hcCount : 0
        this.lmCount = res && res.lmCount ? res.lmCount : 0
        this.nmCount = res && res.nmCount ? res.nmCount : 0
        this.totalRecords = res && res.totalRecords ? res.totalRecords : 0
        this.fileUploadId = res && res.fileUploadId ? res.fileUploadId : null
        this.spinner = false
      }).fail(err => {
        this.spinner = false
        errorHandler(err)
      })
    },
    backUploadSummary () {
      this.status = 'summary'
    }
  }
}
</script>
