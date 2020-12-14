export default (axios, store) => (url) => {
  return {
    saveApplication(payload) {
      return axios.post(`${url}/auth`, payload.userInfo)
    }
  }
}
