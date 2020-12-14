export default (axios, store) => (url) => {
  return {
    getUserEventInfo() {
      return axios.get(`${url}/auth`)
    },

    saveUserEvent({ eventType, userInfo }) {
      const eventUrl =
        eventType === 'event1'
          ? 'one'
          : eventType === 'event2'
          ? 'two'
          : 'three'
      return axios.post(`${url}/auth/${eventUrl}`, userInfo)
    }
  }
}
