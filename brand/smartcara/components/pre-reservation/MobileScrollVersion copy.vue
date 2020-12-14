<template>
  <div v-cloak class="container__m">
    <!-- <div class="debug"></div> -->
    <h1 class="logo">
      <a href="/" target="_self">
        <img :src="`${imageUrl}/logo-smartcara.png`" alt="logo" />
      </a>
    </h1>
    <header :class="{ fixed: currentScrollPosition > 70 }" class="header">
      <nav class="nav">
        <ul class="nav__items">
          <li
            :class="[
              currentScene === 'scene1' || currentScene === 'scene2' ? 'on' : ''
            ]"
            class="nav__item nav__item--1"
          >
            <a @click.prevent="goToScene('scene1', false)" href>Goodbye 쓰트레스</a>
          </li>
          <li :class="[currentScene === 'scene3' ? 'on' : '']" class="nav__item nav__item--2">
            <a @click.prevent="goToScene('scene3', false)" href>NEW 스마트카라</a>
          </li>
          <li :class="[currentScene === 'scene4' ? 'on' : '']" class="nav__item nav__item--3">
            <a @click.prevent="goToScene('scene4', false)" href>사전예약 이벤트</a>
            <!-- <div class="debug-console">
              {{ windowHeight }}
            </div>-->
          </li>
        </ul>
      </nav>
    </header>
    <div id="trigger--nav"></div>

    <div id="trigger--1"></div>
    <section class="scene scene--1">
      <div class="thin font--keyVisual">
        <span class="row--1 fade-in-bottom-1">
          <span>오</span>
          <span>늘</span>
          <span>도</span>
        </span>
        <span class="row--2 fade-in-bottom-2 bold">
          <span>쓰</span>
          <span>트</span>
          <span>레</span>
          <span>스</span>
        </span>
        <span class="row--3 fade-in-bottom-3">
          <span>받고</span>
          <span>있나요</span>
        </span>

        <div class="btnWrap">
          <button @click="goToScene('scene2')" class="btn--main fade-in" type="button">쓰트레스 알아보기</button>
        </div>
      </div>
      <div class="lineWrap">
        <span class="line gIodAN"></span>
      </div>
      <i class="icon-scroll">
        <img
          src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/images/m/icon--scroll.png"
          alt
        />
      </i>
    </section>

    <div id="trigger--2"></div>
    <div id="pinned" class="scene">
      <section class="scene scene--2">
        <!-- <div class="dimmed"></div> -->

        <div class="scene__slider">
          <div class="text-box">
            <p v-show="currnetSlideIdx === 0" class="thin">
              과일만 먹어도 윙윙~ 조금만 쌓아둬도 윙윙~
              <br />벌레 걱정 없이 과일 좀 실컷 먹어보자!
              <br />
              <b class="bold colored">
                여름철 불청객 초파리,
                <br />제발 좀 가라~
              </b>
            </p>

            <p v-show="currnetSlideIdx === 1" class="thin">
              냄새 폴폴~ 국물 뚝뚝~
              <br />아내도, 남편도 가장 하기 싫은 집안일 음식물 쓰레기 버리기
              <br />
              <b class="bold colored">
                퇴근 후 고된 몸 이끌고
                <br />음쓰장 가야 하는 설움이란...
              </b>
            </p>

            <p v-show="currnetSlideIdx === 2" class="thin">
              작고 소중한 우리 아기에겐 뭐든 좋은 것만 주고 싶은데
              <br />아무리 닦고 치워도 음식물 쓰레기는 늘 한가득
              <br />
              <b class="bold colored">
                음식물 쓰레기는
                <br />살균 안 되나요?
              </b>
            </p>

            <p v-show="currnetSlideIdx === 3" class="thin">
              둘이니까 행복도 두 배! 음식물 쓰레기도 두 배?
              <br />행복한 신혼의 미세한 균열, 음식물 쓰레기 논쟁!
              <br />
              <b class="bold colored">오늘도 눈치게임 시작?</b>
            </p>

            <p v-show="currnetSlideIdx === 4" class="thin">
              다 먹자니 배부르고, 남기자니 치우기 귀찮고
              <br />언제부터 냉동실이 음쓰장이 되었을까
              <br />
              <b class="bold colored">
                대신 음식물 처리해줄 사람
                <br />없나요?
              </b>
            </p>
          </div>
          <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
              <div :key="idx" v-for="(img, idx) in banners.imgs" class="swiper-slide">
                <!-- <p v-html="banners.txts[idx]" class="thin"></p> -->
                <img :src="`${imageUrl}` + img" />
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>

        <div class="scene__inner">
          <div class="text-wrap">
            <p class="text text1">누구나 한번쯤, 어쩌면 매일</p>
            <p class="text text2">당신의 소중한 시간을 방해하는</p>
            <p class="text text4 bold">
              <span class="text4--before text4--before2">스</span>
              <span class="text4--after text4--after1">쓰</span>
              <span class="text4--after text4--after2">트레스</span>
              <span class="text4--before text4--before1">
                음식물
                <span class="colored">쓰</span>레기
              </span>
            </p>
            <p class="text text5">NEW 스마트카라로 이젠 Good Bye 하세요</p>
            <p class="text text7 thin">당신의 소중한 일상을 함께 할</p>
            <p class="text text8 bold">
              NEW 스마트카라를
              <br />소개합니다
            </p>
          </div>
          <div class="dimmed"></div>
        </div>
      </section>

      <!-- scene--3 -->
      <div id="trigger--3"></div>
      <section class="scene scene--3">
        <div class="scene__inner scene__inner--1">
          <div class="text-wrap--1">
            <p class="text text9 thin">내 주방의 인테리어를 더 돋보이게 만드는</p>
            <p class="text text10 bold">프리미엄 디자인 & 컬러</p>
          </div>
          <div class="text-wrap--2">
            <div class="color-chip">
              <button
                @click="changeColor('s')"
                :class="[colorChip === 's' ? 'on' : '']"
                type="button"
                class="btnColor btnColor--gray"
              ></button>
              <button
                @click="changeColor('w')"
                :class="[colorChip === 'w' ? 'on' : '']"
                type="button"
                class="btnColor btnColor--white"
              ></button>
            </div>
            <p class="paragraph paragraph1 thin">
              어떤 각도에서도 빛을 내며 존재감을 드러내는 화사함
              <br />공간에 품격을 더하는 프리미엄한 디자인과 컬러
              <br />
            </p>
          </div>
          <div class="product__img">
            <img :src="`${imageUrl}/crop/${colorChip}-08.png`" alt />
          </div>
          <!-- ${this.imageUrl}` + '/crop/s-' + ('0' + i).slice(-2) + '.png' -->
          <!-- <canvas id="background-animation" width="640" height="640"></canvas> -->
        </div>

        <div class="scene__inner scene__inner--2">
          <div class="video-wrap">
            <video src="~assets/video/pcs500.mp4" playsinline autoplay muted loop></video>
          </div>
          <div class="text-wrap--2">
            <p class="text text11 thin">싱크대 설치, 역류, 전기료 걱정 없는</p>
            <p class="text text12 bold">SAVE & SAFE 가전</p>
            <p class="text paragraph paragraph3 thin">
              1회 전기료 약 200원 내외
              <br />딱 필요한 만큼만 작동하여 경제적
              <br />음식물 처리로 인한 탄소 배출량을 줄여 친환경적
              <br />
              <span class="note">※ 주택용 전력(저압) 누진세 적용 기준(201kW~400kW 사용 시)</span>
            </p>
          </div>
        </div>

        <div class="scene__inner scene__inner--3">
          <div class="text-wrap--3">
            <p class="text text13 thin">동일 가격으로 더 오래 사용할 수 있는</p>
            <p class="text text14 bold">3중 에코 필터</p>
            <p class="text paragraph paragraph4 thin">
              다년간 연구 개발한 3중 복합 필터
              <br />동일 가격으로 기존 에코필터 대비 수명은 150% 향상
              <br />손 쉽게 고정 해제하고 분리하는 탈착식 교체 방식
              <br />냄새 입자는 걸러주고 보관 시 발생할 수 있는 악취까지 제거
            </p>
          </div>
          <div class="video-wrap">
            <video src="~assets/video/pcs500.mp4" playsinline autoplay muted loop></video>
          </div>
        </div>
      </section>

      <div class="dimmed cover"></div>
    </div>

    <!-- scene--4 // 이서진 풀사이즈 -->
    <div id="trigger--4"></div>
    <section ref="eventArea" class="event-description event-description--1">
      <div class="section__inner">
        <img :src="`${imageUrl}/content-event-upper.jpg`" alt />

        <p class="a11y">
          NEW 스마트칼 특별 사전예약
          <b>500대 한정</b>
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
          <li>
            사전예약만 해도 100% 증정
            <em>10% 할인 쿠폰</em>
          </li>
          <li>
            사전예약 구매고객 전원 증정
            <em>1년치 에코필터</em>
          </li>
          <li>
            사전예약 구매고객 전원 증정
            <em>다용도 보관 스탠드</em>
          </li>
        </ol>
        <img :src="`${imageUrl}/content-event-lower.jpg`" alt />
        <div class="btnWrap">
          <button
            @click="
              openPop({
                popName: 'popup'
              })
            "
            class="btn--make-reservation"
            type="button"
          >지금 사전예약 하기</button>
        </div>
      </div>
    </section>

    <section class="event-not ice">
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
        <img :src="`${imageUrl}/content-notice.jpg`" alt />
      </div>
    </section>

    <footer class="footer">
      <div class="section__inner">
        <p class="a11y">
          인천광역시 연수구 송도과학로 16번길 13-30 (송도동 175-1) 2층
          (주)스마트카라 Tel : 1800 - 9113 Copyright 2020 Smartcara. All Rights
          reserved.
        </p>
        <img :src="`${imageUrl}/footer.png`" alt />
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
      // images: [],
      // images2: [],
      // images3: [],
      // canvas: null,
      ctx: null,
      renderer: null,
      myScroll: null,
      colorChip: 's',
      banners: {
        imgs: [
          '/slide-1.jpg',
          '/slide-2.jpg',
          '/slide-3.jpg',
          '/slide-4.jpg',
          '/slide-5.jpg'
        ],
        txts: [
          '과일만 먹어도 윙윙~ 조금만 쌓아둬도 윙윙~<br>벌레 걱정 없이 과일 좀 실컷 먹어보자!<br><b class="bold colored">여름철 불청객 초파리,<br> 제발 좀 가라~</b>',
          '냄새 폴폴~ 국물 뚝뚝~<br>아내도, 남편도 가장 하기 싫은 집안일 음식물 쓰레기 버리기<br><b class="bold colored">퇴근 후 고된 몸 이끌고 음쓰장 가야 하는 설움이란...</b>',
          '작고 소중한 우리 아기에겐 뭐든 좋은 것만 주고 싶은데<br>아무리 닦고 치워도 음식물 쓰레기는 늘 한가득<br><b class="bold colored">음식물 쓰레기는 살균 안 되나요?</b>',
          '둘이니까 행복도 두 배! 음식물 쓰레기도 두 배?<br>행복한 신혼의 미세한 균열, 음식물 쓰레기 논쟁!<br><b class="bold colored">오늘도 눈치게임 시작?</b>',
          '다 먹자니 배부르고, 남기자니 치우기 귀찮고<br>언제부터 냉동실이 음쓰장이 되었을까<br><b class="bold colored">대신 음식물 처리해줄 사람 없나요?</b>'
        ]
      },
      swiperOption: {
        width: 1010,
        slidesPerView: 2,
        loop: true,
        spaceBetween: 50,
        preventInteractionOnTransition: true,
        slidesOffsetBefore: -185,
        centeredSlides: true,
        slideToClickedSlide: true,
        // autoplay: {
        //   delay: 2000
        // },
        pagination: {
          el: '.swiper-pagination'
        }
      },
      slideCount: 0,
      currnetSlideIdx: 0
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
      $('.floating-banner').removeClass('hide')

      if (newVal === 'scene1') {
        return false
      } else if (newVal === 'scene2') {
      } else if (newVal === 'scene3') {
      } else {
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

        this.mySwiper.autoplay.stop()
        this.mySwiper.on('slideChange', (e) => {
          this.slideCount += 1
          console.log(this.mySwiper.realIndex)
          this.currnetSlideIdx = this.mySwiper.realIndex
        })

        this.windowHeight = vh

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
          // .setClassToggle('.header', 'fixed')
          .addTo(this.controller)

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
          .set('.scene--2 .scene__inner', { display: 'none' })
          .fromTo(
            '.scene--2',
            1,
            { opacity: 0, ease: 'elastic' },
            { opacity: 1 }
          )
          .addLabel('scene2start')
          .to('.scene--2 .scene__slider', 2, {
            delay: 5,
            display: 'none',
            opacity: 0,
            zIndex: 20,
            ease: Power1.easeOut,
            onStart: () => {}
          })

          // 누구나 한번쯤, 어쩌면 매일
          .to('.scene--2 .scene__inner', 0, { display: 'block' })
          .set('.text', { y: 500 })
          .fromTo(
            '.scene--2 .text1, .scene--2 .text2',
            1,
            {
              y: 50,
              opacity: 0,
              ease: Power1.easeOut
            },
            {
              y: 0,
              opacity: 1,
              ease: Power1.easeOut
            }
          )
          .set('.scene--2 .text4 .text4--before1', { opacity: 0, y: 0 })
          .set('.scene--2 .text4 .text4--before2', {
            opacity: 0
          })
          .set('.scene--2 .text4 .text4--after1', { x: 5 })

          // 쓰트레스
          .fromTo(
            '.scene--2 .text4',
            1,
            { x: 0 },
            { y: 25, opacity: 1, ease: Power1.easeOut }
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
          .to('.scene--2 .text4', 0.5, { y: 25, ease: Power1.easeOut })
          .fromTo(
            '.scene--2 .text5',
            2,
            {
              delay: 0.5,
              y: 170
            },
            {
              y: 120,
              opacity: 1,
              ease: Power1.easeOut
            }
          )
          .to('.text1, .text2, .text4, .text5', 1, {
            delay: 1,
            opacity: 0,
            ease: Power1.easeOut
          })
          .to('.scene--2 .dimmed', 1, { zIndex: 3 }, '-=0.5')
          .to(
            '.scene--2 .dimmed',
            0.5,
            {
              display: 'block',
              opacity: 1,
              backgroundColor: 'rgba(0, 0, 0, 1)',
              ease: Power1.easeOut
            },
            '-=2'
          )
          // 당신의 소중한
          .fromTo(
            '.text7',
            1,
            { y: -47 },
            {
              delay: 1,
              opacity: 1,
              y: -117,
              ease: Power1.easeOut
            }
          )
          .fromTo(
            '.text8',
            1,
            { y: -37 },
            { delay: 1, opacity: 1, y: -107, ease: Power1.easeOut },
            '-=2'
          )
          // scene 3 Start
          .addLabel('scene3start')
          .to('.text7, .text8', 1, {
            delay: 2,
            opacity: 0,
            ease: Power1.easeOut
          })

          .to('.scene--3', 1.5, { delay: 2, opacity: 1, zIndex: 3 })
          .to('.scene--2', 0.5, {
            display: 'none',
            opacity: 0,
            ease: Power1.easeOut
          })
          // 프리미엄 디자인 & 컬러
          .to('.scene__inner--1', 1, {
            zIndex: 'initial'
          })
          .fromTo(
            '.scene__inner--1 .product__img',
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
            '.scene__inner--1 .text9, .scene__inner--1 .text10',
            1,
            { y: -180 },
            {
              delay: 1.5,
              opacity: 1,
              y: -230,
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
            '.scene__inner--1 .text-wrap--2',
            1,
            { y: 330, opacity: 0 },
            {
              opacity: 1,
              y: 280,
              ease: Power1.easeOut
            },
            '-=1'
          )
          .to('.scene__inner--1', 1, {
            delay: 2,
            opacity: 0,
            ease: Power1.easeOut
          })

          // SAVE & SAFE 가전
          .fromTo(
            '.scene__inner--2',
            1,
            {
              opacity: 0,
              ease: Power1.easeOut
            },
            {
              zIndex: 'initial',
              delay: 1,
              opacity: 1,
              ease: Power1.easeOut
            }
          )
          .fromTo(
            '.scene__inner--2 .text11, .scene__inner--2 .text12',
            1,
            { opacity: 0, y: -160 },
            { delay: 1, opacity: 1, y: -210, ease: Power1.easeOut }
          )
          .fromTo(
            '.scene__inner--2 .paragraph3',
            1,
            {
              y: 310
            },
            { opacity: 1, y: 260, ease: Power1.easeOut },
            '-=1'
          )
          .to('.scene__inner--2', 1, {
            delay: 2,
            opacity: 0,
            ease: Power1.easeOut
          })

          // 3중 에코 필터
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
            '.scene__inner--3 .text13, .scene__inner--3 .text14',
            1,
            { opacity: 0, y: -160 },
            { delay: 1, opacity: 1, y: -210, ease: Power1.easeOut }
          )
          .fromTo(
            '.paragraph4',
            1,
            {
              y: 310
            },
            { opacity: 1, y: 260, ease: Power1.easeOut },
            '-=1'
          )
          .to('.scene__inner--3', 2, {
            delay: 2,
            // opacity: 0,
            ease: Power1.easeOut
          })
          .addLabel('scene4start')

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
    changeColor(color) {
      this.colorChip = color
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/pre-reservation/style-m';
</style>
