export const state = () => ({})

export const actions = {
  saveApplication({ dispatch, commit }, payload) {
    return this.$Consult
      .saveApplication(payload)
      .then((res) => {
        const result = res.data
        if (result.result === 'success') {
          if (result.isPoint === 'true') {
            dispatch(
              'popup/openAbovePop',
              {
                name: 'point',
                message: Math.round(result.point)
              },
              {
                root: true
              }
            )

            dispatch(
              'popup/closePop',
              {},
              {
                root: true
              }
            )
          } else {
            dispatch(
              'popup/openAlert',
              {
                message: '상담 신청이 완료되었습니다.',
                dynamicId: 'consultingCompleteBtn'
              },
              {
                root: true
              }
            )
            dispatch(
              'popup/closePop',
              {},
              {
                root: true
              }
            )
          }
        }
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  getUserInfo({ dispatch, commit }) {
    this.$Auth
      .getAdditionalInfo()
      .then((res) => {
        // console.log(res)
        const userInfo = res.data.userAdditionalInfo
        commit('auth/SET_USER_MODEL', userInfo, {
          root: true
        })
        dispatch(
          'popup/openPop',
          { name: 'consultation' },
          {
            root: true
          }
        )
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },
  async openApplication({ dispatch, rootState }) {
    await dispatch('auth/getLoginStateValid', '', { root: true })
    if (rootState.auth.user.isLogin)
      dispatch('popup/openPop', { name: 'consultation' }, { root: true })
  }
}

export const mutations = {}
