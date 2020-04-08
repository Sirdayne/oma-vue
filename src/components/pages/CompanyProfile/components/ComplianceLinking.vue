<template>
  <div class="compliance-linking">
    <modal-confirm-link :show-modal="modalConfirmLink"
                        @close="modalConfirmLink = false"
                        name="Stark Industries"
    >
    </modal-confirm-link>
    <modal-company-details :show-modal="modalCompanyDetails"
                   @close="modalCompanyDetails = false"
                   name="Stark Industries"
    >
    </modal-company-details>
    <div class="compliance-linking-back" @click="resetStatus">
      <v-icon color="primary">keyboard_arrow_left</v-icon>
      Back to Compliance Details
    </div>
    <div class="compliance-linking__title">Manage Linked Entities</div>
    <div class="compliance-linking__description">Maecenas sed diam eget risus varius blandit sit amet non magna.</div>
    <div class="compliance-linking__sub-title">High Match Compliance Profiles</div>
    <div class="compliance-linking__cards">
      <div v-for="(item, index) in companies" :key="index" class="compliance-linking__card"  :class="{ 'compliance-linking__card_selected': item.selected }">
        <h4>{{ item.companyName }}</h4>
        <p>{{ item.address1 }}</p>
        <a :href="item.link" target="_blank">{{ item.link }}</a>
        <div class="compliance-linking__card__controls">
          <v-btn color="primary" @click="item.selected = !item.selected">Select</v-btn>
          <div class="compliance-linking__card__controls__company">
            <v-btn>View Company Details</v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="compliance-linking__sub-title">Alternative Compliance Profiles</div>
    <div class="compliance-linking__cards">
      <div v-for="(item, index) in altCompanies" :key="index" class="compliance-linking__card"  :class="{ 'compliance-linking__card_selected': item.selected }">
        <h4>{{ item.companyName }}</h4>
        <p>{{ item.address1 }}</p>
        <a :href="item.link" target="_blank">{{ item.link }}</a>
        <div class="compliance-linking__card__controls">
          <v-btn color="primary" @click="item.selected = !item.selected">Select</v-btn>
          <div class="compliance-linking__card__controls__company">
            <v-btn @click="modalCompanyDetails = true">View Company Details</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ModalConfirmLink from '@/components/pages/CompanyProfile/components/ModalConfirmLink'
import ModalCompanyDetails from '@/components/pages/CompanyProfile/components/ModalCompanyDetails'

export default {
  components: {
    ModalConfirmLink,
    ModalCompanyDetails
  },
  data: () => ({
    modalConfirmLink: false,
    modalCompanyDetails: false,
    companies: [
      {
        companyName: 'Stark Industries',
        address1: '123 Main Street, Detroit, Michigan, 48073 USA',
        link: 'www.starkindustries.com',
        selected: false
      },
      {
        companyName: 'Stark Industries',
        address1: '123 Main Street, Detroit, Michigan, 48073 USA',
        link: 'www.starkindustries.com',
        selected: false
      },
      {
        companyName: 'Stark Industries',
        address1: '123 Main Street, Detroit, Michigan, 48073 USA',
        link: 'www.starkindustries.com',
        selected: false
      }
    ],
    altCompanies: [
      {
        companyName: 'Stark Industries',
        address1: '123 Main Street, Detroit, Michigan, 48073 USA',
        link: 'www.starkindustries.com',
        selected: false
      },
      {
        companyName: 'Stark Industries',
        address1: '123 Main Street, Detroit, Michigan, 48073 USA',
        link: 'www.starkindustries.com',
        selected: false
      },
      {
        companyName: 'Stark Industries',
        address1: '123 Main Street, Detroit, Michigan, 48073 USA',
        link: 'www.starkindustries.com',
        selected: false
      }
    ]
  }),
  methods: {
    resetStatus () {
      this.$emit('resetStatus')
    }
  }
}
</script>
