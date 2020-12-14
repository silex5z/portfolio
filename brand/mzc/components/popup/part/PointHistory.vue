<template>
  <div>
    <div class="dtable">
      <div class="dtable__row dtable__head">
        <div class="dtable__col">날짜</div>
        <div class="dtable__col">콘텐츠</div>
        <div class="dtable__col">획득 / 차감 포인트</div>
        <div class="dtable__col">잔여포인트</div>
      </div>

      <div v-if="pointHistories.length === 0" class="dtable__body -empty">
        조회 하실 포인트 목록이 없습니다
      </div>
      <div v-else class="dtable__body">
        <div
          v-for="(history, idx) in pointHistories"
          :key="idx"
          class="dtable__row"
        >
          <div class="dtable__col date">{{ history.date | dashToDat }}</div>
          <div class="dtable__col contents">{{ history.content }}</div>
          <div class="dtable__col history">
            <span :class="{ decrease: history.point < 0 }">
              <span v-if="history.point > 0">+</span>
              {{ history.point | currency }}
            </span>
          </div>
          <div class="dtable__col remain">
            {{ history.remainingPoints | currency }}
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="pointHistories.length > 0" class="pager"> -->
    <div class="pager">
      <button
        :disabled="currentPageNum === 1"
        type="button"
        class="btn__pager btn__prev"
        @click="sendEmit(currentPageNum - 1)"
      >
        <span>
          <Icon :name="'triangle'" :fill="'#666'"></Icon>
          <span class="a11y">이전</span>
        </span>
      </button>
      <div class="pager__number">
        <div
          :style="{
            width: `${innerWidth}px`,
            transform: `translateX(${moveX}px)`
          }"
          class="pager__numberInner"
        >
          <button
            v-for="idx in totalPagesNum"
            :key="idx"
            :class="{ '-isActive': currentPageNum === idx }"
            type="button"
            class="btn__number"
            @click="sendEmit(idx)"
          >
            <span>{{ idx }}</span>
          </button>
        </div>
      </div>
      <button
        :disabled="currentPageNum === totalPagesNum"
        type="button"
        class="btn__pager btn__next"
        @click="sendEmit(currentPageNum + 1)"
      >
        <span>
          <Icon :name="'triangle'" :fill="'#666'"></Icon>
          <span class="a11y">다음</span>
        </span>
      </button>
    </div>
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
    pointHistories: { type: Array, required: true, default: undefined }
  },
  data() {
    return {}
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
    sendEmit(idx) {
      this.$emit('setPointHistory', idx)
    }
  }
}
</script>

<style lang="scss" scoped>
.popup__tit {
  margin-bottom: 40px;
}
.dtable {
  &__body {
    .dtable__row {
      // margin: 8px 0;
      height: 34px;
      margin-bottom: 16px;
      color: #ccc;

      &:first-child {
        margin-top: 8px;
      }
      .history {
        color: #54daaf;
        .decrease {
          color: #eb5b5b;
        }
      }

      .contents {
        display: inline-block;
        padding: 0 20px;
        text-align: left;

        @extend %ellipse;
      }
    }
  }

  &__col {
    $width: 161px, 436px, 201px, 202px;
    flex-shrink: 0;
    @for $i from 1 through length($width) {
      &:nth-child(#{$i}) {
        width: nth($width, $i);
      }
    }
  }
}

.pager {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  &__number {
    max-width: calc(35px * 10);
    overflow: hidden;
  }
  .btn {
    width: 14px;

    &__number {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      font-size: 14px;
      font-weight: 400;
      color: #555;

      &.-isActive {
        transition-delay: 0.5s;
        background: #555;
        color: #fff;
        font-weight: $font-bold;
      }
    }
    &__pager {
      // opacity: 0.4;
      &:disabled {
        opacity: 0.5;
      }
    }
    &__prev {
      margin-right: 20px;
      transform: rotate(-90deg);
    }
    &__next {
      margin-left: 20px;
      transform: rotate(90deg);
    }
  }
}
</style>
