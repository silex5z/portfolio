import Vue from 'vue'
export const EventBus = new Vue()



// Use Prototype Pattern
/**
Object.defineProperties(Vue.prototype, {
    $eventBus: {
        get: function () {
            return EventBus;
        }
    }
}
export default {
  created() {
    this.$EventBus.$on('open-alert', this.openAlert)
  }
}
**/