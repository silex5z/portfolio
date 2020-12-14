export default (axios) => (url) => {
  return {
    checkUniqueId(userEmail) {
      return axios.post(`${url}/memberships/duplicate`, {
        username: userEmail
      })
    },

    signUp(userInfo) {
      // console.log(userInfo)
      return axios.post(`${url}/memberships/required`, userInfo)
    },

    signUpWithDetail(userInfo) {
      // console.log(userInfo)
      return axios.post(`${url}/memberships/all`, userInfo)
    },

    signUpEarlyBirdWithDetail(userInfo) {
      return axios.post(`${url}/early-brid/all`, userInfo)
    },

    signIn(userInfo) {
      return axios.post(`${url}/login`, userInfo)
    },

    addDetails(additinalUserInfo) {
      return axios.post(`${url}/memberships/details`, additinalUserInfo)
    },

    getAdditionalInfo() {
      // console.log(url)
      // console.log(process.env.BASE_URL)
      return axios.get(`${url}/memberships/details`)
    },

    isOpen() {
      // console.log(url)
      // console.log(process.env.BASE_URL)
      return axios.get(`${url}/open`)
    }
  }
}
