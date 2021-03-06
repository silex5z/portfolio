import Vue from 'vue'

Vue.filter('currency', (value) => {
  if (!value) return ''
  return value.toLocaleString()
})
