export default {
  methods: {
    resetData() {
      // console.log(`resetData ::::::: ${this.$data}`)
      setTimeout(() => {
        Object.assign(this.$data, this.$options.data())
      }, 500)
    }
  }
}
