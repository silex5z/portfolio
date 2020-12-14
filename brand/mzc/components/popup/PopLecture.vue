<template>
  <PopBase
    v-if="isShow"
    :show="isShow"
    :class-name="'lecture'"
    :width="1000"
    :data-scategory="videoInfo.subCategory"
  >
    <template #contents>
      <header class="lecture__header">
        <div>
          <h2 class="lecture__tit colors">{{ videoInfo.title }}</h2>
          <p class="lecture__lecturer">
            <span v-html="videoInfo.lecturerName"></span>
            <span v-if="videoInfo.lecturerCompany"
              >&nbsp;&nbsp;|&nbsp;&nbsp;</span
            >
            <span v-html="videoInfo.lecturerCompany"></span>
            <span v-if="videoInfo.lecturerCompanyTeam"
              >&nbsp;&nbsp;|&nbsp;&nbsp;</span
            >
            <span v-html="videoInfo.lecturerCompanyTeam"></span>
          </p>
          <p class="lecture__desc">{{ videoInfo.description }}</p>
        </div>
        <div
          :class="{ isGiven: videoInfo.completeYN }"
          class="ui__point colors"
        >
          <span v-if="!videoInfo.completeYN">
            <span class="icon bgs">
              <Icon :name="'plus'" :size="20"></Icon>
            </span>
            <span class="txt">
              <span class="txt--0">영상 시청 완료 시</span>
              <br v-if="!$device.isMobile" />
              {{ videoInfo.point | currency }} P
            </span>
          </span>
          <span v-else>포인트 지급완료</span>
        </div>
      </header>
      <div class="lecture__content">
        <div class="lecture__videoBox borders">
          <video
            v-show="videoInfo"
            id="v-sessionvideo"
            class="lecture__video"
          ></video>
        </div>
        <p class="lecture__notice">
          * 영상을 Skip하지 않고 끝까지 시청하셔야 포인트가 지급됩니다.
        </p>

        <div class="lecture__info">
          <dl class="infoBox">
            <dt>키워드</dt>
            <dd>{{ videoInfo.keywords }}</dd>
          </dl>
          <div class="btnBox">
            <div :class="['shareBox', { '-isActive': isShowShareBox }]">
              <button
                v-show="isShowShareBox"
                id="lectureShareCopyUrl"
                :movie-id="`${videoInfo.sortNum}`"
                :class="['btn', { 'btn--circle': $device.isMobile }]"
                type="button"
                @click="commonShare('COPYURL_SESSION')"
              >
                <span :movie-id="`${videoInfo.sortNum}`">
                  <Icon
                    :movie-id="`${videoInfo.sortNum}`"
                    :name="'link'"
                  ></Icon>
                  <span class="a11y">강의 url 공유하기</span>
                </span>
              </button>
              <button
                v-show="isShowShareBox"
                id="lectureShareKakao"
                :movie-id="`${videoInfo.sortNum}`"
                :class="['btn', { 'btn--circle': $device.isMobile }]"
                type="button"
                @click="commonShare('KAKAO_SESSION')"
              >
                <span :movieId="`${videoInfo.sortNum}`">
                  <Icon
                    :movie-id="`${videoInfo.sortNum}`"
                    :name="'kakaotalk'"
                  ></Icon>
                  <span class="a11y">카카오톡 공유하기</span>
                </span>
              </button>
              <button
                v-show="isShowShareBox"
                id="lectureShareFacebook"
                :movie-id="`${videoInfo.sortNum}`"
                :class="['btn', { 'btn--circle': $device.isMobile }]"
                type="button"
                @click="commonShare('FACEBOOK_SESSION')"
              >
                <span :movie-id="`${videoInfo.sortNum}`">
                  <Icon
                    :movie-id="`${videoInfo.sortNum}`"
                    :name="'facebook'"
                  ></Icon>
                  <span class="a11y">페이스북 공유하기</span>
                </span>
              </button>
              <button
                v-if="!$device.isMobile"
                :class="['btn']"
                :style="[]"
                type="button"
                @click="isShowShareBox = !isShowShareBox"
              >
                <span>
                  <Icon v-if="!isShowShareBox" :name="'share'"></Icon>
                  <Icon
                    v-else
                    :name="'close'"
                    :stroke="'#555'"
                    :stroke-width="2"
                  ></Icon>
                </span>
              </button>
            </div>
            <button
              v-if="isLogin"
              id="lectureInterestingLecture"
              :movie-id="`${videoInfo.sortNum}`"
              :class="[
                'btn',
                'btn--circle',
                'btn__interest',
                { '-isActive': videoInfo.interestYN }
              ]"
              type="button"
              @click="toggleInterestVideo(videoInfo.id)"
            >
              <span :movie-id="`${videoInfo.sortNum}`">
                <Icon
                  :movie-id="`${videoInfo.sortNum}`"
                  :name="'heart'"
                  :fill="videoInfo.interestYN ? '#f25b61' : 'transparent'"
                  :stroke="videoInfo.interestYN ? '#f25b61' : '#fff'"
                  :stroke-width="2"
                ></Icon>
                <span class="a11y"
                  >관심 컨텐츠
                  {{ videoInfo.interestYN ? '해제' : '추가' }}</span
                >

                <!-- <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                   
                    d="M10.945,20a.4.4,0,0,1-.33-.113H10.5C8.084,18.644,2.363,15.141.382,9.6c-.33-1.017-1.1-5.2,1.32-7.8A4.7,4.7,0,0,1,5.333,0a7.315,7.315,0,0,1,5.612,3.051A6.7,6.7,0,0,1,16.557,0,5.026,5.026,0,0,1,20.3,1.808c2.421,2.6,1.65,6.893,1.32,7.8-1.981,5.65-7.812,9.04-10.123,10.282A1.169,1.169,0,0,1,10.945,20Z"
                    transform="translate(1 2)"
                    stroke-width="2"
                  />
                </svg> -->
              </span>
            </button>
            <a
              v-if="videoInfo.presentation"
              id="lectureDetailDocumentDownloadBtn"
              :movie-id="`${videoInfo.sortNum}`"
              download
              :href="videoInfo.presentation"
              :class="[
                'btn',
                'btn__download',
                'btn--white',
                $device.isMobile ? 'btn--long ' : 'btn--medium '
              ]"
            >
              <span :movie-id="`${videoInfo.sortNum}`">
                <Icon
                  :movie-id="`${videoInfo.sortNum}`"
                  class="btn__icon"
                  :name="'download'"
                  :fill="'#000'"
                ></Icon>
                강연 자료 다운
              </span>
            </a>
            <button
              id="lectureDetailSurveyApply"
              :movie-id="`${videoInfo.sortNum}`"
              :class="[
                'btn',
                'btn__survey',
                'btn--white',
                $device.isMobile ? 'btn--long ' : 'btn--medium ',
                { 'btn--block': surveyDisabled }
              ]"
              type="button"
              @click="openPopSurvey"
            >
              <span :movie-id="`${videoInfo.sortNum}`">
                <Icon
                  :movie-id="`${videoInfo.sortNum}`"
                  class="btn__icon"
                  :name="'survey'"
                  :stroke="'#000'"
                  :stroke-width="2"
                  :fill="'transparent'"
                ></Icon>
                세션 설문조사
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="!isLogin && isVisitThroughLectureUrl"
        class="sheild"
        @click="
          openAbovePop({
            name: 'retryLoginBySessionZone'
          })
        "
      ></div>
    </template>
    <template v-if="!isLogin && isVisitThroughLectureUrl" #closeButton>
      <button
        class="popupBtn__close"
        @click="openAbovePop({ name: 'retryLoginBySessionZone' })"
      >
        <Icon :name="'close'" :stroke="'#fff'" :stroke-width="2"></Icon>
      </button>
    </template>
  </PopBase>
