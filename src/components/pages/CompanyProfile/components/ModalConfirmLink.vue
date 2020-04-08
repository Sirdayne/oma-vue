<template>
  <v-dialog
    v-model="showModal"
    persistent
    max-width="570"
  >
    <v-card class="company-profile-modal">
      <v-card-title>
        <div class="d-flex flex-row align-center justify-space-between modal__header">
          <div class="company-profile-modal__title">
            Confirm Link
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
          You are about to link <b>{{ name }}</b>.
          <div style="margin-top: 16px; font-size: 16px;">
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Sed posuere consectetur.
            <br/><br/>
            Donec ullamcorper nulla non metus auctor fringilla.
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn color="primary"
               class="company-profile-modal__confirm"
               @click="confirmLinking"
               :loading="loading"
        >
          Confirm Linking
        </v-btn>
        <v-btn
          text
          color="primary"
          class="company-profile-modal__cancel"
          @click="close"
        >
          Back to profile
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: ['showModal', 'name'],
  data: () => ({
    loading: false
  }),
  methods: {
    close () {
      this.$emit('close')
    },
    confirmLinking () {
      console.log('confirmLinking')
    }
  }
}
</script>
