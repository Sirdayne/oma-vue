import Vue from 'vue'
import store from '../store'
import router from '../router'

const authCheck = () => {
  return new Promise((resolve, reject) => {
    let authInfo
    Vue.prototype.$API.handleCovAuthResponse({ selfRedirect: true }).then(res => {
      store.dispatch('userLoggedIn', true)
      // resolve(true)
    }).fail(err => {
      store.dispatch('userLoggedIn', false)
      reject(err)
    })
    authInfo = Vue.prototype.$API.getCovAuthInfo()
    if (authInfo.cuid) {
      Vue.prototype.$API.getPerson({ personId: authInfo.cuid }).then(res => {
        store.dispatch('userLoggedIn', true)
        store.dispatch('setUserData', res)
        resolve(true)
      }).fail(err => {
        store.dispatch('clearUserData')
        reject(err)
      })
    } else {
      Vue.prototype.$API.covAuth({
        originUri: process.env.ORIGIN_URI,
        authRedirect: window.location.href,
        appRedirect: window.location.href
      })
    }
  })
}

const signOut = () => {
  localStorage.clear()
  store.dispatch('userLoggedIn', false)
  store.dispatch('clearUserData')
  const url = `${process.env.SERVICE_URL}/p/apiProxy/authn/v4/token/tasks/invalidate?type=logout`
  fetch(url, {
    headers: {
      'solutioninstanceid': process.env.SOLUTION_INSTANCE_ID
    }
  })
  router.push('/sign-out')
}

export default {
  authCheck,
  signOut
}
