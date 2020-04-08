<template>
  <div>
    <master-card-banner></master-card-banner>
    <div class="company-profile__section">
      <section-divider>SECTION DIVIDER</section-divider>
      <div class="company-profile__row">
        <company-profile-item title="Verification Status" :value="premium && premium.verificationData && premium.verificationData.verificationDetails ? premium.verificationData.verificationDetails.verificationStatus : ''" :is-premium-data="isPremiumData"></company-profile-item>
        <company-profile-item title="Verified Date" :value="premium && premium.verificationData && premium.verificationData.verificationDetails ? premium.verificationData.verificationDetails.verifiedDate : ''" :is-premium-data="isPremiumData"></company-profile-item>
        <company-profile-item title="Tax ID" :value="premium ? premium.tin : ''" :is-premium-data="isPremiumData"></company-profile-item>
        <company-profile-item title="Value Added Tax (VAT) ID" :value="premium ? premium.vat : ''" :is-premium-data="isPremiumData"></company-profile-item>
      </div>
      <div class="company-profile__row">
        <company-profile-item title="Company Registration Number" :value="basic ? basic.registrationNumber : ''"></company-profile-item>
        <company-profile-item title="Date of Company Registration" :value="getRegistrationDate"></company-profile-item>
        <company-profile-item title="Date of Starting Operations" :value="getOperationsStartDate"></company-profile-item>
        <company-profile-item title="Status" :value="basic ? basic.status : ''"></company-profile-item>
      </div>
      <div class="company-profile__row">
        <company-profile-item title="Track ID" :value="basic ? basic.trackId : ''"></company-profile-item>
        <div style="width: 25%"></div>
        <div style="width: 25%"></div>
        <div style="width: 25%"></div>
      </div>
    </div>
    <div class="company-profile__section">
      <section-divider>SIC Classification</section-divider>
      <div class="company-profile__row">
        <company-profile-item title="Primary Business Classification" :value="basic && basic.businessClassification && basic.businessClassification.sic ? basic.businessClassification.sic.primaryClassification : ''"></company-profile-item>
        <company-profile-item title="Primary SIC Code" :value="basic && basic.businessClassification && basic.businessClassification.sic ? basic.businessClassification.sic.primaryCode : ''"></company-profile-item>
        <company-profile-item title="Secondary Business Classification" :value="basic && basic.businessClassification && basic.businessClassification.sic ? basic.businessClassification.sic.secondaryClassification : ''"></company-profile-item>
        <company-profile-item title="Secondary SIC Code" :value="basic && basic.businessClassification && basic.businessClassification.sic ? basic.businessClassification.sic.secondaryCode : ''"></company-profile-item>
      </div>
    </div>
    <div class="company-profile__section">
      <section-divider>NAICS Classification</section-divider>
      <div class="company-profile__row">
        <company-profile-item title="Primary NAICS Classification" :value="basic && basic.businessClassification && basic.businessClassification.naics ? basic.businessClassification.naics.primaryClassification : ''"></company-profile-item>
        <company-profile-item title="Primary NAICS Code" :value="basic && basic.businessClassification && basic.businessClassification.naics ? basic.businessClassification.naics.primaryCode : ''"></company-profile-item>
        <company-profile-item title="Secondary NAICS Classification" :value="basic && basic.businessClassification && basic.businessClassification.naics ? basic.businessClassification.naics.secondaryClassification : ''"></company-profile-item>
        <company-profile-item title="Secondary NAICS Code" :value="basic && basic.businessClassification && basic.businessClassification.naics ? basic.businessClassification.naics.secondaryCode : ''"></company-profile-item>
      </div>
    </div>
  </div>
</template>

<script>
import SectionDivider from '@/components/partials/SectionDivider'
import CompanyProfileItem from '@/components/pages/CompanyProfile/components/CompanyProfileItem'
import MasterCardBanner from '@/components/partials/MasterCardBanner'
import moment from 'moment'

export default {
  components: {
    SectionDivider,
    CompanyProfileItem,
    MasterCardBanner
  },
  props: ['basic', 'premium', 'isPremiumData'],
  computed: {
    getRegistrationDate () {
      let date = ''
      if (this.basic && this.basic.registrationDate) {
        date = moment(this.basic.registrationDate, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY')
      }
      return date
    },
    getOperationsStartDate () {
      let date = ''
      if (this.basic && this.basic.operationsStartDate) {
        date = moment(this.basic.operationsStartDate, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY')
      }
      return date
    }
  }
}
</script>
