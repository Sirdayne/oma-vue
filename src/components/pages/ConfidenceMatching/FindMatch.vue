<template>
  <div class="find-match">
    <div class="confidence-matching-back" @click="backUploadSummary">
      <v-icon color="primary">keyboard_arrow_left</v-icon>
      Back to Master List
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
          According to your uploaded file, here is the data for this company. It does not match any of our records in Mastercard Track.
        </p>
        <v-btn color="primary" outlined @click="backUploadSummary">Back to all records</v-btn>
      </div>
      <div class="find-match-record">
        <div class="find-match-record__company">
          <div class="find-match-record__company__name">
            <span class="find-match-record__company__name__text">{{ companies[currentCompanyIndex].companyName }}</span>
            <span class="find-match-record__company__name__length">{{ currentCompanyIndex + 1 }} / {{ companies.length }}</span>
          </div>
          <div class="find-match-record__company__address">{{ companies[currentCompanyIndex].address1 }}</div>
          <a :href="companies[currentCompanyIndex].link" class="find-match-record__company__link">{{ companies[currentCompanyIndex].link }}</a>
        </div>
        <div class="find-match-record__pagination">
          <v-btn color="primary" text @click="prevRecord">
            <v-icon style="margin-right: 8px">keyboard_arrow_left</v-icon>
            Previous record
          </v-btn>
          <v-btn color="primary" text @click="nextRecord">
            Skip and go to next record
            <v-icon  style="margin-left: 8px">keyboard_arrow_right</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <div class="find-match-companies">
      <div class="find-match-companies__title">
        DO YOU MEAN?
      </div>
      <div class="find-match-cards">
        <div v-for="(item, index) in companies" :key="index" class="find-match-card" :class="index === currentCompanyIndex ? 'active' : ''" @click="currentCompanyIndex = index">
          <div class="find-match-card__name">
            {{ item.companyName }}
          </div>
          <div class="find-match-card__address">{{ item.address1 }}</div>
          <a :href="item.link" class="find-match-card__link">{{ item.link }}</a>
        </div>
        <div class="find-match-card find-match-card__none">
          None of these
        </div>
      </div>
      <v-btn color="primary" class="find-match-companies__confirm">Confirm this record as a match</v-btn>
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
    currentCompanyIndex: 0,
    companies: [
      {
        companyName: 'Stark Industries',
        address1: 'Detroit, Michigan, USA',
        link: 'www.starkindustries.com'
      },
      {
        companyName: 'Stark Industries',
        address1: 'Detroit, Michigan, USA',
        link: 'www.starkindustries.com'
      },
      {
        companyName: 'Stark Industries',
        address1: 'Detroit, Michigan, USA',
        link: 'www.starkindustries.com'
      },
      {
        companyName: 'Stark Industries',
        address1: 'Detroit, Michigan, USA',
        link: 'www.starkindustries.com'
      },
      {
        companyName: 'Stark Industries',
        address1: 'Detroit, Michigan, USA',
        link: 'www.starkindustries.com'
      },
      {
        companyName: 'Stark Industries',
        address1: 'Detroit, Michigan, USA',
        link: 'www.starkindustries.com'
      },
      {
        companyName: 'Stark Industries',
        address1: 'Detroit, Michigan, USA',
        link: 'www.starkindustries.com'
      },
      {
        companyName: 'Stark Industries',
        address1: 'Detroit, Michigan, USA',
        link: 'www.starkindustries.com'
      },
      {
        companyName: 'Stark Industries',
        address1: 'Detroit, Michigan, USA',
        link: 'www.starkindustries.com'
      },
      {
        companyName: 'Stark Industries',
        address1: 'Detroit, Michigan, USA',
        link: 'www.starkindustries.com'
      },
      {
        companyName: 'Stark Industries',
        address1: 'Detroit, Michigan, USA',
        link: 'www.starkindustries.com'
      }
    ]
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
    },
    prevRecord () {
      this.currentCompanyIndex = this.currentCompanyIndex === 0 ? this.currentCompanyIndex : this.currentCompanyIndex - 1
    },
    nextRecord () {
      this.currentCompanyIndex = this.currentCompanyIndex === this.companies.length - 1 ? this.currentCompanyIndex : this.currentCompanyIndex + 1
    }
  }
}
</script>
