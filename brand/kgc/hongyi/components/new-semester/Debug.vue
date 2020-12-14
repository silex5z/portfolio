<template>
  <!-- <PopBase
    v-show="isShow"
    :show="isShow"
    :className="popName"
    :imageUrl="imageUrl"
  > -->
  <!-- <template #header> -->
  <!-- </template> -->
  <!-- <template #content> -->
  <div class="debug">
    <p>
      <strong>{{ isAuth }}</strong>
      <button @click="setToggleAuth" type="button">
        <strong>인증</strong>
      </button>
    </p>
    <p>
      <strong>{{ hasHistory }}</strong>
      <button @click="setToggleHistory" type="button">
        <strong>참여이력</strong>
      </button>
    </p>
  </div>
  <!-- </template> -->
  <!-- </PopBase> -->
</template>

<script>
// import PopBase from '@/components/shared/PopBase'

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Debug',
  // components: { PopBase },
  // props: {
  //   imageUrl: {
  //     type: String,
  //     default: ''
  //   }
  // },
  data() {
    return {
      popName: 'debug'
    }
  },
  computed: {
    ...mapState({
      currentPop: (state) => state.popup.currentPop,
      isAuth: (state) => state.newSemester.userState.isAuth,
      hasHistory: (state) => state.newSemester.userState.hasHistory
    }),
    isShow() {
      return true
    }
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop']),
    ...mapMutations('newSemester', ['SET_AUTH_STATE', 'SET_HISTORY']),
    setToggleAuth() {
      const state = this.isAuth
      this.SET_AUTH_STATE(!state)
    },
    setToggleHistory() {
      const state = this.hasHistory
      this.SET_HISTORY(!state)
    }
  }
}
</script>

<style lang="scss" scope>
.debug {
  position: fixed;
  top: 0;
  left: 100%;
  transform: translateX(-100%);
  background: salmon;
  padding: 20px;
  z-index: 2000;
  width: 180px;
}
strong {
  font-size: 20px;
  font-weight: bold;
}
</style>
