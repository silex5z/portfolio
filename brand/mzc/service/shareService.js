export default (axios, store) => (url) => {
  return {
    shareChannel(channel) {
      return axios.post(`${url}/${channel}`)
    }
  }
}
