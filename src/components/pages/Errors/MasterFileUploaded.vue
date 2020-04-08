<template>
  <div class="generic-error">
    <img src="../../../assets/images/icon-monitor-partners.svg" class="generic-error__img" alt="Error">
    <h4 class="generic-error__title">A Master List file is already being uploaded</h4>
    <p class="generic-error__text">
      You or someone else in your organization is currently uploading a Master File. Please be<br/>
      patient as this process can take up to 24 hours.
    </p>
    <div class="generic-error__btns">
      <v-btn color="primary" @click="routeDashboard">Back to Dashboard</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    routeDashboard () {
      this.$router.push('/dashboard')
    }
  }
}
</script>
