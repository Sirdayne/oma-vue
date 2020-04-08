<template>
  <div class="confidence-matching-table confidence-matching-table_edit">
    <div class="confidence-matching-back" @click="backUploadSummary">
      <v-icon color="primary">keyboard_arrow_left</v-icon>
      Back to Upload Summary
    </div>
    <div class="confidence-matching-table__title" style="margin-bottom: 8px;">
      <h4>
        No match found
      </h4>
      <v-btn color="primary" v-if="false">Download Records</v-btn>
    </div>
    <div class="confidence-matching-table__text">
      We were unable to find any matches for these records. <br/>
      If you see any mistakes, you may edit the data below.
    </div>
    <v-data-table
      :headers="tableHeaders"
      :items="tableData"
      :items-per-page="10"
      class="table table--mobile-fixed"
      :mobile-breakpoint="100"
      mt-4
    >
      <template v-slot:header="{ headers }">
        <thead class="v-data-table-header v-data-table-header--mobile">
          <tr>
            <th role="columnheader" scope="col" aria-label="Stark Industries" aria-sort="none" class="text-start">
              <span>Company name</span>
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
            <th role="columnheader" scope="col" aria-label="Edit" aria-sort="none" class="text-start"></th>
          </tr>
        </thead>
      </template>
      <template v-slot:item="{ item, select }">
        <tr v-if="item.status === 'high-match'">
          <td colspan="6" class="td-notification">
            <notification type="alert" icon="done" @close="item.status = null">
              Match found! The adjustments you made to your data, has moved this record to a high confidence match.
            </notification>
          </td>
        </tr>
        <tr v-else-if="item.status === 'like-match'">
          <td colspan="6" class="td-notification td-notification__like-match">
            <notification type="alert" icon="done" @close="item.status = null">
              <div class="td-notification__like-match__content">
                <span>A possible match was found! Confirm the details by clicking here.</span>
                <v-btn color="primary" outlined @click="item.status = 'high-match'">View to confirm</v-btn>
              </div>
            </notification>
          </td>
        </tr>
        <tr v-else-if="item.status === 'no-match'">
          <td colspan="6" class="td-notification td-notification__like-match">
            <notification type="alert" icon="edit" @close="item.status = null">
              <div class="td-notification__like-match__content">
                <span>No match was found. Edit the data to try again.</span>
                <v-btn color="primary" outlined @click="item.status = 'edit'">Edit again</v-btn>
              </div>
            </notification>
          </td>
        </tr>
        <tr v-else-if="item.status === 'edit'" class="update-items">
          <td>
            <input class="input" type="text" :value="item.companyName">
          </td>
          <td><input class="input" type="text" :value="item.address1"></td>
          <td><input class="input" type="text" :value="item.city"></td>
          <td><input class="input" type="text" :value="item.state"></td>
          <td><input class="input" type="text" :value="item.country"></td>
          <td>
            <v-btn color="primary" @click="item.id === 2 ? item.status = 'no-match' : item.status = 'like-match'">Update</v-btn>
          </td>
        </tr>
        <tr v-else>
          <td>{{ item.companyName }}</td>
          <td>{{ item.address1 }}</td>
          <td>{{ item.city }}</td>
          <td>{{ item.state }}</td>
          <td>{{ item.country }}</td>
          <td class="edit-control" @click="item.status = 'edit'">
            Edit
            <v-icon>edit</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>

import { errorHandler } from '@/plugins/CustomAPI'
import Notification from '@/components/partials/Notification'

export default {
  props: ['fileUploadId'],
  components: {
    Notification
  },
  data: () => ({
    tableData: [
      {
        id: 0,
        companyName: 'Stark Industries',
        address1: '123 Main Street',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        status: null
      },
      {
        id: 1,
        companyName: 'Stark Industries',
        address1: '123 Main Street',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        status: null
      },
      {
        id: 2,
        companyName: 'Stark Industries',
        address1: '123 Main Street',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        status: null
      },
      {
        id: 3,
        companyName: 'Stark Industries',
        address1: '123 Main Street',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        status: null
      },
      {
        id: 4,
        companyName: 'Stark Industries',
        address1: '123 Main Street',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        status: null
      }
    ],
    tableHeaders: [
      { text: 'Company Name', value: 'companyName', sortable: false, fixed: true },
      { text: 'Address', value: 'address1', sortable: false },
      { text: 'City', value: 'city', sortable: false },
      { text: 'State', value: 'state', sortable: false },
      { text: 'Country', value: 'country', sortable: false },
      { width: '100px', sortable: false, fixed: true }
    ]
  }),
  created () {
    // this.viewDetailResults()
  },
  methods: {
    viewDetailResults () {
      this.spinner = true
      const type = 'nomatch'
      this.$API.viewDetailResults({
        qs: [['type', type]],
        fileUploadId: this.fileUploadId
      }).then(res => {
        this.tableData = res && res.result && res.result.length > 0 ? res.result : []
        this.spinner = false
      }).fail(err => {
        this.spinner = false
        errorHandler(err)
      })
    },
    backUploadSummary () {
      this.$emit('backUploadSummary')
    }
  }
}
</script>
