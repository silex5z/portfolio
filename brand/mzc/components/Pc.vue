<template>
  <div
    :class="{
      blur:
        $store.state.popup.abovePop.isShow ||
        $store.state.popup.currentPop.length > 0
    }"
  >
    <transition name="fade">
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
          id="sessionMainShareConsulting"
          type="button"
          class="btn btn__consulting"
          :disabled="activeBtns"
          :class="{
            blink: blinkBtnConsultation,
            opa0:
              currentZone === 'mzc' &&
              currentMZCSceneIdx === 0 &&
              currentMZCSceneDescIdx < 10
          }"
          @click="openPopApplication"
        >
          <span>
            <Icon :name="'counseling'" class="btn__icon"></Icon>
            상담신청
          </span>
        </button>
        <button
          id="sessionMainMyPoint"
          :class="{
            '-isHoverd':
              isPointBtnMouseOver ||
              (currentZone === 'mzc' && currentMZCSceneIdx === 0),
            blink: blinkBtnPoint,
            opa0:
              currentZone === 'mzc' &&
              currentMZCSceneIdx === 0 &&
              currentMZCSceneDescIdx < 11
          }"
          type="button"
          class="btn btn__point btn--medium uppercase"
          :disabled="activeBtns"
          @click="showNav('point')"
          @mouseover="isPointBtnMouseOver = true"
          @mouseleave="isPointBtnMouseOver = false"
        >
          <span v-if="isLogin"
            >{{ user.point === 0 ? '0' : user.point | currency }} point</span
          >
          <span v-else>
            <Icon :name="'my'" class="btn__icon"></Icon>
            my point
          </span>
          <span>
            <Icon :name="'my'" class="btn__icon"></Icon>
            my point
          </span>
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
    </transition>

    <!-- navigation :: menu , point 공통 -->
    <Nav></Nav>

    <!-- Sound on/off , MZC Zone-->
    <Intro ref="intro"></Intro>

    <transition name="fade" mode="out-in">
      <!-- Session Zone -->
      <Session v-show="currentZone === 'session'"></Session>
    </transition>

    <FakeCursor v-if="$device.isDesktop"></FakeCursor>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Icon from '@/components/ui/Icon'
import Intro from '@/components/Intro'
import Nav from '@/components/ui/Nav'
import FakeCursor from '@/components/ui/Cursor'

export default {
  name: 'Index',
  components: {
    Icon,
    Nav,
    Intro,
    // Session,
    Session: () => import('@/components/Session'),
    FakeCursor
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
      currentMZCSceneIdx: (state) => state.mzcZone.sceneIdx,
      isLogin: (state) => state.auth.user.isLogin
    }),
    activeBtns() {
      return this.currentZone === 'mzc' && this.currentMZCSceneIdx <= 0
    },
    currentMZCSceneDescIdx() {
      return this.currentZone === 'mzc' && this.$refs.intro.currentLine
        ? this.$refs.intro.currentLine.idx
        : 0
    },
    blinkBtnConsultation() {
      return !!(
        this.currentZone === 'mzc' &&
        this.currentMZCSceneIdx === 0 &&
        this.currentMZCSceneDescIdx === 10
      )
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
    ...mapActions('popup', ['openPop']),
    ...mapActions('consultation', ['openApplication']),
    openPopApplication() {
      if (!this.isLogin) {
        this.openPop({ name: 'login' })
        return
      }
      this.openApplication()
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/style.scss';
</style>
