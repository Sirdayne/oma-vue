<template>
  <v-dialog
    v-model="showModal"
    persistent
    max-width="1110"
  >
    <v-card class="company-profile-modal">
      <v-card-title>
        <div class="d-flex flex-row align-center justify-space-between modal__header">
          <div class="company-profile-modal__title">
            {{ name }}
          </div>
          <div class="modal__header__icon">
            <v-icon @click="close">
              highlight_off
            </v-icon>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="compliance-linking-modal-company">
          <div class="compliance-linking-modal-company__sub-title">Company Details</div>
          <div class="compliance-linking-modal-company__lock">
            <v-icon>lock</v-icon>
            <div class="compliance-linking-modal-company__lock__text">
              Company has not been linked.
            </div>
          </div>
          <div class="compliance-linking-modal-company__sub-title">Aliases</div>
          <div class="compliance-linking-modal-company__container">
            <div class="compliance-linking-modal-company__item">Stark Industries <br/> Stark Industries</div>
          </div>
          <div class="compliance-linking-modal-company__sub-title">Addresses</div>
          <div class="compliance-linking-modal-company__container">
            <div class="compliance-linking-modal-company__item">
              123 Main Street,<br/>
              Detroit, Michigan, 48073<br/>
              USA
            </div>
            <div class="compliance-linking-modal-company__item">
              123 Main Street,<br/>
              Detroit, Michigan, 48073<br/>
              USA
            </div>
            <div class="compliance-linking-modal-company__item">
              123 Main Street,<br/>
              Detroit, Michigan, 48073<br/>
              USA
            </div>
          </div>
          <div class="compliance-linking-modal-company__sub-title">Notes</div>
          <div class="compliance-linking-modal-company__lock">
            <v-icon>lock</v-icon>
            <div class="compliance-linking-modal-company__lock__text">
              Company has not been linked.
            </div>
          </div>
          <div class="compliance-linking-modal-company__reference">Reference ID: 123456</div>
        </div>
      </v-card-text>
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
