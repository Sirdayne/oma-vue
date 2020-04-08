<template>
  <transition name="fade">
    <div class="notification" :class="{ 'notification--alert': type === 'alert', 'notification--error': type === 'error' }" v-show="show">
      <div class="notification__icon">
        <v-icon color="white" v-if="icon">{{ icon }}</v-icon>
        <v-icon color="white" v-if="!icon && type === 'alert'">notifications_none</v-icon>
        <v-icon color="white" v-else-if="!icon & type === 'error'">error_outline</v-icon>
      </div>
      <div class="notification__text">
        <slot></slot>
      </div>
      <div>
        <img src="../../assets/images/close.svg" class="cursor-pointer" @click="close">
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    icon: String,
    type: String
  },
  data: () => ({
    show: true
  }),
  methods: {
    close () {
      this.show = false
      this.$emit('close')
    }
  }
}
</script>
