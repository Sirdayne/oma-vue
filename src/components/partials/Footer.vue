<template>
  <div class="footer-spacer">
    <v-app-bar
      bottom
      height="106"
      tag="footer"
      class="footer"
      :class="{ 'cursor-pointer': $listeners.click }"
      @click="$emit('click')"
      fixed>
      <div class="footer__container">
        <slot></slot>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {}
</script>
