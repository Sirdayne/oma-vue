<template>
  <div>
    <div class="onboarding__steps__wrapper">
      <transition name="slide-left-fade" mode="out-in">
        <div class="onboarding__step onboarding__step-1" v-if="currentStep === 1" key="step-1">
          <div class="onboarding__step-1__image">
            <img src="@/assets/images/mobile-mastercard-containers@3x.jpg">
          </div>
          <div class="onboarding__step-1__content">
            <div class="onboarding__step-1__content__header">Increasing Integrity within the Supply Chain </div>
            <div class="onboarding__step-1__content__text">OpenText and Mastercard have partnered to modernize risk, compliance, and payments within your supply chain. Enhance your sourcing, monitoring, and trade finance processes with Integrity, powered by Mastercard.</div>
            <div class="onboarding__steps__button onboarding__steps__button--mobile">
              <v-btn color="primary" @click="goNext()">
                Let's get started
              </v-btn>
            </div>
          </div>
        </div>
        <div class="onboarding__step onboarding__step-2" v-else-if="currentStep === 2" key="step-2">
          <div class="onboarding__step-2__content">
            <div class="onboarding__step-2__content__header">New Integrity on the Exchange</div>
            <div class="onboarding__step-2__content__text">
              Integrity gives you access to risk and compliance information from 41,000+ sources and 171 countries. Information available includes demographics, credit scores, sanctions, adverse media, financial and regulatory filings, law enforcement and court records, and politically exposed persons. All records are supported by direct links to the source documentation.
            </div>
            <v-row class="onboarding__step-2__content__cols">
              <v-col
                cols="12"
                md="3"
                class="onboarding__step-2__content__cols__item"
              >
                <div class="onboarding__step-2__content__cols__icon">
                  <img src="@/assets/images/icon-monitor-reputation.svg">
                </div>
                <div class="onboarding__step-2__content__cols__header">Monitor Your Reputation</div>
                <div class="onboarding__step-2__content__cols__text">
                  Monitor your company profile on Integrity and receive automatic notifications when new data is published.
                </div>
              </v-col>
              <v-col
                cols="12"
                md="3"
                class="onboarding__step-2__content__cols__item"
              >
                <div class="onboarding__step-2__content__cols__icon">
                  <img src="@/assets/images/icon-know.svg">
                </div>
                <div class="onboarding__step-2__content__cols__header">Gather Business Partner Intelligence</div>
                <div class="onboarding__step-2__content__cols__text">
                  Find existing and new business partners by searching the database of over 210+ million entities on record.
                </div>
              </v-col>
              <v-col
                cols="12"
                md="3"
                class="onboarding__step-2__content__cols__item"
              >
                <div class="onboarding__step-2__content__cols__icon">
                  <img src="@/assets/images/icon-monitor-partners.svg">
                </div>
                <div class="onboarding__step-2__content__cols__header">Monitor your Business Partners</div>
                <div class="onboarding__step-2__content__cols__text">
                  Receive notices and alerts when new information is reported within your business partner ecosystem.
                </div>
              </v-col>
              <v-col
                cols="12"
                md="3"
                class="onboarding__step-2__content__cols__item"
              >
                <div class="onboarding__step-2__content__cols__icon">
                  <img src="@/assets/images/icon-cleanse.svg">
                </div>
                <div class="onboarding__step-2__content__cols__header">Enhance your <br>Master Data</div>
                <div class="onboarding__step-2__content__cols__text">
                  Use the Integrity Trade Directory to enhance your master list and eliminate redundant records and processes.
                </div>
              </v-col>
            </v-row>
            <div class="onboarding__steps__button onboarding__steps__button--mobile">
              <v-btn color="primary" @click="goNext()">
                Continue
              </v-btn>
            </div>
          </div>
        </div>
      </transition>
      <div class="onboarding__steps__button onboarding__steps__button--desktop">
        <v-btn
          color="primary"
          id="onboarding-button--js"
          @click="goNext()">
          <transition name="fade" mode="out-in">
            <span v-if="currentStep === 1" key="bt-1">Let's get started</span>
            <span v-else-if="currentStep === 2" key="bt-2">Continue</span>
          </transition>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    currentStep: 1
  }),
  methods: {
    goNext () {
      if (this.currentStep === 2) {
        this.$router.push('/brieftc')
      } else {
        this.currentStep++
        document.getElementById('onboarding-button--js').blur()
      }
    }
  }
}
</script>
