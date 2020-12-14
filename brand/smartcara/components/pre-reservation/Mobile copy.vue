<template>
  <div v-cloak class="container__m">
    <!-- <div class="debug"></div> -->
    <h1 class="logo">
      <a href="/" target="_self">
        <img :src="`${imageUrl}/logo-smartcara.png`" alt="logo" />
      </a>
    </h1>
    <header class="header">
      <nav class="nav">
        <ul class="nav__items">
          <li class="nav__item nav__item--1">
            <a @click.prevent="goToScene('scene2', false)" href=""
              >Goodbye 쓰트레스</a
            >
          </li>
          <li class="nav__item nav__item--2">
            <a @click.prevent="goToScene('scene3', false)" href=""
              >NEW 스마트카라</a
            >
          </li>
          <li class="nav__item nav__item--3">
            <a @click.prevent="goToScene('scene4', false)" href=""
              >사전예약 이벤트</a
            >
            <!-- <div class="debug-console">
              {{ windowHeight }}
            </div> -->
          </li>
        </ul>
      </nav>
    </header>
    <div id="trigger--nav"></div>

    <div id="trigger--1"></div>
    <section class="scene scene--1">
      <div class="thin font--keyVisual">
        <span class="row--1 fade-in-bottom-1 "
          ><span>오</span><span>늘</span><span>도</span></span
        ><span class="row--2 fade-in-bottom-2  bold"
          ><span>쓰</span><span>트</span><span>레</span><span>스</span></span
        ><span class="row--3 fade-in-bottom-3 "
          ><span>받고 </span><span>있나요</span></span
        >

        <div class="btnWrap">
          <button
            @click="goToScene('scene2')"
            class="btn--main fade-in"
            type="button"
          >
            쓰트레스 알아보기
          </button>
        </div>
      </div>
      <div class="lineWrap"><span class="line gIodAN"></span></div>
      <i class="icon-scroll"
        ><img
          src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/images/m/icon--scroll.png"
          alt=""
      /></i>
    </section>

    <div id="trigger--2"></div>
    <div id="pinned" class="scene">
      <section class="scene scene--2">
        <!-- <div class="dimmed"></div> -->
        <div class="scene__inner">
          <ul class="card-wrap">
            <li class="card card--1">
              <img :src="`${imageUrl}/card-1.png`" alt="card1" />
            </li>
            <li class="card card--2">
              <img :src="`${imageUrl}/card-2.png`" alt="card2" />
            </li>
            <li class="card card--3">
              <img :src="`${imageUrl}/card-4.png`" alt="card3" />
            </li>
            <li class="card card--4">
              <img :src="`${imageUrl}/card-5.png`" alt="card4" />
            </li>
          </ul>

          <div class="text-wrap">
            <p class="text text1">누구나 한번쯤,</p>
            <p class="text text2">어쩌면 매일</p>
            <p class="text text3">당신의 소중한 시간을 방해하는</p>
            <p class="text text4 bold">
              <span class="text4--before text4--before2 colored">스</span>
              <span class="text4--after text4--after1">쓰</span>
              <span class="text4--after text4--after2">트레스</span>
              <span class="text4--before text4--before1"
                >음식물<span class="colored">쓰</span>레기</span
              >
            </p>
            <p class="text text5">NEW 스마트카라로</p>
            <p class="text text6">이젠 Good Bye 하세요</p>
            <p class="text text7 thin">당신의 소중한 일상을 함께 할</p>
            <p class="text text8 bold">NEW 스마트카라를 <br />소개합니다</p>
          </div>
          <div class="dimmed"></div>
        </div>
      </section>

      <!-- scene--3 -->
      <div id="trigger--3"></div>
      <section class="scene scene--3">
        <div class="scene__inner scene__inner--1">
          <div class="text-wrap--1">
            <p class="text text9 thin">
              내 주방의 인테리어를 더 돋보이게 만드는
            </p>
            <p class="text text10 bold">프리미엄 디자인 & 컬러</p>
            <p class="text paragraph paragraph1 thin">
              어떤 각도에서도 빛을 내며<br />존재감을 드러내는 화사함<br />
              주방에 모던함을 더해주며 은은하게<br />
              느껴지는 고급스러움<br />
            </p>
            <p class="text paragraph paragraph2 thin">
              공간에 품격을 더하는<br />
              프리미엄한 디자인과 컬러<br />
            </p>
            <div class="color-chip"></div>
          </div>
          <canvas id="background-animation" width="640" height="640"></canvas>
        </div>

        <div class="scene__inner scene__inner--2">
          <div class="video-wrap">
            <video
              src="~assets/video/pcs500.mp4"
              playsinline
              autoplay
              muted
              loop
            ></video>
          </div>
          <div class="text-wrap--2">
            <p class="text text11 thin">안전하게 잠그고 간편하게 오픈하는</p>
            <p class="text text12 bold">스마트 락</p>
            <p class="text paragraph paragraph3 thin">
              45˚만 돌려도 손쉽게 잠그는 락<br />
              안전성을 향상시킨 <span class="bold">회전식 잠금 장치</span>
              <br />
              푸쉬형 도어 버튼과 폴더형 도어 오픈 방식으로 <br />
              도어 오픈의 편리성과 안정성을 향상
            </p>
          </div>
        </div>

        <div class="scene__inner scene__inner--3">
          <div class="text-wrap--3">
            <p class="text text13 thin">냄새는 잡아주고 손 쉽게 교체하는</p>
            <p class="text text14 bold">3중 에코 필터</p>
            <p class="text paragraph paragraph4 thin">
              냄새 입자를 걸러주는 3중 복합 필터<br />
              기존 필터와 같은 가격으로 수명은 최대 200% 향상<br />
              손 쉽게 고정 해제하고 분리하는<br />
              <span class="bold">탈착식 필터 교체</span> 방식
            </p>
          </div>
          <div class="video-wrap">
            <video
              src="~assets/video/pcs500.mp4"
              playsinline
              autoplay
              muted
              loop
            ></video>
          </div>
        </div>
      </section>

      <div class="dimmed cover"></div>
    </div>

    <!-- scene--4 // 이서진 풀사이즈 -->
    <div id="trigger--4"></div>
    <section ref="eventArea" class="event-description event-description--1">
      <div class="section__inner">
        <p class="a11y">
          NEW 스마트칼 특별 사전예약 <b>500대 한정</b>
          <em>사전예약 신청기간 2020.4.17 ~ 4.30</em>
          오직 사전예약 구매자에 한하여 한정 수량만 특별한 혜택과 함께 제공!
        </p>
      </div>
    </section>

    <!-- scene--5 // 이벤트 영역 -->
    <div id="trigger--5"></div>
    <section class="event-description event-description--2">
      <!-- <p>스마트카라 특별 사전예약</p> -->
      <div class="section__inner">
        <p class="a11y">
          사전예약 구매고개 전원에게 드리는 특별혜택 사전 예약을 하신 분들에게만
          신제품 구매 링크를 SMS로 보내드립니다.
        </p>
        <ol class="a11y">
          <li>사전예약만 해도 100% 증정 <em>10% 할인 쿠폰</em></li>
          <li>사전예약 구매고객 전원 증정 <em>1년치 에코필터</em></li>
          <li>사전예약 구매고객 전원 증정 <em>다용도 보관 스탠드</em></li>
        </ol>
        <img :src="`${imageUrl}/content-event-lower.png`" alt="" />
        <div class="btnWrap">
          <button
            @click="
              openPop({
                popName: 'popup'
              })
            "
            class="btn--make-reservation"
            type="button"
          >
            지금 사전예약 하기
          </button>
        </div>
      </div>
    </section>

    <section class="event-notice">
      <div class="section__inner">
        <p class="a11y">
          <strong>유의사항을 반드시 확인하세요.</strong>
          본 사전예약 구매 신청은 4월 17일 오픈 시점부터 4월 30일까지
          진행됩니다. 쿠폰과 사은품은 스마트카라 홈페이지에서 PCS-400 구매 건에
          한하여 적용됩니다. ※ 타 쇼핑몰, 전화 주문 제외 ※ 렌탈, 장기할부,
          소모품 구매 고객 제외 구매 링크는 제품 런칭 이후 발송되며, 잘못
          기재하신 휴대폰 번호로 링크 발송 될 경우 참여자에게 재발송되지
          않습니다. 개인 정보 오기입으로 인한 불이익은 당사에서 책임지지
          않습니다. 제품의 색상은 제품 런칭 이 후 전송되는 구매 링크를 통해
          선택하실 수 있습니다. 동일한 스마트카라 공식몰 ID는 다르지만 이름과
          연락처가 같을 경우, 중복 참여로 간주하여, 참여 횟수 1회로
          카운팅합니다. 본 이벤트 페이지 내의 제품 및 사은품 이미지는 실제
          디자인과 다를 수 있습니다. 본 이벤트는 당사 사정에 의해 사전 고지 없이
          내용 및 기간 변경, 혹은 취소 될 수 있습니다.
        </p>
        <img :src="`${imageUrl}/content-notice.png`" alt="" />
      </div>
    </section>

    <footer class="footer">
      <div class="section__inner">
        <p class="a11y">
          인천광역시 연수구 송도과학로 16번길 13-30 (송도동 175-1) 2층
          (주)스마트카라 Tel : 1800 - 9113 Copyright 2020 Smartcara. All Rights
          reserved.
        </p>
        <img :src="`${imageUrl}/footer.png`" alt="" />
      </div>
    </footer>

    <aside>
      <div class="floating-banner">
        <button
          @click="
            openPop({
              popName: 'popup'
            })
          "
          type="button"
          class="floating-banner__btn"
        ></button>
      </div>
    </aside>

    <div class="dimmed sceneChanged"></div>
    <div class="dimmed cover"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Mobile',
  head() {
    return {
      script: [
        /* {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.js',
          mode: 'client'
        }, */
        /*    {
          src: '/js/iScroll.js',
          mode: 'client'
        }, */
        {
          src: '/js/scrollMagic.js',
          mode: 'client'
        },
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenMax.min.js',
          mode: 'client'
        },
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.js',
          mode: 'client'
        },
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.js',
          mode: 'client'
        }
      ]
    }
  },
  props: { imageUrl: { type: String, default: null } },
  data() {
    return {
      blockSceneEvent: false,
      headerFixed: null,
      scrollDirection: null,
      controller: null,
      scene1: null,
      scene2: null,
      scene3: null, // 3d silver
      scene4: null, // 3d color change
      scene5: null, // 3d white
      scene6: null,
      navCtrl: null,
      isScrolling: false,
      animationScene1: null,
      animationScene2: null,
      windowHeight: null,
      currentScrollPosition: null, // 현재 스크롤 위치
      currentScene: 'scene1',
      totalDuration: '', // scene2, 3 스크롤 양
      scene2flag: '',
      scene3flag: '',
      scene4flag: '',
      sceneTotalScroll: '',
      scene2StartOffset: null,
      // scene4Offset: null,
      images: [],
      images2: [],
      images3: [],
      canvas: null,
      ctx: null,
      renderer: null,

      myScroll: null
    }
  },
  computed: {
    popupOffset() {
      return this.$refs.eventArea.offsetTop
    },
    scene2Offset() {
      return Math.floor(this.scene2StartOffset + this.pixelByOneSecond)
    },
    scene3Offset() {
      return (
        Math.floor(
          (this.scene3flag / this.totalDuration) * this.sceneTotalScroll +
            this.scene2StartOffset
        ) - 1
      )
    },
    scene4Offset() {
      return Math.floor(
        this.sceneTotalScroll + this.scene2StartOffset - this.windowHeight
      )
    },
    /* 스크롤 양 */
    scrollOffsetAmount() {
      return this.windowHeight
    },
    // 1초 픽셀 환산
    pixelByOneSecond() {
      return Math.floor(this.sceneTotalScroll / this.totalDuration)
    },
    // 1퍼센트 픽셀 환산
    pixelByOnePercent() {
      return Math.floor(this.sceneTotalScroll / 100)
    },
    ...mapState({
      isLoading: (state) => state.popup.isLoading
    })
  },
  watch: {
    /* scroll position 으로 current scene 계산 */
    currentScrollPosition(newVal, oldVal) {
      // console.log(newVal + 'newval')

      if (newVal < this.scene2Offset) {
        this.currentScene = 'scene1'
      } else if (newVal >= this.scene2Offset && newVal < this.scene3Offset) {
        this.currentScene = 'scene2'
      } else if (newVal >= this.scene3Offset && newVal < this.popupOffset) {
        this.currentScene = 'scene3'
      } else {
        this.currentScene = 'scene4'
      }
    },
    /* current scene 변경 시 실행될 로직 */
    currentScene(newVal, oldVal) {
      // console.log(newVal)
      // $('nav__item')
      $('.nav__item').removeClass('on')
      $('.floating-banner').removeClass('hide')

      if (newVal === 'scene1') {
        return false
      } else if (newVal === 'scene2') {
        $('.nav__item')
          .eq(0)
          .addClass('on')
      } else if (newVal === 'scene3') {
        $('.nav__item')
          .eq(1)
          .addClass('on')
      } else {
        $('.nav__item')
          .eq(2)
          .addClass('on')
        $('.floating-banner').addClass('hide')
      }
    }
  },
  created() {},
  mounted() {
    if (process.browser) {
      window.onNuxtReady((app) => {
        const vh = Math.floor(
          (window.screen.height * 640) / window.screen.width - 40
        )

        document
          .querySelector('.fade-in')
          .addEventListener('animationend', () => {
            $('.btn--main').addClass('on')
          })

        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`)

        /* alert(window.outerHeight)
        alert(window.screen.height)
        */
        this.initCanvasImages()
        this.windowHeight = vh
        this.canvas = document.getElementById('background-animation')
        this.ctx = this.canvas.getContext('2d')
        // this.ctx.drawImage(this.images[0], 30, 0)
        // this.ctx.drawImage(this.images[0], -340, 0)
        // alert(window.screen.height)

        this.images[0].onload = () => {
          this.ctx.drawImage(this.images[0], 30, 0)
        }

        window.addEventListener('scroll', (e) => {
          this.currentScrollPosition = window.pageYOffset

          /* if (this.controller.info().scrollDirection === 'REVERSE') {
            $('.logo, .header').addClass('reversed')
            setTimeout(() => {
              $('.logo, .header').removeClass('reversed')
            }, 2000)
          } */
        })

        window.addEventListener('resize', (e) => {
          // this.currentScrollPosition = window.pageYOffset
          // console.log(window.screen.height)
          // this.windowHeight = window.screen.height
          /* if (this.controller.info().scrollDirection === 'REVERSE') {
            $('.logo, .header').addClass('reversed')
            setTimeout(() => {
              $('.logo, .header').removeClass('reversed')
            }, 2000)
          } */
        })

        this.controller = new ScrollMagic.Controller()
        this.controller.scrollTo((newPos, option) => {
          if (option === false) {
            this.sceneChangeEffect()
            setTimeout(function() {
              window.scrollTo(0, newPos)
            }, 500)
          } else {
            if (this.isScrolling === true) {
              return false
            }
            // console.log('scroll')
            this.isScrolling = true
            $('html, body')
              .stop()
              .animate({ scrollTop: newPos }, 500, () => {})
            setTimeout(() => {
              this.isScrolling = false
            }, 500)
          }
        })

        this.navCtrl = new ScrollMagic.Scene({
          triggerElement: '#trigger--1',
          triggerHook: 'onLeave'
        })
          .setClassToggle('.header', 'fixed')
          .addTo(this.controller)

        /* this.nav4On = new ScrollMagic.Scene({
          triggerElement: '.scene--4',
          triggerHook: 0,
          duration: '200%'
        })
          .setClassToggle('.nav__item--3', 'on')
          .addTo(this.controller) */

        // SteppedEase
        /* global Power1 */
        this.animationScene1 = new TimelineMax()
          .set('.scene--1 .scene__dimmed', { display: 'none', opacity: 0 })
          .to('.scene--1 .scene__dimmed', 1.5, { display: 'block', opacity: 1 })
          .fromTo('.scene--1 .scene__inner', 1, { opacity: 1 }, { opacity: 0 })
          .fromTo(
            '.scene--1',
            1,
            {
              display: 'block',
              opacity: 1,
              ease: 'elastic'
            },
            { display: 'none', opacity: 0 }
          )

        // define movement of panels
        this.animationScene2 = new TimelineMax()
          .fromTo(
            '.scene--2',
            1,
            { opacity: 0, ease: 'elastic' },
            { opacity: 1 }
          )
          // .to('.indicator', 1, { opacity: 1 })
          // 건물 배경
          .fromTo(
            '.scene__bg',
            1,
            { opacity: 0, ease: 'elastic' },
            { opacity: 1 },
            1
          )
          .addLabel('scene2start')

          // 카드 1
          .fromTo(
            '.card.card--1',
            1.5,
            { opacity: 0, y: 100, x: 35 },
            { opacity: 1, y: 0, ease: Power1.easeOut },
            1
          )
          .fromTo(
            '.card.card--2',
            1.5,
            { opacity: 0, y: 200, x: -20 },
            { opacity: 1, y: 100, ease: Power1.easeOut },
            3
          )
          .to('.card.card--1', 1, { opacity: 0, y: -100 }, 5)
          .to('.card.card--2', 2, { y: -400 }, 6.5)
          .fromTo(
            '.card.card--3',
            1,
            { opacity: 0, y: 550 },
            { opacity: 1, y: 450, ease: Power1.easeOut },
            8.5
          )
          .to('.card.card--2', 1, { opacity: 0, y: -500 }, 10)
          .to('.card.card--3', 2, { y: 150 }, 11.5)
          .fromTo(
            '.card.card--4',
            1,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, ease: Power1.easeOut },
            14
          )
          .to('.card.card--3', 1, { opacity: 0, y: -100 }, 15.5)
          .to('.card.card--4', 2, { y: -500 }, 17)
          .to('.card.card--4', 1, { opacity: 0 }, 19)
          .to('.scene--2 .dimmed', 0.5, { zIndex: 5, display: 'block' }, 19.5)
          .to('.scene--2 .dimmed', 0.5, { opacity: 1, zIndex: 1 }, 19.5)
          // .to('.scene.scene--2 .dimmed', 0.6, {  })

          // 누구나 한번쯤
          .set('.text', { y: 500 })
          .to(
            '.scene--2 .text1, .scene--2 .text2',
            1,
            {
              y: 300,
              opacity: 1,
              ease: Power1.easeOut
            },
            20.5
          )
          .to(
            '.scene--2 .text1, .scene--2 .text2',
            1,
            {
              y: 200,
              ease: Power1.easeOut
            },
            21.5
          )
          // 당신의 소중한...
          .to(
            '.scene--2 .text3',
            1,
            {
              y: 230,
              opacity: 1,
              ease: Power1.easeOut
            },
            23
          )
          .to(
            '.scene--2 .text1, .scene--2 .text2',
            1,
            {
              y: 90,
              opacity: 0,
              ease: Power1.easeOut
            },
            25
          )
          .to(
            '.scene--2 .text3',
            1,
            {
              y: 120,
              ease: Power1.easeOut
            },
            25
          )
          .set('.scene--2 .text4 .text4--before1', { opacity: 0, y: 0 })
          .set('.scene--2 .text4 .text4--before2', {
            opacity: 0
          })
          .set('.scene--2 .text4 .text4--after1', { x: 5 })
          .to(
            '.scene--2 .text3',
            1,
            {
              y: 70,
              ease: Power1.easeOut
            },
            27
          )
          // 쓰트레스
          .fromTo(
            '.scene--2 .text4',
            1,
            { x: 0 },
            { y: 110, opacity: 1, ease: Power1.easeOut }
          )
          .to('.scene--2 .text4 .text4--after2', 0.5, {
            delay: 2,
            y: 75,
            ease: Power1.easeOut
          })
          .to('.scene--2 .text4 .text4--after1', 0.5, {
            delay: 0.5,
            x: 112,
            ease: Power1.easeOut
          })
          .fromTo(
            '.scene--2 .text4 .text4--before2',
            2,
            { x: 65, y: 75, opacity: 0 },
            { opacity: 1, ease: Power1.easeOut },
            '-=.2'
          )
          .fromTo(
            '.scene--2 .text4 .text4--before1',
            2,
            { opacity: 0 },
            { opacity: 1, ease: Power1.easeOut },
            '-=2.2'
          )
          .to('.scene--2 .text1, .scene--2 .text2, .scene--2 .text3', 0.5, {
            y: -50,
            opacity: 0,
            ease: Power1.easeOut
          })
          .to('.scene--2 .text4', 0.5, { y: 40, ease: Power1.easeOut })
          .to('.scene--2 .text5', 2, {
            delay: 0.5,
            y: 130,
            opacity: 1,
            ease: Power1.easeOut
          })
          .to(
            '.scene--2 .text6',
            2,
            {
              y: 130,
              opacity: 1,
              ease: Power1.easeOut
            },
            '-=2'
          )
          .to('.scene--2 .dimmed', 1, { zIndex: 3 }, '-=0.5')
          .to(
            '.scene--2 .dimmed',
            0.5,
            { backgroundColor: 'rgba(0, 0, 0, 1)', ease: Power1.easeOut },
            '-=2'
          )
          .to('.text4, .text5, .text6, .card', 1, {
            delay: 1,
            opacity: 0,
            ease: Power1.easeOut
          })
          // 당신의 소중한
          .fromTo(
            '.text7',
            1,
            { y: -47 },
            {
              delay: 1,
              opacity: 1,
              y: -137,
              ease: Power1.easeOut
            }
          )
          .fromTo(
            '.text8',
            1,
            { y: -37 },
            { delay: 1, opacity: 1, y: -127, ease: Power1.easeOut },
            '-=2'
          )
          // .to('.scene--2 .dimmed', 1, { opacity: 0, display: 'none' })
          // scene 3 Start
          .addLabel('scene3start')
          // .to('.scene--2 .dimmed', 0.5, { zIndex: -1 })
          .to('.text7, .text8', 1, {
            delay: 2,
            opacity: 0,
            ease: Power1.easeOut
          })
          .to('.scene--2', 0.5, { opacity: 0, ease: Power1.easeOut })
          .to('.scene--3', 1.5, { delay: 2, opacity: 1, zIndex: 3 })
          .fromTo(
            '.text9',
            1,
            { y: -120 },
            {
              delay: 0.5,
              opacity: 1,
              y: -170,
              ease: Power1.easeOut,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
              },
              onReverseComplete: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
              }
            }
          )
          .fromTo(
            '.text10',
            1,
            { y: -120 },
            { delay: 0.5, opacity: 1, y: -170, ease: Power1.easeOut },
            '-=1.5'
          )
          .to('.scene--2 .dimmed', 0.5, {
            opacity: 0,
            ease: Power1.easeOut
          })
          .fromTo(
            '.paragraph1',
            1,
            {
              y: 110
            },
            { opacity: 1, y: 60, ease: Power1.easeOut }
          )
          .to('.paragraph1', 3, {
            delay: 3,
            opacity: 0,
            ease: Power1.easeOut
          })
          .fromTo(
            '#background-animation, .color-chip',
            1,
            {
              opacity: 0
            },
            {
              opacity: 1,
              ease: Power1.easeOut
            }
          )
          .fromTo(
            '.paragraph2',
            1,
            {
              y: 285
            },
            {
              y: 235,
              opacity: 1,
              ease: Power1.easeOut
            },
            '-=1'
          )
          .addLabel('3Dstart')
          // .to('.')
          .to('.scene__inner--1', 3, {
            delay: 25,
            opacity: 0,
            ease: Power1.easeOut
          })
          .fromTo(
            '.scene__inner--2',
            1,
            {
              opacity: 0,
              ease: Power1.easeOut
            },
            { delay: 1, opacity: 1, ease: Power1.easeOut }
          )
          .fromTo(
            '.text11',
            1,
            { opacity: 0, y: -160 },
            { delay: 1, opacity: 1, y: -210, ease: Power1.easeOut }
          )
          .fromTo(
            '.text12',
            1,
            { opacity: 0, y: -160 },
            { delay: 1, opacity: 1, y: -210, ease: Power1.easeOut },
            '-=2'
          )
          .fromTo(
            '.paragraph3',
            1,
            {
              y: 310
            },
            { opacity: 1, y: 260, ease: Power1.easeOut }
          )
          .to('.scene__inner--2', 1, {
            delay: 2,
            opacity: 0,
            ease: Power1.easeOut
          })
          .fromTo(
            '.scene__inner--3',
            1,
            {
              opacity: 0,
              ease: Power1.easeOut
            },
            { delay: 2, opacity: 1, ease: Power1.easeOut }
          )
          .fromTo(
            '.text13',
            1,
            { opacity: 0, y: -160 },
            { delay: 1, opacity: 1, y: -210, ease: Power1.easeOut }
          )
          .fromTo(
            '.text14',
            1,
            { opacity: 0, y: -160 },
            { delay: 1, opacity: 1, y: -210, ease: Power1.easeOut },
            '-=2'
          )
          .fromTo(
            '.paragraph4',
            1,
            {
              y: 310
            },
            { opacity: 1, y: 260, ease: Power1.easeOut }
          )
          .to('.scene__inner--3', 2, {
            delay: 2,
            opacity: 0,
            ease: Power1.easeOut
          })
          /* .to('.scene--3', 2, {
            backgroundColor: '#f2f2f2',
            ease: Power1.easeOut
          }) */
          // .to('.scene', 2, {
          //   opacity: 0,
          //   ease: Power1.easeOut
          // })
          /* .to('.event-description--1', 2, {
            opacity: 1,
            zIndex: 3,
            ease: Power1.easeOut
          })
          .to('.event-description--2', 2, {
            delay: 2,
            opacity: 1,
            zIndex: 3,
            ease: Power1.easeOut
          }) */
          .addLabel('scene4start')

        /* const tween = TweenMax.to('#background-animation', 1.0, {
          backgroundPosition: '0 100%',
          ease: SteppedEase.config(49)
        }) */

        this.scene1 = new ScrollMagic.Scene({
          triggerElement: '#trigger--1',
          triggerHook: 'onLeave',
          duration: '100%'
        })
          .setPin('.scene--1')
          .setTween(this.animationScene1)
          // .addIndicators() // add indicators (requires plugin)
          .addTo(this.controller)
          .on('update', (e) => {
            // console.log(e)
          })

        this.scene2 = new ScrollMagic.Scene({
          triggerElement: '#trigger--2',
          triggerHook: 'onLeave',
          duration: '5000%'
        })
          .setPin('#pinned')
          // .setClassToggle('.nav__item--1', 'on')
          .setTween(this.animationScene2)
          // .addIndicators() // add indicators (requires plugin)
          .addTo(this.controller)
          .on('update', (e) => {
            if (this.isLoading === true) {
              this.setLoading(false)
            }
            this.scene2StartOffset = e.startPos
            this.sceneTotalScroll = e.endPos - e.startPos
            // this.scene4Offset = e.endPos + this.scrollOffsetAmount
            // console.log(this.animationScene2.totalTime() + 'timeT')
            this.totalDuration = this.animationScene2.totalDuration().toFixed(1)
            this.scene2flag = this.animationScene2.getLabelTime('scene2start')
            this.scene3flag = this.animationScene2.getLabelTime('scene3start')
            this.scene4flag = this.animationScene2.getLabelTime('scene4start')
            /* console.log(this.animationScene2.getLabelTime('3Dstart')) */
            // this.scrollDirection = e.scrollDirection
            // console.log(e)
          })

        /* this.scene4 = new ScorllMagic.Scene({
          triggerElement: '#'
        }) */

        setTimeout(() => {
          /* 3d silver */
          this.scene3 = new ScrollMagic.Scene({
            triggerHook: 'onLeave',
            duration: this.pixelByOneSecond * 7,
            offset: this.scene2Offset + this.pixelByOneSecond * 59.3
          })
            .addTo(this.controller)
            .on('progress', (e) => {
              const idx = Math.floor(e.progress * (this.images.length - 1))
              // const offset = -340
              // console.log(idx)
              this.ctx.clearRect(0, 0, 640, 640)
              /* this.ctx.drawImage(this.images[idx], idx * 30 + offset, 0) */
              this.ctx.drawImage(this.images[idx], 30, 0)
            })

          /* 3d change */
          this.scene4 = new ScrollMagic.Scene({
            triggerHook: 'onLeave',
            duration: this.pixelByOneSecond * 7,
            offset: this.scene2Offset + this.pixelByOneSecond * 66.3
          })
            .addTo(this.controller)
            .on('progress', (e) => {
              const idx = Math.floor(e.progress * (this.images2.length - 1))

              // console.log(idx)
              this.ctx.clearRect(0, 0, 640, 640)
              this.ctx.drawImage(this.images2[idx], 30, 0)
              // this.ctx.drawImage(this.images[idx], 50, 0)
            })

          /* 3d white */
          this.scene5 = new ScrollMagic.Scene({
            triggerHook: 'onLeave',
            duration: this.pixelByOneSecond * 7,
            offset: this.scene2Offset + this.pixelByOneSecond * 73.3
          })
            .addTo(this.controller)
            .on('progress', (e) => {
              const idx = Math.floor(e.progress * (this.images3.length - 1))

              // console.log(idx)
              this.ctx.clearRect(0, 0, 640, 640)
              this.ctx.drawImage(this.images3[idx], 30, 0)
              // this.ctx.drawImage(this.images[idx], 50, 0)
            })
        }, 1000)

        /* this.scene6 = new ScrollMagic.Scene({
          triggerElement: '#trigger--4',
          triggerHook: 'onEnter',
          duration: '100%'
        })
          .setPin('#pinned', { pushFollowers: false })
          .on('start', (e) => {
            // console.log(e)
            // console.log(e.scrollDirection)
            if (e.scrollDirection === 'FORWARD') {
              $('.blockScroll').addClass('on')
              // document
              //   .getElementById('blockScroll')
              //   .focus({ preventScroll: false })
              this.goToScene('scene4')
              setTimeout(() => {
                $('.blockScroll').removeClass('on')
              }, 2000)
            }
          })
          .addTo(this.controller) */
      })
    }
  },
  methods: {
    ...mapActions('popup', ['openPop', 'setLoading']),
    goToScene(scene, boolean) {
      let newPos
      switch (scene) {
        case 'scene1':
          newPos = 0
          break
        case 'scene2':
          newPos = this.scene2Offset
          break
        case 'scene3':
          newPos = this.scene3Offset
          break
        case 'scene4':
          newPos = this.popupOffset
          break
      }
      this.controller.scrollTo(newPos, boolean)
    },
    sceneChangeEffect() {
      const $dimmed = $('.sceneChanged')
      $dimmed.addClass('on')
      this.blockSceneEvent = true
      setTimeout(() => {
        this.blockSceneEvent = false
        $dimmed.removeClass('on')
      }, 1100)
    },
    calcHeight() {
      return window.innerHeight * 15
    },
    initCanvasImages() {
      for (let i = 1; i < 29; i++) {
        const img = new Image(604, 640)
        img.src = `${this.imageUrl}` + '/crop/s-' + ('0' + i).slice(-2) + '.png'
        this.images.push(img)
      }

      for (let i = 1; i < 27; i++) {
        const img = new Image(604, 640)
        img.src = `${this.imageUrl}` + '/crop/c-' + ('0' + i).slice(-2) + '.png'
        this.images2.push(img)
      }
      // console.log(this.images)

      for (let i = 28; i > 0; i--) {
        const img = new Image(604, 640)
        img.src = `${this.imageUrl}` + '/crop/w-' + ('0' + i).slice(-2) + '.png'
        this.images3.push(img)
      }
    },
    renderCanvas(imgs, idx, callback, callbackParam1, callbackParam2) {
      if (idx >= 18) {
        cancelAnimationFrame(this.renderer)
        // callback(callbackParam1, callbackParam2)
        // setTimeout(() => {
        //   this.forceScrolled = false
        // }, 1000)
        return false
      }

      const velocity = Math.floor(idx * 0.4)
      this.ctx.clearRect(0, 0, 1280, 1280)
      this.ctx.drawImage(imgs[velocity], -160 - 360 + idx * 20, 0, 1280, 720)

      this.renderer = window.requestAnimationFrame(
        this.renderCanvas.bind(
          this,
          imgs,
          ++idx,
          callback,
          callbackParam1,
          callbackParam2
        )
      )
    },
    renderCanvasReverse(imgs, idx, callback, callbackParam1, callbackParam2) {
      // console.log(idx + 'reverse')
      if (idx < 0) {
        cancelAnimationFrame(this.renderer)
        // callback(callbackParam1, callbackParam2)
        // setTimeout(() => {
        //   this.forceScrolled = false
        // }, 1000)
        return false
      }

      this.ctx.clearRect(0, 0, 1280, 1280)
      this.ctx.drawImage(imgs[idx], 0, 0, 1280, 720)

      this.renderer = window.requestAnimationFrame(
        this.renderCanvasReverse.bind(
          this,
          imgs,
          --idx,
          callback,
          callbackParam1,
          callbackParam2
        )
      )
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/pre-reservation/style-m';
</style>
