<template>
  <div class="generic-error">
    <img src="../../../assets/images/icon-monitor-partners.svg" class="generic-error__img" alt="Error">
    <h4 class="generic-error__title">{{ getGenericErrorTitle ? getGenericErrorTitle : 'Something happened.' }}</h4>
    <p class="generic-error__text">
      {{ getGenericErrorText ? getGenericErrorText : 'This event has been reported.' }}
    </p>
    <p v-if="getTraceId" class="generic-error__text">{{ getTraceId }}</p>
    <div v-if="getGenericErrorBtn" class="generic-error__btns">
      <v-btn color="primary" @click="retry">{{ getGenericErrorBtn }}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getTraceId () {
      return this.$store.getters.getTraceId
    },
    getGenericErrorTitle () {
      return this.$store.getters.getGenericErrorTitle
    },
    getGenericErrorText () {
      return this.$store.getters.getGenericErrorText
    },
    getGenericErrorBtn () {
      return this.$store.getters.getGenericErrorBtn
    }
  },
  destroyed () {
    this.$store.dispatch('resetGenericError')
  },
  methods: {
    retry () {
      this.$router.go(-1)
    }
  }
}
</script>
