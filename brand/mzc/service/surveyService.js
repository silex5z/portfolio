export default (axios) => (url) => {
  return {
    getSuveyPartners() {
      return axios.get(`${url}/partners`)
    },
    getSuveyQuestions(sortNum, email) {
      return axios.get(`${url}/questions/${sortNum}/${email}`)
    },
    saveSuveyQuestions(answers) {
      return axios.post(`${url}/answers`, answers)
    }
  }
}
