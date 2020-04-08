<template>
  <div>
    <div class="confidence-matching-back" @click="backUploadSummary">
      <v-icon color="primary">keyboard_arrow_left</v-icon>
      Back to Upload Summary
    </div>
    <div class="confidence-matching-table__title">
      <h4>
        High Confidence Matches
      </h4>
      <v-btn color="primary" v-if="false">Download Records</v-btn>
    </div>
    <v-data-table
      :headers="tableHeaders"
      :items="tableData"
      :options.sync="options"
      :server-items-length="totalMatchCount"
      :items-per-page="10"
      class="table table--mobile-fixed"
      loading-text="Loading... Please wait"
      :mobile-breakpoint="100"
      :footer-props="{
        'items-per-page-options': [5, 10, 15, 20]
      }"
      mt-4
    >
      <template v-slot:header="{ headers }">
        <thead class="v-data-table-header v-data-table-header--mobile">
          <tr>
            <th role="columnheader" scope="col" aria-label="Company Name" aria-sort="none" class="text-start">
              <span>Company Name</span>
            </th>
            <th role="columnheader" scope="col" aria-label="Address" aria-sort="none" class="text-start">
              <span>Address</span>
            </th>
            <th role="columnheader" scope="col" aria-label="City" aria-sort="none" class="text-start">
              <span>City</span>
            </th>
            <th role="columnheader" scope="col" aria-label="State" aria-sort="none" class="text-start">
              <span>State</span>
            </th>
            <th role="columnheader" scope="col" aria-label="Country" aria-sort="none" class="text-start">
              <span>Country</span>
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:item="{ item, select }">
        <tr>
          <td>{{ item.companyName }}</td>
          <td>{{ item.address1 }}</td>
          <td>{{ item.city }}</td>
          <td>{{ item.state }}</td>
          <td>{{ item.country }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>

import { errorHandler } from '@/plugins/CustomAPI'

export default {
  props: ['fileUploadId'],
  data: () => ({
    loading: true,
    tableData: [],
    totalMatchCount: 0,
    options: {
      page: 1,
      itemsPerPage: 10
    },
    tableHeaders: [
      { text: 'Company Name', value: 'companyName', sortable: false, fixed: true },
      { text: 'Address', value: 'address1', sortable: false },
      { text: 'City', value: 'city', sortable: false },
      { text: 'State', value: 'state', sortable: false },
      { text: 'Country', value: 'country', sortable: false }
    ]
  }),
  watch: {
    'options' () {
      this.viewDetailResults()
    }
  },
  created () {
    this.viewDetailResults()
  },
  methods: {
    viewDetailResults () {
      this.loading = true
      const { page, itemsPerPage } = this.options
      const type = 'highconfidence'
      this.$API.viewDetailResults({
        qs: [['type', type], ['page', page], ['pageSize', itemsPerPage]],
        fileUploadId: this.fileUploadId
      }).then(res => {
        this.totalMatchCount = res && res.totalMatchCount ? res.totalMatchCount : 0
        this.tableData = res && res.result && res.result.length > 0 ? res.result : []
        this.loading = false
      }).fail(err => {
        this.loading = false
        errorHandler(err)
      })
    },
    backUploadSummary () {
      this.$emit('backUploadSummary')
    }
  }
}
</script>
