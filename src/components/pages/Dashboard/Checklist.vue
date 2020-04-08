<template>
  <v-fade-transition>
    <div class="checklist" v-show="needShow">
      <v-container pa-0>
        <v-row no-gutters>
          <v-col
            cols="8"
            class="checklist__header">
            Welcome to OpenText Integrity, powered by Mastercard
          </v-col>
          <v-col class="text-right">
            <v-icon class="checklist__close" @click="hide()">highlight_off</v-icon>
          </v-col>
        </v-row>
        <v-row class="checklist__cols">
          <v-col
            cols="12"
            sm="4"
            class="checklist__col">
            <div class="d-flex">
              <div class="checklist__check">
                <img src="../../../assets/images/icon-monitor-reputation.svg" class="checklist__image__1">
<!--             MVP-B:
                <img src="../../../assets/images/checked.svg" v-if="first">
                <img src="../../../assets/images/empty.svg" v-else> -->
              </div>
              <div class="checklist__text">
                Monitor your reputation by viewing your <span class="link" @click="$router.push('/my-company-profile')">Company profile</span>.
              </div>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            class="checklist__col">
            <div class="d-flex">
              <div class="checklist__check">
                <img src="../../../assets/images/icon-know.svg" class="checklist__image__2">
<!--             MVP-B:
                <img src="../../../assets/images/checked.svg" v-if="second">
                <img src="../../../assets/images/empty.svg" v-else> -->
              </div>
              <div class="checklist__text">
                Gather business partner intelligence by <span class="link" @click="$emit('go-search')">Searching</span> above.
              </div>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            class="checklist__col"
            v-if="isAdmin">
            <div class="d-flex">
              <div class="checklist__check">
                <img src="../../../assets/images/icon-cleanse.svg" class="checklist__image__3">
<!--             MVP-B:
                <img src="../../../assets/images/checked.svg" v-if="third">
                <img src="../../../assets/images/empty.svg" v-else> -->
              </div>
              <div class="checklist__text">
                Enhance your Master Data by <span class="link" @click="$router.push('/upload-master-list')">uploading your file here</span>.
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-fade-transition>
</template>

<script>
export default {
  props: {
    first: Boolean,
    second: Boolean,
    third: Boolean
  },
  computed: {
    isAdmin () {
      return this.$store.getters.isAdmin
    },
    needShow () {
      return this.$store.getters.getDashboardChecklistState
    },
    userData () {
      return this.$store.getters.getUserData
    }
  },
  methods: {
    hide () {
      this.$store.dispatch('setDashboardChecklistState', false)
      this.$API.disableChecklist({
        cuid: this.userData.id,
        data: {
          disableChecklist: 'Y'
        }
      }).fail(() => {
        this.$store.dispatch('setDashboardChecklistState', true)
      })
    }
  }
}
</script>
