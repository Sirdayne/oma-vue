<template>
  <div class="compliance-details-item">
    <div class="compliance-details-item__document">
      <img src="../../../../assets/images/file-pdf.svg" class="compliance-details-item__document__icon" alt="Icon">
      <div>
        <div class="compliance-details-item__document__title">Posted on {{ creationDate }}</div>
        <a class="compliance-details-item__document__link" target="_blank" :href="name">
          <span class="compliance-details-item__document__link__text">View Document</span>
          <v-icon>launch</v-icon>
        </a>
      </div>
    </div>
    <div class="compliance-details-item__chips">
      <v-chip color="primary" small v-for="item in categories" :key="item">{{ item }}</v-chip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    categories: Array,
    creationDate: String
  }
}
</script>
