<template>
  <div class="navigation navigation--desktop no-select" v-if="type === 'desktop'">
    <div class="navigation__item" :class="{ 'navigation__item--current': $route.path === '/dashboard' || $route.path === '/dashboard-first' }" @click="$router.push('/dashboard')">Dashboard</div>
    <div class="navigation__item" :class="{ 'navigation__item--current': $route.name === 'MyCompanyProfile' }" @click="$router.push('/my-company-profile')">My Company Profile</div>
    <v-menu offset-y bottom right class="navigation__dropdown">
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          color="primary"
          v-on="on"
          :ripple="false"
          class="navigation__dropdown__control"
        >
          <div class="navigation__avatar">{{ avatarText }}</div>
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
      </template>
      <v-list class="navigation__dropdown__menu">
        <v-list-item>
          <v-list-item-title @click="$router.push('/pricing')">Pricing</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isAdmin">
          <v-list-item-title @click="$router.push('/manage-subscription')">Manage Subscription</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-title @click="signOut()">Sign out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
  <div class="navigation navigation--mobile no-select" v-else-if="type === 'mobile'">
    <div class="navigation__container cursor-pointer no-select" @click="modal = true">
      <div class="navigation__button__icon"><v-icon>dehaze</v-icon></div>
      <div class="navigation__button__title">Menu</div>
    </div>
    <div class="modal-nav" v-show="modal">
      <div class="modal-nav__header">
        <div class="modal-nav__header__text">Menu</div>
        <div class="modal-nav__header__icon">
          <v-icon @click="modal = false">
            highlight_off
          </v-icon>
        </div>
      </div>
      <div class="modal-nav__content">
        <div>
          <div class="navigation__item" @click="$router.push('/dashboard'); modal = false">Dashboard</div>
          <div class="navigation__item" @click="$router.push('/my-company-profile'); modal = false">My Company Profile</div>
        </div>
        <hr class="navigation__delimiter">
        <div>
          <div class="navigation__item" @click="$router.push('/pricing'); modal = false">Pricing</div>
          <div class="navigation__item" @click="$router.push('/manage-subscription'); modal = false" v-if="isAdmin">Manage Subscription</div>
        </div>
        <hr class="navigation__delimiter">
        <div class="navigation__columns">
          <div>
            <div class="navigation__item" @click="signOut()">Sign out</div>
          </div>
          <div class="navigation__avatar">{{ avatarText }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/plugins/Auth'

export default {
  props: {
    type: String
  },
  data: () => ({
    modal: false
  }),
  computed: {
    avatarText () {
      let userData = this.$store.getters.getUserData
      return userData ? userData.name.given.charAt(0) + userData.name.surname.charAt(0) : ''
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    }
  },
  methods: {
    signOut: function () {
      this.modal = false
      Auth.signOut()
    }
  }
}
</script>
