<template>
  <div class="pricing">
    <div class="pricing__content">
      <div class="pricing__content__blocks">
        <div class="pricing__content__block">
          <div class="pricing__content__block__header">
            Standard
          </div>
          <div class="pricing__content__block__price">
            $89.99/month*
          </div>
          <div class="pricing__content__block__description">
            Subscribe today for access to the Integrity Trade Directory and automated risk/compliance monitoring tools.
          </div>
          <div class="pricing__content__block__options pricing__content__block__options--mobile">
            <v-expansion-panels
              v-model="expansion.standard">
              <v-expansion-panel>
                <v-expansion-panel-content>
                  <div class="pricing__content__block__options__title">
                    Includes
                  </div>
                  <div class="pricing__content__block__options__items">
                    <div>Monitor up to 15 Companies, each additional company can be monitored for $5/month*</div>
                    <div>Access to your Company Profile on the Trade Directory, including Compliance data</div>
                    <div>Search Trade Directory for Supplier/Customers</div>
                    <div>Upload Master List for Batch Search</div>
                    <div>Portfolio Level Trade Directory Analytics</div>
                    <div>Master List Management</div>
                  </div>
                </v-expansion-panel-content>
                <v-expansion-panel-header hide-actions>
                  <template v-if="expansion.standard === 0">
                    <img src="../../../assets/images/group_minus.svg" alt="-">
                    <span>Show less</span>
                  </template>
                  <template v-else>
                    <img src="../../../assets/images/group.svg" alt="+">
                    <span>Show more</span>
                  </template>
                </v-expansion-panel-header>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
          <div class="pricing__content__block__options pricing__content__block__options--desktop">
            <div class="pricing__content__block__options__title">
              Includes
            </div>
            <div class="pricing__content__block__options__items">
              <div>Monitor up to 15 Companies, each additional company can be monitored for $5/month*</div>
              <div>Access to your Company Profile on the Trade Directory, including Compliance data</div>
              <div>Search Trade Directory for Supplier/Customers</div>
              <div>Upload Master List for Batch Search</div>
              <div>Portfolio Level Trade Directory Analytics</div>
              <div>Master List Management</div>
            </div>
          </div>
          <div class="pricing__content__block__notes">
            *90 days minimum subscription required and your organization must monitor each company for at least 3 months.
          </div>
          <div class="pricing__content__block__button">
            <v-btn
              block
              color="primary"
              disabled
              v-if="details && (details.subscriptionStatus === 'ACTIVE' || details.subscriptionStatus === 'PENDING_INACTIVE')">
              Current Plan
            </v-btn>
            <v-btn
              block
              color="primary"
              @click="subscribe()"
              v-else-if="isAdmin">
              Subscribe Now
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { errorHandler } from '@/plugins/CustomAPI'

export default {
  props: {
    details: Object
  },
  data: () => ({
    expansion: {
      standard: '',
      enterprise: ''
    }
  }),
  computed: {
    onboardingData () {
      return this.$store.getters.getOnboardingData
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    }
  },
  methods: {
    subscribe () {
      this.spinner = true
      this.$API.postStartSubscription({
        orgId: this.onboardingData.organization.id,
        data: {
          subscriptionPackageId: 1
        }
      }).then(res => {
        this.spinner = false
        if (!this.details) {
          this.details = {}
        }
        this.details.subscriptionStatus = res.subscriptionStatus
      }).fail(err => {
        this.spinner = false
        errorHandler(err)
      })
    }
  }
}
</script>
