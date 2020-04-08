<template>
  <div>
    <compliance-linking v-if="status === 'compliance-linking'" @resetStatus="resetStatus"></compliance-linking>
    <div v-else class="compliance-details">
      <master-card-banner></master-card-banner>
      <h4 v-if="false" class="compliance-details__title-main">View by Entity</h4>
      <div class="compliance-details-container">
        <div class="compliance-details-container__list">
          <select
            v-model="selectedOption"
            class="select"
            style="margin-bottom: 43px;"
            v-if="false"
          >
            <option v-for="option in options" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
          <div class="compliance-totals">
            <h4 class="compliance-totals__title">Compliance Totals</h4>
            <compliance-totals-item :value="getCurrentSanctions" text="Current Sanctions"></compliance-totals-item>
            <compliance-totals-item :value="getPastSanctions" text="Past Sanctions"></compliance-totals-item>
            <compliance-totals-item :value="getComplianceTotals ? getComplianceTotals.noofAdverseMedia : 0" text="Adverse Media"></compliance-totals-item>
            <compliance-totals-item :value="getComplianceTotals ? getComplianceTotals.noofFinancialRegulator : 0" text="Financial Regulator"></compliance-totals-item>
            <compliance-totals-item :value="getComplianceTotals ? getComplianceTotals.noofLawEnforcement : 0" text="Legal/Law Enforcement"></compliance-totals-item>
            <compliance-totals-item :value="getComplianceTotals ? getComplianceTotals.noofInsolvency : 0" text="Insolvency"></compliance-totals-item>
            <compliance-totals-item :value="getComplianceTotals ? getComplianceTotals.noofPep : 0" text="Politically Exposed Persons"></compliance-totals-item>
            <compliance-totals-item :value="getComplianceTotals ? getComplianceTotals.noofDisqualifiedDirector : 0" text="Disqualified Director"></compliance-totals-item>
            <compliance-totals-item :value="getComplianceTotals ? getComplianceTotals.noofCorporateBusiness : 0" text="Corporate/Business"></compliance-totals-item>
            <compliance-totals-item :value="getComplianceTotals ? getComplianceTotals.noOfIdV : 0" text="ID Verification"></compliance-totals-item>
          </div>
        </div>
        <div class="compliance-details-container__content" v-if="complianceDetails && complianceDetails.length > 0">
          <compliance-notes v-if="status === 'compliance-notes'" :reset-status="resetStatus" :notes="getNotes"></compliance-notes>
          <linked-entities v-else-if="status === 'linked-entities'" :reset-status="resetStatus" :compliance-details="complianceDetails" :is-premium-data="isPremiumData"></linked-entities>
          <template v-else>
            <div class="compliance-details-item" v-if="getNotes && getNotes.length > 0">
              <div class="compliance-details-item__document">
                <img src="../../../../assets/images/file-note.svg" class="compliance-details-item__document__icon" alt="Note">
                <div>
                  <div class="compliance-details-item__document__title">Compliance Notes</div>
                  <div class="compliance-details-item__document__link" @click="status = 'compliance-notes'">
                    <span class="compliance-details-item__document__link__text">View More</span>
                    <v-icon style="margin-left: 0px;">keyboard_arrow_right</v-icon>
                  </div>
                </div>
              </div>
            </div>
            <div class="compliance-details-item">
              <div class="compliance-details-item__document">
                <img src="../../../../assets/images/linked.svg" class="compliance-details-item__document__icon" alt="Note">
                <div>
                  <div class="compliance-details-item__document__title">Linked Entities</div>
                  <div class="compliance-details-item__document__link" @click="status = 'linked-entities'">
                    <span class="compliance-details-item__document__link__text">View More</span>
                    <v-icon style="margin-left: 0px;">keyboard_arrow_right</v-icon>
                  </div>
                </div>
              </div>
            </div>
            <template v-if="getDocuments && getDocuments.length > 0">
              <compliance-details-document v-for="item in getDocuments"
                                           :key="item.type"
                                           :name="item.name"
                                           :categories="item.categories"
                                           :creation-date="item.creationDate"
              ></compliance-details-document>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ComplianceTotalsItem from '@/components/pages/CompanyProfile/components/ComplianceTotalsItem'
