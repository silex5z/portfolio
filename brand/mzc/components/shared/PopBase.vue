<template>
  <transition name="popup__animation--fade ">
    <div
      :style="customDuration"
      :class="['popup', type === 'alert' ? 'alert' : '', `popup__${className}`]"
      tabindex="-1"
      @keyup.esc="onEsc"
    >
      <transition :name="`PA${animation}`">
        <div v-show="show" :style="dialogStyle" class="popup__dialog">
          <vue-scroll v-if="type === 'default'" ref="vs">
            <div class="popup__inner">
              <slot name="contents"></slot>
            </div>

            <slot
              v-if="type === 'default' && $device.isMobile && show"
              name="closeButton"
            >
              <button
                v-if="closeButton"
                class="popupBtn__close"
                @click="closePop()"
              >
                <Icon :name="'close'" :stroke="'#fff'" :stroke-width="2"></Icon>
              </button>
            </slot>
          </vue-scroll>
          <div v-else class="popup__inner">
            <slot name="contents"></slot>
          </div>
        </div>
      </transition>
      <transition :name="`PAfade`">
        <slot
          v-if="type === 'default' && $device.isDesktopOrTablet && show"
          name="closeButton"
        >
          <button
            v-if="closeButton"
            class="popupBtn__close"
            @click="closePop()"
          >
            <Icon :name="'close'" :stroke="'#fff'" :stroke-width="2"></Icon>
          </button>
        </slot>
      </transition>
      <div
        v-if="mask"
        :style="customMaskStyles"
        :class="{ 'popup__mask--black': isOverlap }"
        class="popup__mask"
        @click.self="onClickMask"
      ></div>
    </div>
  </transition>
</template>

<script>
import Icon from '@/components/ui/Icon'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Popup',
  components: { Icon },
  props: {
    show: { type: Boolean, default: false, required: true },
    className: { type: String, default: '' },
    // imageUrl: {
    //   type: String,
    //   default: ''
    // },
    type: { type: String, default: 'default' }, // default || alert
    top: { type: Number, default: 0 },
    width: { type: Number, default: 500 },
    // height: {
    //   type: Number,
    //   default: '240'
    // },
    duration: { type: Number, default: 300 },
    measure: { type: String, default: 'px' },
    animation: { type: String, default: 'slideInRight' },
    mask: { type: Boolean, default: true },
    closeButton: { type: Boolean, default: true },
    closeOnEsc: { type: Boolean, default: false },
    closeOnClickMask: { type: Boolean, default: false },
    customStyles: { type: Object, default: () => ({}) },
    customMaskStyles: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      isOverlap: false
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot
    }),
    customDuration() {
      return { animationDuration: `${this.duration}ms` }
    },
    dialogStyle() {
      return {
        width:
          this.type === 'default' && this.$device.isMobile
            ? '640px'
            : this.width + this.measure,
        minWidth:
          this.type === 'default' && this.$device.isMobile
            ? '640px'
            : this.width + this.measure,
        // top: this.top + this.measure,
        // height: this.height + this.measure,
        animationDuration: `${this.duration}ms`,
        ...this.customStyles
      }
    }
  },
  watch: {
    show(isShow) {
      if (isShow) {
        if (this.type === 'default') {
          this.$nextTick(() => {
            this.$refs.vs.scrollTo(
              {
                y: 0
              },
              0
            )
          })
        }
        if ($('.nav').css('display') === 'flex') this.isOverlap = true
        else this.isOverlap = false
      }
      // (확인) : focus스크롤 이동으로 주석처리
      // isShow &&
      //   this.$nextTick(() => {
      //     this.$el.focus()
      //   })
    }
  },
  methods: {
    ...mapActions('popup', ['closePop', 'closeAbovePop']),
    onEsc() {
      if (this.show && this.closeOnEsc) {
        // this.$emit('hide');
        this.type === 'default' ? this.closePop() : this.closeAbovePop()
      }
    },
    onClickMask() {
      // this.$emit('clickMask')
      if (this.closeOnClickMask) {
        // this.$emit('hide');
        this.type === 'default' ? this.closePop() : this.closeAbovePop()
      }
    },
    close() {
      if (process.browser) window.close()
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/scss/popup/style.scss';
</style>
