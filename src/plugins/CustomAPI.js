import router from '../router'
import store from '../store'

const errorHandler = err => {
  if (!err) return
  if (err.status === 401) {
    let path = window.location.hash
    let pathEncoded = encodeURIComponent(process.env.SERVICE_URL + '/' + path.split('?xsrfToken=')[0])
    pathEncoded = pathEncoded.replace(/%23/g, '%2523')
    localStorage.clear()
    window.location.href = process.env.PORTAL_URL_BASE + pathEncoded
  } else if (err.status === 404) {
    err.responseJSON && err.responseJSON.traceId && store.dispatch('setTraceId', err.responseJSON.traceId)
    router.push('/error-404')
  } else if (err.status === 500) {
    err.responseJSON && err.responseJSON.traceId && store.dispatch('setTraceId', err.responseJSON.traceId)
    router.push('/error-500')
  } else if (err.status === 503) {
    err.responseJSON && err.responseJSON.traceId && store.dispatch('setTraceId', err.responseJSON.traceId)
    router.push('/error-503')
  } else {
    err.responseJSON && err.responseJSON.traceId && store.dispatch('setTraceId', err.responseJSON.traceId)
    router.push('/generic-error')
  }
}

const defs = [
  {
    cmd: 'getAdverseMediaAlerts',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/organization/v1/{orgId}/dashboard/adverseMediaAlerts',
    type: 'GET'
  },
  {
    cmd: 'getComplianceAlerts',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/organization/v1/{orgId}/dashboard/complianceAlerts',
    type: 'GET'
  },
  {
    cmd: 'getCreditRisk',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/organization/v1/{orgId}/dashboard/creditRisk',
    type: 'GET'
  },
  {
    cmd: 'getGeographicDistribution',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/organization/v1/{orgId}/dashboard/geographicDistribution',
    type: 'GET'
  },
  {
    cmd: 'getIndustryClassifications',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/organization/v1/{orgId}/dashboard/industryClassifications',
    type: 'GET'
  },
  {
    cmd: 'getMasterCompanies',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/organization/v1/{orgId}/masterList?page={page}&pageSize={pageSize}&name={companyName}&match={matchType}',
    type: 'GET'
  },
  {
    cmd: 'getMonitoredCompanies',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/organization/v1/{orgId}/monitoredList?page={page}&pageSize={pageSize}&name={companyName}',
    type: 'GET'
  },
  {
    cmd: 'getMyCompanyDetails',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: `/p/maProxy/ma/user/v1/{cuid}/myCompanyDetails`,
    type: 'GET'
  },
  {
    cmd: 'getRevenueDistribution',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/organization/v1/{orgId}/dashboard/revenueDistribution',
    type: 'GET'
  },
  {
    cmd: 'getSubscriptionDetails',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/subscription/v1/organization/{orgId}/subscriptionStatus',
    type: 'GET'
  },
  {
    cmd: 'getCompanyDetails',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: `/p/maProxy/ma/company/v1/companyDetails`,
    type: 'POST'
  },
  {
    cmd: 'disableChecklist',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/user/v1/{cuid}/disableChecklist',
    type: 'POST'
  },
  {
    cmd: 'downloadMasterList',
    cmdType: 'secured',
    // accepts: 'application/json',
    contentType: 'text/csv',
    call: '/p/maProxy/ma/organization/v1/{orgId}/downloadMasterList',
    type: 'GET'
  },
  {
    cmd: 'downloadMonitoredList',
    cmdType: 'secured',
    // accepts: 'application/json',
    contentType: 'text/csv',
    call: '/p/maProxy/ma/organization/v1/{orgId}/downloadMonitoredList',
    type: 'GET'
  },
  {
    cmd: 'companyMonitorStart',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: `/p/maProxy/ma/company/v1/monitor/start`,
    type: 'POST'
  },
  {
    cmd: 'companyMonitorStop',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: `/p/maProxy/ma/company/v1/monitor/stop`,
    type: 'POST'
  },
  {
    cmd: 'companyRemoveFromList',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: `/p/maProxy/ma/organization/v1/{orgId}/masterList/{vendorUploadId}`,
    type: 'DELETE'
  },
  {
    cmd: 'getMonitoringStatus',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: `/p/maProxy/ma/company/v1/monitoringStatus`,
    type: 'POST'
  },
  {
    cmd: 'postOnboarding',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/user/v1/onboarding',
    type: 'POST'
  },
  {
    cmd: 'postOrgRegister',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/user/v1/register',
    type: 'POST'
  },
  {
    cmd: 'postReactivateSubscription',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/subscription/v1/organization/{orgId}/reactivate',
    type: 'POST'
  },
  {
    cmd: 'postStartSubscription',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/subscription/v1/organization/{orgId}/start',
    type: 'POST'
  },
  {
    cmd: 'postStopSubscription',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/subscription/v1/organization/{orgId}/stop',
    type: 'POST'
  },
  {
    cmd: 'uploadMasterFile',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: `/p/maProxy/ma/organization/v1/{orgId}/upload`,
    type: 'POST'
  },
  {
    cmd: 'fileStatus',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: `/p/maProxy/ma/organization/v1/{orgId}/fileStatus`,
    type: 'GET'
  },
  {
    cmd: 'viewSummaryResults',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: `/p/maProxy/ma/file/v1/{orgId}/viewSummaryResults`,
    type: 'GET'
  },
  {
    cmd: 'viewDetailResults',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: `/p/maProxy/ma/file/v1/{fileUploadId}/viewDetailResults`,
    type: 'GET'
  },
  {
    cmd: 'getLikelyMatches',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: `/p/maProxy/ma/organization/v1/{orgId}/likelyMatches`,
    type: 'GET'
  },
  {
    cmd: 'convertLmToHc',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: `/p/maProxy/ma/organization/v1/{orgId}/convertLmToHc/{vendorUploadId}`,
    type: 'PUT'
  },
  {
    cmd: 'searchCompany',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/company/v1/search',
    type: 'POST'
  },
  {
    cmd: 'updateTandC',
    cmdType: 'secured',
    accepts: 'application/json',
    contentType: 'application/json',
    call: '/p/maProxy/ma/user/v1/{cuid}/updateTandC',
    type: 'POST'
  }
]

export {
  errorHandler,
  defs
}
