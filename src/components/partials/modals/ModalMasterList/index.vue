<template>
  <v-dialog
    v-model="showModal"
    persistent
    max-width="570"
  >
    <remove
            :remove-master-list="removeMasterList"
            :close-text="closeText"
            :close="close"
            :name="name"
            :loading="loading"
    >
    </remove>
    <not-permitted v-if="false"
                   :close-text="closeText"
                   :close="close">
    </not-permitted>
  </v-dialog>
</template>

<script>

import Remove from '@/components/partials/modals/ModalMasterList/Remove'
import NotPermitted from '@/components/partials/modals/ModalMasterList/NotPermitted'
import { errorHandler } from '@/plugins/CustomAPI'

export default {
  components: {
    Remove,
    NotPermitted
  },
  props: [
    'showModal',
    'closeText',
    'name',
    'vendorUploadId'
  ],
  data: () => ({
    loading: false
  }),
  computed: {
    getOnboardingData () {
      return this.$store.getters.getOnboardingData
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    success () {
      this.$emit('success')
    },
    removeMasterList () {
      this.loading = true
      this.$API.companyRemoveFromList({
        orgId: this.getOnboardingData.organization.id,
        vendorUploadId: this.vendorUploadId
      }).then(() => {
        this.loading = false
        this.close()
        this.success()
      }).fail(err => {
        this.loading = false
        errorHandler(err)
      })
    }
  }
}
</script>
