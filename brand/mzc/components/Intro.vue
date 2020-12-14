<template>
  <div>
    <transition name="fade">
      <section v-if="currentZone === 'intro'" class="section intro">
        <div class="txtBox">
          <h1 class="intro__tit uppercase">
            <img
              :src="`${imageUrl}/logo-kv${$device.isMobile ? '_m' : ''}.png`"
              alt="Digital Spectrum 2020"
            />
          </h1>
          <p class="intro__txt">
            <span>
              본 사이트는 여러분의 사이트 이용을
              <br v-if="$device.isMobile" />돕기 위한 음성 안내가 준비되어
              있습니다
            </span>
            <br />
            <span>사운드 설정 후 ENTER 버튼을 클릭해주세요</span>
          </p>
          <label
            :class="{ '-on': video.isSoundOn }"
            for="initSoundOnOff"
            class="btn__soundInit uppercase"
          >
            <input
              id="initSoundOnOff"
              v-model="video.isSoundOn"
              type="checkbox"
            />
            <i></i>
            <span>sound {{ video.isSoundOn ? 'on' : 'off' }}</span>
          </label>
          <button
            id="mainEnter"
            type="button"
            class="uppercase btn  btn--white btn__enter"
            :class="$device.isMobile ? 'btn--medium' : 'btn--big'"
            @click="enter"
          >
            <!-- <span v-if="($device.isIos || $device.isMacOS) && isLogin"
              >세미나 입장하기</span
            > -->
            <span>enter</span>
          </button>
        </div>
      </section>
    </transition>
    <transition name="fade" mode="in-out">
      <section v-show="currentZone === 'mzc'" class="section mzcZone">
        <video
          ref="videoMzc"
          :muted="video.isSoundOn ? false : true"
          :src="
            !isStopScene
              ? `${urlRoot}/video/${$device.isMobile ? 'm' : 'pc'}/${
                  video.list[currentSceneIdx]
                }.mp4`
              : ''
          "
          :poster="
            (video.currentSceneIdx == 0 && video.currentTime > 10) ||
            video.playState === 'play' ||
            !isStopScene //처음에 들어올 때 poster 노출 안하고 싶어서 처리
              ? `${urlRoot}/video/${
                  $device.isMobile ? 'm' : 'pc'
                }/Gatekeeper_cover_${currentSceneIdx}.jpg`
              : `${urlRoot}/video/${
                  $device.isMobile ? 'm' : 'pc'
                }/Gatekeeper_cover.jpg`
          "
          class="video--full video__main"
          preload
          playsinline
          @play="videoPlay"
          @timeupdate="videoTimeUpdate"
          @ended="videoEnded"
          @pause="videoPause"
        ></video>

        <!-- loop 영상 -->
        <!-- 영상 끝났을 때 -->
        <transition name="fade">
          <video
            v-show="
              !isStopScene &&
                video.playState === 'ended' &&
                currentSceneIdx !== 8
            "
            ref="videoMzcLoop"
            :src="
              !!subSceneIdx
                ? `${urlRoot}/video/${$device.isMobile ? 'm' : 'pc'}/${
                    video.list[subSceneIdx]
                  }_loop.mp4`
                : ''
            "
            :poster="
              !isStopScene
                ? `${urlRoot}/video/${
                    $device.isMobile ? 'm' : 'pc'
                  }/Gatekeeper_cover_${currentSceneIdx}.jpg`
                : `${urlRoot}/video/${
                    $device.isMobile ? 'm' : 'pc'
                  }/Gatekeeper_cover.jpg`
            "
            class="video--full"
            preload
            muted
            loop
            playsinline
          ></video>
        </transition>

        <div
          v-if="
            video.playState === 'play' &&
              currentSceneIdx !== 8 &&
              currentLine !== null
          "
          class="descCon"
          :class="{ '-isActive': video.playState === 'play' && currentLine }"
        >
          <div class="desc" :class="{ '-isActive': video.isShowCaption }">
            <p v-html="currentLine.desc"></p>
          </div>
          <div class="desc__btnBox">
            <button
              type="button"
              class="btn btn__caption"
              @click="toggleMzcVidFn('caption')"
            >
              <span class="a11y">자막 보이기/숨기기</span>
              <span class="btn__icon noGap">
                <img
                  :src="
                    video.isShowCaption
                      ? `${imageUrl}/icon/subtitle.svg`
                      : `${imageUrl}/icon/subtitle_off.svg`
                  "
                  class="icon"
                />
              </span>
            </button>
            <button
              type="button"
              class="btn btn__sound"
              @click="toggleMzcVidFn('sound')"
            >
              <span class="a11y">영상 소리 켜기/끄기</span>
              <span class="btn__icon noGap">
                <img
                  :src="
                    video.isSoundOn
                      ? `${imageUrl}/icon/sound.svg`
                      : `${imageUrl}/icon/sound_off.svg`
                  "
                  class="icon"
                />
              </span>
            </button>
          </div>
        </div>

        <!-- NOTE: 멈출시 재생 버튼 -->
        <button
          v-if="
            video.playState === 'pause' && !isStopScene && subSceneIdx !== null
          "
          type="button"
          class="btn btn--small btn--white btn__playBack"
          @click="video.player.play()"
        >
          <span>이어서 재생 <span> ></span></span>
        </button>

        <!-- NOTE: skip버튼 -->
        <button
          v-if="
            currentZone === 'mzc' &&
              video.playState === 'play' &&
              video.currentTime > 5 &&
              ($cookies.get('HAS-LOGINED') || $cookies.get('INTRO-PASSED'))
          "
          id="skipMovie"
          :currentMovieIndex="currentSceneIdx"
          type="button"
          class="btn btn--small btn--white btn__skip"
          @click="goSessionZone()"
        >
          <span :currentMovieIndex="currentSceneIdx">Skip <span> ></span></span>
        </button>

        <!-- NOTE: 정지화면  -->
        <transition name="fade">
          <div
            v-show="
              !isStopScene &&
                subSceneIdx !== null &&
                video.playState === 'ended'
            "
            class="cover endScene"
          >
            <div class="cover__btnBox">
              <button
                v-if="subSceneIdx === 2 || subSceneIdx === 4"
                type="button"
                class="btn btn--big btn--black kor"
                @click="openBrochure()"
              >
                <span>
                  <Icon :name="'download'" class="btn__icon"></Icon>
                  브로셔 다운로드</span
                >
              </button>
              <button
                v-show="video.playState === 'ended'"
                type="button"
                class="btn btn--white btn__next uppercase btn--big kor"
                :class="{ 'btn--black': subSceneIdx === 7 }"
                @click="playNextVideo(currentSceneIdx)"
              >
                <span>{{
                  subSceneIdx === 7 ? '세션존 바로가기' : '다음 영상 보기'
                }}</span>
              </button>
            </div>
          </div>
        </transition>

        <!-- NOTE: company, partner, session 정지화면 일때만 -->
        <transition name="fade" mode="in-out">
          <div v-show="isStopScene" class="cover stopScene">
            <h2 class="cover__tit uppercase">
              {{ isStopScene ? stopSceneTexts[currentSceneIdx].tit : '' }}
            </h2>
            <p
              class="cover__txt"
              v-html="isStopScene ? stopSceneTexts[currentSceneIdx].txt : ''"
            ></p>

            <div v-show="isStopScene" class="cover__btnBox">
              <button
                type="button"
                class="btn btn--white btn__next uppercase btn--medium"
                :class="[subSceneIdx === 6 ? 'btn--black' : '']"
                @click="playNextVideo(currentSceneIdx)"
              >
                <span> {{ isLogin ? 'next' : 'login' }} </span>
              </button>
              <!-- NOTE: 세션영상 본 유저 -->
              <button
                type="button"
                class="btn  btn--black btn__goSession kor"
                :class="$device.isMobile ? 'btn--medium' : 'btn--big'"
                @click="goSessionZone()"
              >
                <span>세션존 바로가기</span>
              </button>
            </div>

            <p v-show="isStopScene" class="cover__point">
              콘텐츠 시청 완료 시 +50,000P
            </p>
          </div>
        </transition>
      </section>
    </transition>
  </div>
