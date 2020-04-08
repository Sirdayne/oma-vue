<template>
  <v-card class="company-profile-modal">
    <v-card-title>
      <div class="d-flex flex-row align-center justify-space-between modal__header">
        <div class="company-profile-modal__title">
          Notice Period
        </div>
        <div class="modal__header__icon">
          <v-icon @click="close">
            highlight_off
          </v-icon>
        </div>
      </div>
    </v-card-title>
    <v-card-text>
      <div class="company-profile-modal__text">
        If you would like to monitor this company, please reactivate your subscription.
      </div>
      <div style="margin-top: 24px">
        <b>Reminder:</b><br/>
        Your company has canceled their Integrity subscription effective {{ subscriptionEndDate }}.
      </div>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between">
      <v-btn color="primary"
             class="company-profile-modal__confirm"
             @click="routeSubscription"
             :loading="loading"
      >
        Reactivate Subscriptions
      </v-btn>
      <v-btn
        text
        color="primary"
        class="company-profile-modal__cancel"
        @click="close"
      >
        {{ closeText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  props: ['close', 'name', 'subscriptionEndDate', 'closeText', 'loading'],
  methods: {
    routeSubscription () {
      this.$router.push('/manage-subscription')
    }
  }
}
</script>
