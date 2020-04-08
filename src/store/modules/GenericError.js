const state = {
  title: null,
  text: null,
  btn: null
}

const getters = {
  getGenericErrorTitle: (state) => {
    return state.title
  },
  getGenericErrorText: (state) => {
    return state.text
  },
  getGenericErrorBtn: (state) => {
    return state.btn
  }
}

const mutations = {
  RESET_GENERIC_ERROR: (state) => {
    state.title = null
    state.text = null
    state.btn = null
  },
  SET_GENERIC_ERROR: (state, payload) => {
    const { title, text, btn } = payload
    state.title = title
    state.text = text
    state.btn = btn
  }
}

const actions = {
  resetGenericError: ({commit}) => {
    commit('RESET_GENERIC_ERROR')
  },
  setGenericError: ({commit}, payload) => {
    commit('SET_GENERIC_ERROR', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
