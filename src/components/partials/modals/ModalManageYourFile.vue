<template>
  <v-dialog
    v-model="showModal"
    persistent
    max-width="570"
  >
    <v-card class="manage-your-file">
      <v-card-title>
        <div class="d-flex flex-row align-center justify-space-between modal__header">
          <div>
            Manage your <br/>Master List
          </div>
          <div class="modal__header__icon">
            <v-icon @click="closeModal">
              highlight_off
            </v-icon>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="manage-your-file-container">
          <div v-if="isAdmin" class="manage-your-file-item" :class="{ 'manage-your-file-item_active': selectedOption === 'Append' }" @click="toggleOption('Append')">
            <img src="../../../assets/images/append-file.svg" class="manage-your-file-item__img" alt="Append">
            <div class="manage-your-file-item__info">
              <div class="manage-your-file-item__info__title">Add to your Master List</div>
              <div class="manage-your-file-item__info__text">Add to your master list, by uploading new data.</div>
            </div>
          </div>
          <div v-else class="manage-your-file-item manage-your-file-item_disabled show-tooltip">
            <custom-tooltip>Ask your organization’s admin to manage your master list.</custom-tooltip>
            <img src="../../../assets/images/append-file.svg" class="manage-your-file-item__img" alt="Append">
            <div class="manage-your-file-item__info">
              <div class="manage-your-file-item__info__title">Add to your Master List</div>
              <div class="manage-your-file-item__info__text">Add to your master list, by uploading new data.</div>
            </div>
          </div>
          <div class="manage-your-file-item manage-your-file-item_disabled" :class="{ 'manage-your-file-item_active': selectedOption === 'Adjust' }" @click="toggleOption('Adjust')">
            <img src="../../../assets/images/adjust-disabled.svg" class="manage-your-file-item__img" alt="Adjust">
            <div class="manage-your-file-item__info">
              <div class="manage-your-file-item__info__title">Adjust Confidence Matching</div>
              <div class="manage-your-file-item__info__text">Turn likely matches into high confidence matches.</div>
            </div>
          </div>
          <div class="manage-your-file-item  manage-your-file-item_disabled" :class="{ 'manage-your-file-item_active': selectedOption === 'Remove' }" @click="toggleOption('Remove')">
            <img src="../../../assets/images/remove-disabled.svg" class="manage-your-file-item__img" alt="Remove">
            <div class="manage-your-file-item__info">
              <div class="manage-your-file-item__info__title">Remove your Master List</div>
              <div class="manage-your-file-item__info__text">Delete your master list. This cannot be undone.</div>
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn color="primary"
               :disabled="selectedOption !== 'Append'"
               class="manage-your-file__continue"
               @click="routeUploadMasterList"
        >
          Continue
        </v-btn>
        <v-btn
          text
          color="primary"
          class="manage-your-file__cancel"
          @click="closeModal"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import CustomTooltip from '@/components/partials/CustomTooltip'

export default {
  components: {
    CustomTooltip
  },
  props: ['showModal', 'close'],
  data: () => ({
    selectedOption: ''
  }),
  methods: {
    isAdmin () {
      return this.$store.getters.isAdmin
    },
    toggleOption (option) {
      this.selectedOption = this.selectedOption === option ? '' : option
    },
    routeUploadMasterList () {
      this.closeModal()
      this.$router.push('/upload-master-list')
    },
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>
