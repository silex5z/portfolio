<template>
  <transition name="fade">
    <nav
      v-show="nav.isShow"
      :class="nav.activeName ? `nav__${nav.activeName}` : ''"
      class="nav"
    >
      <div class="nav__inner">
        <h2
          :class="nav.activeName === 'menu' ? 'a11y' : 'uppercase'"
          class="nav__tit"
        >
          {{ nav.activeName === 'menu' ? 'menu' : 'my point' }}
        </h2>
        <!-- menu -->
        <ul v-if="nav.activeName === 'menu'" class="nav__lists">
          <li class="navItem">
            <h3 :class="{ a11y: $device.isMobile }" class="nav__stit eng">
              Contents
            </h3>
            <div class="navItem__list">
              <button
                id="navMoveMovieCompany"
                type="button"
                class="uppercase"
                @click="seekMzcVid(1)"
              >
                <span>company</span>
              </button>
              <button
                id="navMoveMoviePartner"
                type="button"
                class="uppercase"
                @click="seekMzcVid(3)"
              >
                <span>partner</span>
              </button>
              <!-- <nuxt-link to="/session" class="uppercase">
              <span>session</span>
            </nuxt-link>-->
              <button
                id="navMoveMovieSession"
                type="button"
                class="uppercase"
                @click="seekMzcVid(6)"
              >
                <span>session</span>
              </button>
            </div>
          </li>
          <li class="navItem">
            <h3 class="nav__stit eng">
              <Icon
                v-if="$device.isMobile"
                class="btn__icon"
                :name="'share'"
              ></Icon>

              Share
            </h3>
            <div class="navItem__list">
              <button
                id="navShareCopyUrl"
                :class="[
                  'uppercase',
                  'btn',
                  'eng',
                  $device.isMobile ? 'btn--rect' : 'btn--medium'
                ]"
                type="button"
                @click="commonShare('COPYURL_GNB')"
              >
                <span>
                  <Icon :name="'link'" class="btn__icon"></Icon>
                  url copy
                </span>
              </button>
              <button
                id="navShareKakao"
                :class="[
                  'btn',
                  'eng',
                  $device.isMobile ? 'btn--rect' : 'btn--medium'
                ]"
                type="button"
                @click="commonShare('KAKAO_GNB')"
              >
                <span>
                  <Icon :name="'kakaotalk'" class="btn__icon"></Icon>
                  kakaotalk
                </span>
              </button>
              <button
                id="navShareFacebook"
                :class="[
                  'btn',
                  'eng',
                  $device.isMobile ? 'btn--rect' : 'btn--medium'
                ]"
                type="button"
                @click="commonShare('FACEBOOK_GNB')"
              >
                <span>
                  <Icon :name="'facebook'" class="btn__icon"></Icon>facebook
                </span>
              </button>
            </div>
          </li>
          <li class="navItem">
            <h3 :class="{ a11y: $device.isMobile }" class="nav__stit eng">
              Download
            </h3>
            <div class="navItem__list">
              <button
                id="navDownloadBrochure"
                :class="['btn', 'eng', 'btn--medium']"
                type="button"
                @click="openPop({ name: 'brochure' })"
              >
                <span>
                  <Icon
                    v-if="$device.isMobile"
                    :name="'download'"
                    class="btn__icon"
                  ></Icon>
                  {{ $device.isMobile ? 'Brochure Download' : 'Brochure' }}
                </span>
              </button>
            </div>
          </li>
          <li v-if="$device.isMobile" class="navItem">
            <h3 class="nav__stit a11y">상담신청</h3>
            <div class="navItem__list">
              <button
                id="navShareConsulting"
                :class="['btn', 'btn--white', 'btn--medium']"
                type="button"
                @click="openPopApplication"
              >
                <span>
                  <img
                    :src="`${imageUrl}/icon/counseling_black.svg`"
                    class="btn__icon"
                    alt
                  />
                  상담신청
                </span>
              </button>
            </div>
          </li>
        </ul>

        <!-- point -->
        <ul v-if="nav.activeName === 'point'" class="nav__lists">
          <li class="navItem">
            <h3 v-if="isLogin" class="nav__stit remainPoints">
              현재 보유 포인트
              <span class="txt--green"
                >{{
                  user.point === 0 ? '0' : user.point | currency
                }}
                Point</span
              >
            </h3>
            <h3 v-else class="nav__stit">
              로그인 후 현재 보유한 포인트를 확인하세요
            </h3>

            <div class="navItem__list">
              <button
                v-if="isLogin"
                id="navMovePointHistory"
                :class="['btn', 'btn--medium']"
                type="button"
                @click="openPop({ name: 'pointHistory' })"
              >
                <span>포인트 조회</span>
              </button>
              <button
                id="navMovePrizeInfoAndChange"
                :class="[
                  'btn',
                  $device.isMobile && !isLogin ? 'btn--long' : 'btn--medium',
                  'btn--white'
                ]"
                type="button"
                @click="openPop({ name: 'event' })"
              >
                <span>경품 안내 & 교환</span>
              </button>
            </div>
          </li>
          <li class="navItem">
            <h3 class="nav__stit eng a11y">MZC Membership</h3>
            <div class="navItem__list">
              <button
                v-if="isLogin"
                id="navMoveInterestingContents"
                type="button"
                class="btn btn--medium"
                @click="openPop({ name: 'interest' })"
              >
                <span>관심 콘텐츠</span>
              </button>
              <button
                v-if="isLogin"
                id="navMoveAdditionalInfo"
                type="button"
                class="btn btn--medium"
                @click="openPopAdditionalInfo"
              >
                <span>추가 정보 입력</span>
              </button>
              <button
                id="navLogout"
                :class="[
                  'btn',
                  $device.isMobile
                    ? 'btn__logout '
                    : ['btn--medium ', 'btn--white']
                ]"
                type="button"
                @click="isLogin ? logout() : openPop({ name: 'login' })"
              >
                <span>
                  {{ isLogin ? '로그아웃' : '로그인' }}
                  <Icon
                    v-if="$device.isMobile"
                    :name="'triangle'"
                    :size="18"
                    :fill="'none'"
                    :stroke="'#fff'"
                    :stroke-width="2"
                  ></Icon>
                </span>
              </button>
            </div>
          </li>
        </ul>
        <p class="inquiry">
          세미나 이용 관련 문의
          <a href="mailto:digitalspectrum_cs@dspectrum.com"
            >digitalspectrum_cs@dspectrum.com</a
          >
        </p>
        <!-- close -->
        <button type="button" class="btn__close" @click="showNav(false)">
          <span>
            <Icon :name="'close'" :stroke="'#fff'" :stroke-width="2"></Icon>
          </span>
        </button>
      </div>
    </nav>
  </transition>
