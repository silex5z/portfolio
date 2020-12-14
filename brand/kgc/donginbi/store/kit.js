export const state = () => ({
  eventName: 'kit',
  imageUrlRoot: `https://donginbi.s3.amazonaws.com/static/kit/images`,
  selectedSolution: '',
  userModel: {},
  deliveryStartDate: ''
})

export const actions = {
  setPrizeType({ commit }, selectedSolution) {
    commit('SET_SELECTED_SOLUTION', selectedSolution)
  },
  saveUserModel({ commit, state, dispatch }, userData) {
    commit('popup/SET_LOADING', true, {
      root: true
    })
    userData.prizeType =
      state.selectedSolution === 'soothing'
        ? 'EXPERIENCE_KIT_PRIZE_TYPE_SKIN_SOOTHING'
        : 'EXPERIENCE_KIT_PRIZE_TYPE_SKIN_MOISTURIZING'

    commit('SET_USER_MODEL', userData)

    this.$axios
      .post('/api/experience-kit/entry', state.userModel)
      .then((res) => {
        if (res.data.success === true) {
          if (
            state.userModel.prizeReceiptType ===
            'EXPERIENCE_KIT_PRIZE_RECEIPT_TYPE_ONLINE'
          )
            dispatch('popup/openPop', { popName: 'address' }, { root: true })
          else dispatch('popup/openPop', { popName: 'won' }, { root: true })
        } else {
          switch (res.data.detail) {
            case 'ALREADY_WIN_BUT_NOT_ADDRESS':
              alert(res.data.message)
              dispatch('popup/openPop', { popName: 'address' }, { root: true })
              break
            case 'ALREADY_WIN':
              this.openPop({ popName: 'duplicate' }, { root: true })
              break
            case 'NOT_ENTRY':
              alert(res.data.message)
              break
            case 'LOOSE':
            default:
              dispatch('popup/openPop', { popName: 'fail' }, { root: true })
              break
          }
        }
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
      .finally(() => {
        commit('popup/SET_LOADING', false, {
          root: true
        })
      })
  },
  saveUserAddress({ commit, state, dispatch }, addressDetail) {
    commit('popup/SET_LOADING', true, {
      root: true
    })

    const userData = {
      ...state.userModel,
      addressDetail
    }

    this.$axios
      .post('/api/experience-kit/entry/save-addr', userData)
      .then((res) => {
        if (res.data.success === true) {
          commit('SET_DELIVERY_START_DATE', res.data.date)
          dispatch('popup/openPop', { popName: 'complete' }, { root: true })
        } else alert(res.data.message)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
      .finally(() => {
        commit('popup/SET_LOADING', false, {
          root: true
        })
      })
  }
}

export const mutations = {
  SET_USER_MODEL(state, userModel) {
    state.userModel = {
      ...userModel
    }
  },
  INIT_USER_MODEL(state) {
    state.userModel = {}
  },
  SET_SELECTED_SOLUTION(state, selectedSolution) {
    state.selectedSolution = selectedSolution
  },
  SET_DELIVERY_START_DATE(state, deliveryStartDate) {
    state.deliveryStartDate = deliveryStartDate
  }
}
