<template>
  <div
    :class="{
      blur:
        $store.state.popup.abovePop.isShow ||
        $store.state.popup.currentPop.length > 0
    }"
  >
    <!-- hader -->
    <header
      v-if="currentZone === 'mzc' || currentZone === 'session'"
      class="header"
    >
      <h1 class="logo">
        <img :src="`${imageUrl}/logo_loop.gif`" class="icon" />
        <span class="a11y">MegazoneCloud</span>
      </h1>

      <button
        id="sessionMainMyPoint"
        type="button"
        class="btn btn__point btn--medium uppercase"
        :class="{
          blink: blinkBtnPoint,
          opa0:
            currentZone === 'mzc' &&
            currentMZCSceneIdx === 0 &&
            currentMZCSceneDescIdx < 11
        }"
        :disabled="activeBtns"
        @click="showNav('point')"
        @mouseover="isPointBtnMouseOver = true"
        @mouseleave="isPointBtnMouseOver = false"
      >
        <span>my<br />point</span>
      </button>
      <button
        id="sessionMainDetailMenu"
        type="button"
        class="btn__menu uppercase"
        :disabled="activeBtns"
        :class="{
          blink: blinkBtnMenu,
          opa0:
            currentZone === 'mzc' &&
            currentMZCSceneIdx === 0 &&
            currentMZCSceneDescIdx < 12
        }"
        @click="showNav('menu')"
      >
        <span>
          <Icon :name="'menu'" :size="50" :view-box="50"></Icon>
        </span>
      </button>
    </header>

    <!-- navigation :: menu , point 공통 -->
    <Nav></Nav>

    <!-- Sound on/off , MZC Zone-->
    <Intro ref="intro"></Intro>

    <!-- Session Zone -->
    <transition name="fade" mode="out-in">
      <Session v-show="currentZone === 'session'"></Session>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Icon from '@/components/ui/Icon'
import Intro from '@/components/Intro'
import Session from '@/components/SessionMobile'
import Nav from '@/components/ui/Nav'

export default {
  name: 'Index',
  components: {
    Icon,
    Nav,
    Intro,
    Session
  },
  props: {
    mzcPass: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      // ui
      isPointBtnMouseOver: false,
      nav: {
        isShow: false,
        activeName: ''
      }
    }
  },
  computed: {
    ...mapState({
      urlRoot: (state) => state.urlRoot,
      imageUrl: (state) => state.imageUrlRoot,
      user: (state) => state.auth.user,
      currentZone: (state) => state.currentZone,
      currentMZCSceneIdx: (state) => state.mzcZone.sceneIdx
    }),
    activeBtns() {
      return this.currentZone === 'mzc' && this.currentMZCSceneIdx <= 0
    },
    currentMZCSceneDescIdx() {
      return this.currentZone === 'mzc' && this.$refs.intro.currentLine
        ? this.$refs.intro.currentLine.idx
        : 0
    },
    blinkBtnPoint() {
      return !!(
        this.currentZone === 'mzc' &&
        this.currentMZCSceneIdx === 0 &&
        this.currentMZCSceneDescIdx === 11
      )
    },
    blinkBtnMenu() {
      return !!(
        this.currentZone === 'mzc' &&
        this.currentMZCSceneIdx === 0 &&
        this.currentMZCSceneDescIdx === 12
      )
    }
  },
  watch: {
    currentZone() {
      if (this.nav.isShow) this.nav.isShow = false
    }
  },
  methods: {
    ...mapActions(['showNav']),
    ...mapActions('popup', ['openPop'])
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/style-m.scss';
</style>
