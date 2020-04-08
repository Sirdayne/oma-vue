<template>
  <div class="company-profile-item">
    <h4>
      {{ title }}
      <lock v-if="isPremiumData"></lock>
      <no-data v-else-if="!value"></no-data>
    </h4>
    <p v-if="isPremiumData" class="blur">Premium Data</p>
    <p v-else-if="!value" class="no-data">—</p>
    <p v-else>{{ value }}</p>
  </div>
</template>

<script>
import Lock from '@/components/pages/CompanyProfile/components/Lock'
import NoData from '@/components/pages/CompanyProfile/components/NoData'

export default {
  components: {
    Lock,
    NoData
  },
  props: ['title', 'value', 'isPremiumData']
}
</script>
