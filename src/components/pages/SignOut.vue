<template>
  <div class="generic-error">
    <img src="../../assets/images/icon-exit.svg" class="generic-error__img generic-error__img__sign-out" alt="Exit">
    <h4 class="generic-error__title">You have successfully signed out.</h4>
    <p class="generic-error__text">
      It’s a good idea to close all browser windows.<br/>
      <br/>
      To log in again, visit the Automotive Exchange and click the “OpenText Integrity” link in<br/>
      the “My Applications” portlet.
    </p>
    <div class="generic-error__btns">
      <v-btn color="primary" style="padding: 0 13px;" @click="redirect">Go to Automotive Exchange</v-btn>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    redirect () {
      const PORTAL_URL = 'https://portal.stg.covisint.com'
      window.location.href = PORTAL_URL
    }
  }
}

</script>
