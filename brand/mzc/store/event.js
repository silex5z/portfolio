export const actions = {
  getUserEventInfo({ rootState, dispatch, commit }, eventType) {
    return this.$Event
      .getUserEventInfo(eventType)
      .then((res) => {
        return res.data ? res.data : false
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  saveUserEvent({ dispatch }, { eventType, userInfo }) {
    // console.log({ payload, params })
    return this.$Event
      .saveUserEvent({ eventType, userInfo })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  }
}
