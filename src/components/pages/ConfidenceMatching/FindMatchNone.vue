<template>
  <div class="find-match">
    <div class="confidence-matching-back" @click="backUploadSummary">
      <v-icon color="primary">keyboard_arrow_left</v-icon>
      Back to Upload Summary
    </div>
    <div class="confidence-matching-table__title">
      <h4>
        Need more information
      </h4>
    </div>
    <master-card-banner></master-card-banner>
    <div class="find-match-records">
      <div class="find-match-records__text">
        <p>
          Looks like we could not find a match for that record.<br/>
          <br/>
          This record has now been move to the No Match section. You can still make edits to the record from that page.
        </p>
        <v-btn color="primary" outlined @click="backUploadSummary">Back to all records</v-btn>
      </div>
      <div class="find-match-record">
        <div class="find-match-record__company find-match-record__company_none">
          <v-btn color="primary">View no match section</v-btn>
        </div>
        <div class="find-match-record__pagination">
          <v-btn color="primary" text>
            <v-icon style="margin-right: 8px">keyboard_arrow_left</v-icon>
            Previous record
          </v-btn>
          <v-btn color="primary" text>
            Next record
            <v-icon  style="margin-left: 8px">keyboard_arrow_right</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { errorHandler } from '@/plugins/CustomAPI'
import MasterCardBanner from '@/components/partials/MasterCardBanner'

export default {
  components: {
    MasterCardBanner
  },
  props: ['fileUploadId'],
  data: () => ({
    currentCompanyIndex: 0
  }),
  created () {
    // this.viewDetailResults()
  },
  methods: {
    viewDetailResults () {
      this.spinner = true
      const type = 'highconfidence'
      this.$API.viewDetailResults({
        qs: [['type', type]],
        fileUploadId: this.fileUploadId
      }).then(res => {
        this.companies = res && res.result && res.result.length > 0 ? res.result : []
        this.spinner = false
      }).fail(err => {
        this.spinner = false
        errorHandler(err)
      })
    },
    backUploadSummary () {
      this.$emit('backUploadSummary')
    }
  }
}
</script>
