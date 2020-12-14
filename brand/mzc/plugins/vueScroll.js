import Vue from 'vue'
import vuescroll from 'vuescroll'

// You can set global config here.
Vue.use(vuescroll, {
  ops: {
    // The global config
    bar: {
      background: '#333'
    },
    vuescroll: {
      wheelScrollDuration: 500,
      wheelDirectionReverse: false
    }
  }
})
