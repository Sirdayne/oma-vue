<template>
  <div class="generic-error">
    <img src="../../../assets/images/icon-monitor-partners.svg" class="generic-error__img" alt="Error">
    <h4 class="generic-error__title">503</h4>
    <p class="generic-error__text">
      Server is currently not available<br/>
      The Server is currently undergoing some maintenance.<br/>
      Please check back later.
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
