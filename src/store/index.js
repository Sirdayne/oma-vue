import Vue from 'vue'
import Vuex from 'vuex'
import CompanyProfile from '@/store/modules/CompanyProfile'
import GenericError from '@/store/modules/GenericError'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dashboard: {
      checklistShow: true,
      hasMasterCompanies: false,
      hasMonitoredCompanies: false,
      monitoredCompaniesCount: null
    },
    onboarding: null,
    searchResults: null,
    traceId: null,
    user: {
      data: null,
      isAdmin: false,
      isAuth: false
    }
  },
  actions: {
    clearUserData ({commit}) {
      commit('CLEAR_USER_DATA')
    },
    setDashboardChecklistState ({commit}, result) {
      commit('SET_DASHBOARD_CHECKLIST', result)
    },
    setDashboardMasterState ({commit}, result) {
      commit('SET_DASHBOARD_MASTER_STATE', result)
    },
    setDashboardMonitoredCompaniesCount ({commit}, result) {
      commit('SET_DASHBOARD_MONITORED_COMPANIES_COUNT', result)
    },
    setDashboardMonitoredState ({commit}, result) {
      commit('SET_DASHBOARD_MONITORED_STATE', result)
    },
    setOnboardingData ({commit}, result) {
      commit('SET_ONBOARDING_DATA', result)
    },
    setSearchResults ({commit}, result) {
      commit('SET_SEARCH_RESULTS', result)
    },
    setTraceId ({commit}, result) {
      commit('SET_TRACE_ID', result)
    },
    setUserData ({commit}, result) {
      commit('SET_USER_DATA', result)
    },
    setUserRoleAdmin ({commit}) {
      commit('SET_USER_ROLE_ADMIN')
    },
    userLoggedIn ({commit}, result) {
      commit('USER_LOGGED_IN', result)
    }
  },
  mutations: {
    CLEAR_USER_DATA (state) {
      state.user.data = null
    },
    SET_DASHBOARD_CHECKLIST (state, result) {
      state.dashboard.checklistShow = result
    },
    SET_DASHBOARD_MASTER_STATE (state, result) {
      state.dashboard.hasMasterCompanies = result
    },
    SET_DASHBOARD_MONITORED_COMPANIES_COUNT (state, result) {
      state.dashboard.monitoredCompaniesCount = result
    },
    SET_DASHBOARD_MONITORED_STATE (state, result) {
      state.dashboard.hasMonitoredCompanies = result
    },
    SET_ONBOARDING_DATA (state, result) {
      state.onboarding = result
    },
    SET_SEARCH_RESULTS (state, result) {
      state.searchResults = result
    },
    SET_TRACE_ID (state, result) {
      state.traceId = result
    },
    SET_USER_DATA (state, result) {
      state.user.data = result
    },
    SET_USER_ROLE_ADMIN (state) {
      state.user.isAdmin = true
    },
    USER_LOGGED_IN (state, result) {
      state.user.isAuth = result
    }
  },
  getters: {
    getDashboardChecklistState (state) {
      return state.dashboard.checklistShow
    },
    getDashboardMasterState (state) {
      return state.dashboard.hasMasterCompanies
    },
    getDashboardMonitoredCompaniesCount (state) {
      return state.dashboard.monitoredCompaniesCount
    },
    getDashboardMonitoredState (state) {
      return state.dashboard.hasMonitoredCompanies
    },
    getOnboardingData (state) {
      return state.onboarding
    },
    getSearchResults (state) {
      return state.searchResults
    },
    getTraceId (state) {
      return state.traceId
    },
    getUserData (state) {
      return state.user.data
    },
    isAdmin (state) {
      return state.user.isAdmin
    },
    isAuth (state) {
      return state.user.isAuth
    }
  },
  modules: {
    CompanyProfile,
    GenericError
  }
})
