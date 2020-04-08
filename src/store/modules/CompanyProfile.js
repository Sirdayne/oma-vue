const state = {
  companyProfile: {}
}

const getters = {
  getCompanyProfile: (state) => {
    return state.companyProfile
  }
}

const mutations = {
  SET_COMPANY_PROFILE: (state, payload) => {
    state.companyProfile = payload
  }
}

const actions = {
  setCompanyProfile: ({commit}, payload) => {
    commit('SET_COMPANY_PROFILE', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