</template>

<script>
import { EventBus } from '@/assets/js/event-bus.js'
import Icon from '@/components/ui/Icon'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Nav',
  components: { Icon },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      nav: (state) => state.nav,
      imageUrl: (state) => state.imageUrlRoot,
      currentPop: (state) => state.popup.currentPop,
      user: (state) => state.auth.user,
      isLogin: (state) => state.auth.user.isLogin
    }),
    ...mapGetters('auth', ['isExistAdditionalInfo'])
  },
  methods: {
    ...mapActions(['showNav', 'gotoZone']),
    ...mapActions('popup', ['openPop', 'openAbovePop']),
    ...mapActions('auth', ['getAdditionalInfo', 'getLoginStateValid']),
    ...mapActions('share', [
      'saveShare',
      'kakaoShare',
      'facebookShare',
      'copyUrl'
    ]),
    ...mapActions('consultation', ['openApplication']),
    seekMzcVid(sceneIdx) {
      EventBus.$emit('initVideo')
      // console.log(document.querySelector('.video--full'))
      this.gotoZone(['mzc', sceneIdx])
      this.showNav(false)
    },
    logout() {
      this.$cookies.remove('X-AUTH-TOKEN')
      this.$cookies.remove('HAS-LOGINED')
      localStorage.removeItem('X-AUTH-RTOKEN')
      location.reload(true)
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
    async openPopAdditionalInfo() {
      await this.getLoginStateValid()
      if (this.user.isLogin) {
        this.isExistAdditionalInfo
          ? this.openPop({ name: 'additionalInfo' })
          : this.getAdditionalInfo()
      }
    },
    async commonShare(type) {
      if (!this.isLogin) {
        this.openPop({ name: 'login', isOverlap: true })
        return
      }
      const meta = {
        title: '메가존클라우드 Digital Spectrum',
        description: 'Digital Transformation의 모든 것을 만나보세요! ',
        image:
          'https://mzc-webinar.s3.amazonaws.com/static/images/default_main.jpg',
        url: `https://${location.host}/?utm_source=share&utm_medium=${type}&utm_campaign=main`
      }

      if (type === 'COPYURL_GNB') {
        this.copyUrl(meta.url)
        alert('URL 복사가 완료되었습니다')
      } else if (type === 'KAKAO_GNB') {
        this.kakaoShare(meta)
      } else if (type === 'FACEBOOK_GNB') {
        this.facebookShare(meta)
      }

      const data = await this.saveShare(type)
      if (data.result === 'true') {
      }
    },
    openPopApplication() {
      if (!this.isLogin) {
        this.openPop({ name: 'login' })
        return
      }
      this.openApplication()
    }
  }
}
</script>
<style lang="scss" scoped>
// *=================================
// nav
// *=================================
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--vh);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #ddd;
  background: rgba(0, 0, 0, 0.9);
  text-align: center;
  z-index: $zindex-fixed + 20;

  &__lists {
    overflow: hidden;
    @include breakpoint('pc') {
      min-width: 1000px;
    }

    & > li {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 10px 0;
      font-size: 0;
      @include breakpoint() {
        justify-content: center;
      }
      @include breakpoint('pc') {
        justify-content: space-between;
        margin: 40px 0;
        .btn {
          margin-left: 10px;
        }
      }
    }
  }
  &__tit {
    font-size: 64px;
    font-weight: $font-bold;
    padding-bottom: 26px;
    @include breakpoint() {
    }
    @include breakpoint('pc') {
      // padding-bottom: 32px;
      text-align: left;
    }
  }
  &__stit {
    font-weight: $font-light;
    @include breakpoint() {
      font-size: 28px;
    }
    @include breakpoint('pc') {
      font-size: 22px;
    }
    &.eng {
      @include breakpoint() {
        font-size: 32px;
      }
      @include breakpoint('pc') {
        font-size: 30px;
      }
    }
  }

  // .btn--medium {
  //   flex-grow: 1;
  //   margin: 0;
  //   &:nth-child(2n) {
  //     margin-left: 20px;
  //   }
  // }

  &Item {
    $this: &;
    /* menu */
    @at-root .nav__menu {
      @include breakpoint('pc') {
        .nav__lists {
          // min-width: 1000px;
          & > li {
            margin: 60px 0;
            // .btn {
            //   margin-left: 10px;
            // }
          }
        }
      }
      // .nav__tit {
      //   @include breakpoint() {
      //     text-align: center;
      //   }
      //   @include breakpoint('pc') {
      //     text-align: left;
      //   }
      // }
      #{$this}:nth-child(1) {
        #{$this}__list {
          display: flex;
          @include breakpoint() {
            flex-direction: column;
          }

          button {
            font-weight: $font-bold;
            @include breakpoint() {
              font-size: 50px;
              margin-bottom: 36px;
            }

            @include breakpoint('pc') {
              font-size: 40px;
              margin-left: 58px;
            }
          }
        }
      }

      @include breakpoint() {
        #{$this}:nth-child(2) {
          margin: 30px 0 17px;
          flex-direction: column;
          #{$this}__list {
            margin-top: 42px;
            .btn {
              border-radius: 30px;
              margin: 0 5px;
              vertical-align: top;
            }
          }

          .btn > span {
            flex-direction: column;
            .btn__icon {
              margin: 0 0 10px;
            }
          }
        }

        #{$this}:nth-child(3),
        #{$this}:nth-child(4) {
          margin: 10px 0;
          .navItem__list {
            display: flex;
            width: 100%;
            .btn--medium {
              width: 100%;
            }
          }
        }
      }
    }

    /* point */
    @at-root .nav__point {
      .btn {
        margin: 0 5px;
      }
      // .nav__inner {
      //   @include breakpoint() {
      //     width: 560px;
      //   }
      //   @include breakpoint('pc') {
      //     width: 500px;
      //   }
      // }
      // .nav__stit {
      //   display: flex;
      //   align-items: center;
      //   width: 100%;
      //   border: 1px solid #fff;
      //   border-radius: 20px;

      //   @include breakpoint() {
      //     justify-content: center;
      //     flex-direction: column;
      //     height: 150px;
      //     line-height: 40px;
      //   }

      //   @include breakpoint('pc') {
      //     justify-content: space-between;
      //     height: 70px;
      //     padding: 0 30px;
      //   }
      // }
      // @include breakpoint('pc') {
      //   .nav__lists {
      //     margin: 0 0 55px 0;
      //     & > li {
      //     }
      //   }
      // }

      // .navItem {
      //   .btn--medium {
      //     &:nth-child(2n) {
      //       margin-left: 20px;
      //     }
      //   }

      #{$this}:nth-child(1) {
        @include breakpoint() {
          margin-top: 30px;
          flex-direction: column;
          #{$this}__list {
            display: flex;
            margin-top: 40px;
            // flex-direction: column;
            .btn {
              // width: 100%;
              // font-weight: $font-bold;
              // margin: 42px 0 60px 10px;
            }
          }
        }

        .remainPoints {
          .txt--green {
            font-weight: 600;
            color: $pointBlueGreen2;
            @include breakpoint() {
              font-size: 30px;
            }

            @include breakpoint('pc') {
              font-size: 24px;
            }
          }
        }
      }

      #{$this}:nth-child(2) {
        @include breakpoint() {
          flex-direction: column;
        }

        #{$this}__list {
          @include breakpoint() {
            margin-top: 36px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          @include breakpoint('pc') {
            margin-left: auto;
          }
        }
        // }
      }
    }
  }

  .btn {
    &__close {
      width: 90px;
      height: 90px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
    }

    &__logout {
      @include breakpoint() {
        margin: 50px 0 30px;
        font-size: 18px;
        color: #fff;
        svg {
          transform: rotate(90deg);
          margin-left: 6px;
        }
      }
      @include breakpoint('pc') {
        margin-top: 17px;
      }
    }
  }

  // mo
  .svg--inline {
    margin-right: 6px;
  }
}

.inquiry {
  color: #999;
  margin-bottom: 40px;
  @include breakpoint() {
    text-align: center;
  }
  @include breakpoint('pc') {
    text-align: right;
  }

  a {
    &::before {
      content: '|';
      color: #666;
      margin: 0 5px;
    }
    color: inherit;
  }
}
</style>
