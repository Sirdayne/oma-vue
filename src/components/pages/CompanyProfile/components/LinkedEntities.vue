<template>
  <div class="compliance-notes">
    <div class="compliance-notes__row">
      <div class="compliance-notes__row__back" @click="resetStatus">
        <v-icon color="primary">keyboard_arrow_left</v-icon>
        Back to Compliance Issues
      </div>
      <v-icon @click="resetStatus">highlight_off</v-icon>
    </div>
    <h3 class="compliance-notes__title" style="margin-bottom: 24px;">Linked Entities</h3>
    <v-expansion-panels multiple v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate>
          <div class="mct-expansion-title">
            <img src="../../../../assets/images/group.svg" class="mct-expansion-title__img" alt="Group">
            <img src="../../../../assets/images/group_minus.svg" class="mct-expansion-title__img_minus" alt="Group">
            <span class="mct-expansion-title__text">Linked Businesses</span>
          </div>
          <template v-slot:actions>
            <div></div>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template v-if="getLinkedBusiness && getLinkedBusiness.length > 0">
            <div class="linked-entities-container"
                 v-for="item in getLinkedBusiness"
                 :key="`${item.businessName} ${item.businessAddress}`"
            >
              <section-divider>Linked Business Information</section-divider>
              <div class="company-profile__row">
                <company-profile-item title="Name" :value="item.businessName" :is-premium-data="isPremiumData"></company-profile-item>
                <company-profile-item title="Address" :value="item.businessAddress" :is-premium-data="isPremiumData"></company-profile-item>
              </div>
              <section-divider>Business Aliases</section-divider>
              <div class="company-profile__row">
                <company-profile-item v-for="alias in item.businessAlias" :key="alias.name" title="Alias" :value="alias.name" :is-premium-data="isPremiumData"></company-profile-item>
              </div>
              <section-divider>Business Addresses</section-divider>
              <div class="company-profile__row">
                <company-profile-item v-for="address in item.businessAddresses" :key="address.address"  title="Address" :value="address.address" :is-premium-data="isPremiumData"></company-profile-item>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="linked-entities-container-empty">
              <v-icon>error_outline</v-icon>
              <div class="linked-entities-container-empty__text">No linked business addresses</div>
            </div>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate>
          <div class="mct-expansion-title">
            <img src="../../../../assets/images/group.svg" class="mct-expansion-title__img" alt="Group">
            <img src="../../../../assets/images/group_minus.svg" class="mct-expansion-title__img_minus" alt="Group">
            <span class="mct-expansion-title__text">Linked Individuals</span>
          </div>
          <template v-slot:actions>
            <div></div>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template v-if="getLinkedIndividual && getLinkedIndividual.length > 0">
            <div class="linked-entities-container"
                 v-for="item in getLinkedIndividual"
                 :key="`${item.name} ${item.position}`"
            >
              <section-divider>Linked Individual Information</section-divider>
              <div class="company-profile__row">
                <company-profile-item title="Name" :value="item.name" :is-premium-data="isPremiumData"></company-profile-item>
                <company-profile-item title="Position" :value="item.position" :is-premium-data="isPremiumData"></company-profile-item>
                <company-profile-item title="Current Address" :value="item.address" :is-premium-data="isPremiumData"></company-profile-item>
              </div>
              <section-divider>Known Aliases</section-divider>
              <div class="company-profile__row">
                <company-profile-item v-for="alias in item.alias" :key="alias.name" title="Alias" :value="alias.name" :is-premium-data="isPremiumData"></company-profile-item>
              </div>
              <section-divider>Previous Addresses</section-divider>
              <div class="company-profile__row">
                <company-profile-item v-for="address in item.addresses" :key="address.address"  title="Previous Address" :value="address.address" :is-premium-data="isPremiumData"></company-profile-item>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="linked-entities-container-empty">
              <v-icon>error_outline</v-icon>
              <div class="linked-entities-container-empty__text">No linked individuals.</div>
            </div>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import SectionDivider from '@/components/partials/SectionDivider'
import CompanyProfileItem from '@/components/pages/CompanyProfile/components/CompanyProfileItem'

export default {
  components: {
    SectionDivider,
    CompanyProfileItem
  },
  props: [
    'complianceDetails',
    'isPremiumData',
    'resetStatus'
  ],
  data: () => ({
    panel: [0, 1]
  }),
  computed: {
    getLinkedBusiness () {
      let linkedBusiness = []
      if (this.complianceDetails && this.complianceDetails.length > 0) {
        this.complianceDetails.forEach(detail => {
          if (detail.linkedBusiness && detail.linkedBusiness.length > 0) {
            detail.linkedBusiness.forEach(item => linkedBusiness.push(item))
          }
        })
      }
      return linkedBusiness
    },
    getLinkedIndividual () {
      let linkedIndividual = []
      if (this.complianceDetails && this.complianceDetails.length > 0) {
        this.complianceDetails.forEach(detail => {
          if (detail.linkedIndividual && detail.linkedIndividual.length > 0) {
            detail.linkedIndividual.forEach(item => linkedIndividual.push(item))
          }
        })
      }
      return linkedIndividual
    }
  }
}
</script>
