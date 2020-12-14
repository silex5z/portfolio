export const state = () => ({
  currentPop: [],
  abovePop: {
    isShow: false,
    name: '',
    message: ''
  },
  alert: {
    isShow: false,
    type: '', // alert, confirm,
    message: '',
    dynamicId: '',
    resolve: null
  },
  isLoading: false,
  forceUpdate: 1
})

export const getters = {}

export const actions = {
  openPop({ state, commit, dispatch }, payload) {
    // console.log(payload.isOverlap)
    const isOverlap = payload.isOverlap ? payload.isOverlap : false
    // 팝업 겹쳐서 띄우지 않을 경우 이전 팝업 닫음
    if (!isOverlap) dispatch('closePop', {})
    commit('OPEN_POP', payload)
    if (process.browser) {
      const vid = document.querySelector('.video--full')
      if (vid) vid.pause()
    }
    // console.log(above)
  },
  closePop({ commit }, payload) {
    commit('CLOSE_POP')
    // 팝업 닫을 때 component reset
    // data reset 위해 필요
    commit('FORCE_UPDATE')
    // commit('newSemester/INIT_USER_MODEL', null, { root: true })
  },

  openAbovePop({ state, commit, dispatch }, payload) {
    commit('OPEN_ABOVEPOP', payload)
  },
  closeAbovePop({ state, commit }) {
    commit('CLOSE_ABOVEPOP')
    if (state.abovePop.name === 'point') {
      setTimeout(() => {
        commit('INIT_ABOVEPOP')
      }, 2000)
    } else {
      setTimeout(() => {
        // TODO:@opmiu 팝업 뜨고 닫히는 시간 개선 필요
        commit('INIT_ABOVEPOP')
      }, 500)
    }
  },

  openAlert({ commit, dispatch }, payload) {
    commit('OPEN_ALERT', payload)
  },

  closeAlert({ commit }, boolean) {
    commit('CLOSE_ALERT', boolean)
  },

  confirm({ commit }, message) {
    commit('OPEN_ALERT', { type: 'confirm', message })

    return new Promise((resolve) => {
      // resolve update
      commit('SET_CONFIRM_RESOLVE', resolve)
    })
  },
  // setConfirmState({ commit }, boolean) {
  //   return new Promise((res, rej) => {
  //     setTimeout(() => {
  //       commit('SET_CONFIRMSTATE', boolean)
  //       resolve()
  //     }, 1000)
  //   })
  // },
  setLoading({ commit, dispatch }, boolean) {
    commit('SET_LOADING', boolean)
  }
}

export const mutations = {
  OPEN_POP(state, payload) {
    // const isOverlap = payload.isOverlap ? payload.isOverlap : false
    // isOverlap
    //   ? state.currentPop.push(payload.name)
    //   : (state.currentPop = [payload.name])
    state.currentPop.push(payload.name)
    // console.log(`open:::::${state.currentPop}`)
  },
  CLOSE_POP(state) {
    state.currentPop.pop()
    // console.log(`close:::::${state.currentPop}`)
  },

  OPEN_ABOVEPOP(state, payload) {
    state.abovePop = {
      isShow: true,
      name: payload.name,
      message: payload.message ? payload.message : ''
    }
  },
  CLOSE_ABOVEPOP(state, boolean) {
    state.abovePop.isShow = false
  },
  INIT_ABOVEPOP(state) {
    // Object.assign(state.abovePop, INITIAL_ABOVEPOP_DATA())
    state.abovePop.name = ''
    state.abovePop.message = ''
  },

  OPEN_ALERT(state, payload) {
    state.alert = {
      isShow: true,
      type: payload.type ? payload.type : 'alert',
      message: payload.message,
      dynamicId: payload.dynamicId
    }
  },
  CLOSE_ALERT(state, boolean) {
    if (typeof boolean === 'boolean') state.alert.resolve(boolean)
    state.alert = {
      isShow: false,
      type: '',
      message: '',
      dynamicId: '',
      resolve: null
    }
  },
  SET_CONFIRM_RESOLVE(state, resolve) {
    state.alert.resolve = resolve
  },
  SET_LOADING(state, boolean) {
    state.isLoading = boolean
  },
  // component update(reset) 시 사용
  FORCE_UPDATE(state) {
    state.forceUpdate += 1
  }
}
