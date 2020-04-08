
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { errorHandler, defs as CustomAPI } from './plugins/CustomAPI'
import IDMAPI from './plugins/IDMAPI'
import Auth from './plugins/Auth'
import moment from 'moment'

// cui.js requirements
import $ from 'jquery'
import lodash from 'lodash'

Object.defineProperty(Vue.prototype, '$lodash', { value: lodash })
Object.defineProperty(Vue.prototype, '$moment', { value: moment })

window.$ = $
window._ = lodash
require('@covisint/cui.js/dist/cui.min.js')

Vue.config.productionTip = false

Vue.filter('withoutProtocol', val => {
  // this filter will remove protocol from URL for display purposes
  if (!val) return ''
  return val.replace(/(^\w+:|^)\/\//, '')
})

async function appInit () {
  // uncomment to debug
  // window.cui.enableLog()

  await window.cui.api({
    sessionId: 1,
    serviceUrl: process.env.SERVICE_URL || 'STGBLUE',
    dataCallDefs: [
      CustomAPI,
      IDMAPI
    ]
  }).then((obj) => {
    Vue.prototype.$API = obj
  }).fail((err) => {
    console.log(err)
  })

  Auth.authCheck().then(res => {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      vuetify,
      components: { App },
      template: '<App/>'
    })
  }, err => {
    errorHandler(err)
    console.log('ERROR: ', err)
  })
}

appInit()
