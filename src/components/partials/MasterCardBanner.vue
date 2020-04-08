<template>
  <div class="master-card-banner" @click="toMasterCard()">
    <div class="master-card-banner-container">
      <div class="master-card-banner__logo">
        <div class="master-card-banner__logo__red"></div>
        <div class="master-card-banner__logo__orange"></div>
      </div>
      <div class="master-card-banner__text">
        <span>Powered by Mastercard Track&trade;.&nbsp;</span>
        <span>All data provided by external partners</span>
      </div>
    </div>
    <v-icon color="primary">keyboard_arrow_right</v-icon>
  </div>
</template>

<script>
export default {
  methods: {
    toMasterCard () {
      console.log('go to master card')
    }
  }
}
</script>
