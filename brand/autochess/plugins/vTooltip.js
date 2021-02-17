import Vue from 'vue'
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'

import '@/assets/scss/util/vTooltip.scss'

Vue.directive('tooltip', VTooltip)
Vue.directive('close-popover', VClosePopover)
Vue.component('v-popover', VPopover)
