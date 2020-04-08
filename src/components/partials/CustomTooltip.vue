<template>
  <div class="custom-tooltip" :class="type">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['type']
}
</script>
