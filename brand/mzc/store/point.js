export const actions = {
  getPointHistoty({ dispatch }, payload) {
    return this.$Point
      .getPointHistoty(payload)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
        return null
      })
  },
  async savePointByZone({ dispatch }, payload) {
    let ptype = null
    switch (payload) {
      case 'company':
        ptype = 'MZC_ZONE_MZC_CONTENT'
        break
      case 'partner':
        ptype = 'MZC_ZONE_PARTNER'
        break
      case 'session':
        ptype = 'MZC_ZONE_SESSION'
        break
    }
    if (ptype) {
      return await this.$Point
        .savePointByZone({ pointType: ptype })
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          return dispatch('exception/catchError', err, { root: true })
        })
    } else return { result: false }
  }
}
