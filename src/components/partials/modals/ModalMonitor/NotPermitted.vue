<template>
  <v-card class="company-profile-modal">
    <v-card-title>
      <div class="d-flex flex-row align-center justify-space-between modal__header">
        <div class="company-profile-modal__title">
          Not Permitted
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
        You must ask your organization’s administrator to {{ monitored === 'Y' ? 'stop monitoring' : 'monitor' }} a company.
      </div>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between">
      <v-btn
        text
        color="primary"
        class="company-profile-modal__full"
        @click="close"
      >
        {{ closeText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  props: ['monitored', 'close', 'closeText']
}
</script>
