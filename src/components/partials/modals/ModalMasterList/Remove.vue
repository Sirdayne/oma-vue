<template>
  <v-card class="company-profile-modal">
    <v-card-title>
      <div class="d-flex flex-row align-center justify-space-between modal__header">
        <div class="company-profile-modal__title">
          Confirm Removal
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
        You are about to remove <b>{{ name }}</b> from your master list.
      </div>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between">
      <v-btn color="primary"
             class="company-profile-modal__confirm"
             @click="removeMasterList"
             :loading="loading"
      >
        Remove from Master List
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
  props: ['close', 'closeText', 'name', 'removeMasterList', 'loading']
}
</script>
