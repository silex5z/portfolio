<template>
  <div :class="{ 'overflow--hidden': showIntro }">
    <section id="visual" ref="visual" class="section visual">
      <div class="section__inner">
        <h1 class="a11y">
          신학기 우리 아이 면역력 친구 홍이장군으로 면역력을 달고살자
        </h1>

        <a
          v-if="deviceKind === 'pc'"
          class="btn btn__buyProduct"
          data-gtm-category="MAIN"
          data-gtm-action="구매하기"
          target="_blank"
          href="https://www.kgcshop.co.kr/event/goodsPromotion?dispId=2882&utm_source=event_p&utm_campaign=HongP_event&utm_medium=sale&utm_term=2882"
          >홍이장군 신학기 특별 할인 구매하기</a
        >

        <a
          v-else
          class="btn btn__buyProduct"
          data-gtm-category="MAIN"
          data-gtm-action="구매하기"
          href="https://www.kgcshop.co.kr/event/goodsPromotion?dispId=2882&utm_source=event_p&utm_campaign=HongP_event&utm_medium=sale&utm_term=2882"
          >홍이장군 신학기 특별 할인 구매하기</a
        >
        <button
          @click="participateEvent('kit')"
          type="button"
          class="btn btn__goEvent1"
          data-gtm-category="MAIN"
          data-gtm-action="참여하기"
        >
          3일 체험 키트 증정 이벤트(100% 당첨) 참여하기
        </button>
      </div>
    </section>

    <!-- event1 -->
    <section id="event1" ref="event1" class="section event1">
      <!-- floating Nav -->
      <nav
        id="floatingNav"
        :class="{
          'floating--fixed': scrollTop > event1OffsetTop && deviceKind === 'pc'
        }"
        class="floating"
      >
        <a
          v-if="deviceKind === 'pc'"
          data-gtm-category="NAVI BAR"
          data-gtm-action="상단바"
          href="https://www.kgcshop.co.kr/event/goodsPromotion?dispId=2882&utm_source=event_p&utm_campaign=HongP_event&utm_medium=sale&utm_term=2882"
          target="_blank"
          >홍이장군 10% 할인 바로가기</a
        >
        <a
          v-else
          data-gtm-category="NAVI BAR"
          data-gtm-action="상단바"
          href="https://www.kgcshop.co.kr/event/goodsPromotion?dispId=2882&utm_source=event_p&utm_campaign=HongP_event&utm_medium=sale&utm_term=2882"
          >홍이장군 10% 할인 바로가기</a
        >
      </nav>
      <div class="section__inner">
        <div class="a11y">
          <h1>event1. 면역력을 달고 사는 우리 아이 영상 만들기!</h1>
          <dl>
            <dt>이벤트 기간</dt>
            <dd>2020.02.28~05.05</dd>
            <dt>이벤트 내용</dt>
            <dd>
              우리 아이 사진만 등록하면 영상 완성! 추첨을 통해 매주 20인에게
              홍이장군 본품 증정! *홍이장군 30일 본품 (최소 80,000원 상당)
            </dd>
          </dl>
        </div>

        <div class="videoBox">
          <div class="videoBox__tab">
            <button
              @click="setVideo('preSchool')"
              :class="{ on: videoType === 'preSchool' }"
              class="tab__preSchool"
              data-gtm-category="EVENT 01"
              data-gtm-action="영상 Tab_미취학"
              type="button"
            >
              어린이집 편
            </button>
            <button
              @click="setVideo('school')"
              :class="{ on: videoType === 'school' }"
              class="tab__school"
              data-gtm-category="EVENT 01"
              data-gtm-action="영상 Tab_취학"
              type="button"
            >
              초등학교 편
            </button>
          </div>

          <div class="videoBox__video">
            <youtube
              ref="youtube"
              @ready="ready"
              @playing="playing"
              @ended="ended"
              :player-vars="playerVars"
              :video-id="
                videoType === 'preSchool' ? 'Pj5dazd52ek' : 'fAT8qrAU7NY'
              "
              class="youtube"
              width="100%"
              height="100%"
            ></youtube>

            <!-- <transition name="fade">
              <div v-show="playState !== 1" class="video__cover">
                <p class="a11y">
                  우리 아이가 달고 사는 것은 무엇인가요? 영상 시청 후 이벤트에
                  참여해보세요!
                </p>
                <button
                  @click="playVideo"
                  type="button"
                  class="btn btn__playVideo"
                  data-gtm-category="EVENT 01"
                  data-gtm-action="영상 시청하기"
                >
                  영상 시청하기
                </button>
              </div>
            </transition> -->
          </div>
        </div>
        <!-- 참여하기 -->
        <!-- <div :class="{ on: hasVideoWatched }" class="btnBox__makingMovie"> -->
        <div class="btnBox__makingMovie on">
          <button
            @click="participateEvent('movie')"
            type="button"
            class="btn btn__makingMovie"
            data-gtm-category="EVENT 01"
            data-gtm-action="영상 만들기"
          >
            영상 만들고 본품 받기
          </button>
        </div>

        <button
          @click="
            openPop({
              popName: 'personalConfirmVideo',
              popPos: event1OffsetTop
            })
          "
          type="button"
          class="btn btn__confirmMovie"
          data-gtm-category="EVENT 01"
          data-gtm-action="영상 확인하기"
        >
          우리 아이 영상 확인하기
        </button>
        <button
          onclick="alert('당첨자 발표 기간이 아닙니다.\n(1차 당첨자 발표는 3/31(화)에 진행됩니다.)')"
          type="button"
          class="btn btn__movieWinner"
          data-gtm-category="EVENT 01"
          data-gtm-action="당첨 및 배송 안내"
        >
          당첨 및 배송 확인
        </button>

        <!-- 공유하기 -->
        <button
          @click="kakaoShare"
          type="button"
          class="btn btn__shareKakao"
          data-gtm-category="공유하기"
          data-gtm-action="MAIN_KAKAO"
        >
          카카오톡으로 이벤트 공유하기
        </button>
        <button
          @click="copyUrl"
          type="button"
          class="btn btn__shareLink"
          data-gtm-category="공유하기"
          data-gtm-action="MAIN_URL"
        >
          이벤트 주소 복사하기
        </button>
      </div>
    </section>
    <!-- event1 -->

    <section id="event2" ref="event2" class="section event2">
      <div class="section__inner">
        <!-- mobile slide -->
        <div v-if="!$device.isDesktop" class="event2__slideBox">
          <div v-swiper:videoSlider="mobileSwiperOption">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <transition name="fade">
                  <div>
                    <img :src="`${imageUrl}/event2-slide01.png`" alt />
                  </div>
                </transition>
              </div>
              <div class="swiper-slide">
                <transition name="fade">
                  <div>
                    <img :src="`${imageUrl}/event2-slide02.png`" alt />
                  </div>
                </transition>
              </div>
            </div>
            <div class="event2__pagination"></div>
          </div>
        </div>
        <!-- //mobile slide -->

        <div class="a11y">
          <h1>event2. 면역력을 달고 살자 홍이장군 체험 인증!</h1>
          <dl>
            <dt>이벤트 기간</dt>
            <dd>2020.03.09~05.17</dd>
            <dt>이벤트 내용</dt>
            <dd>
              인스타그램에 홍이장군 체험 후기를 인증하면, 총 100명에게 본품
              증정! (홍이장군 30일 본품 (최소 80,000원 상당) / 2주에 한번 씩, 총
              5회에 걸쳐 당첨자를 발표합니다.
            </dd>
            <dd>
              * EVENT 1을 통해 제품을 체험해보신 분을 대상으로 진행되는
              이벤트입니다
            </dd>
            <dd>
              * 인증해주신 URL은 홍이장군 이벤트 계정에 리그램될 수 있습니다.
            </dd>
            <dt>당첨자 발표</dt>
            <dd>2020.05.20</dd>
          </dl>
        </div>

        <button
          @click="participateReviewProof()"
          type="button"
          class="btn btn__proofReview"
          data-gtm-category="EVENT 02"
          data-gtm-action="리뷰 인증하기"
        >
          리뷰 인증하기
        </button>

        <button
          @click="showWinners('review')"
          type="button"
          class="btn btn__winner"
          data-gtm-category="EVENT 02"
          data-gtm-action="당첨 및 배송 안내"
        >
          당첨 및 배송 안내
        </button>
      </div>
      <div class="event2__bottom">
        <p class="a11y">
          필수 해시태그 : #정관장, #홍이장군, #면역력, #달고살자
        </p>
      </div>
    </section>

    <section id="eventNotice" class="section eventNotice">
      <div class="a11y">
        <h1>이벤트 유의사항</h1>
        <h2>체험키트 증정 이벤트</h2>
        <ul>
          <li>
            경품은 주차 별 취합 후 일괄 발송되며, 신청한 일자에서 1~10일 이상
            소요될 수 있습니다.
          </li>
          <li>
            경품은 우편으로 발송됩니다. 이벤트 당첨 후 우편함을 꼭 확인해주세요.
          </li>
          <li>
            부적절한 이벤트 참여를 방지하기 위해 본인 인증은 필수 단계이며
            부정한 방법으로 이벤트에 참여하거나 당첨된 경우, 사전 안내 없이 참여
            이력 삭제 및 당첨 취소가 될 수 있습니다.
          </li>
          <li>
            준비된 경품이 모두 소진될 경우, 이벤트는 조기 마감 될 수 있습니다.
          </li>
          <li>
            참여하신 연락처 기준 1개 번호에 1회만 참여 가능하며, 주소 기준 1개
            주소 당 3회까지 참여가 가능합니다.
          </li>
        </ul>
        <h2>우리 아이 영상 만들기 / 체험 인증 이벤트</h2>
        <ul>
          <li>
            ‘우리 아이 영상 만들기 이벤트’ 당첨자는 1주에 한 번, ‘체험 인증
            이벤트’는 2주에 한 번 화요일 이벤트 페이지를 통해 발표되며,
            당첨자에게는 개별 SMS를 통해 관련 내용이 안내됩니다.
          </li>
          <li>
            ‘체험 인증 이벤트’는 체험키트 증정 이벤트와 우리 아이 영상 만들기
            이벤트에 참여한 고객 중 경품을 수령한 당첨자만 참여 가능합니다.
          </li>
          <li>
            5만원 이상의 경품에 대한 제세공과금 22%는 정관장에서 부담합니다.
          </li>
          <li>
            당첨자는 발표된 주차의 일요일까지 제세공과금 처리를 위한 서류를
            회신주셔야 합니다.
          </li>
          <li>
            경품은 발표일 다음 주차의 월요일에 발송되며, 이벤트 경품 배송
            종료일까지 제세공과금 처리에 필요한 서류 요청에 대한 회신이 없을
            경우 당첨이 취소될 수 있습니다.
          </li>
        </ul>
        <h2>공통 유의사항</h2>
        <ul>
          <li>
            개인정보 입력 시, 잘못된 주소와 연락처로 인한 미배송 및 오배송은
            재배송되지 않습니다.
          </li>
          <li>
            경품 배송을 위해 이벤트 참여 시 입력한 휴대폰 번호로 연락을 요청할
            수 있습니다.
          </li>
          <li>
            본 이벤트는 정관장의 위탁을 받아 메가존㈜에서 대행, 운영됩니다.
          </li>
          <li>
            저작권 또는 초상권 침해 등으로 인한 분쟁 및 법적 책임 발생 시 모든
            책임은 작성자에게 있음을 알려 드립니다.
          </li>
          <li>경품은 교환 또는 환불이 불가합니다.</li>
          <li>
            부정한 방법으로 이벤트에 참여하거나 당첨된 경우, 사전 안내 없이 참여
            이력 삭제 및 당첨이 취소될 수 있습니다.
          </li>
          <li>
            이벤트 관련 문의
            <dl>
              <dt>이메일</dt>
              <dd>hongyi_event@mz.co.kr</dd>
              <dt>연락처</dt>
              <dd>
                02-2108-9256 (평일 오전 10시~17시 / 점심시간 12시~1시 / 수요일
                점심시간 11시 30분~1시 30분)
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </section>

    <!-- intro -->
    <transition name="intro">
      <section id="intro" v-if="showIntro" class="intro">
        <div class="intro__inner">
          <button
            @click="setVideo('preSchool')"
            type="button"
            class="btn__preSchool"
            data-gtm-category="SELECT"
            data-gtm-action="단계선택_미취학"
          >
            미취학편
          </button>
          <button
            @click="setVideo('school')"
            type="button"
            class="btn__school"
            data-gtm-category="SELECT"
            data-gtm-action="단계선택_취학"
          >
            취학편
          </button>
        </div>
      </section>
    </transition>

    <!-- <Debug></Debug> -->
    <!-- ======================
    // popup : start 
    // ======================-->
    <PopPersonalCheckInfo
      :isShow="currentPop === 'personalCheckInfo'"
      :activeEventName="activeEventName"
    >
    </PopPersonalCheckInfo>
    <PopPersonal
      :isShow="currentPop === 'personal'"
      :activeEventName="activeEventName"
    ></PopPersonal>
    <PopPost :isShow="currentPop === 'post'"></PopPost>
    <PopChooseStep
      :isShow="currentPop === 'chooseStep'"
      :activeEventName="activeEventName"
    ></PopChooseStep>
    <PopMake :isShow="currentPop === 'make'" :key="forceUpdate"></PopMake>
    <PopAlert
      :isShow="currentPop === 'alert'"
      @goSection="goSection"
    ></PopAlert>
    <!-- <PopPersonalAddress
      :isShow="currentPop === 'personalAddress'"
    ></PopPersonalAddress> -->

    <!-- popup : 영상 확인하기 -->
    <PopPersonalConfirmVideo
      :isShow="currentPop === 'personalConfirmVideo'"
    ></PopPersonalConfirmVideo>

    <PopUserVideo
      :isShow="currentPop === 'userVideo'"
      :userVideoList="this.$store.state.newSemester.userState.videoList"
      :key="forceUpdate + 1"
    ></PopUserVideo>

    <!-- popup : 리뷰 인증하기 -->
    <PopPersonalReviewProof
      :isShow="currentPop === 'personalReviewProof'"
    ></PopPersonalReviewProof>
    <PopWinner
      :isShow="currentPop === 'winner'"
      :activeEventName="activeEventName"
      :key="forceUpdate + 2"
    ></PopWinner>
  </div>
</template>

<script>
import PopPersonalCheckInfo from '@/components/new-semester/PopPersonalCheckInfo'
import PopPersonal from '@/components/new-semester/PopPersonal'
import PopChooseStep from '@/components/new-semester/PopChooseStep'
import PopMake from '@/components/new-semester/PopMake'

import PopPost from '@/components/new-semester/PopPost'
import PopAlert from '@/components/new-semester/PopAlert'
import PopPersonalConfirmVideo from '@/components/new-semester/PopPersonalConfirmVideo'
import PopUserVideo from '@/components/new-semester/PopUserVideo'

import PopPersonalReviewProof from '@/components/new-semester/PopPersonalReviewProof'
import PopWinner from '@/components/new-semester/PopWinner'

import { youtubeEmbedMixin } from '@/plugins/youtubeMixin'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'NewSemester',
  components: {
    PopPersonalCheckInfo,
    PopPersonal,
    PopChooseStep,
    PopMake,
    PopPost,
    PopAlert,
    PopPersonalConfirmVideo,
    PopUserVideo,
    PopPersonalReviewProof,
    PopWinner
    // Debug
  },
  mixins: [youtubeEmbedMixin],
  data() {
    return {
      hash: null,
      deviceKind: this.$device.isDesktop ? 'pc' : 'm',
      // showIntro: false,
      videoType: null,
      activeEventName: '',
      scrollTop: 0,
      event1OffsetTop: null,
      event2OffsetTop: null,
      mobileSwiperOption: {
        effect: 'fade',
        observer: true,
        pagination: {
          el: '.event2__pagination',
          clickable: true
        }
      }
    }
  },

  computed: {
    ...mapState({
      imageUrl(state) {
        return `${state.newSemester.imageUrlRoot}/${this.deviceKind}`
      },
      currentPop: (state) => state.popup.currentPop,
      fromSharedUrl: (state) => state.newSemester.userState.fromSharedUrl,
      forceUpdate: (state) => state.popup.forceUpdate
    }),
    showIntro() {
      // return false
      if (this.hash || this.hash === null) {
        return false
      }
      // 메인, 공유메인 페이지에서 intro제어
      if (this.currentPop === '' && this.videoType === null) {
        return true
      }
      return false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    window.Kakao.init('b3bac1c023cb2700b1427095be3957bb')
    this.hash = location.hash
    if (process.browser) {
      window.onNuxtReady((app) => {
        // console.log('Nuxt ready!')
        this.init()
      })
    }
  },
  methods: {
    ...mapActions('popup', ['openPop', 'setLoading']),
    init() {
      this.event1OffsetTop = this.$refs.event1.offsetTop
      this.event2OffsetTop = this.$refs.event2.offsetTop
      if (location.hash) {
        this.videoType = 'preSchool'
        this.goSection(location.hash)
      }
    },
    setVideo(type) {
      this.videoType = type
    },
    participateEvent(eventName) {
      this.activeEventName = eventName
      if (eventName === 'kit') {
        this.openPop({
          popName: 'personalCheckInfo',
          popPos: 50
        })
      } else if (eventName === 'movie') {
        this.openPop({
          popName: 'personalCheckInfo',
          popPos: this.event1OffsetTop
        })
      }
    },
    participateReviewProof() {
      this.$axios
        .post(`/api/hongyi/review/allowable/date`)
        .then((res) => {
          if (!res.data.result) return
          this.openPop({
            popName: 'personalReviewProof',
            popPos: this.event2OffsetTop
          })
        })
        .catch((error) => {
          alert(error.response.data.error)
        })
    },
    showWinners(eventName) {
      this.activeEventName = eventName
      this.openPop({
        popName: 'winner',
        popPos:
          eventName === 'movie' ? this.event1OffsetTop : this.event2OffsetTop
      })
    },
    kakaoShare() {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '신학기 홍이장군 체험 이벤트',
          description:
            '홍이장군 3일 체험키트 100% 증정! 추첨을 통한 본품 증정의 기회까지!',
          imageUrl:
            'https://hongyi.s3.ap-northeast-2.amazonaws.com/static/new-semester/images/share/default-kakao.jpg',
          imageWidth: 300,
          imageHeight: 300,
          link: {
            mobileWebUrl: `${location.origin}?utm_source=share&utm_medium=main&utm_campaign=kakao`,
            webUrl: `${location.origin}?utm_source=share&utm_medium=main&utm_campaign=kakao`
          }
        },
        buttons: [
          {
            title: '체험 신청하기',
            link: {
              mobileWebUrl: `${location.origin}?utm_source=share&utm_medium=main&utm_campaign=kakao`,
              webUrl: `${location.origin}?utm_source=share&utm_medium=main&utm_campaign=kakao`
            }
          }
        ]
      })
    },
    copyUrl() {
      this.$copyText(
        `${location.origin}/?utm_source=share&utm_medium=main&utm_campaign=url_copy`
      ).then(
        (e) => {
          alert('URL 복사가 완료되었습니다')
        },
        (e) => {
          alert('URL 복사에 실패했습니다')
        }
      )
    },
    handleScroll() {
      this.scrollTop = Math.ceil($(window).scrollTop())
    },
    goSection(section) {
      const offsetTop =
        this.deviceKind === 'pc'
          ? $(section).offset().top
          : $(section).offset().top - 88

      $('html, body').animate(
        {
          scrollTop: Math.ceil(offsetTop)
        },
        500
      )
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/new-semester/style';
</style>
