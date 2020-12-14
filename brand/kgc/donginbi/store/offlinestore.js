export const state = () => ({
  couponeCode: '',
  userName: '',
  userKit: ''
})

export const actions = {}

export const mutations = {
  SET_COUPONE_CODE(state, couponeCode) {
    state.couponeCode = couponeCode
  },
  SET_USER_INFO(state, { name, kit }) {
    state.userName = name
    state.userKit = kit
  }
}
