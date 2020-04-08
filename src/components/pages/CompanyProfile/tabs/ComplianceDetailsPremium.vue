<template>
  <div class="company-profile-blurred">
    <img src="../../../../assets/images/blurred-compliance-premium.jpg" srcset="../../../../assets/images/blurred-compliance-premium@2x.jpg 2x, ../../../../assets/images/blurred-compliance-premium@3x.jpg 3x" class="company-profile-blurred__image">
    <div class="company-profile-blurred-caption">
      View Sanctions, Adverse Media, Politically Exposed Persons, Legal Issues and More
      <div><span class="link" @click="openModalMonitor">Monitor this Company.</span></div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    openModalMonitor () {
      this.$emit('openModalMonitor')
    }
  }
}
</script>
