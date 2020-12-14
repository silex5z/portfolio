<template>
  <PopBase
    v-show="isShow"
    :show="isShow"
    :class-name="'pointHistory'"
    :width="1000"
  >
    <template #contents>
      <header class="popup__header">
        <h2 class="popup__tit">포인트 조회</h2>
      </header>
      <div v-if="pointHistories" class="popup__content">
        <PointHistoryMobile
          v-if="$device.isMobile"
          :total-pages-num="totalPagesNum"
          :current-page-num="currentPageNum"
          :point-histories="pointHistories"
          @setPointHistory="setPointHistory"
        ></PointHistoryMobile>
        <PointHistory
          v-else
          :total-pages-num="totalPagesNum"
          :current-page-num="currentPageNum"
          :point-histories="pointHistories"
          @setPointHistory="setPointHistory"
        ></PointHistory>
      </div>
    </template>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopPointHistory',
  components: {
    PopBase,
    PointHistory: () => import('@/components/popup/part/PointHistory'),
    PointHistoryMobile: () =>
      import('@/components/popup/part/PointHistoryMobile')
  },
  filters: {
    dashToDat(value) {
      return value.replace(/-/g, '.')
    }
  },
  props: { isShow: { type: Boolean, default: false, required: true } },
  data() {
    return {
      totalPagesNum: 0,
      currentPageNum: 0,
      pointHistories: []
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot
    })
  },
  watch: {
    isShow(isShow) {
      if (isShow) {
        // init
        this.setPointHistory(1)
      }
    }
  },
  methods: {
    ...mapActions('point', ['getPointHistoty']),
    async setPointHistory(idx) {
      let currentPageNum

      if (this.$device.isMobile) {
        idx ? (this.currentPageNum = idx) : (this.currentPageNum += 1)
        currentPageNum = [1, 5 * this.currentPageNum]
      } else {
        this.currentPageNum = idx
        currentPageNum = [idx]
      }
      const data = await this.getPointHistoty(currentPageNum)
      if (data != null) {
        this.totalPagesNum = Math.ceil(
          data.count / (this.$device.isMobile ? 5 : 10)
        )
        this.pointHistories = data.list
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.popup__tit {
  margin-bottom: 40px;
}
</style>