import ComplianceDetailsDocument from '@/components/pages/CompanyProfile/components/ComplianceDetailsDocument'
import ComplianceNotes from '@/components/pages/CompanyProfile/components/ComplianceNotes'
import LinkedEntities from '@/components/pages/CompanyProfile/components/LinkedEntities'
import ComplianceLinking from '@/components/pages/CompanyProfile/components/ComplianceLinking'
import MasterCardBanner from '@/components/partials/MasterCardBanner'

export default {
  components: {
    LinkedEntities,
    ComplianceTotalsItem,
    ComplianceDetailsDocument,
    ComplianceNotes,
    MasterCardBanner,
    ComplianceLinking
  },
  props: ['complianceDetails', 'isPremiumData'],
  data () {
    return {
      status: '',
      selectedOption: 'Acme Motors, Inc.',
      options: ['Acme Motors, Inc.']
    }
  },
  computed: {
    getComplianceTotals () {
      let complianceTotals = {
        noOfIdV: 0,
        noofAdverseMedia: 0,
        noofCorporateBusiness: 0,
        noofDisqualifiedDirector: 0,
        noofFinancialRegulator: 0,
        noofInsolvency: 0,
        noofLawEnforcement: 0,
        noofPep: 0,
        noofSanctions: 0
      }
      if (this.complianceDetails && this.complianceDetails.length > 0) {
        this.complianceDetails.forEach(detail => {
          if (detail.complianceAlerts) {
            Object.keys(complianceTotals).forEach(key => {
              complianceTotals[key] += detail.complianceAlerts[key] ? detail.complianceAlerts[key] : 0
            })
          }
        })
      }
      return complianceTotals
    },
    getCurrentSanctions () {
      let quantity = 0
      if (this.complianceDetails && this.complianceDetails.length > 0) {
        this.complianceDetails.forEach(detail => {
          if (detail && detail.complianceAssociation && detail.complianceAssociation.length > 0) {
            detail.complianceAssociation.forEach(item => {
              if (item.type === 'SANCTION' && item.sanctionData && item.sanctionData.length > 0) {
                item.sanctionData.forEach(data => {
                  if (data.sanctionIsCurrent === true) {
                    quantity++
                  }
                })
              }
            })
          }
        })
      }
      return quantity
    },
    getPastSanctions () {
      let quantity = 0
      if (this.complianceDetails && this.complianceDetails.length > 0) {
        this.complianceDetails.forEach(detail => {
          if (detail && detail.complianceAssociation && detail.complianceAssociation.length > 0) {
            detail.complianceAssociation.forEach(item => {
              if (item.type === 'SANCTION' && item.sanctionData && item.sanctionData.length > 0) {
                item.sanctionData.forEach(data => {
                  if (data.sanctionIsCurrent === false) {
                    quantity++
                  }
                })
              }
            })
          }
        })
      }
      return quantity
    },
    getDocuments () {
      let documents = []
      if (this.complianceDetails && this.complianceDetails.length > 0) {
        this.complianceDetails.forEach(detail => {
          if (detail && detail.complianceAssociation && detail.complianceAssociation.length > 0) {
            detail.complianceAssociation.forEach(item => {
              if (item.documents && item.documents.length > 0) {
                item.documents.forEach(doc => {
                  let found = documents.find(document => document.name === doc.name)
                  if (found === undefined) {
                    documents.push({
                      name: doc.name,
                      categories: [this.$lodash.startCase(doc.category)],
                      creationDate: doc.creationDate
                    })
                  } else {
                    let foundCategory = found.categories.find(category => this.$lodash.startCase(category) === this.$lodash.startCase(doc.category))
                    if (foundCategory === undefined) {
                      found.categories.push(this.$lodash.startCase(doc.category))
                    }
                  }
                })
              }
            })
          }
        })
      }
      return documents
    },
    getNotes () {
      let notes = []
      if (this.complianceDetails && this.complianceDetails.length > 0) {
        this.complianceDetails.forEach(detail => {
          if (detail.notes && detail.notes.length > 0) {
            detail.notes.forEach(note => {
              notes.push(note)
            })
          }
        })
      }
      return notes
    }
  },
  methods: {
    resetStatus () {
      this.status = ''
    }
  }
}
</script>
