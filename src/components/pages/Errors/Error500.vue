<template>
  <div class="generic-error">
    <img src="../../../assets/images/icon-monitor-partners.svg" class="generic-error__img" alt="Error">
    <h4 class="generic-error__title">500</h4>
    <p class="generic-error__text">
      Unexpected error<br/>
      We’re sorry, the server encountered an error and was unable to complete your request.<br/>
      Try refreshing the page to see if the error still occurs.<br/>
      This incident has been reported.
    </p>
    <p v-if="getTraceId" class="generic-error__text">{{ getTraceId }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    getTraceId () {
      return this.$store.getters.getTraceId
    }
  }
}
</script>
