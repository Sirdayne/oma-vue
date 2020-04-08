<template>
  <v-card class="company-profile-modal">
    <v-card-title>
      <div class="d-flex flex-row align-center justify-space-between modal__header">
        <div class="company-profile-modal__title">
          Confirm Monitoring
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
        You are about to monitor <b>{{ name }}</b>.
      </div>
      <div style="margin-top: 16px;">
        You will receive notices and alerts when new information is reported. New monitors are active for a minimum of <b>{{ duration }} {{ durationUnit }}.</b>
      </div>
      <div class="company-profile-modal__subscription">
        This monitor will add <b>$5 per month</b> to your subscription.
      </div>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between">
      <v-btn color="primary"
             class="company-profile-modal__confirm"
             @click="monitorCompany"
             :loading="loading"
      >
        Confirm Monitor
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
  props: ['close', 'name', 'monitorCompany', 'duration', 'durationUnit', 'closeText', 'loading']
}
</script>
