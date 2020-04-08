<template>
  <div class="org-reg">
    <div class="org-reg__header" id="org-reg-header--js">
      Organization Registration
    </div>
    <notification type="error" v-for="id in errors" :key="id">
      Please fill out {{ fieldLabel(id) }}.
    </notification>
    <notification type="error" v-if="registerError">
      {{ registerError }}
    </notification>
    <template v-if="orgData">
      <div class="org-reg__block">
        <div class="org-reg__block__header">
          Company Details
        </div>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="name">Registered Business Name <v-icon>lock</v-icon></label>
            <input v-model="orgData.companyDetails.regBusinessName" type="text" name="name" id="name--js" class="input-validated" data-label="Registered Business Name" disabled>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="track-id">Track ID <v-icon>lock</v-icon></label>
            <input v-model="orgData.companyDetails.trackId" type="text" name="track-id" id="track-id--js" class="input-validated" data-label="Track ID" disabled>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="address">Street Address <v-icon>lock</v-icon></label>
            <input v-model="orgData.companyDetails.streetAddress" type="text" name="address" id="address--js" class="input-validated" data-label="Street Address" disabled>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="city">City <v-icon>lock</v-icon></label>
            <input v-model="orgData.companyDetails.city" type="text" name="city" id="city--js" class="input-validated" data-label="City" disabled>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="state">State <v-icon>lock</v-icon></label>
            <input v-model="orgData.companyDetails.state" type="text" name="state" id="state--js" class="input-validated" data-label="State" disabled>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="postal-code">ZIP Code <v-icon>lock</v-icon></label>
            <input v-model="orgData.companyDetails.zip" type="text" name="postal-code" id="postal-code--js" class="input-validated" data-label="ZIP Code" disabled>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="country">Country <v-icon>lock</v-icon></label>
            <input v-model="orgData.companyDetails.country" type="text" name="country" id="country--js" class="input-validated" data-label="Country" disabled>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="tax-id">Tax ID/Registration Number (Required)</label>
            <input v-model="orgData.companyDetails.taxId" type="text" name="tax-id" class="input-validated" data-label="Tax ID" id="tax-id--js">
          </v-col>
        </v-row>
      </div>
      <div class="org-reg__block">
        <div class="org-reg__block__header">
          Contact
        </div>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="first-name">First Name <v-icon>lock</v-icon></label>
            <input v-model="orgData.contactInfo.firstName" type="text" name="first-name" id="first-name--js" class="input-validated" data-label="First Name" disabled>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="last-name">Last Name <v-icon>lock</v-icon></label>
            <input v-model="orgData.contactInfo.lastName" type="text" name="last-name" id="last-name--js" class="input-validated" data-label="Last Name" disabled>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="title">Title (Required)</label>
            <input v-model="orgData.contactInfo.title" type="text" name="title" id="title--js" class="input-validated" data-label="Title">
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="email">Email <v-icon>lock</v-icon></label>
            <input v-model="orgData.contactInfo.emailAddress" type="text" name="email" id="email--js" class="input-validated" data-label="Email" disabled>
          </v-col>
        </v-row>
      </div>
      <div class="org-reg__block">
        <div class="org-reg__block__header">
          Billing Details
        </div>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="billing-address">Street Address (Required)</label>
            <input v-model="orgData.billingDetails.streetAddress" type="text" name="billing-address" id="billing-address--js" class="input-validated" data-label="Street Address">
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="billing-city">City (Required)</label>
            <input v-model="orgData.billingDetails.city" type="text" name="billing-city" id="billing-city--js" class="input-validated" data-label="City">
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="billing-state">State (Required)</label>
            <input v-model="orgData.billingDetails.state" type="text" name="billing-state" id="billing-state--js" class="input-validated" data-label="State">
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="billing-postal-code">ZIP Code (Required)</label>
            <input v-model="orgData.billingDetails.zip" type="text" name="billing-postal-code" id="billing-postal-code--js" class="input-validated" data-label="ZIP Code">
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="billing-country">Country (Required)</label>
            <input v-model="orgData.billingDetails.country" type="text" name="billing-country" id="billing-country--js" class="input-validated" data-label="Country">
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="contact-name">Contact Name <v-icon>lock</v-icon></label>
            <input v-model="orgData.billingDetails.contactName" type="text" name="contact-name" id="contact-name--js" class="input-validated" data-label="Contact Name" disabled>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <label for="contact-email">Contact Email <v-icon>lock</v-icon></label>
            <input v-model="orgData.billingDetails.contactEmail" type="text" name="contact-email" id="contact-email--js" class="input-validated" data-label="Contact Email" disabled>
          </v-col>
        </v-row>
      </div>
    </template>
    <footer-block @click="formSubmit()">
      <div>
        Submit organization form for approval
        <v-icon color="white">keyboard_arrow_right</v-icon>
      </div>
    </footer-block>
  </div>
</template>

<script>
import Notification from '@/components/partials/Notification'
import FooterBlock from '@/components/partials/Footer'
import { errorHandler } from '@/plugins/CustomAPI'

export default {
  components: {
    FooterBlock,
    Notification
  },
  computed: {
    onboardingData () {
      return this.$store.getters.getOnboardingData
    },
    userData () {
      return this.$store.getters.getUserData
    }
  },
  data: () => ({
    errors: [],
    orgData: null,
    registerError: null
  }),
  created () {
    this.populateData()
  },
  methods: {
    fieldLabel (id) {
      return document.getElementById(id).dataset.label
    },
    formSubmit () {
      const fields = document.querySelectorAll('.input-validated')
      this.errors = []
      this.$nextTick(() => {
        for (var i = 0; i < fields.length; i++) {
          fields[i].classList.remove('input--error')
          if (!fields[i].value) {
            fields[i].classList.add('input--error')
            this.errors.push(fields[i].id)
          }
        }
        if (this.errors.length > 0) {
          this.$vuetify.goTo('#org-reg-header--js', {})
        } else {
          this.$API.postOrgRegister({
            data: this.orgData
          }).then(res => {
            this.$router.push('/registration-success')
          }).fail(err => {
            if (err.status === 400 || err.status === 403) {
              this.registerError = err.responseJSON && err.responseJSON.message ? err.responseJSON.message : 'Error'
              this.$vuetify.goTo('#org-reg-header--js', {})
            } else {
              this.$store.dispatch('setGenericError', {
                title: 'Something went wrong',
                text: 'Sorry, we’re unable to connect to our systems at this time. Please try again later.',
                btn: 'Retry'
              })
              errorHandler(err)
            }
          })
        }
      })
    },
    populateData () {
      this.orgData = {
        cuid: this.userData.id,
        orgId: this.onboardingData.organization.id,
        companyDetails: {
          regBusinessName: this.onboardingData.track.businessName,
          trackId: this.onboardingData.organization.trackId,
          streetAddress: this.onboardingData.track.address.streetAddress,
          city: this.onboardingData.track.address.city,
          state: this.onboardingData.track.address.state,
          zip: this.onboardingData.track.address.zip,
          country: this.onboardingData.track.address.country,
          taxId: null
        },
        contactInfo: {
          firstName: this.onboardingData.firstName,
          lastName: this.onboardingData.lastName,
          title: this.onboardingData.title,
          emailAddress: this.onboardingData.emailAddress
        },
        billingDetails: {
          streetAddress: null,
          city: null,
          state: null,
          zip: null,
          country: null,
          contactName: `${this.onboardingData.firstName} ${this.onboardingData.lastName}`,
          contactEmail: this.onboardingData.emailAddress
        }
      }
    }
  }
}
</script>
