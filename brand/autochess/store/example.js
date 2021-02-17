export const state = () => ({
  eventName: 'example',
  userModel: {},
  imageUrlRoot: `https://hongyi.s3.amazonaws.com/static/new-semester/images`
})

export const mutations = {
  SET_USER_MODEL(state, userModel) {
    state.userModel = {
      ...state.userModel,
      ...userModel
    }
  }
}
