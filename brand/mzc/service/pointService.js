export default (axios) => (url, pgkUrl) => {
  return {
    getPointHistoty([pageNum, pageSize = 10]) {
      return axios.get(`${url}/history?pageNum=${pageNum}&pageSize=${pageSize}`)
    },
    savePointByZone(data) {
      return axios.post(`${pgkUrl}`, data)
    }
  }
}
