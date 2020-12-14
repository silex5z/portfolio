<template>
  <div>
    <template>
      <div v-if="pointHistories.length <= 0" class="card -empty">
        조회 하실 포인트 목록이 없습니다
      </div>
      <div
        v-for="(history, idx) in pointHistories"
        v-else
        :key="idx"
        class="card"
      >
        <div class="card__body">
          <div class="date">
            <p class="a11y">날짜</p>
            {{ history.date | dashToDat }}
          </div>
          <div class="contents">
            <p class="a11y">콘텐츠</p>
            {{ history.content }}
          </div>
        </div>
        <div class="card__footer">
          <div class="history">
            <p class="a11y">획득 / 차감 포인트</p>
            <span :class="{ decrease: history.point < 0 }">
              <span v-if="history.point > 0">+</span>
              {{ history.point | currency }}
            </span>
          </div>
          <div class="remain">
            <p class="a11y">잔여포인트</p>
            {{ history.remainingPoints | currency }}
          </div>
        </div>
      </div>
    </template>
    <button
      v-if="0 < pointHistories.length && currentPageNum < totalPagesNum"
      type="button"
      class="btn btn__more"
      @click="sendEmit"
    >
      <span>더보기 <Icon :name="'plus'"></Icon></span>
    </button>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon'
import { mapState } from 'vuex'

export default {
  name: 'PointHistory',
  components: { Icon },
  filters: {
    dashToDat(value) {
      return value.replace(/-/g, '.')
    }
  },
  props: {
    totalPagesNum: { type: Number, required: true, default: 0 },
    currentPageNum: { type: Number, required: true, default: 0 },
    pointHistories: { type: Array, required: true, default: () => ({}) }
  },
  data() {
    return {
      // totalPagesNum: 0,
      // currentPageNum: 1,
      // pointHistories: [],
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot
    }),
    // pagerStyle
    innerWidth() {
      return 350 + (this.totalPagesNum - 10) * 35
    },
    moveX() {
      return this.currentPageNum > 10 ? (this.currentPageNum - 10) * -35 : 0
    }
  },
  methods: {
    // ...mapActions('point', ['getPointHistoty']),
    sendEmit() {
      this.$emit('setPointHistory')
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 560px;
  border: 1px solid #333;
  border-radius: 30px;
  //  height: 34px;
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: $font-light;
  color: #ccc;
  &:last-child {
    margin-bottom: 60px;
  }
  &__body {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 126px;
    padding: 0 30px;
    text-align: left;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #333;
    padding: 0 30px;
    height: 50px;
  }

  //   &:first-child {
  //     margin-bottom: 30px;
  //   }

  .contents {
    display: inline-block;
    padding-top: 15px;
    // padding: 0 20px;
    // text-align: left;
    @extend %ellipse;
    font-size: 22px;
    color: #fff;
  }
  .history {
    color: #54daaf;
    .decrease {
      color: #eb5b5b;
    }
  }
  .remain {
    font-weight: $font-bold;
  }
}
.btn__more {
  width: 100%;
  height: 60px;
  background: #555;
  color: #fff;
  font-size: 20px;
  img {
    width: 18px;
    margin-left: 10px;
  }
}
</style>
