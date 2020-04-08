<template>
  <div>
    <div class="upload-master-list__title">
      <h4>
        Your file is in process
      </h4>
      <v-icon @click="$router.go(-1)">highlight_off</v-icon>
    </div>
    <div class="upload-master-list__step upload-master-list__step-1">
      <div>
        <h4>STEP 3</h4>
        <p>Sit back and relax! Processing a Master file may take<br/>
          awhile. We will notify you when your file is complete.</p>
      </div>
      <div>
        <img src="../../../assets/images/icon-mail.svg" class="upload-master-list__step__icon" alt="Mail">
      </div>
    </div>
    <div class="upload-master-list__hr"></div>
    <div class="upload-master-list__step upload-master-list__step-2">
      <div style="width: 100%;">
        <h4 style="margin-bottom: 16px;">Here’s what you’ll do with the results</h4>
        <div class="upload-master-list__step__container">
          <div class="upload-master-list__step__block">
            <img src="../../../assets/images/icon-statics.svg" class="upload-master-list__step__block__icon" alt="Static">
            <h5>View matched <br/>statistics</h5>
            <p>Records will be organized <br/>as high confidence, likely, and no matches.</p>
          </div>
          <div class="upload-master-list__step__block">
            <img src="../../../assets/images/icon-broom.svg" class="upload-master-list__step__block__icon" alt="Broom">
            <h5>Cleanup low confidence matches</h5>
            <p>Integrity found multiple likely matches, edit your record and resubmit to search again.</p>
          </div>
          <div class="upload-master-list__step__block">
            <img src="../../../assets/images/icon-monitor-reputation.svg" class="upload-master-list__step__block__icon" alt="Reputation">
            <h5>Submit no matches for further research</h5>
            <p>Review records with no matches. These records can be submitted to our Data Stewards for further research.</p>
          </div>
          <div class="upload-master-list__step__block">
            <img src="../../../assets/images/icon-cleanse.svg" class="upload-master-list__step__block__icon" alt="Cleanse">
            <h5>Download enhanced Master List</h5>
            <p>Download your enhanced Master List to update your internal systems.</p>
          </div>
        </div>
      </div>
    </div>
    <footer-block @click="$router.push('/dashboard')">
      <div>
        Go back to the Dashboard
        <v-icon color="white">keyboard_arrow_right</v-icon>
      </div>
    </footer-block>
  </div>
</template>

<script>
import FooterBlock from '@/components/partials/Footer'

export default {
  components: {
    FooterBlock
  }
}
</script>