</template>

<script>
import { EventBus } from '@/assets/js/event-bus.js'
import Icon from '@/components/ui/Icon'
import { mapState, mapActions, mapMutations } from 'vuex'

import descJson from '@/static/video/desc.js'

export default {
  name: 'Intro',
  components: { Icon },
  data() {
    return {
      // currentZone: 'intro',
      subSceneIdx: 0,
      video: {
        player: null,
        currentTime: 1,
        isSoundOn: true,
        isShowCaption: true,
        playState: null,
        list: [
          `Gatekeeper_1_stage_intro`, //  0 :: intro + 첫영상
          '', // 1 :: Company
          `Gatekeeper_2_stage`, // 2
          '', // 3 :: Partner
          `Gatekeeper_3_A_stage`, // 4
          `Gatekeeper_3_B_stage`, // 5
          '', // 6 :: Session
          `Gatekeeper_4_stage`, // 7
          'Gatekeeper_tran' // 8
        ]
      },
      stopSceneTexts: {
        1: {
          tit: 'company',
          txt:
            '클라우드 산업을 선도하는 국내 No.1 MSP기업<br/>메가존클라우드를 소개합니다'
        },
        3: {
          tit: 'partner',
          txt:
            '메가존클라우드와 클라우드 파트너십 기반의<br/>통합 서비스를 제공하는 글로벌 파트너사를 소개합니다'
        },
        6: {
          tit: 'session',
          txt:
            'Infrastructure, Platform, Application, Data<br/>4가지 카테고리로 구성된 세션 프로그램을 소개합니다'
        }
      }
    }
  },

  computed: {
    ...mapState({
      urlRoot: (state) => state.urlRoot,
      imageUrl: (state) => state.imageUrlRoot,
      currentZone: (state) => state.currentZone,
      currentSceneIdx: (state) => state.mzcZone.sceneIdx,
      currentSceneInit: (state) => state.mzcZone.reset,
      isLogin: (state) => state.auth.user.isLogin,
      isFirstLogin: (state) => state.auth.user.isFirstLogin
    }),
    currentLine() {
      if (this.isStopScene) return null
      const desc = descJson[this.currentSceneIdx]

      const idx = desc.findIndex(
        (list) =>
          list.startTime <= this.video.currentTime &&
          list.endTime > this.video.currentTime
      )
      return idx === -1 ? null : { idx, desc: desc[idx].text }
    },
    isStopScene() {
      return !!(
        this.currentSceneIdx === 1 ||
        this.currentSceneIdx === 3 ||
        this.currentSceneIdx === 6
      )
    },
    isStopSceneLoop() {
      return !!(
        this.currentSceneIdx === 1 ||
        this.currentSceneIdx === 3 ||
        this.currentSceneIdx === 6
      )
    },
    isSessionVidPassed() {
      return this.currentSceneIdx === 6 && this.$cookies.get('SESSION-PASSED')
    }
  },
  watch: {
    video: {
      deep: true,
      handler() {}
    }
  },
  mounted() {
    if (process.browser) {
      EventBus.$on('initVideo', () => {
        if (!!this.video.player && !this.video.player.paused)
          this.video.player.pause()
        this.video.currentTime = 0
      })
    }
  },
  methods: {
    ...mapActions(['gotoZone']),
    ...mapActions('popup', ['openPop', 'openAbovePop', 'openAlert']),
    ...mapActions('session', ['toggleNecessaryCategoryListUpdate']),
    ...mapActions('point', ['savePointByZone']),
    ...mapActions('auth', ['isOpen']),
    ...mapMutations(['SET_MZCZONE_SCENE_IDX']),
    // videoCanPlay() {
    // this.video.playState = 'canPlay'
    // },
    videoPause() {
      this.video.playState = 'pause'
      if (this.video.player === null) this.video.player = this.$refs.videoMzc
    },
    videoPlay() {
      this.video.playState = 'play'

      this.subSceneIdx = null
      setTimeout(() => {
        this.subSceneIdx = this.currentSceneIdx
      }, 1000)
    },
    videoTimeUpdate(e) {
      this.video.currentTime = e.target.currentTime
    },
    videoEnded() {
      this.video.playState = 'ended'
      // if (this.currentSceneIdx !== 1) this.showCover = true
      if (!this.isStopScene && this.currentSceneIdx !== 8)
        this.$refs.videoMzcLoop.play()

      switch (this.currentSceneIdx) {
        case 0:
          // NOTE: 영상 끝나는 시점에 mzcPass cookie set
          this.$cookies.set('INTRO-PASSED', true, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          })
          this.SET_MZCZONE_SCENE_IDX(this.currentSceneIdx + 1)
          break
        case 5:
          this.savePoint('partner')
          this.SET_MZCZONE_SCENE_IDX(this.currentSceneIdx + 1)
          break
        case 7:
          this.savePoint('session')
          this.$cookies.set('SESSION-PASSED', true, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          })
          break
        case 8:
          this.goSessionZone()
          break
      }
    },
    async savePoint(contents) {
      if (!this.isLogin) return
      const res = await this.savePointByZone(contents)
      if (res.result === true) {
        await this.openAbovePop({
          name: 'point',
          message: res.point
        })
      }
      return res.result
    },
    async playNextVideo(currentSceneIdx) {
      let playSeconds = 1000
      this.video.player = this.$refs.videoMzc
      this.video.currentTime = 0

      if (!this.isLogin && this.isStopScene) {
        this.openPop({ name: 'login' })
        return
      }

      if (currentSceneIdx === 2) {
        const result = await this.savePoint('company')
        if (result) playSeconds = 3000
      }

      if (this.isStopScene) this.subSceneIdx = null // 버튼 깜빡임 때문에 stopScene에서 한번 더 추가
      this.SET_MZCZONE_SCENE_IDX(currentSceneIdx + 1)

      setTimeout(() => {
        if (!this.isStopScene) this.video.player.play()
      }, playSeconds)
    },
    toggleMzcVidFn(fn) {
      // MZC 영상 제어
      if (fn === 'caption') this.video.isShowCaption = !this.video.isShowCaption
      else {
        this.video.isSoundOn = !this.video.isSoundOn
        // this.video.player.muted = !this.video.player.muted
      }
    },
    enter() {
      // 인트로 영상 확인했는지 확인 후 페이지 이동
      if (this.$cookies.get('HAS-LOGINED')) {
        this.goSessionZone()
      } else {
        this.gotoZone(['mzc', 0])
        const vid = this.$refs.videoMzc
        if (vid) vid.play()
      }
    },
    // isIntroView() {
    //   // 인트로 영상 확인했는지 확인 후 페이지 이동
    //   if (this.$cookies.get('INTRO-PASSED')) {
    //     this.goSessionZone()
    //   } else {
    //     this.gotoZone(['mzc', 0])
    //     const vid = this.$refs.videoMzc
    //     if (vid) vid.play()
    //   }
    // },
    goSessionZone(param) {
      const vid = document.querySelector('.video--full')
      if (!vid.paused) vid.pause()
      this.gotoZone(['session'])
      this.toggleNecessaryCategoryListUpdate(true)
    },
    openBrochure() {
      this.openPop({ name: 'brochure' })
      EventBus.$emit(
        'setBrochure',
        this.currentSceneIdx === 2 ? 'mzc' : 'partner'
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.intro {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @include background(
    map-get($mzc, 'image-url') + '/bg_intro.jpg',
    $position: center center
  );

  &__tit {
    // margin: 0 auto;
    @include breakpoint() {
      width: 475px;
      margin-bottom: 100px;
    }
    @include breakpoint('pc') {
      width: 800px;
      margin-bottom: 45px;
    }

    img {
      width: 100%;
    }
  }

  &__txt {
    font-weight: $font-light;
    line-height: 36px;
    color: #ddd;

    @include breakpoint() {
      font-size: 24px;
      // padding: 0 110px;
      // outline: 1px solid red;
      span {
        display: inline-block;
        &:last-of-type {
          margin-top: 35px;
        }
      }
    }
    @include breakpoint('pc') {
      font-size: 22px;
    }
  }

  button {
    display: block;
    margin: 0 auto;
  }
  .btn__soundInit {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: $font-bold;
    opacity: 0.5;
    @include breakpoint() {
      font-size: 22px;
      margin: 37px 0 70px 0;
    }
    @include breakpoint('pc') {
      font-size: 14px;
      margin: 37px 0 45px 0;
    }

    &.-on {
      opacity: 1;
    }
    i {
      position: relative;
      display: inline-block;

      background: #ffffff;
      border-radius: 50%;
      @include breakpoint() {
        width: 42px;
        height: 42px;
        margin-right: 20px;
      }
      @include breakpoint('pc') {
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        transition: opacity 0.2s ease;
        background: #000;
        transform: translate(-50%, -50%);
        opacity: 0;
        @include breakpoint() {
          width: 18px;
          height: 18px;
        }
        @include breakpoint('pc') {
          width: 10px;
          height: 10px;
        }
      }
    }
    input:checked + i::after {
      opacity: 1;
    }
  }
  @include breakpoint() {
    .btn__enter {
      width: 300px;
      height: 70px;
      font-size: 30px;
      font-weight: $font-bold;
    }
  }
}

.mzcZone {
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;

  &.section {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: inherit;
      background: transparent;
    }
  }

  .desc {
    &Con {
      position: fixed;
      @include breakpoint() {
        bottom: -140px;
      }
      @include breakpoint('pc') {
        bottom: -90px;
      }

      left: 0;
      width: 100%;
      z-index: $zindex-fixed;
      transition: all 0.2s ease;
      &.-isActive {
        bottom: 0px;
      }
    }
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    transition: opacity 0.5s ease;
    opacity: 0;

    @include breakpoint() {
      padding: 30px 20px 90px 20px;
    }
    @include breakpoint('pc') {
      height: 90px;
    }

    p {
      max-width: 1000px;
      font-size: 20px;
      letter-spacing: -0.5px;
      text-align: center;
      color: #fff;
      line-height: 28px;
      word-break: keep-all;
    }
    &.-isActive {
      opacity: 1;
    }

    &__btnBox {
      position: absolute;
      bottom: 20px;
      right: 30px;
      font-size: 0;
      @include breakpoint() {
        position: fixed;
        width: 100%;
        bottom: 0px;
        right: 0px;
        display: flex;
        justify-content: center;
      }
      .btn {
        border-radius: 50%;
        margin-right: 10px;
        @include breakpoint() {
          transform: translateY(-20px);
        }
        &__caption {
          @include breakpoint() {
            margin-right: 20px;
          }
          @include breakpoint('pc') {
            margin-right: 10px;
          }
        }
      }
    }
  }

  .cover {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--vh);
    text-align: center;
    z-index: $zindex-fixed;

    &__btnBox {
      display: flex;
      .btn {
        &:nth-child(2) {
          margin-left: 20px;
        }
        &.kor {
          @include breakpoint('pc') {
            font-size: 14px;
          }
        }
      }
    }

    &.endScene {
      .cover__btnBox {
        position: fixed;
        left: 50%;
        bottom: 140px;
        transform: translateX(-50%);
      }
    }

    &.stopScene {
      position: relative;
      display: flex;
      left: initial;
      transform: initial;
      bottom: initial;
      @include background(
        map-get($mzc, 'image-url') + '/Gatekeeper_cover.jpg',
        $position: center center,
        $size: cover
      );

      .cover {
        &__tit {
          font-size: 90px;
          font-weight: bold;
          color: #fff;
          margin-bottom: 12px;
        }
        &__txt {
          font-size: 24px;
          font-weight: $font-light;
          line-height: 36px;
          color: #fff;
        }
        &__btnBox {
          .btn {
            @include breakpoint('pc') {
              width: 153px;
            }
          }
          margin: 32px 0 19px;
        }
        &__point {
          @include breakpoint() {
            font-size: 24px;
          }
          @include breakpoint('pc') {
            font-size: 16px;
          }
          color: #97edd2;
          font-weight: $font-bold;
        }
      }
    }
  }
}

.btn {
  &--small {
    padding: 0 20px;
    & > span {
      display: flex;
      justify-content: space-between;
    }
  }
  &__playBack {
    position: fixed;
    bottom: 100px;
    left: 50%;
    width: 200px;
    transform: translateX(-50%);
    z-index: $zindex-fixed;
  }
  &__skip {
    position: fixed;
    width: 110px;
    z-index: $zindex-fixed;

    @include breakpoint() {
      bottom: 20px;
      right: 30px;
    }
    @include breakpoint('pc') {
      bottom: 110px;
      right: 40px;
    }
  }
}

.video-background {
  background: #000;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.video-foreground,
.video-background video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
@media (min-aspect-ratio: 16/9) {
  .video-foreground {
    height: 300%;
    top: -100%;
  }
}

@media (max-aspect-ratio: 16/9) {
  .video-foreground {
    width: 300%;
    left: -100%;
  }
}
</style>
