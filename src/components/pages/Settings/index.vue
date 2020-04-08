<template>
  <v-tabs
    class="settings"
    v-model="tab">
    <v-tab key="pricing">Pricing</v-tab>
    <v-tab
      key="manage-subscription"
      v-if="isAdmin">Manage Subscription</v-tab>
    <v-tab-item>
      <pricing
        :details="subscriptionDetails"></pricing>
    </v-tab-item>
    <v-tab-item v-if="isAdmin">
      <manage-subscription
        :details="subscriptionDetails"></manage-subscription>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import ManageSubscription from '@/components/pages/Settings/ManageSubscription'
import Pricing from '@/components/pages/Settings/Pricing'
import { errorHandler } from '@/plugins/CustomAPI'

export default {
  components: {
    ManageSubscription,
    Pricing
  },
  data: () => ({
    subscriptionDetails: null,
    tab: null
  }),
  computed: {
    onboardingData () {
      return this.$store.getters.getOnboardingData
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    }
  },
  watch: {
    '$route.path': function () {
      this.tabsInit()
    },
    tab: function (val) {
      if (val === 0) {
        this.$router.push('/pricing')
      } else if (val === 1) {
        this.$router.push('/manage-subscription')
      }
    }
  },
  mounted () {
    this.tabsInit()
    this.subscriptionGet()
  },
  methods: {
    subscriptionGet () {
      this.$API.getSubscriptionDetails({
        orgId: this.onboardingData.organization.id
      }).then(res => {
        this.subscriptionDetails = res
      }).fail(err => {
        if (err.status !== 404) {
          this.$store.dispatch('setGenericError', {
            title: 'Something went wrong',
            text: 'Sorry, we’re unable to connect to our systems at this time. Please try again later',
            btn: 'Try Again'
          })
          errorHandler(err)
        }
      })
    },
    tabsInit () {
      if (this.$route.path === '/manage-subscription') {
        this.tab = 1
      } else if (this.$route.path === '/pricing') {
        this.tab = 0
      }
    }
  }
}
</script>
