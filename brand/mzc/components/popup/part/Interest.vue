<template>
  <div class="dtable">
    <div class="dtable__row dtable__head">
      <div class="dtable__col">구분</div>
      <div class="dtable__col">콘텐츠</div>
      <div class="dtable__col">획득 가능 포인트</div>
      <div class="dtable__col"></div>
      <div class="dtable__col"></div>
    </div>
    <div v-if="interestLectures.length === 0" class="dtable__body -empty">
      조회 하실 콘텐츠 목록이 없습니다
    </div>
    <vue-scroll v-else class="dtable__body">
      <div
        v-for="(lecture, idx) in interestLectures"
        :key="idx"
        :class="`lecture${lecture.video.id}`"
        :data-subCategory="lecture.video.subCategory"
        class="dtable__row"
      >
        <div class="dtable__col category uppercase">
          {{ lecture.video.subCategory }}
        </div>
        <div class="dtable__col contents">
          <p>{{ lecture.video.title }}</p>
          <p
            class="contents__lecturerInfo"
            v-html="lecture.video.lecturerName"
          ></p>
        </div>
        <div class="dtable__col point">
          <span v-if="lecture.video.completeGivenPointYN === true" class="done"
            >포인트 지급 완료</span
          >
          <span v-else>+ {{ lecture.video.point | currency }}</span>
        </div>
        <div class="dtable__col shortcut">
          <!-- <a
                  :href="`?videoId=${lecture.video.id}`"
                  class="btn btn__shortcut"
                >
                  <span>바로보기</span>
                </a> -->
          <button
            :id="`watchingPlayId_${lecture.video.id}`"
            class="btn btn__shortcut"
            type="button"
            @click="shortcut(lecture.video)"
          >
            <span>바로보기</span>
          </button>
        </div>
        <div class="dtable__col cancle">
          <button
            :id="`unInterestingPlayId_${lecture.video.id}`"
            type="button"
            class="btn btn__cancle"
            @click="sendEmit(lecture.video.id)"
          >
            <span>
              <span class="a11y">관심 콘텐츠 해제</span>
              <Icon
                :name="'close'"
                :size="12"
                :stroke="'#555'"
                :stroke-width="2"
              ></Icon>
            </span>
          </button>
        </div>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Interest',
  components: { Icon },
  props: {
    interestLectures: { type: Array, required: true, default: undefined }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot
    })
  },
  filter: {
    removeBR(value) {
      alert(value)
      if (!value) return ''
      return value.replaceAll('<br/>', '')
    }
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
<style lang="scss">
.contents__lecturerInfo br:first-of-type,
.contents__lecturerInfo br:last-of-type {
  display: none;
}
</style>
<style lang="scss" scoped>
.popup__tit {
  margin-bottom: 40px;
}
.dtable {
  &__body {
    padding: 8px 0 !important;
    .dtable__row {
      // height: 69px;
      margin-bottom: 16px;
      @for $i from 1 through length($subCategory) {
        &[data-subCategory='#{nth($subCategory, $i)}'] {
          color: nth($colors, $i);
        }
      }
    }
  }
  &__col {
    $width: 161px, 456px, 180px, 151px, 51px;
    flex-shrink: 0;
    @for $i from 1 through length($width) {
      &:nth-child(#{$i}) {
        width: nth($width, $i);
      }
    }
  }

  .category {
    // margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-self: baseline;
    padding-top: 5px;
    font-weight: $font-bold;
  }
  .contents {
    text-align: left;
    font-size: 18px;

    line-height: 28px;
    color: #ccc;
    p {
      @extend %ellipse;
    }
    &__lecturerInfo {
      font-size: 14px;
      color: #777;
      font-weight: 400;
      line-height: 1.5;
    }
  }
  .point {
    .done {
      font-size: 14px;
      color: #555;
    }
  }
  .shortcut {
    .btn__shortcut {
      display: inline-block;
      width: 120px;
      height: 35px;
      background: #fff;
      border-radius: 30px;
      color: #000;
      font-size: 14px;
      font-weight: $font-bold;
      text-align: center;
      line-height: 32px;
    }
  }
}
.btn__cancle {
  width: 34px;
  height: 34px;
  border: 1.5px solid #555;
  border-radius: 50%;
}
</style>
