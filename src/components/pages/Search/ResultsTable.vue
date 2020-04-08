<template>
  <div>
    <v-container my-4 pa-0 pb-sm-4 class="metrics-text">
      <v-row no-gutters>
        <v-col>
          <strong v-if="resultsCount">{{ resultsCount }}</strong><span v-else>No</span> result<span v-if="!resultsCount || resultsCount > 1">s</span> found
        </v-col>
<!--         <v-col class="text-right">
          Credits: <strong>3 free</strong>
        </v-col> -->
      </v-row>
    </v-container>
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
            <th role="columnheader" scope="col" aria-label="Company Name" aria-sort="none" class="text-start">
              <span>Company Name</span>
            </th>
            <th role="columnheader" scope="col" aria-label="Company Name" aria-sort="none" class="text-start table__column-placeholder">
              <span>Company Name</span>
            </th>
            <th role="columnheader" scope="col" aria-label="City &amp; State" aria-sort="none" class="text-start">
              <span>City &amp; State</span>
            </th>
            <th role="columnheader" scope="col" aria-label="Country" aria-sort="none" class="text-start">
              <span>Country</span>
            </th>
            <th role="columnheader" scope="col" aria-label="Company URL" aria-sort="none" class="text-start">
              <span>Company URL</span>
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:item="{ item, select }">
        <tr :class="{ 'table__visited-row': item.visited }" @click="routeCompanyProfile(item.trackId)">
          <td>
            <div>
              <div class="inline-block">{{ item.name }}</div>
              <v-chip
                color="primary"
                v-if="item.monitored"
                small
                class="ml-1">
                Monitored
              </v-chip>
            </div>
          </td>
          <td class="table__column-placeholder">
            <div class="inline-block">{{ item.name }}</div>
            <v-chip
              color="primary"
              v-if="item.monitored"
              small
              class="ml-1">
              Monitored
            </v-chip>
          </td>
          <td>{{ item.address ? item.address : '' }}</td>
          <td>{{ item.country ? item.country : '' }}</td>
          <td class="table__link__cell">
            <template v-if="item.url">
              <span class="table__link__text">{{ item.url }}</span><a :href="item.url" target="_blank" @click.stop><v-icon small class="table__link__icon">launch</v-icon></a>
            </template>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    tableHeaders: [
      { text: 'Company Name', value: 'name', sortable: false, fixed: true },
      { text: 'City & State', value: 'address', sortable: false },
      { text: 'Country', value: 'country', sortable: false },
      { text: 'Company URL', value: 'url', sortable: false }
    ]
  }),
  computed: {
    searchResults () {
      return this.$store.getters.getSearchResults
    },
    tableData () {
      let tableData = []
      if (this.searchResults) {
        for (const company of this.searchResults.companiesList) {
          tableData.push({
            address: `${company.city}` + (company.state ? `, ${company.state}` : ''),
            country: company.country,
            monitored: company.monitored === 'Y',
            name: company.companyName,
            trackId: company.trackId,
            url: company.url,
            visited: false
          })
        }
      }
      return tableData
    },
    resultsCount () {
      return this.searchResults ? this.searchResults.count : null
    }
  },
  methods: {
    routeCompanyProfile (trackId) {
      let company = this.searchResults.companiesList.find(obj => { return obj.trackId === trackId })
      const query = {
        companyName: company.companyName,
        address1: company.address1,
        city: company.city,
        state: company.state,
        country: company.country,
        zip: company.zip
      }
      this.$router.push({ name: 'CompanyProfile', params: { trackId: trackId }, query: query })
    }
  }
}
</script>
