text1<template>
  <div v-cloak class="container__m">
    <!-- <div class="debug"></div> -->
    <h1 class="logo">
      <a href="https://www.smartcara.com/onlineShop/" target="_blank">
        <img :src="`${imageUrl}/logo-smartcara.png`" alt="logo" />
      </a>
    </h1>
    <header :class="{ fixed: currentScrollPosition > 70 }" class="header">
      <nav class="nav">
        <ul class="nav__items">
          <li
            v-for="(nav, idx) in navList"
            :key="idx"
            :class="[
              { on: currentScene === nav.name },
              `nav__item--${idx + 1}`
            ]"
            class="nav__item"
          >
            <a @click.prevent="goToScene(nav.name)" href>{{ nav.title }}</a>
          </li>
        </ul>
      </nav>
    </header>
    <div id="visual" ref="visual">
      <section class="scene scene--1">
        <div class="thin font--keyVisual">
          <span class="row--1 fade-in-bottom-1">
            <span>오</span>
            <span>늘</span>
            <span>도</span>
          </span>
          <span class="row--2 fade-in-bottom-1 bold">
            <span>쓰</span>
            <span>트</span>
            <span>레</span>
            <span>스</span>
          </span>
          <span class="row--3 fade-in-bottom-1">
            <span>받고</span>
            <span>있나요</span>
          </span>

          <div class="btnWrap">
            <button
              @click="goToScene('situation')"
              class="btn--main fade-in"
              type="button"
            >
              쓰트레스 알아보기
            </button>
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

      <section id="situation" class="scene scene--2">
        <div class="bg"></div>
        <div class="scene__slider">
          <div class="text-box">
            <p v-html="banners.txts[currentSlideIdx]" class="thin"></p>
          </div>
          <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
              <div
                :key="idx"
                v-for="(img, idx) in banners.imgs"
                class="swiper-slide"
              >
                <!-- <p v-html="banners.txts[idx]" class="thin"></p> -->
                <img :src="`${imageUrl}` + img" />
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>

        <div ref="textWrap" class="text-wrap">
          <p class="text text1">누구나 한 번쯤, 어쩌면 매일</p>
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
        </div>
      </section>
    </div>

    <section id="feature" ref="feature" class="scene scene--3">
      <div class="tit">
        <p class="text text7 thin">당신의 소중한 일상을 함께 할</p>
        <p class="text text8 bold">
          NEW 스마트카라를
          <br />소개합니다
        </p>
      </div>
      <div class="lineWrap">
        <span class="line gIodAN"></span>
      </div>
      <div class="feature feature--1">
        <p class="text text9 thin color--grey">
          내 주방의 인테리어를 더 돋보이게 만드는
        </p>
        <p class="text text10 bold">프리미엄 디자인 & 컬러</p>
        <div class="product__img">
          <img :src="`${imageUrl}/crop/${colorChip}-24.png`" alt />
        </div>
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
        <p class="paragraph thin">
          <img
            :src="`${imageUrl}/p0.png?v3`"
            alt="어떤 각도에서도 빛을 내며 존재감을 드러내는 화사함 공간에 품격을 더하는 프리미엄한 디자인과 컬러"
          />
          <!--  어떤 각도에서도 빛을 내며 존재감을 드러내는 화사함
          <br />공간에 품격을 더하는 프리미엄한 디자인과 컬러
          <br />-->
          <!-- <span class="color--grey">정가 : 895,000원</span> -->
        </p>
        <!-- ${this.imageUrl}` + '/crop/s-' + ('0' + i).slice(-2) + '.png' -->
        <!-- <canvas id="background-animation" width="640" height="640"></canvas> -->
      </div>

      <div class="feature feature--2">
        <p class="text text11 thin color--grey">
          스마트카라만의 기술이 돋보이는
        </p>
        <p class="text text12 bold">감량 & 보관 기능</p>
        <video
          src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/video/Smartcara_3D_01.mp4"
          playsinline
          autoplay
          muted
          loop
        ></video>
        <p class="paragraph thin">
          <img
            :src="`${imageUrl}/p1.png?v3`"
            alt="음식물 쓰레기를 완전 건조하여
          물기 없는 가루 형태로 최대 90% 감량 소량의 음식물은 적정선까지 모았다가 한 번에 처리 스마트카라의 기술력으로 악취, 세균, 초파리 없이 부패 방지"
          />
          <!-- 음식물 쓰레기를 완전 건조하여
          <br />물기 없는 가루 형태로 최대 90% 감량 <br />소량의 음식물은
          적정선까지 모았다가 한 번에 처리 <br />스마트카라의 기술력으로 악취,
          세균, 초파리 없이 부패 방지-->
        </p>
      </div>

      <div class="feature feature--3">
        <p class="text text11 thin color--grey">
          싱크대 설치, 역류, 전기료 걱정 없는
        </p>
        <p class="text text12 bold">SAVE & SAFE 가전</p>
        <video
          src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/video/Smartcara_3D_02.mp4"
          playsinline
          autoplay
          muted
          loop
        ></video>
        <p class="paragraph thin">
          <img
            :src="`${imageUrl}/p2.png?v3`"
            alt="1회 전기료 약 200원 내외 딱 필요한 만큼만 작동하여 경제적 음식물 처리로 인한 탄소 배출량을 줄여 친환경적 ※ 주택용 전력(저압) 누진세 적용 기준(201kW~400kW 사용 시)"
          />
          <!-- 1회 전기료 약 200원 내외
          <br />딱 필요한 만큼만 작동하여 경제적 <br />음식물 처리로 인한 탄소
          배출량을 줄여 친환경적
          <br />
          <span class="note color--grey"
            >※ 주택용 전력(저압) 누진세 적용 기준(201kW~400kW 사용 시)</span
          >-->
        </p>
      </div>

      <div class="feature feature--4">
        <p class="text text13 thin color--grey">
          가격 부담은 줄이고 더 오래 쓸 수 있는
        </p>
        <p class="text text14 bold">3중 에코 필터</p>
        <video
          src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/video/Smartcara_3D_03.mp4"
          playsinline
          autoplay
          muted
          loop
        ></video>
        <p class="paragraph thin">
          <img
            :src="`${imageUrl}/p3.png?v3`"
            alt="다년간 연구 개발한 3중 복합 필터
          기존 필터와 동일 가격으로 수명은 150% 향상 손 쉽게 고정 해제하고 분리하는 탈착식 교체 방식 냄새 입자는 걸러주고 보관 시 발생할 수 있는 악취까지 제거"
          />
          <!-- 다년간 연구 개발한 3중 복합 필터
          <br />기존 필터와 동일 가격으로 수명은 150% 향상 <br />손 쉽게 고정
          해제하고 분리하는 탈착식 교체 방식 <br />냄새 입자는 걸러주고 보관 시
          발생할 수 있는 악취까지 제거-->
        </p>
      </div>
    </section>

    <div id="event" ref="eventWrap">
      <section ref="eventArea" class="event-description">
        <img :src="`${imageUrl}/content-event-upper.jpg?v3`" alt />

        <p class="a11y">
          NEW 스마트카라 400 트리플 혜택 사전예약
          <em>사전예약 신청기간 2020.5.18 ~ 5.31</em>
          오직 사전예약 구매자에 한하여 한정 특별 혜택 100% 제공!
        </p>
        <p class="a11y">
          사전예약 구매고개 전원에게
          <b>15만원 상당의 혜택 100% 증정</b>
        </p>
        <dl class="a11y">
          <dt>소비자가</dt>
          <dd>859,000원</dd>
        </dl>
        <ol class="a11y">
          <li>
            신제품 구매 시 즉시 할인 가능한
            <em>5% 할인 쿠폰</em>
          </li>
          <li>
            1년 동안 안심하고 사용 가능한
            <em>에코필터 4세트</em>
          </li>
          <li>
            사전예약 후 신제품을 구매하신 모두에게
            <em>신세계 상품권 3만원</em>
          </li>
        </ol>
        <img :src="`${imageUrl}/content-event-lower-v2.jpg?v3`" alt />
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
      </section>

      <section class="event-notice">
        <img :src="`${imageUrl}/content-notice-v3.jpg`" alt />
        <div class="a11y">
          <strong>유의사항을 반드시 확인하세요.</strong>
          <p>
            사전예약 신청 안내 본 사전예약 구매 신청은 2020년 5월 18일 오픈
            시점부터 2020년 5월 31일까지 진행됩니다. 개인 정보 입력 시, 이름과
            연락처가 같을 경우 중복 참여로 간주합니다. 구매 링크 및 경품 발송
            시, 개인 정보 오기입으로 인한 불이익은 당사에서 책임지지 않습니다.
            신제품 구매 링크는 제품 런칭 이후(2020년 6월 1일 예정) MMS로 일괄
            발송 예정이며, 잘못 기재하신 휴대폰번호로 링크가 발송될 경우
            재발송되지 않습니다. 본 이벤트 페이지 내의 제품 및 사은품 이미지는
            실제 디자인과 다를 수 있습니다. 본 이벤트는 당사 사정에 의해 사전
            고지 없이 내용 및 기간 변경, 혹은 취소될 수 있습니다.
          </p>
          <p>
            신제품 구매 안내 사전예약 신청 후 구매 기간과 혜택이 문자로
            발송됩니다. 제품은 6월 1일부터 결제 순으로 배송될 예정입니다. 할인
            쿠폰과 사은품은 스마트카라 공식몰에서 스마트카라 400 구매 건에
            한하여 적용됩니다. (타 쇼핑몰, 전화 주문, 렌탈, 장기 할부, 소모품
            구매 고객 제외) 제품의 색상은 제품 구매 시 선택하실 수 있습니다.
          </p>
          <p>
            혜택 및 경품 관련 안내 사전예약 후 신제품을 구매하시면 5% 할인쿠폰과
            에코필터 4세트, 신세계 상품권(3만원)을 증정합니다. - 5% 할인 쿠폰:
            6월 1일 문자로 전용 쿠폰 코드를 보내드립니다. - 에코필터 4세트 :
            제품 배송 후 2주 이내에 발송될 예정입니다. - 신세계 상품권(3만원) :
            제품 구매 후 2주 내에 입력하신 휴대폰 번호로 발송 예정입니다.
          </p>
        </div>
      </section>
    </div>
    <footer class="footer">
      <div class="section__inner">
        <p class="a11y">
          경상남도 양산시 어곡공단로 52(어곡동) 2층 스마트카라 Tel : 1800 - 9113
          Copyright 2020 Smartcara. All Rights reserved.
        </p>
        <img :src="`${imageUrl}/footer.png?v3`" alt />
      </div>
    </footer>

    <aside v-show="currentScene !== 'event'">
      <div class="floating-banner">
        <button
          @click="goToScene('event')"
          type="button"
          class="floating-banner__btn"
        >
          지금 예약하기
        </button>
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
      title: 'NEW 스마트카라 사전예약',
      meta: [
        {
          property: 'og:title',
          content: 'NEW 스마트카라 사전예약',
          vmid: 'og:title'
        },
        {
          property: 'og:type',
          content: 'website',
          vmid: 'og:type'
        },
        {
          property: 'og:url',
          content: `${process.env.BASE_URL ||
            'https://www.event-smartcara.com'}`,
          vmid: 'og:url'
        },
        {
          property: 'og:description',
          content: '신제품 스마트카라 PCS-400 사전예약 구매자 100% 혜택 증정',
          vmid: 'og:description'
        },
        {
          property: 'og:image',
          content:
            'https://event-smartcara.s3.amazonaws.com/static/pre-reservation/images/share.jpg',
          vmid: 'og:image'
        }
      ],
      script: [
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenMax.min.js',
          mode: 'client'
        }
      ]
    }
  },
  props: { imageUrl: { type: String, default: null } },
  data() {
    return {
      navList: [
        { name: 'visual', title: 'Goodbye 쓰트레스', area: null },
        { name: 'feature', title: 'NEW 스마트카라', area: null },
        { name: 'event', title: '사전예약 이벤트', area: null }
      ],
      colorChip: 's',
      banners: {
        imgs: [
          '/slide-6.jpg', // 역류
          '/slide-1.jpg', // 초파리
          '/slide-4.jpg', // 신혼
          '/slide-5.jpg', // 남은음식
          '/slide-3.jpg', // 아기
          '/slide-2.jpg' // 음쓰장
        ],
        txts: [
          '음식물 쓰레기 때문에 꽉 막힌 싱크대,<br />갑자기 역류라도 하게 되면 완.전.최.악!<br /><b class="bold colored">싱크대 막힘, 역류 걱정 없는 <br /> 음식물처리기 없나요?</b>', // 역류
          '과일만 먹어도 윙윙~ 조금만 쌓아둬도 윙윙~<br>벌레 걱정 없이 과일 좀 실컷 먹어보자!<br><b class="bold colored">여름철 불청객 초파리,<br> 제발 좀 가라~</b>', // 초파리
          '둘이니까 행복도 두 배! 음식물 쓰레기도 두 배?<br>행복한 신혼의 미세한 균열, 음식물 쓰레기 논쟁!<br><b class="bold colored">오늘도 눈치게임 시작?</b>', // 신혼
          '다 먹자니 배부르고, 남기자니 치우기 귀찮고<br>언제부터 냉동실이 음쓰장이 되었을까<br><b class="bold colored">대신 음식물 처리해 줄 사람<br>없나요?</b>', // 남은음식
          '작고 소중한 우리 아기에겐 뭐든 좋은 것만 주고 싶은데<br>아무리 닦고 치워도 음식물 쓰레기는 늘 한가득<br><b class="bold colored">음식물 쓰레기는<br>살균 안 되나요?</b>', // 아기
          '냄새 폴폴~ 국물 뚝뚝~<br>아내도, 남편도 가장 하기 싫은 집안일 음식물 쓰레기 버리기<br><b class="bold colored">퇴근 후 고된 몸 이끌고<br>음쓰장 가야 하는 설움이란...</b>' // 음쓰장
        ]
      },
      windowHeight: null,
      currentScrollPosition: 0,
      currentScene: null,
      animationScene2: null,
      swiperOption: {
        width: 1010,
        slidesPerView: 2,
        loop: true,
        spaceBetween: 50,
        preventInteractionOnTransition: true,
        slidesOffsetBefore: -185,
        centeredSlides: true,
        slideToClickedSlide: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      slideCount: 0,
      currentSlideIdx: 0
    }
  },
  computed: {
    popupOffset() {
      return this.$refs.eventArea.offsetTop
    },
    textWrapOffsetTop() {
      return this.$refs.textWrap.offsetTop
    },
    featureOffsetTop() {
      return this.$refs.feature.offsetTop
    },
    ...mapState({
      isLoading: (state) => state.popup.isLoading
    })
  },

  mounted() {
    if (process.browser) {
      window.onNuxtReady((app) => {
        document
          .querySelector('.fade-in')
          .addEventListener('animationend', () => {
            $('.btn--main').addClass('on')
          })

        // Then we set the value in the --vh custom property to the root of the document
        const vh = Math.floor(
          (window.screen.height * 640) / window.screen.width - 40
        )
        document.documentElement.style.setProperty('--vh', `${vh}px`)
        this.windowHeight = vh

        this.mySwiper.autoplay.stop()
        this.mySwiper.on('slideChange', (e) => {
          this.slideCount += 1
          // console.log(this.mySwiper.realIndex)
          this.currentSlideIdx = this.mySwiper.realIndex
        })

        window.addEventListener('scroll', (e) => {
          this.scrollEvent()
        })

        this.setSectionArea()
        this.currentScene = this.getCurrentScene()
        this.setLoading(false)
        this.checkHash(location.hash)

        /* global Power1 */
        this.animationScene2 = new TimelineMax()
          // 누구나 한번쯤, 어쩌면 매일
          .set('.scene--2 .text', { y: 500 })
          .fromTo(
            '.scene--2 .text1, .scene--2 .text2',
            0.5,
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
            0.5,
            { x: 0 },
            { y: 25, opacity: 1, ease: Power1.easeOut }
          )
          .to('.scene--2 .text4 .text4--after2', 0.5, {
            delay: 0.5,
            y: 75,
            ease: Power1.easeOut
          })
          .to('.scene--2 .text4 .text4--after1', 0.5, {
            delay: 0.5,
            x: this.$device.isIos ? 130 : 127,
            ease: Power1.easeOut
          })
          .fromTo(
            '.scene--2 .text4 .text4--before2',
            2,
            { x: 65, y: 75, opacity: 0 },
            { opacity: 1, ease: Power1.easeOut },
            '-=.2'
          )
          .to(
            '.scene--2 .text4 .text4--after1',
            0.2,
            {
              opacity: 0
            },
            '-=1'
          )
          .fromTo(
            '.scene--2 .text4 .text4--before1',
            2,
            { opacity: 0 },
            { opacity: 1, ease: Power1.easeOut },
            '-=2.2'
          )
          .to('.scene--2 .text4', 0.4, { y: 25, ease: Power1.easeOut })
          .fromTo(
            '.scene--2 .text5',
            0.3,
            {
              delay: 0.1,
              y: 170
            },
            {
              y: 120,
              opacity: 1,
              ease: Power1.easeOut
            }
          )

        this.animationScene2.pause()
      })
    }
  },
  methods: {
    ...mapActions('popup', ['openPop', 'setLoading']),
    setSectionArea() {
      // section 높이값 get
      this.navList.map((section) => {
        return (section.area = Math.ceil(
          $('#' + section.name).offset().top + $('#' + section.name).height()
        ))
      })
    },
    getCurrentScene() {
      for (const section in this.navList) {
        if (this.currentScrollPosition < this.navList[section].area) {
          return this.navList[section].name
        }
      }
    },
    scrollEvent() {
      this.currentScrollPosition = Math.ceil($(window).scrollTop())
      this.currentScene = this.getCurrentScene()
      // console.log(this.currentScene)
      // console.log(this.navList)

      if (
        this.currentScrollPosition > this.textWrapOffsetTop &&
        this.currentScrollPosition <= this.featureOffsetTop
      ) {
        this.animationScene2.timeScale(1.5).play()
      }
    },
    checkHash(hash) {
      let scene
      switch (hash) {
        case '#01':
          scene = 'visual'
          break
        case '#02':
          scene = 'feature'
          break
        case '#03':
          scene = 'event'
          break
      }
      if (hash) this.goToScene(scene)
    },
    goToScene(scene, boolean) {
      const offsetTop = scene === 'visual' ? 0 : $(`#${scene}`).offset().top
      $(window).scrollTop(Math.ceil(offsetTop) + 1)
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
