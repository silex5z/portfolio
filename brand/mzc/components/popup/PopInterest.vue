<template>
  <PopBase
    v-show="isShow"
    :show="isShow"
    :class-name="'brochure'"
    :width="1000"
  >
    <template #contents>
      <header class="popup__header">
        <h2 class="popup__tit">관심 콘텐츠</h2>
      </header>
      <div v-if="interestLectures" class="popup__content">
        <InterestMobile
          v-if="$device.isMobile"
          :interest-lectures="interestLectures"
          @toggleInterestVideo="toggleInterestVideo"
        ></InterestMobile>
        <Interest
          v-else
          :interest-lectures="interestLectures"
          @toggleInterestVideo="toggleInterestVideo"
        ></Interest>
      </div>
    </template>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopInterest',
  components: {
    PopBase,
    Interest: () => import('@/components/popup/part/Interest'),
    InterestMobile: () => import('@/components/popup/part/InterestMobile')
  },
  props: { isShow: { type: Boolean, default: false, required: true } },
  data() {
    return {
      interestLectures: []
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot
    })
  },
  watch: {
    async isShow(isShow) {
      if (isShow) {
        this.interestLectures = await this.getInterestVideo()
      }
    }
  },
  methods: {
    ...mapActions('popup', ['openPop']),
    ...mapActions('session', ['getInterestVideo', 'saveInterestVideoYN']),
    async toggleInterestVideo(sessionVideoId) {
      await this.saveInterestVideoYN(sessionVideoId)
      this.interestLectures = await this.getInterestVideo()
    }
  }
}
</script>
<style lang="scss" scoped>
.popup__tit {
  margin-bottom: 40px;
}
</style>
