<template>
  <div>
    <master-card-banner></master-card-banner>
    <div class="company-profile__section">
      <section-divider>General Details</section-divider>
      <div class="company-profile__content">
        <h4>Company Business Description</h4>
        <p v-if="basic.businessDescription">{{ basic.businessDescription }}</p>
        <p v-else class="no-data">—</p>
      </div>
      <div class="company-profile__row">
        <company-profile-item title="Company Phone" :value="basic.phone" :is-premium-data="false"></company-profile-item>
        <div class="company-profile-item">
          <h4>Company URL</h4>
          <p v-if="header && header.url">
            <a class="company-profile__row__link" :href="!header.url.match(/^[a-zA-Z]+:\/\//) ? `http://${header.url}` : header.url" target="_blank">
              <span class="company-profile__row__link__text">{{ header.url }}</span>
              <v-icon small class="company-profile__row__link__icon">launch</v-icon>
            </a>
          </p>
          <p v-else>-</p>
        </div>
        <company-profile-item title="Location Type" :value="premium.locationType" :is-premium-data="isPremiumData"></company-profile-item>
        <company-profile-item title="Credit Rating" :value="premium.creditRiskData ? premium.creditRiskData.creditRating : ''" :is-premium-data="isPremiumData"></company-profile-item>
      </div>
      <div class="company-profile__row">
        <company-profile-item title="Revenue" :value="premium.revenueData ? premium.revenueData.revenue : ''" :is-premium-data="isPremiumData"></company-profile-item>
        <company-profile-item title="Currency Type" :value="premium.revenueData ? premium.revenueData.currencyType : ''" :is-premium-data="isPremiumData"></company-profile-item>
        <div style="width: 25%"></div>
        <div style="width: 25%"></div>
      </div>
    </div>
    <div class="company-profile__section">
      <section-divider>Employee Data</section-divider>
      <div class="company-profile__row">
        <company-profile-item title="Global Employee Count" :value="premium.employeesData ? premium.employeesData.noofGlobalEmployees : ''" :is-premium-data="isPremiumData"></company-profile-item>
        <company-profile-item title="Location Employee Count" :value="premium.employeesData ? premium.employeesData.noofLocalEmployees : ''" :is-premium-data="isPremiumData"></company-profile-item>
        <div style="width: 25%"></div>
        <div style="width: 25%"></div>
      </div>
    </div>
    <div class="company-profile__section">
      <section-divider>Parent Company Information</section-divider>
      <div class="company-profile__row">
        <company-profile-item title="Name" :value="premium && premium.parentCompanyData && premium.parentCompanyData.parentCompanyDetails ? premium.parentCompanyData.parentCompanyDetails.businessName : ''" :is-premium-data="isPremiumData"></company-profile-item>
        <company-profile-item title="Country" :value="premium && premium.parentCompanyData && premium.parentCompanyData.parentCompanyDetails ? premium.parentCompanyData.parentCompanyDetails.country : ''" :is-premium-data="isPremiumData"></company-profile-item>
        <company-profile-item title="Identifier" value="Identifier" :is-premium-data="isPremiumData"></company-profile-item>
        <div style="width: 25%"></div>
      </div>
    </div>
    <v-expansion-panels multiple v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate>
          <div class="mct-expansion-title">
            <img src="../../../../assets/images/group.svg" class="mct-expansion-title__img" alt="Group">
            <img src="../../../../assets/images/group_minus.svg" class="mct-expansion-title__img_minus" alt="Group">
            <span class="mct-expansion-title__text">Executive Information</span>
          </div>
          <template v-slot:actions>
            <div></div>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template v-if="premium && premium.executivesData && premium.executivesData.executivesDetails && premium.executivesData.executivesDetails.length > 0">
            <div class="linked-entities-container"
                 v-for="(item, index) in premium.executivesData.executivesDetails"
                 :key="index"
            >
              <section-divider>Executive</section-divider>
              <div class="company-profile__row">
                <company-profile-item title="Name" :value="`${item.firstName} ${item.lastName}`" :is-premium-data="isPremiumData"></company-profile-item>
                <company-profile-item title="Title" :value="item.title" :is-premium-data="isPremiumData"></company-profile-item>
                <company-profile-item title="Address" :value="item.address ? item.address.streetAddress : ''" :is-premium-data="isPremiumData"></company-profile-item>
                <company-profile-item title="City" :value="item.address ? item.address.city : ''" :is-premium-data="isPremiumData"></company-profile-item>
                <company-profile-item title="State" :value="item.address ? item.address.state : ''" :is-premium-data="isPremiumData"></company-profile-item>
                <company-profile-item title="Zip" :value="item.address ? item.address.zip : ''" :is-premium-data="isPremiumData"></company-profile-item>
                <company-profile-item title="Country" :value="item.address ? item.address.country : ''" :is-premium-data="isPremiumData"></company-profile-item>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="linked-entities-container-empty">
              <v-icon>error_outline</v-icon>
              <div class="linked-entities-container-empty__text">No Executive Information</div>
            </div>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import SectionDivider from '@/components/partials/SectionDivider'
import Lock from '@/components/pages/CompanyProfile/components/Lock'
import CompanyProfileItem from '@/components/pages/CompanyProfile/components/CompanyProfileItem'
import MasterCardBanner from '@/components/partials/MasterCardBanner'

export default {
  components: {
    SectionDivider,
    Lock,
    CompanyProfileItem,
    MasterCardBanner
  },
  data: () => ({
    panel: [0]
  }),
  props: ['header', 'basic', 'premium', 'isPremiumData']
}
</script>
