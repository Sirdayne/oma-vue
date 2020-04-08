<template>
  <div class="header">
    <div class="header__container d-flex flex-row align-center justify-space-between">
      <div><img src="../../assets/images/logo-opentext-integrity.svg" class="header__opentext-logo" :class="{ 'cursor-pointer': logoLinkActive }" alt="" @click="dashboardGo"></div>
      <slot></slot>
      <div><img src="../../assets/images/powered-by-mastercard.svg" class="header__mastercard-logo" alt=""></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    logoLinkActive () {
      const componentsExcluded = [
        'BriefTC',
        'ContactOrgAdmin',
        'Onboarding',
        'OrganizationUnderReview',
        'OrgRegistration',
        'RegistrationSuccess',
        'SignOut'
      ]
      return !componentsExcluded.find(name => name === this.$route.name)
    }
  },
  methods: {
    dashboardGo: function () {
      if (this.logoLinkActive) this.$router.push('/dashboard')
    }
  }
}
</script>