</template>

<script>
import Icon from '@/components/ui/Icon'

import PopBase from '@/components/shared/PopBase'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopLecture',
  components: { Icon, PopBase },
  props: { isShow: { type: Boolean, default: false, required: true } },
  data() {
    return {
      videoInfo: {},
      player: null,
      isPlay: false,
      playTime: 0,
      playerSetInterval: null,
      videoCumulativeTime: 0.0,
      videoIsComplete: false,
      // 공유하기 버튼 ui
      isShowShareBox: false,
      surveyDisabled: true
    }
  },
  computed: {
    ...mapState({
      isVisitThroughLectureUrl: (state) => state.isVisitThroughLectureUrl,
      imageUrl: (state) => state.imageUrlRoot,
      currentPop: (state) => state.popup.currentPop,
      isLogin: (state) => state.auth.user.isLogin,
      userEmail: (state) => state.auth.user.info.username,
      sessionVideoId: (state) => state.session.videoId,
      cpmInfo: (state) => state.session.cpmInfo
    })
    // isSurveyDisabled() {
    //   return this.surveyDisabled
    // }
  },
  watch: {
    async isShow(isShow) {
      if (isShow) {
        if (this.$device.isMobile) this.isShowShareBox = true
        const data = await this.getVideo(this.sessionVideoId)
        if (data) {
          this.videoInfo = data
          this.videoCumulativeTime = data.cumulativeTime
          this.videoIsComplete = data.completeYN
          this.setPlayer()
        }
        // this.surveyDisabled = true
        // this.isSurveyDisabled = false
      } else {
        this.resetData()
        this.resetPlayer()
      }
    }
  },
  async mounted() {
    if (this.isVisitThroughLectureUrl) {
      const data = await this.getVideo(this.sessionVideoId)
      this.videoInfo = data
      this.videoCumulativeTime = data.cumulativeTime
      this.videoIsComplete = data.completeYN
      this.setPlayer()
    }
  },
  methods: {
    ...mapActions('popup', ['openPop', 'openAbovePop', 'openAlert']),
    ...mapActions('session', [
      'getVideo',
      'loadCloudPlexPlayer',
      'saveTrackVideo',
      'saveInterestVideoYN',
      'saveGivePointVideo',
      'setSurveyPartner'
    ]),
    ...mapActions('share', [
      'saveShare',
      'kakaoShare',
      'facebookShare',
      'copyUrl'
    ]),
    ...mapActions('auth', ['getLoginStateValid']),
    async setPlayer() {
      const info = await this.loadCloudPlexPlayer({
        videoCpmId: this.videoInfo.cpmId,
        cpmInfo: this.cpmInfo
      })

      // 영상정보가 없을 경우
      if (!info || !info.sources) return

      // 정보 추가 저장
      this.videoInfo = {
        ...this.videoInfo,
        videoSrc: info.sources[0].origins[0],
        totalTime: info.duration / 1000
      }

      // 플레이어 옵션 셋팅
      const playerOptions = {
        src: {
          src: this.videoInfo.videoSrc,
          type: 'application/x-mpegURL'
        },
        autoplay: false,
        muted: false,
        eventlogOptions: {
          url: this.cpmInfo.collect.endpoint,
          key: this.cpmInfo.collect.key,
          meta: {
            'project-id': this.cpmInfo.projectId,
            'video-id': this.videoInfo.cpmId,
            login: this.isLogin,
            'user-id': this.isLogin === true ? this.userEmail : null
          }
        },
        inactivityTimeout: 500 // 단위: ms
      }
      /* global CloudPlexPlayer */
      const cpmPlayer = CloudPlexPlayer('v-sessionvideo', playerOptions)
      this.player = cpmPlayer.player

      // By GTM Tagging
      const sortNum = this.videoInfo.sortNum
      document
        .getElementsByClassName('vjs-play-control')
        .forEach(function(ele, index) {
          ele.setAttribute('movie-id', sortNum)
        })
      document
        .getElementsByClassName('vjs-icon-placeholder')
        .forEach(function(ele, index) {
          ele.setAttribute('movie-id', sortNum)
        })

      this.player.on('play', this.canPlay)
      if (this.isLogin) {
        this.playTime = 0

        if (this.videoInfo.lastWatchedTime >= this.videoInfo.totalTime * 0.5) {
          this.surveyDisabled = false
        }

        if (!this.videoIsComplete) {
          if (this.videoInfo.lastWatchedTime > 0)
            this.player.currentTime(this.videoInfo.lastWatchedTime)

          this.player.on(['waiting', 'pause'], this.updatePaused)

          // this.player.on('ended', this.ended)
          if (process.browser) {
            $(window).on('beforeunload', this.updatePaused)
          }
        }
        this.player.on('timeupdate', this.timeUpdated)
      } else {
        // 로그인 안 한 상태로 들어왔을 경우
        // progressControl 바 비활성화
        this.player.controlBar.progressControl.disable()
      }
    },
    async canPlay(e) {
      if (this.isVisitThroughLectureUrl && !this.isLogin) {
        this.player.pause()
        this.openAbovePop({
          name: 'retryLoginBySessionZone'
        })
      } else {
        await this.getLoginStateValid()
        if (this.isLogin) this.player.controlBar.progressControl.enable()
      }
    },
    updatePaused(e) {
      /** 영상 정지. 종료 */
      this.isPlay = false
      if (this.isLogin && !this.videoIsComplete && this.playTime > 0) {
        this.trackVideo()
      }
    },
    timeUpdated(e) {
      this.playTime = this.playTime + 0.25 // timeupdate 250ms 마다 실행됨
      const calTotalWatchTime =
        (this.videoCumulativeTime == null ? 0 : this.videoCumulativeTime) +
        this.playTime

      if (calTotalWatchTime >= this.videoInfo.totalTime * 0.5) {
        this.surveyDisabled = false
      }
    },
    // ended(e) {
    //   console.log('video ended')
    // },
    async trackVideo() {
      // // 실제 트래킹 시작 시간과 video 끝나는 시간의 오차 발생하여
      // // trackVideo 실행중에 video 재생이 끝날 시 강제로 종료처리
      // this.player.on('ended', this.ended)

      const data = await this.saveTrackVideo({
        sessionVideoId: this.videoInfo.id,
        sessionVideoTotalTime: this.videoInfo.totalTime,
        watchingTime: this.playTime, // 실시간 시청 초수
        lastWatchedTime: this.player.currentTime() // 마지막 상영 구간 초수
      })
      this.playTime = 0
      this.videoCumulativeTime = data.cumulativeTime

      // 영상재생누적시간(DB)이 현재시간보다 크고, 영상현재시간이 영상전체시간보다 클 경우 포인트 지급
      if (
        this.videoCumulativeTime >= this.videoInfo.totalTime * 0.95 &&
        this.player.currentTime() >= this.videoInfo.totalTime
      ) {
        this.givenPointVideo()
      }
    },
    async givenPointVideo() {
      const data = await this.saveGivePointVideo({
        sessionVideoId: this.videoInfo.id,
        sessionVideoTotalTime: this.videoInfo.totalTime,
        watchingTime: this.playTime, // 실시간 시청 초수
        lastWatchedTime: this.player.currentTime() // 마지막 상영 구간 초수
      })
      this.videoInfo.completeYN = data.isGivenPoint // 포인트 지급 후 강의 내 포인트 영역 값 업데이트
      this.videoIsComplete = data.point > 0
    },
    async toggleInterestVideo(sessionVideoId) {
      this.videoInfo.interestYN = await this.saveInterestVideoYN(sessionVideoId)
    },
    resetPlayer() {
      // 플레이어 리셋 및 닫을 때 list 다시 불러오는 api 호출해야함(로그인 회원 기준)
      this.updatePaused()
      if (this.player != null) {
        this.player.dispose()
      }
    },
    openPopSurvey() {
      if (this.surveyDisabled) {
        this.openAlert({
          message:
            '세션 영상 시청 후 설문조사에 참여하시면<br>30,000 포인트를 지급해드립니다.'
        })
        return
      }

      const data = {
        partnerName: this.videoInfo.lecturerCompany,
        sortNum: this.videoInfo.sortNum
      }
      this.setSurveyPartner(data)
      this.openPop({ name: 'survey', isOverlap: true })
    },
    copyUrl(linkUrl) {
      const textarea = document.createElement('textarea')
      textarea.value = linkUrl

      document.body.appendChild(textarea)
      textarea.select()
      textarea.setSelectionRange(0, 9999) // 추가

      document.execCommand('copy')
      document.body.removeChild(textarea)
    },
    async commonShare(type) {
      const meta = {
        title: '메가존클라우드 Digital Spectrum',
        description: '[' + this.videoInfo.title + '] 세션 시청하기',
        image:
          'https://mzc-webinar.s3.amazonaws.com/static/images/default_main.jpg',
        url: `https://${location.host}/?videoId=${this.videoInfo.id}&utm_source=share&utm_medium=${type}&utm_campaign=session`
      }

      if (type === 'COPYURL_SESSION') {
        this.copyUrl(meta.url)
        alert('URL 복사가 완료되었습니다')
      } else if (type === 'KAKAO_SESSION') {
        this.kakaoShare(meta)
      } else if (type === 'FACEBOOK_SESSION') {
        this.facebookShare(meta)
      }

      await this.saveShare(type)
    }
  }
}
</script>

