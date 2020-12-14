<template>
  <div id="container">
    <!-- 메인
    <button
      @click="
        openPop({
          popName: 'example'
        })
      "
    >
      팝업띄우기
    </button> -->
    <Loading></Loading>
    <Pc :imageUrl="imageUrl" v-if="isDesktop"></Pc>
    <Mobile :imageUrl="imageUrl" v-else></Mobile>
    <Popup :isShow="currentPop === 'popup'"></Popup>
  </div>
</template>

<script>
import Popup from '@/components/pre-reservation/Popup'
import Pc from '@/components/pre-reservation/Pc'
import Mobile from '@/components/pre-reservation/Mobile'
import Loading from '@/components/shared/Loading'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'Index',
  components: { Popup, Pc, Mobile, Loading },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400;700;900&display=swap'
        }
      ]
    }
  },
  data() {
    return {
      isDesktop: this.$device.isDesktop,
      deviceKind: this.$device.isDesktop ? 'pc' : 'm'
    }
  },
  computed: {
    ...mapState({
      imageUrl(state) {
        return `${state.prereservation.imageUrlRoot}/${this.deviceKind}`
      },
      currentPop: (state) => state.popup.currentPop,
      forceUpdate: (state) => state.popup.forceUpdate
    })
  },

  methods: { ...mapActions('popup', ['openPop', 'setLoading']) }
}
</script>

<style lang="scss"></style>
