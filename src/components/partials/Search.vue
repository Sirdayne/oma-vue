<template>
  <div class="search">
    <div class="search--desktop">
      <div class="search__container d-flex justify-space-between align-center">
        <div class="search__icon">
          <v-icon>search</v-icon>
        </div>
        <div class="search__field">
          <input
            v-model="searchRequest.name"
            type="text"
            class="input"
            placeholder="Company Name*"
            id="header-search-name--js">
        </div>
        <div class="search__field">
          <input
            v-model="searchRequest.address"
            type="text"
            class="input"
            placeholder="Address*"
            id="header-search-address--js">
        </div>
        <div>
          <v-btn
            color="primary"
            @click="searchCompanies()"
            :loading="spinner.searchButton"
          >Search</v-btn>
        </div>
      </div>
    </div>
    <div class="search--mobile">
      <div
        class="search__container cursor-pointer no-select"
        id="header-search-mobile--js"
        @click="modal = true">
        <div class="search__button__icon"><v-icon>search</v-icon></div>
        <div class="search__button__title">Search</div>
      </div>
    </div>
    <div class="modal-nav" v-show="modal">
      <div class="modal-nav__header">
        <div class="modal-nav__header__text">Search</div>
        <div class="modal-nav__header__icon">
          <v-icon @click="modal = false">
            highlight_off
          </v-icon>
        </div>
      </div>
      <div class="modal-nav__content">
        <input
          v-model="searchRequest.name"
          type="text"
          class="input"
          placeholder="Company Name*"
          id="header-search-name-mobile--js">
        <input
          v-model="searchRequest.address"
          type="text"
          class="input"
          placeholder="Address*"
          id="header-search-address-mobile--js">
          <v-btn
            color="primary"
            @click="searchCompanies('mobile')"
            :loading="spinner.searchButton">Search</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import parseAddress from 'parse-address-string'
import { errorHandler } from '@/plugins/CustomAPI'

export default {
  data: () => ({
    modal: false,
    searchRequest: {
      address: null,
      name: null
    },
    spinner: {
      searchButton: false
    }
  }),
  computed: {
    onboardingData () {
      return this.$store.getters.getOnboardingData
    },
    userData () {
      return this.$store.getters.getUserData
    }
  },
  methods: {
    searchCompanies (mode) {
      let nameField = document.getElementById(mode === 'mobile' ? 'header-search-name-mobile--js' : 'header-search-name--js')
      let addressField = document.getElementById(mode === 'mobile' ? 'header-search-address-mobile--js' : 'header-search-address--js')
      nameField.classList.remove('input--error')
      addressField.classList.remove('input--error')
      if (!this.searchRequest.name) {
        nameField.classList.add('input--error')
        nameField.focus()
        if (!this.searchRequest.address) {
          addressField.classList.add('input--error')
        }
      } else if (!this.searchRequest.address) {
        addressField.classList.add('input--error')
        addressField.focus()
      } else {
        this.spinner.searchButton = true
        parseAddress(this.searchRequest.address, (err, address) => {
          if (err) return
          this.$API.searchCompany({
            data: {
              cuid: this.userData.id,
              orgId: this.onboardingData.organization.id,
              companyName: this.searchRequest.name,
              address1: address.street_address1,
              city: address.city,
              state: address.state,
              country: address.country,
              zip: address.postal_code
            }
          }).then(res => {
            if (res) {
              this.searchRequest.name = null
              this.searchRequest.address = null
              this.$store.dispatch('setSearchResults', res)
              this.$router.push('/search-results')
            }
            this.spinner.searchButton = false
          }).fail(err => {
            errorHandler(err)
            if (err.status === 404) {
              this.$store.dispatch('setTraceId', err.responseJSON.traceId)
              this.$router.push('/no-search-results')
            }
            this.spinner.searchButton = false
          })
        })
        if (mode === 'mobile') {
          this.modal = false
          this.searchRequest.address = null
          this.searchRequest.name = null
        }
      }
    }
  }
}
</script>