<style lang="scss">
.vjs-user-active {
  .vjs-control-bar {
    display: flex;
  }
}
.btn__interest svg path {
  transition: all 0.5s ease;
}
</style>

<style lang="scss" scoped>
.sheild {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--vh);
  z-index: $zindex-popover;
}

.lecture {
  // header
  &__header {
    position: relative;
    // height: 170px;
    text-align: left;
    // display: flex;
    // justify-content: space-between;
    @include breakpoint() {
      margin-bottom: 40px;
    }

    .ui__point {
      @include breakpoint() {
        width: 300px;
      }

      @include breakpoint('pc') {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }

  &__tit {
    font-size: 36px;
    font-weight: $font-bold;
    word-break: keep-all;
    @include breakpoint() {
      line-height: 46px;
    }
    @include breakpoint('pc') {
      max-width: 80%;
      line-height: 50px;
    }

    // height: 47px;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // padding-right: 50px;
  }
  &__point {
    flex-shrink: 0;
    // position: absolute;
    // top: 0;
    // right: 0;
  }

  &__lecturer {
    line-height: 1.5;
    @include breakpoint() {
      margin: 16px 0 14px;
      font-size: 24px;
      line-height: 34px;
    }
    @include breakpoint('pc') {
      font-size: 18px;
      margin: 16px 0 24px;
    }

    &Name {
      // font-size: 18px;
      font-weight: $font-bold;
    }
    &Company {
      font-weight: $font-light;
      &::before {
        content: '|';
        color: #888;
        @include breakpoint() {
          margin: 0 6px 0 5px;
        }
        @include breakpoint('pc') {
          margin: 0 6px 0 5px;
        }
      }
    }
  }
  &__desc {
    font-weight: $font-light;
    color: #aaa;
    margin-bottom: 24px;
    word-break: keep-all;
    @include breakpoint() {
      font-size: 22px;
      line-height: 36px;
    }
    @include breakpoint('pc') {
      line-height: 28px;
    }
  }

  &__notice {
    color: $red;
    font-weight: $font-bold;
    text-align: right;
    @include breakpoint() {
      margin: 15px 0 0;
      font-size: 16px;
    }
    @include breakpoint('pc') {
      margin: 10px 0 20px;
      font-size: 14px;
    }
  }

  // contents
  &__video {
    position: relative !important;
    &,
    video {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    &Box {
      width: 100%;
      @include breakpoint() {
        height: 318px;
      }
      @include breakpoint('pc') {
        height: 565px;
      }
    }
  }
  &__info {
    display: flex;
    @include breakpoint() {
      flex-direction: column;
      margin-top: 36px;
    }
    @include breakpoint('pc') {
      margin-top: 22px;
      justify-content: space-between;
    }

    .infoBox {
      font-size: 0;
      @include breakpoint() {
        width: inherit;
      }

      @include breakpoint('pc') {
        max-width: 50%;
      }
      dt,
      dd {
        text-align: left;
        vertical-align: top;
        @include breakpoint() {
          font-size: 20px;
          line-height: 26px;
        }
        @include breakpoint('pc') {
          display: inline-block;
          font-size: 14px;
          line-height: 18px;
          margin: 5px 0;
        }
      }
      dt {
        font-weight: $font-bold;

        @include breakpoint('pc') {
          width: 50px;
        }
      }
      dd {
        color: #999;
        font-weight: $font-light;

        @include breakpoint() {
          margin: 12px 0 33px;
        }

        @include breakpoint('pc') {
          width: calc(100% - 50px);
        }
      }
    }
  }
}
.btnBox {
  position: relative;
  @include breakpoint() {
    margin: 7px 0 0;
  }
  @include breakpoint('pc') {
    display: flex;
    // & > button[class*='btn']:not(:last-child) {
    //   margin-right: 10px;
    // }
    .btn__interest {
      transition: opacity 0.5s ease;
      &.-isInactive {
        opacity: 0;
      }
    }
  }

  .shareBox {
    @include breakpoint() {
      display: inline-block;
      margin-bottom: 40px;
    }

    @include breakpoint('pc') {
      // position: absolute;
      // right: calc(100% - 50px);
      display: flex;
      justify-content: space-around;
      width: 50px;
      // width: 200px;
      height: 50px;
      margin-right: 10px;
      // padding: 0 35px 0 20px;
      border-radius: 30px;
      border: 1px solid #58595a;
      // transition-delay: 0.5s;
      transition: width 0.5s ease;
      overflow: hidden;
      button {
        &:not(:last-child) {
          margin-right: 24px;
        }
        &:last-child {
          // position: absolute;
          // top: 13px;
          // right: 14px;
          // margin: 0;
        }
      }
      &.-isActive {
        transition: all 0.5s ease;
        width: 200px;
        padding: 0 14px 0 20px;
        background: rgba(0, 0, 0, 0.9);
      }
    }
  }
}

.btn {
  &--circle {
    border: 1px solid #58595a;
    @include breakpoint() {
      width: 70px;
      height: 70px;
      margin: 0 10px;
    }
    @include breakpoint('pc') {
      width: 50px;
      height: 50px;
    }
  }
  @include breakpoint('pc') {
    &--medium:last-of-type {
      margin-left: 10px;
    }
  }

  @include breakpoint() {
    &--long:last-of-type {
      margin-top: 20px;
    }
  }
}

.width-enter-active,
.width-leave-active {
  transition: width 10s ease;
  width: 200px;
}
.width-enter, .width-leave-to /* .fade-leave-active below version 2.1.8 */ {
  width: 50px;
}
</style>
