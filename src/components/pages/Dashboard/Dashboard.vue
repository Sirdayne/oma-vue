<template>
  <div class="dashboard">
    <checklist
      @go-search="focusSearch"></checklist>
<!--     <notification type="alert">
      Alert message would appear here.
    </notification> -->
<!--     <notification
      v-if="error.show"
      type="error">
      {{ error.text }}
    </notification> -->
    <v-container pa-0 mt-4 mb-5>
      <v-row no-gutters>
        <v-col class="dashboard__header">
          Dashboard
        </v-col>
        <v-col
          class="text-right dashboard__monitored-count">
          <template v-if="monitoredCompaniesCount">
            Monitoring <span class="dashboard__monitored-count__value" v-show="!spinner.monitoredCount">{{ monitoredCompaniesCount }} Compan{{ monitoredCompaniesCount === 1 ? 'y' : 'ies'}}</span>
          </template>
          <v-progress-circular
            indeterminate
            size="24"
            color="primary"
            v-if="spinner.monitoredCount"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
    <v-tabs
      v-model="tab"
      @change="onTabChange($event)">
      <v-tab>Monitored Companies</v-tab>
      <v-tab>Master Company List</v-tab>
      <div
        class="dashboard__tabs__toolbar dashboard__tabs__toolbar--desktop"
        v-show="tabContentModeShow">
        <div class="mr-5">
          <v-icon size="32" class="dashboard__tabs__toolbar__icon" :class="{ 'dashboard__tabs__toolbar__icon--active': chartsView }" @click="chartsView = true">donut_large</v-icon>
        </div>
        <div>
          <img src="../../../assets/images/cards.svg" class="cursor-pointer" v-if="chartsView === true" @click="chartsView = false">
          <img src="../../../assets/images/cards_active.svg" v-else>
        </div>
      </div>
      <v-tab-item>
        <template v-if="monitorTabHasData">
          <div class="dashboard__tabs__toolbar dashboard__tabs__toolbar--mobile">
            <div class="mr-5">
              <v-icon size="32" class="dashboard__tabs__toolbar__icon" :class="{ 'dashboard__tabs__toolbar__icon--active': chartsView }" @click="chartsView = true">donut_large</v-icon>
            </div>
            <div>
              <img src="../../../assets/images/cards.svg" class="cursor-pointer" v-if="chartsView === true" @click="chartsView = false">
              <img src="../../../assets/images/cards_active.svg" v-else>
            </div>
          </div>
          <dashboard-charts v-if="chartsView"></dashboard-charts>
          <dashboard-cards
            type="monitored"
            ref="monitoredList"
            v-else></dashboard-cards>
        </template>
        <template v-else-if="spinner.monitoredTab">
          <v-progress-circular
            indeterminate
            size="24"
            color="primary"
            v-if="spinner.monitoredTab"
          ></v-progress-circular>
        </template>
        <template v-else>
          <img src="../../../assets/images/dashboard-blurred-tiles.jpg" srcset="../../../assets/images/dashboard-blurred-tiles@2x.jpg 2x, ../../../assets/images/dashboard-blurred-tiles@3x.jpg 3x" class="dashboard__blurred-image dashboard__blurred-image--desktop">
          <img src="../../../assets/images/mobile-dashboard-blurred.png" srcset="../../../assets/images/mobile-dashboard-blurred@2x.png 2x, ../../../assets/images/mobile-dashboard-blurred@3x.png 3x" class="dashboard__blurred-image dashboard__blurred-image--mobile">
          <template v-if="isAdmin">
            <div class="dashboard__blurred-caption dashboard__blurred-caption--offset">
              Monitor your partners to receive alerts and view in dashboards.
              <div><span class="link" @click="focusSearch">Start by searching.</span></div>
            </div>
          </template>
          <div
            class="dashboard__blurred-caption dashboard__blurred-caption--offset"
            v-else>
            Principal Owner should monitor your partners to receive alerts and view in dashboards.
            <div>&nbsp;</div>
          </div>
        </template>
      </v-tab-item>
      <v-tab-item>
        <template v-if="masterTabHasData">
          <dashboard-cards
            type="master"
            ref="masterList">
          </dashboard-cards>
        </template>
        <template v-else>
          <img src="../../../assets/images/blurred-tiles.jpg" srcset="../../../assets/images/blurred-tiles@2x.jpg 2x, ../../../assets/images/blurred-tiles@3x.jpg 3x" class="dashboard__blurred-image dashboard__blurred-image--desktop">
          <img src="../../../assets/images/mobile-blurred-tiles.png" srcset="../../../assets/images/mobile-blurred-tiles@2x.png 2x, ../../../assets/images/mobile-blurred-tiles@3x.png 3x" class="dashboard__blurred-image dashboard__blurred-image--mobile">
          <template v-if="isAdmin">
            <div class="dashboard__blurred-caption">
              No Master List has been uploaded. To get the most out of Integrity
              <div><span class="link">Upload your Master List now.</span></div>
            </div>
            <footer-block @click="$router.push('/upload-master-list')">
              <div>
                Continue to start uploading your&nbsp;file
                <v-icon color="white">keyboard_arrow_right</v-icon>
              </div>
            </footer-block>
          </template>
          <div
            class="dashboard__blurred-caption"
            v-else>
            No Master List has been uploaded.
            <div>To get the most out of Integrity Principal Owner of your Organization has to upload the Master List.</div>
          </div>
        </template>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Checklist from './Checklist'
