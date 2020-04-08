<template>
  <div class="compliance-totals-item">
    <div class="compliance-totals-item__number">{{ value }}</div>
    <div class="compliance-totals-item__text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: ['value', 'text']
}
</script>
