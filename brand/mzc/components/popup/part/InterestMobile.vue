<template>
  <div>
    <div v-if="interestLectures.length === 0" class="card -empty">
      조회 하실 콘텐츠 목록이 없습니다
    </div>
    <div
      v-for="(lecture, idx) in interestLectures"
      v-else
      :key="idx"
      :class="`lecture${lecture.video.id}`"
      :data-subCategory="lecture.video.subCategory"
      class="card"
    >
      <div class="card__body">
        <p class="category uppercase colors">
          {{ lecture.video.subCategory }}
        </p>
        <p class="lectureName">{{ lecture.video.title }}</p>
        <p class="lecturerInfo">
          <span v-html="lecture.video.lecturerName"></span>
        </p>
      </div>

      <div class="card__footer">
        <p class="point colors">
          <span v-if="lecture.video.completeGivenPointYN === true" class="done"
            >포인트 지급 완료</span
          >
          <span v-else>+ {{ lecture.video.point | currency }}</span>
        </p>
        <button
          :id="`watchingPlayId_${lecture.video.id}`"
          class="btn btn__shortcut btn--small"
          type="button"
          @click="shortcut(lecture.video)"
        >
          <span>바로보기</span>
        </button>
        <button
          :id="`unInterestingPlayId_${lecture.video.id}`"
          type="button"
          class="btn btn__cancle "
          @click="sendEmit(lecture.video.id)"
        >
          <span>
            <span class="a11y">관심 콘텐츠 해제</span>
            <Icon
              :name="'close'"
              :size="16"
              :stroke="'#555'"
              :stroke-width="3"
            ></Icon>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Interest',
  components: { Icon },

  props: {
    interestLectures: { type: Array, required: true, default: () => [] }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot
    })
  },
  methods: {
    ...mapActions(['gotoZone']),
    ...mapActions('popup', ['openPop']),
    ...mapActions('session', [
      'setVideoId',
      'toggleNecessaryCategoryListUpdate'
    ]),
    shortcut(videoInfo) {
      this.gotoZone(['session', 1, videoInfo.category])
      this.toggleNecessaryCategoryListUpdate(true)

      this.setVideoId(videoInfo.id)
      this.openPop({ name: 'lecture', isOverlap: true })
    },
    sendEmit(sessionVideoId) {
      this.$emit('toggleInterestVideo', sessionVideoId)
    }
  }
}
</script>
<style lang="scss" scoped>
.test {
  height: 1000px;
  background: Red;
}
.card {
  width: 560px;
  margin-bottom: 30px;
  border: 1px solid #333;
  border-radius: 30px;
  //  height: 34px;
  font-size: 20px;
  font-weight: $font-light;
  color: #ccc;

  @for $i from 1 through length($subCategory) {
    &[data-subCategory='#{nth($subCategory, $i)}'] {
      color: nth($colors, $i);
    }
  }

  &__body {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    // height: 132px;
    padding: 30px 30px 0 30px;
    text-align: left;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    height: 90px;
  }

  .category {
    font-weight: $font-bold;
  }
  .lectureName {
    display: inline-block;
    padding: 16px 0 12px;
    @extend %ellipse;
    font-size: 22px;
    color: #fff;
  }
  .lecturerInfo {
    padding-bottom: 10px;
    color: #777;
    font-size: 18px;
    font-weight: $font-light;
    @extend %ellipse;
    line-height: 1.4;
  }
  .point {
    margin-right: auto;
  }
}
.btn__shortcut {
  width: 160px;
  background: #fff;
  color: #000;
  font-weight: $font-bold;
  margin-right: 10px;
}
.btn__cancle {
  width: 50px;
  height: 50px;
  border: 2px solid #555;
  border-radius: 50%;
}
</style>
