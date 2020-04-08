<template>
  <v-app>
    <v-content :class="{ 'background-white': $route.path.includes('upload-master-list') || $route.path.includes('confidence-matching') }">
      <div
        class="text-center my-5"
        v-if="spinner">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <template v-else>
        <header-block>
          <nav-block type="desktop" v-if="mobileNavShow"></nav-block>
        </header-block>
        <div class="app__mobile-nav" v-if="mobileNavShow">
          <div class="app__mobile-nav__item">
            <search-block></search-block>
          </div>
          <div class="app__mobile-nav__item">
            <nav-block type="mobile"></nav-block>
          </div>
        </div>
        <div class="page-container">
          <router-view></router-view>
        </div>
      </template>
    </v-content>
  </v-app>
</template>

<style src="./styles/styles.scss" lang="scss"></style>

<script>
import HeaderBlock from '@/components/partials/Header'
import NavBlock from '@/components/partials/Navigation'
import SearchBlock from '@/components/partials/Search'
import { errorHandler } from '@/plugins/CustomAPI'

export default {
  components: {
    HeaderBlock,
    NavBlock,
    SearchBlock
  },
  computed: {
    isAdmin () {
      return this.$store.getters.isAdmin
    },
    mobileNavShow () {
      const names = [
        'CompanyProfile',
        'CompanyProfilePremium',
        'Dashboard',
        'DashboardMaster',
        'DashboardMonitored',
        'Error404',
        'Error500',
        'Error503',
        'MasterFileUploaded',
        'GenericError',
        'ManageSubscription',
        'MyCompanyProfile',
        'NoSearchResults',
        'Pricing',
        'SearchResults'
      ]
      return names.find(name => name === this.$route.name)
    },
    userData () {
      return this.$store.getters.getUserData
    }
  },
  created () {
    this.spinner = true
    this.$API.postOnboarding({
      data: {
        cuid: this.userData.id,
        orgId: this.userData.organization.id
      }
    }).then(res => {
      if (res) {
        this.$store.dispatch('setOnboardingData', res)
        if (res.roles && res.roles.find((el, i, arr) => { return el.description === 'Principal Owner' })) {
          this.$store.dispatch('setUserRoleAdmin')
        }
        if (res.disableChecklist === 'Y') {
          this.$store.dispatch('setDashboardChecklistState', false)
        }
        if (res.acceptTandC === 'Y') {
          if (res.organization.mcRegStatus === 'Completed') {
            this.$route.name === 'Start' ? this.$router.push('/dashboard') : this.$router.push(this.$route)
          } else if (res.organization.mcRegStatus === 'Pending') {
            this.$router.push('/organization-under-review')
          } else if (!res.organization.mcRegStatus) {
            if (this.isAdmin) {
              this.$router.push('/org-reg')
            } else {
              this.$router.push('/contact-org-admin')
            }
          } else {
            this.$router.push('/contact-org-admin')
          }
        } else {
          this.$router.push('/onboarding')
        }
      } else {
        this.$router.push('/generic-error')
      }
      this.spinner = false
    }).fail(err => {
      this.spinner = false
      errorHandler(err)
    })
  },
  data: () => ({
    spinner: false
  })
}
</script>