import DashboardCards from './DashboardCards'
import DashboardCharts from './DashboardCharts'
import FooterBlock from '@/components/partials/Footer'
import Notification from '@/components/partials/Notification'
import { errorHandler } from '@/plugins/CustomAPI'

export default {
  components: {
    Checklist,
    DashboardCharts,
    DashboardCards,
    FooterBlock,
    Notification
  },
  data: () => ({
    chartsView: true,
    spinner: {
      monitoredCount: false,
      monitoredTab: false
    },
    tab: null
  }),
  computed: {
    ...mapGetters({
      monitoredCompaniesCount: 'getDashboardMonitoredCompaniesCount'
    }),
    isAdmin () {
      return this.$store.getters.isAdmin
    },
    masterTabHasData () {
      return this.$store.getters.getDashboardMasterState
    },
    monitorTabHasData () {
      return this.$store.getters.getDashboardMonitoredState
    },
    tabContentModeShow () {
      return this.tab === 0 && this.monitorTabHasData
    },
    onboardingData () {
      return this.$store.getters.getOnboardingData
    }
  },
  created () {
    this.subscriptionStatusGet()
    this.masterFileStatusGet()
    this.tabsInit()
  },
  watch: {
    '$route.path': function () {
      this.tabsInit()
    },
    chartsView (val) {
      if (!val && this.tab === 0) {
        this.$router.push('/dashboard/monitored')
      } else if (val && this.tab === 0) {
        this.$router.push('/dashboard')
      }
    },
    tab (val) {
      if (val === 0 && this.chartsView) {
        this.$router.push('/dashboard')
      } else if (val === 0 && !this.chartsView) {
        this.$router.push('/dashboard/monitored')
      } else if (val === 1) {
        this.$router.push('/dashboard/master')
      }
    }
  },
  methods: {
    focusSearch () {
      let searchBar
      let searchButtonMobile = document.getElementById('header-search-mobile--js')
      if (searchButtonMobile.offsetParent) {
        searchButtonMobile.click()
        searchBar = document.getElementById('header-search-name-mobile--js')
      } else {
        searchBar = document.getElementById('header-search-name--js')
      }
      if (typeof (searchBar) !== 'undefined' && searchBar !== null) {
        if (!searchButtonMobile) {
          this.$vuetify.goTo('#header-search-name--js', {
            duration: 500,
            offset: 100,
            easing: 'easeInOutCubic'
          })
        }
        setTimeout(function () {
          searchBar.classList.add('search__focus')
        }, 500)
        setTimeout(function () {
          searchBar.focus()
          searchBar.classList.remove('search__focus')
        }, 1000)
      }
    },
    masterFileStatusGet () {
      this.$API.fileStatus({
        orgId: this.onboardingData.organization.id
      }).then(res => {
        if (res.fileUploaded === 'Y' && res.filePending === 'N') {
          this.$store.dispatch('setDashboardMasterState', true)
        } else {
          this.$store.dispatch('setDashboardMasterState', false)
        }
      }).fail(err => {
        this.$store.dispatch('setDashboardMasterState', false)
        errorHandler(err)
      })
    },
    subscriptionStatusGet () {
      this.spinner.monitoredCount = true
      this.spinner.monitoredTab = true
      this.$API.getSubscriptionDetails({
        orgId: this.onboardingData.organization.id
      }).then(res => {
        this.$store.dispatch('setDashboardMonitoredCompaniesCount', res.totalMonitoringCompanyCount)
        this.spinner.monitoredCount = false
        if (res.totalMonitoringCompanyCount && res.totalMonitoringCompanyCount > 0) {
          this.$store.dispatch('setDashboardMonitoredState', true)
        } else {
          this.$store.dispatch('setDashboardMonitoredState', false)
        }
        this.spinner.monitoredTab = false
      }).fail(err => {
        this.spinner.monitoredCount = false
        this.$store.dispatch('setDashboardMonitoredState', false)
        this.spinner.monitoredTab = false
        if (err.status !== 404) {
          errorHandler(err)
        }
      })
    },
    onTabChange (tabIndex) {
      if (tabIndex === 0 && this.$refs.monitoredList) {
        this.$refs.monitoredList.monitoredCompaniesGet()
      }
    },
    tabsInit () {
      if (this.$route.name === 'DashboardMonitored') {
        this.chartsView = false
        this.tab = 0
      } else if (this.$route.name === 'DashboardMaster') {
        this.chartsView = false
        this.tab = 1
      }
    }
  }
}
</script>
