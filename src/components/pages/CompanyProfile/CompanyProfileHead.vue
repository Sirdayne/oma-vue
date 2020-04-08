<template>
  <div class="company-profile-head">
    <div v-if="trackId" class="company-profile-head__back">
      <div class="company-profile-head__back__link" @click="backToDirectory">
        <v-icon color="primary">keyboard_arrow_left</v-icon>
        Back to Directory
      </div>
    </div>
    <div class="company-profile-head__row">
      <div class="company-profile-head__row__block">
        <div class="company-profile-head__row__block__title">
          <div class="company-profile-head__row__block__title__chip">
            {{ header.businessName }}
            <v-chip
              v-if="header.monitored === 'Y'"
              class="company-profile-head__row__block__title__chip__desktop"
              color="primary"
              small
            >
              monitored
            </v-chip>
          </div>
        </div>
        <p class="company-profile-head__text">
          {{ header.setAddress }}
        </p>
        <v-chip
          v-if="header.monitored === 'Y'"
          class="company-profile-head__row__block__title__chip__mobile"
          color="primary"
          small
        >
          monitored
        </v-chip>
      </div>
      <div>
        <div v-if="trackId" class="company-profile-head__row__buttons">
          <v-btn v-if="false" color="primary" outlined @click="addMasterList">Add to my Master List</v-btn>
          <v-btn v-if="false" color="primary" outlined @click="openModalMasterList">Remove from Master List</v-btn>
          <v-btn v-if="header.monitored !== 'Y' && isAllowedStartMonitoring" color="primary" @click="openModalMonitor">Monitor this company</v-btn>
          <v-btn v-if="header.monitored === 'Y' && isAllowedStopMonitoring" color="primary" @click="openModalMonitor">Stop monitoring</v-btn>
        </div>
        <template v-if="typeof monitoringEndDateExpireDays === 'number' && monitoringEndDateExpireDays >= 0">
          <p v-if="monitoringEndDateExpireDays === 0" class="company-profile-head-expire">Monitoring of this company will expire today</p>
          <p v-else class="company-profile-head-expire">Monitoring of this company expires in {{ monitoringEndDateExpireDays }} days</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: [
    'trackId',
    'header',
    'monitoringEndDateExpireDays',
    'isAllowedStartMonitoring',
    'isAllowedStopMonitoring'
  ],
  methods: {
    backToDirectory () {
      this.$router.go(-1)
    },
    openModalMonitor () {
      this.$emit('openModalMonitor')
    },
    openModalMasterList () {
      this.$emit('openModalMasterList')
    },
    addMasterList () {
      // add flag in company-profile isMasterList
      console.log('add master list API not ready')
    }
  }
}
</script>
