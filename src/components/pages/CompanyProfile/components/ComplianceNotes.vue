<template>
  <div class="compliance-notes">
    <div class="compliance-notes__row">
      <div class="compliance-notes__row__back" @click="resetStatus">
        <v-icon color="primary">keyboard_arrow_left</v-icon>
        Back to Compliance Issues
      </div>
      <v-icon @click="resetStatus">highlight_off</v-icon>
    </div>
    <h3 class="compliance-notes__title">Compliance Notes</h3>
    <div>
      <div class="compliance-notes__item"
           v-for="item in notes"
           :key="item.note"
      >
        {{ item.note }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['resetStatus', 'notes']
}
</script>
