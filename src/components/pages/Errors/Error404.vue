<template>
  <div class="generic-error">
    <img src="../../../assets/images/icon-monitor-partners.svg" class="generic-error__img" alt="Error">
    <h4 class="generic-error__title">404</h4>
    <p class="generic-error__text">
      Page not found<br/>
      The page you have requested has either moved or doesn’t exist.<br/>
      This incident has been reported.
    </p>
    <p v-if="getTraceId" class="generic-error__text">{{ getTraceId }}</p>
    <div class="generic-error__btns">
      <v-btn color="primary" @click="routeDashboard">Back to Dashboard</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getTraceId () {
      return this.$store.getters.getTraceId
    }
  },
  methods: {
    routeDashboard () {
      this.$router.push('/dashboard')
    }
  }
}
</script>
