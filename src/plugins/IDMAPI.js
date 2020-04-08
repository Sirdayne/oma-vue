export default [
  {
    version: '1.1.0',
    cmd: '_v',
    call: '/v'
  },
  {
    cmd: 'getOrganization',
    cmdType: 'secured',
    call: '/p/apiProxy/organization/v3/organizations/{organizationId}',
    type: 'GET',
    accepts: 'application/vnd.com.covisint.platform.organization.v1+json'
  },
  {
    cmd: 'getPerson',
    call: '/p/apiProxy/person/v3/persons/{personId}',
    type: 'GET',
    accepts: 'application/vnd.com.covisint.platform.person.v1+json'
  }
]
