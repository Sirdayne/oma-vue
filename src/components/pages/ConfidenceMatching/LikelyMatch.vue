<template>
  <div class="likely-match">
    <div class="confidence-matching-back" @click="backUploadSummary">
      <v-icon color="primary">keyboard_arrow_left</v-icon>
      Back to Upload Summary
    </div>
    <div class="confidence-matching-table__title">
      <h4>
        Need more information
      </h4>
    </div>
    <div class="likely-match__content">
      <div class="likely-match__content__text">
        Some of the records you uploaded are close to records in Mastercard Track. We call these records “Likely Matches” and they are records that Integrity has found, but requires more information to match with high confidence. Select a company below to find a match.
      </div>
      <master-card-banner></master-card-banner>
    </div>
    <div class="likely-match-companies full-width">
      <div class="page-container">
        <div class="mct-form">
          <div class="mct-search">
            <input v-model="search" class="input input__search" type="text" placeholder="Search records">
          </div>
          <div class="mct-select">
            <select
              v-model="option"
              class="select"
            >
              <option v-for="option in options" :value="option" :key="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
        <div class="likely-match-cards">
          <div v-for="(item, index) in companies" :key="index" class="likely-match-card">
            <h4>{{ item.companyName }}</h4>
            <p>{{ item.address1 }}</p>
            <a :href="item.link" target="_blank">{{ item.link }}</a>
            <div class="likely-match-card_hover">
              <v-btn>Find match</v-btn>
            </div>
          </div>
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
    search: '',
    option: 'View records by alphabetical order',
    options: ['View records by alphabetical order'],
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
      }
    ]
  }),
  created () {
    // this.viewDetailResults()
  },
  methods: {
    viewDetailResults () {
      this.spinner = true
      const type = 'likelymatch'
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
