<template>
  <div v-cloak class="container__pc">
    <!-- <div id="debugLine"></div> -->
    <!-- <div id="debugBtn">
      <button @click="goToScene('b1')" type="button">goNext1</button>
      <button @click="goToScene('scene3')" type="button">goNext1</button>
      <button @click="goToScene('b2')" type="button">goNext2</button>
      <button @click="goToScene('b3')" type="button">goNext3</button>
      <button @click="goToScene('b4')" type="button">goNext4</button>
    </div>-->
    <!-- 네비게이션 -->
    <header class="header">
      <div class="header__inner">
        <h1 class="logo">
          <a href="/" target="_self">
            <img :src="`${imageUrl}/logo-smartcara.png`" alt="logo" />
          </a>
        </h1>
        <nav class="nav">
          <ul class="nav__items">
            <li
              :class="[
                currentScene === 'scene1' || currentScene === 'scene2'
                  ? 'on'
                  : ''
              ]"
              class="nav__item nav__item--1"
            >
              <a @click.prevent="goToScene('scene1', false)" href
                >Goodbye 쓰트레스</a
              >
            </li>
            <li
              :class="[currentScene === 'scene3' ? 'on' : '']"
              class="nav__item nav__item--2"
            >
              <a @click.prevent="goToScene('scene3', false)" href
                >NEW 스마트카라</a
              >
            </li>
            <li
              :class="[currentScene === 'scene4' ? 'on' : '']"
              class="nav__item nav__item--3"
            >
              <a @click.prevent="goToScene('scene4', false)" href
                >사전예약 이벤트</a
              >
            </li>
            <li class="nav__item--4">
              <a href="https://www.smartcara.com/onlineShop/" target="_blank"
                >온라인샵 바로가기</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- keyVisual -->
    <div id="trigger--1"></div>
    <section class="scene scene--1">
      <div class="scene__inner scene__inner--column">
        <p class="thin font--keyVisual">
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
        </p>

        <div class="btnWrap">
          <button
            @click="goToScene('scene2')"
            class="btn--main fade-in"
            type="button"
          >
            쓰트레스 알아보기
          </button>

          <!-- <svg
            id="svg-deco"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="409"
            height="83"
            viewBox="0 0 409 83"
          >
            <path
              fill-rule="evenodd"
              stroke="rgb(255, 255, 255)"
              stroke-width="2px"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              fill="none"
              d="M41.000,1.000 L367.000,1.000 C389.091,1.000 407.000,18.909 407.000,41.000 C407.000,63.091 389.091,81.000 367.000,81.000 L41.000,81.000 C18.909,81.000 1.000,63.091 1.000,41.000 C1.000,18.909 18.909,1.000 41.000,1.000 Z"
            />
          </svg>-->
        </div>
        <div class="lineWrap">
          <span class="line gIodAN"></span>
        </div>
        <i class="icon-scroll">
          <img
            src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/images/m/icon-scroll.png"
            alt
          />
        </i>
      </div>
      <div class="scene__dimmed"></div>
    </section>

    <!-- scene--2 -->
    <div id="trigger--2"></div>
    <div id="pinned" class="scene">
      <section class="scene scene--2">
        <div class="scene scene--2-1"></div>
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
                <img :src="`${imageUrl}` + img" draggable="false" />
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <div @click="goToScene('sceneText')" class="icon-scroll floating on">
            <img
              src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/images/pc/arrow-down.png"
              alt
            />
          </div>
          <div class="slider-nav-wrap">
            <button type="button" class="slider-nav--prev slider-nav"></button>
            <button type="button" class="slider-nav--next slider-nav"></button>
          </div>
        </div>
        <!-- <img :src="`${imageUrl}/object--building.png`" class="scene__bg" alt /> -->
        <div class="scene__inner">
          <div class="text-wrap">
            <p class="text text1 absolute">누구나 한 번쯤, 어쩌면 매일</p>
            <p class="text text2 absolute">당신의 소중한 시간을 방해하는</p>
            <!-- <p class="text text3">당신의 소중한 시간을 방해하는</p> -->
            <p class="text text4 bold absolute">
              <span class="text4--before text4--before1">
                음식물
                <span class="colored">쓰</span>레기
              </span>
              <span class="text4--before text4--before2">스</span>
              <span class="text4--after">쓰</span>
              <span class="text4--after2">트레스</span>
            </p>
            <p class="text text5 absolute">NEW 스마트카라로 Good-Bye 하세요</p>
            <!-- <p class="text text6"></p> -->
            <p class="text text7 thin absolute">당신의 소중한 일상을 함께 할</p>
            <p class="text text8 bold absolute">NEW 스마트카라를 소개합니다</p>
          </div>

          <!-- <div class="dimmed"></div> -->
          <div
            v-if="currentScrollPosition >= sceneTextOffset"
            @click="goToNext('sceneNext')"
            class="btn-scroll-down floating"
          >
            <img
              src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/images/pc/arrow-down.png"
              alt
            />
          </div>
          <!--  <div @click="goToNext('sceneText')" class="btn-scroll-down floating">
            <img
              src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/images/pc/arrow-down.png"
              alt
            />
          </div>-->
        </div>
        <div class="dimmed"></div>
      </section>

      <!-- scene--3 -->
      <div id="trigger--3"></div>
      <section class="scene scene--3">
        <div class="scene__inner scene__inner--1">
          <div class="text-wrap--0 text-wrap--1">
            <p class="text text9 thin">
              내 주방의 인테리어를 더 돋보이게 만드는
            </p>
            <p class="text text10 bold">프리미엄 디자인 & 컬러</p>
            <p class="text paragraph paragraph1 thin">
              어떤 각도에서도 빛을 내며 존재감을 드러내는 화사함
              <br />주방에 모던함을 더해주며 은은하게 느껴지는 고급스러움
              <br />공간에 품격을 더하는 프리미엄한 디자인과 컬러
            </p>
            <!-- <p class="text thin price">정가 : 859,000원</p> -->
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
          </div>
          <!-- <canvas id="background-animation" width="640" height="640"></canvas> -->
          <div v-show="colorChip === 's'" class="background-animation">
            <div
              :data-folder="`${imageUrl}` + '/crop/'"
              data-filename="s-{index}.png"
              class="sliver cloudimage-360 background-animation--1"
              data-amount="28"
              data-stop-at-edges="true"
            ></div>
          </div>
          <div v-show="colorChip === 'w'" class="background-animation">
            <div
              :data-folder="`${imageUrl}` + '/crop/'"
              data-filename="w-{index}.png"
              class="white cloudimage-360 background-animation--2"
              data-amount="28"
              data-stop-at-edges="true"
            ></div>
          </div>
          <div @click="goToNext('sceneNext')" class="btn-scroll-down floating">
            <img
              src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/images/pc/arrow-down.png"
              alt
            />
          </div>

          <!-- <div
            class="debug-div"
            style="position:fixed;top:0;left:0;width:500px;height:500px;"
          >
            <img src="~assets/images/s-01.png" alt="" style="width: 100%" />
          </div>-->
        </div>

        <div class="scene__inner scene__inner--2">
          <div class="video-wrap">
            <video
              src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/video/Smartcara_3D_01.mp4"
              playsinline
              autoplay
              muted
              loop
            ></video>
          </div>
          <div class="text-wrap--0 text-wrap--2">
            <p class="text text11 thin">스마트카라만의 기술이 돋보이는</p>
            <p class="text text12 bold">감량 & 보관 기능</p>
            <p class="text paragraph paragraph2 thin">
              음식물 쓰레기를 완전 건조하여
              <br />물기 없는 가루 형태로 최대 90% 감량 <br />소량의 음식물은
              적정선까지 모았다가 한 번에 처리 <br />스마트카라의 기술력으로
              악취, 세균, 초파리 없이 부패 방지
            </p>
          </div>
          <div @click="goToNext('sceneText')" class="btn-scroll-down floating">
            <img
              src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/images/pc/arrow-down.png"
              alt
            />
          </div>
        </div>

        <div class="scene__inner scene__inner--3">
          <div class="text-wrap--0 text-wrap--3">
            <p class="text text13 thin">싱크대 설치, 역류, 전기료 걱정 없는</p>
            <p class="text text14 bold">SAVE & SAFE 가전</p>
            <p class="text paragraph paragraph3 thin">
              1회 전기료 약 200원 내외
              <br />딱 필요한 만큼만 작동하여 경제적 <br />음식물 처리로 인한
              탄소 배출량을 줄여 친환경적
              <br />
              <br />
              <span class="footnote"
                >※ 주택용 전력(저압) 누진세 적용 기준(201kW~400kW 사용 시)</span
              >
            </p>
          </div>
          <div class="video-wrap">
            <video
              src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/video/Smartcara_3D_02.mp4"
              playsinline
              autoplay
              muted
              loop
            ></video>
          </div>
          <!-- <button @click="goToScene('scene4')" type="button" class="scrolldown">
            Down
          </button>-->
          <div @click="goToNext('sceneText')" class="btn-scroll-down floating">
            <img
              src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/images/pc/arrow-down.png"
              alt
            />
          </div>
        </div>

        <div class="scene__inner scene__inner--4">
          <div class="video-wrap">
            <video
              src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/video/Smartcara_3D_03.mp4"
              playsinline
              autoplay
              muted
              loop
            ></video>
          </div>
          <div class="text-wrap--0 text-wrap--4">
            <p class="text text15 thin">
              가격 부담은 줄이고 더 오래 쓸 수 있는
            </p>
            <p class="text text16 bold">3중 에코 필터</p>
            <p class="text paragraph paragraph4 thin">
              다년간 연구 개발한 3중 복합 필터<br />
              기존 필터와 동일 가격으로 수명은 150% 향상<br />
              손 쉽게 고정 해제하고 분리하는 탈착식 교체 방식<br />
              냄새 입자는 걸러주고 보관 시 발생할 수 있는 악취까지 제거
            </p>
          </div>
          <!-- <button @click="goToScene('scene4')" type="button" class="scrolldown">
            Down
          </button>-->
          <div @click="goToNext('sceneText')" class="btn-scroll-down floating">
            <img
              src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/images/pc/arrow-down.png"
              alt
            />
          </div>
        </div>

        <div class="scene__inner scene__inner--5">
          <div class="gallery-wrap">
            <div class="gallery-title">
              <p class="text17 thin">
                일상의 작은 변화, 깔끔한 주방 라이프를 만날 기회
              </p>
              <p class="text18 bold">
                NEW 스마트카라를 지금 바로 만나보세요!
              </p>
            </div>
            <div class="gallery">
              <!-- <div
                v-for="idx in 4"
                @click="selectGallery(idx)"
                :key="idx"
                class="gallery__item"
              >
                <img :class="['gallery__thumb', `gallery__thumb${idx}`]" />
              </div> -->
              <div class="gallery__column">
                <div class="gallery__column--upper">
                  <img
                    :class="['gallery__thumb', 'gallery__thumb1']"
                    :src="`${imageUrl}/thumb-1.jpg`"
                    @click="selectGallery(1)"
                    alt=""
                  />
                </div>
                <div class="gallery__column--lower">
                  <div class="gallery__column--1">
                    <img
                      :class="['gallery__thumb', 'gallery__thumb2']"
                      :src="`${imageUrl}/thumb-2.jpg`"
                      @click="selectGallery(2)"
                      alt=""
                    />
                  </div>
                  <div class="gallery__column--1">
                    <img
                      :class="['gallery__thumb', 'gallery__thumb3']"
                      :src="`${imageUrl}/thumb-3.jpg`"
                      @click="selectGallery(3)"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="gallery__column">
                <img
                  :class="['gallery__thumb', 'gallery__thumb4']"
                  :src="`${imageUrl}/thumb-4.jpg`"
                  @click="selectGallery(4)"
                  alt=""
                />
              </div>
              <div class="gallery__column">
                <div class="gallery__column--upper">
                  <img
                    :class="['gallery__thumb', 'gallery__thumb5']"
                    :src="`${imageUrl}/thumb-5.jpg`"
                    @click="selectGallery(5)"
                    alt=""
                  />
                </div>
                <div class="gallery__column--lower">
                  <img
                    :class="['gallery__thumb', 'gallery__thumb6']"
                    :src="`${imageUrl}/thumb-6.jpg`"
                    @click="selectGallery(6)"
                    alt=""
                  />
                </div>
              </div>

              <div
                v-show="galleryIdx !== null"
                @click="selectGallery(null)"
                class="gallery-main"
              >
                <div class="gallery__image">
                  <img
                    v-for="idx in 6"
                    v-show="galleryIdx === idx"
                    :src="`${imageUrl}/gallery-${idx}.jpg`"
                    :key="idx"
                    alt=""
                  />

                  <!--  <button
                    @click="selectGallery(null)"
                    type="button"
                    class="gallery-btn"
                  >
                    close
                  </button> -->
                </div>
              </div>

              <div
                v-if="galleryIdx !== null"
                @click="selectGallery(null)"
                class="gallery-dimmed"
              ></div>
            </div>
          </div>
          <div @click="goToNext('sceneText')" class="btn-scroll-down floating">
            <img
              src="https://event-smartcara.s3.amazonaws.com/static/pre-reservation/images/pc/arrow-down.png"
              alt
            />
          </div>
        </div>

        <div class="dimmed cover"></div>
      </section>

      <!-- <div id="indicator" class="indicator">
        <div class="indicator__bullet"></div>
      </div>-->
    </div>

    <!-- scene--4 // 이서진 풀사이즈-->
    <div id="trigger--4"></div>
    <section ref="eventArea" class="event-description event-description--1">
      <!-- <p>스마트카라 특별 사전예약</p> -->
      <div class="section__inner">
        <p class="a11y">
          NEW 스마트카라 400 트리플 혜택 사전예약
          <em>사전예약 신청기간 2020.5.18 ~ 5.31</em>
          오직 사전예약 구매자에 한하여 한정 특별 혜택 100% 제공!
        </p>
        <!-- <img :src="`${imageUrl}/content-event-upper.png`" alt="" /> -->
      </div>
    </section>

    <!-- scene--5 // 이벤트 영역 -->
    <div id="trigger--5"></div>
    <!-- <div class="toggle"> -->
    <section ref="eventDesc" class="event-description event-description--2">
      <!-- <p>스마트카라 특별 사전예약</p> -->
      <div class="section__inner">
        <p class="a11y">
          사전예약 구매고개 전원에게 <b>15만원 상당의 혜택 100% 증정</b>
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

        <!-- <img :src="`${imageUrl}/content-event-lower.png`" alt /> -->
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
      </div>
    </section>

    <section class="event-notice">
      <div class="section__inner">
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
        <img :src="`${imageUrl}/content-notice-v3.jpg`" alt />
      </div>
    </section>

    <footer class="footer">
      <div class="section__inner">
        <p class="a11y">
          경상남도 양산시 어곡공단로 52(어곡동) 2층 스마트카라 Tel : 1800 - 9113
          Copyright 2020 Smartcara. All Rights reserved.
        </p>
        <img :src="`${imageUrl}/footer.png?v3`" alt />
      </div>
    </footer>
    <!-- </div> -->

    <aside>
      <div class="floating-banner">
        <button
          @click="goToScene('scene4', false)"
          type="button"
          class="floating-banner__btn"
        >
          지금 예약하기
        </button>
      </div>
    </aside>
    <div class="dimmed sceneChanged"></div>
    <div class="dimmed cover"></div>
    <div
      id="blockScroll"
      @click="tests"
      class="blockScroll"
      tabindex="-1"
    ></div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

/* function wheel(event) {
  let delta = 0
  if (event.wheelDelta) delta = event.wheelDelta / 40
  // controls the scroll wheel range/speed
  else if (event.detail) delta = -event.detail / 40

  handle(delta)
  // if (event.preventDefault) event.preventDefault()
  // event.returnValue = false
}

let goUp = true
let end = null
let interval = null

function handle(delta) {
  const animationInterval = 20 // controls the scroll animation after scroll is done
  const scrollSpeed = 20 // controls the scroll animation after scroll is done

  if (end == null) {
    end = $(window).scrollTop()
  }
  end -= 20 * delta
  goUp = delta > 0

  if (interval == null) {
    interval = setInterval(function() {
      const scrollTop = $(window).scrollTop()
      const step = Math.round((end - scrollTop) / scrollSpeed)
      if (
        scrollTop <= 0 ||
        scrollTop >= $(window).prop('scrollHeight') - $(window).height() ||
        (goUp && step > -1) ||
        (!goUp && step < 1)
      ) {
        clearInterval(interval)
        interval = null
        end = null
      }
      $(window).scrollTop(scrollTop + step)
    }, animationInterval)
  }
} */

// import Scrollbar from 'smooth-scrollbar'

export default {
  name: 'Pc',

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
          src: '/js/controlScroll.js',
          mode: 'client'
        },
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenMax.min.js',
          mode: 'client'
        },
        /* {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/vivus/0.4.5/vivus.js',
          mode: 'client'
        }, */
        {
          src: '/js/js-cloudimage-360.min.js',
          mode: 'client'
        },
        {
          src: '/js/scrollMagic.js',
          mode: 'client'
        },
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.js',
          mode: 'client'
        }
        /* {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.js',
          mode: 'client'
        } */
      ]
    }
  },
  props: { imageUrl: { type: String, default: null } },
  data() {
    return {
      isInit: false,
      blockSceneEvent: false,
      scrollDirection: null, // 스크롤 방향
      controller: null,
      scene1: null,
      scene2: null,
      scene3: null, // 3d 백그라운드 scene
      scene4: null,
      scene5: null,
      scene6: null,
      indicator: null,
      isScrolling: false, // scroll 진행 중 이벤트 막기
      animationScene1: null,
      animationScene2: null, // scene2, 3 타임라인
      windowHeight: null,
      currentScrollPosition: null, // 현재 스크롤 위치
      currentScene: 'scene1',
      // scene2, 3 Control value
      totalDuration: '', // scene2, 3 스크롤 양
      scene2flag: '',
      scene3flag: '',
      sceneTotalScroll: '',
      scene4Offset: null,
      sceneTextFlag: null,
      breakPoint1flag: null,
      breakPoint2flag: null,
      breakPoint3flag: null,
      breakPoint4flag: null,
      breakPoint5flag: null,
      breakPoint6flag: null,
      /* canvas drawing */
      images: [],
      images2: [], // 컬러 변경
      images3: [],
      canvas: null,
      ctx: null,
      renderer: null,
      forceScrolled: false,
      isSafari: null,
      colorChip: 's',
      banners: {
        imgs: [
          '/slide-0.jpg', // 역류
          '/slide-1.jpg', // 초파리
          '/slide-4.jpg', // 신혼생활
          '/slide-5.jpg', // 남은음식
          '/slide-3.jpg', // 아기
          '/slide-2.jpg' // 음쓰장
        ],
        txts: [
          '음식물 쓰레기 때문에 꽉 막힌 싱크대,<br />갑자기 역류라도 하게 되면 완.전.최.악!<br /><b class="bold colored">싱크대 막힘, 역류 걱정 없는 음식물처리기 없나요?</b>', // 역류
          '과일만 먹어도 윙윙~ 조금만 쌓아둬도 윙윙~<br />벌레 걱정 없이 과일 좀 실컷 먹어보자!<br /><b class="bold colored">여름철 불청객 초파리, 제발 좀 가라~</b>', // 초파리
          '둘이니까 행복도 두 배! 음식물 쓰레기도 두 배?<br />행복한 신혼의 미세한 균열, 음식물 쓰레기 논쟁!<br /><b class="bold colored">오늘도 눈치게임 시작?</b>', // 신혼생활
          '다 먹자니 배부르고, 남기자니 치우기 귀찮고<br />언제부터 냉동실이 음쓰장이 되었을까<br /><b class="bold colored">대신 음식물 처리해 줄 사람 없나요?</b>', // 남은음식
          '작고 소중한 우리 아기에겐 뭐든 좋은 것만 주고 싶은데 <br />아무리 닦고 치워도 음식물 쓰레기는 늘 한가득 <br /><b class="bold colored">음식물 쓰레기는 살균 안 되나요?</b>', // 아기
          '냄새 폴폴~ 국물 뚝뚝~<br />아내도, 남편도 가장 하기 싫은 집안일 음식물 쓰레기 버리기<br /><b class="bold colored"  >퇴근 후 고된 몸 이끌고 음쓰장 가야 하는 설움이란...</b>' // 음쓰장
        ]
      },
      swiperOption: {
        width: 1500,
        slidesPerView: 4,
        loop: true,
        spaceBetween: 20,
        loopAdditionalSlides: 5,
        allowTouchMove: false,
        preventInteractionOnTransition: true,
        centeredSlides: true,
        // slideToClickedSlide: true,
        initialSlide: 0,
        centeredSlidesBounds: true,
        // autoplay: {
        //   delay: 1200
        // },
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.slider-nav--next',
          prevEl: '.slider-nav--prev'
        }
      },
      slideCount: 0,
      currentSlideIdx: 0,
      galleryIdx: null
    }
  },
  computed: {
    breakPoint1Offset() {
      return Math.ceil(
        this.calcFloat(
          (this.breakPoint1flag / this.totalDuration) * this.sceneTotalScroll
        ) + this.windowHeight
      )
    },
    breakPoint2Offset() {
      return Math.ceil(
        this.calcFloat(
          (this.breakPoint2flag / this.totalDuration) * this.sceneTotalScroll
        ) + this.windowHeight
      )
    },
    breakPoint3Offset() {
      return Math.ceil(
        this.calcFloat(
          (this.breakPoint3flag / this.totalDuration) * this.sceneTotalScroll
        ) + this.windowHeight
      )
    },
    breakPoint4Offset() {
      return Math.ceil(
        this.calcFloat(
          (this.breakPoint4flag / this.totalDuration) * this.sceneTotalScroll
        ) + this.windowHeight
      )
    },
    breakPoint5Offset() {
      return Math.ceil(
        this.calcFloat(
          (this.breakPoint5flag / this.totalDuration) * this.sceneTotalScroll
        ) + this.windowHeight
      )
    },
    breakPoint6Offset() {
      return Math.ceil(
        this.calcFloat(
          (this.breakPoint6flag / this.totalDuration) * this.sceneTotalScroll
        ) + this.windowHeight
      )
    },
    sceneTextOffset() {
      return Math.ceil(
        this.calcFloat(
          (this.sceneTextFlag / this.totalDuration) * this.sceneTotalScroll
        ) + this.windowHeight
      )
    },
    /* 팝업 띄울 위치 */
    scene5Offset() {
      return this.$refs.eventDesc.offsetTop
    },
    /* 스크롤 양 */
    scrollOffsetAmount() {
      return this.windowHeight
    },
    scene2Offset() {
      return Math.floor(this.scrollOffsetAmount + this.pixelByOneSecond)
    },
    scene3Offset() {
      return Math.floor(
        this.calcFloat(
          (this.scene3flag / this.totalDuration) * this.sceneTotalScroll
        ) + this.windowHeight
      )
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
    sceneTotalScroll() {
      if (this.isInit === false && this.sceneTotalScroll) {
        this.checkHash(location.hash)
        this.isInit = true
      }
    },
    /* scroll position 으로 current scene 계산 */
    currentScrollPosition(newVal, oldVal) {
      // console.log(newVal + 'newval')

      if (newVal < this.scene2Offset - this.pixelByOneSecond) {
        this.currentScene = 'scene1'
      } else if (
        newVal >= this.scene2Offset - this.pixelByOneSecond &&
        newVal < this.scene3Offset
      ) {
        this.currentScene = 'scene2'
      } else if (newVal >= this.scene3Offset && newVal < this.scene4Offset) {
        this.currentScene = 'scene3'
      } else {
        this.currentScene = 'scene4'
      }
    },
    /* current scene 변경 시 실행될 로직 */
    currentScene(newVal, oldVal) {
      // const $nav = $('.nav__item')
      const $floating = $('.floating-banner')

      // $nav.removeClass('on')

      if ($floating.hasClass('hide')) {
        $floating.removeClass('hide')
      }

      if (newVal === 'scene1') {
        return false
      } else if (newVal === 'scene2') {
        // $nav.eq(0).addClass('on')
      } else if (newVal === 'scene3') {
        // $nav.eq(1).addClass('on')
      } else {
        // $nav.eq(2).addClass('on')
        $floating.addClass('hide')
      }
    }
  },
  created() {},
  mounted() {
    if (process.browser) {
      window.onNuxtReady((app) => {
        /* $(window).bind('mousewheel DOMMouseScroll', function(event) {
          event.preventDefault()
          return false
        }) */
        // this.mySwiper.autoplay.stop()
        this.mySwiper.on('slideChange', (e) => {
          // this.slideCount += 1
          // console.log(this.mySwiper.realIndex)
          this.currentSlideIdx = this.mySwiper.realIndex
        })

        /*  $('.background-animation').mouseleave(function() {
          // console.log('out')
          window.CI360.destroy()
          setTimeout(() => {
            window.CI360.init()
          }, 500)
        }) */
        $('.blockScroll').on('wheel', (e) => {
          e.preventDefault()
          // console.log('이거중')
          // this.goToScene('scene4')
          return false
        })

        document
          .querySelector('.fade-in')
          .addEventListener('animationend', () => {
            $('.btn--main').addClass('on')
            setTimeout(() => {
              $('.btn--main').removeClass('on')
            }, 1000)
          })
        // console.log(this)

        window.CI360.init()

        /* setTimeout(() => {
          
            
        }, 5000) */

        // new Vivus('svg-deco', { duration: 200 })

        /* if (window.addEventListener)
          window.addEventListener('DOMMouseScroll', wheel, false)
        window.onmousewheel = document.onmousewheel = wheel */
        this.isSafari = navigator.vendor === 'Apple Computer, Inc.'
        // this.initCanvasImages()
        this.windowHeight = window.innerHeight
        /* this.canvas = document.getElementById('background-animation')
        this.ctx = this.canvas.getContext('2d') */

        /* this.images[0].onload = () => {
          this.ctx.drawImage(this.images[0], 50, 0)
        } */
        // document.getElementById('scrollableElement');
        /* 마우스 휠 이벤트 발생 시 양 증가 */
        /* const scrollableElement = document.body
        scrollableElement.addEventListener('wheel', this.checkScrollDirection) */

        window.addEventListener('scroll', (e) => {
          // console.log(e)
          this.currentScrollPosition = window.pageYOffset
        })

        window.addEventListener('resize', (e) => {
          this.windowHeight = window.innerHeight
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
            this.isScrolling = true
            $('html, body')
              .stop()
              .animate({ scrollTop: newPos }, 600, () => {})
            setTimeout(() => {
              this.isScrolling = false
            }, 600)
          }
        })

        // SteppedEase
        /* global Power1 Circ disableScroll enableScroll */
        /* 메인 화면 고정 스크롤 씬 */
        this.animationScene1 = new TimelineMax()
          .set('.scene--1 .scene__dimmed', { display: 'none', opacity: 0 })
          .to('.scene--1 .scene__dimmed', 1.5, {
            display: 'block',
            opacity: 1,
            onStart: () => {
              if (this.blockSceneEvent === true) {
                return false
              }
              // this.goToScene('scene2')
            }
          })
          .fromTo('.scene--1 .scene__inner', 1, { opacity: 1 }, { opacity: 0 })
          .fromTo(
            '.scene--1',
            1.5,
            {
              display: 'block',
              opacity: 1,
              ease: Power1.easeOut
            },
            { display: 'none', opacity: 0 }
          )

        // define movement of panels
        /* Goodbye 쓰트레스 씬 */
        this.animationScene2 = new TimelineMax()
          .fromTo(
            '.scene--2',
            0.5,
            { opacity: 0, ease: Power1.easeOut },
            {
              opacity: 1,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                this.forceScroll(this.pixelByOneSecond, 1)
              }
            },
            0
          )
          // .to('.indicator', 1, { opacity: 1 }, 0)
          /* .fromTo(
            '.scene__bg',
            0.5,
            { opacity: 0, ease: Circ.easeIn },
            {
              opacity: 1,
              onReverseComplete: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                // this.goToScene('scene1')
              }
            },
            0
          ) */
          // 건물 옆 카드 나타나는 장면
          /* .fromTo(
            '.card.card--1',
            0.6,
            {
              opacity: 0,
              y: 100,
              x: 35
            },
            {
              opacity: 1,
              y: 0,
                ease: Circ.easeIn,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                this.forceScroll(this.pixelByOneSecond, 0.6)
              }
            },
            1
          )
          .fromTo(
            '.card.card--2',
            0.6,
            { opacity: 0, y: 140, x: -20 },
            { opacity: 1, y: 40,   ease: Circ.easeIn },
            1
          )
          .fromTo(
            '.card.card--3',
            0.6,
            { opacity: 0, y: 150 },
            { opacity: 1, y: 50,   ease: Circ.easeIn },
            1
          )
          .fromTo(
            '.card.card--4',
            0.6,
            { opacity: 0, y: 55 },
            { opacity: 1, y: -45,   ease: Circ.easeIn },
            1
          ) */
          /* .to('.card__line', 0.5, { opacity: 0,   ease: Circ.easeIn }, 2) */
          // 카드만 남고 설명 텍스트, 라인 사라짐
          .to(
            '.scene--2 .dimmed',
            0.5,
            {
              zIndex: 1,
              display: 'block',
              opacity: 1,
              onComplete: () => {
                // this.mySwiper.autoplay.start()
              }
            },
            0
          )
          .addLabel('scene2start')
          // 카드 확대
          /* .to(
            '.card.card--1',
            1.5,
            {
              x: 0,
              scale: 1.2,
              opacity: 1,
                ease: Circ.easeIn,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                this.forceScroll(this.pixelByOneSecond, 1.5)
              }
            },
            3
          )
          .to(
            '.card.card--2',
            1.5,
            { x: 0, scale: 1.2, opacity: 1,   ease: Circ.easeIn },
            3
          )
          .to(
            '.card.card--3',
            1.5,
            { x: -50, scale: 1.2, opacity: 1,   ease: Circ.easeIn },
            3
          )
          .to(
            '.card.card--4',
            1.5,
            { x: 50, y: 20, scale: 1.2, opacity: 1,   ease: Circ.easeIn },
            3
          ) */
          .set('.absolute', { y: 160 }, 1)
          .set('.scene--2 .text4', { x: -270 })
          .set('.scene--2 .text4 .text4--before1', {
            opacity: 0,
            x: 325,
            onComplete: null
          })
          .set('.scene--2 .text4 .text4--before2', {
            opacity: 0
          })
          // .set('.scene--2 .text4 .text4--after', { x: -38 })
          .set('.scene--2 .text4 .text4--after2', { x: -17 })
          /* .to('.card .card__sub', 1, {
            delay: 0.5,
            opacity: 0,
              ease: Circ.easeIn
          }) */
          .to('.scene--2 .scene__slider', 0.6, {
            delay: 0.2,
            opacity: 0,
            zIndex: 20,
            ease: Circ.easeIn,
            onStart: () => {
              if (this.blockSceneEvent === true) {
                return false
              }
              this.forceScroll(this.pixelByOneSecond, 1.2)
            },
            onComplete: () => {
              // this.mySwiper.autoplay.stop()
            }
          })
          .set('.scene--2 .text1, .scene--2 .text2', {
            y: 45
          })
          .set('.scene--2 .text4', {
            x: -270,
            y: 80
          })

          .fromTo(
            '.scene--2-1',
            0.6,
            { opacity: 0, ease: Circ.easeIn },
            {
              opacity: 1,
              ease: Circ.easeIn
            }
          )
          .addLabel('sceneTextstart')
          .to('.scene--2 .text1', 1, {
            opacity: 1,
            ease: Circ.easeIn,
            onStart: () => {
              if (this.blockSceneEvent === true) {
                return false
              }
              this.forceScroll(this.pixelByOneSecond, 1)
            }
          })
          .to(
            '.scene--2 .text2',
            1,
            {
              opacity: 1,
              ease: Circ.easeIn
            },
            '-=1'
          )
          /* .to('.scene--2 .text3', 1, {
            y: 110,
            opacity: 1,
              ease: Circ.easeIn
          }) */
          /* .to(
            '.scene--2 .text1, .scene--2 .text2, .scene--2 .text3',
            1,
            // { y: 50, fontSize: 35,   ease: Circ.easeIn },
            {
              y: 10,
              scale: 0.8,
                ease: Circ.easeIn,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                this.forceScroll(this.pixelByOneSecond, 1)
              }
            }
          ) */

          // 음식물 쓰레기 스트레스 올라오기 시작
          .to(
            '.scene--2 .text4',
            1,
            {
              opacity: 1,
              ease: Circ.easeIn,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                // this.forceScroll(this.pixelByOneSecond, 1)
              }
            },
            '-=1'
          )
          .to(
            // 트레스
            '.scene--2 .text4 .text4--after2',
            0.3,
            {
              delay: 0.5,
              x: 222,
              ease: Circ.easeIn,
              onStart: () => {
                if (
                  this.blockSceneEvent === true ||
                  this.isScrolling === true
                ) {
                  return false
                }
                this.forceScroll(this.pixelByOneSecond, 2.8)
              }
            }
          )
          .fromTo(
            // 음식물 쓰레기
            '.scene--2 .text4 .text4--before1',
            1,
            { opacity: 0, ease: Circ.easeIn },
            {
              delay: 0.5,
              opacity: 1,
              ease: Circ.easeIn
            }
          )
          .fromTo(
            // 스
            '.scene--2 .text4 .text4--before2',
            1,
            { x: 328, opacity: 0, ease: Circ.easeIn },
            { opacity: 1, ease: Circ.easeIn },
            '-=1'
          )

          /* .to('.scene--2 .text1, .scene--2 .text2, .scene--2 .text3', 0.5, {
            y: -50,
            opacity: 0,
              ease: Circ.easeIn
          }) */
          // .to('.card', 1, { opacity: 0.4 })
          // .to('.scene--2 .dimmed', 1, { zIndex: 3 }, '-=0.5')

          .to('.scene--2 .text5', 0.6, {
            y: 120,
            opacity: 1,
            ease: Circ.easeIn,
            onStart: () => {
              if (this.blockSceneEvent === true) {
                return false
              }
              // this.forceScroll(this.pixelByOneSecond, 0.6)
            }
          })
          .addLabel('breakPoint1')

          /* .to(
            '.scene--2 .text6',
            0.6,
            {
              y: 92,
              opacity: 1,
                ease: Circ.easeIn,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                // this.forceScroll(this.pixelByOneSecond, 0.6)
              }
            },
            '-=0.6'
          ) */
          .to('.scene--2 .dimmed', 0.6, {
            delay: 0.2,
            backgroundColor: 'rgba(0, 0, 0, 1)',
            ease: Circ.easeIn,
            onStart: () => {
              if (this.blockSceneEvent === true || this.isScrolling === true) {
                return false
              }
              this.forceScroll(this.pixelByOneSecond, 1.4)
            }
          })
          .set('.text7', { y: -120 })
          .set('.text8', { y: -100 })
          .to('.text4, .text5, .text1, .text2', 0.6, {
            delay: 0.2,
            opacity: 0,
            ease: Circ.easeIn
          })
          .fromTo(
            '.text7',
            1,
            {
              // 당신의 소중한

              opacity: 0,
              // y: -60,
              ease: Circ.easeIn
            },
            {
              delay: 0.1,
              opacity: 1,
              // y: -120,
              ease: Circ.easeIn,
              onStart: () => {
                if (
                  this.blockSceneEvent === true ||
                  this.isScrolling === true
                ) {
                  return false
                }
                this.forceScroll(this.pixelByOneSecond, 1)
              }
            }
          )
          .fromTo(
            '.text8',
            1,
            {
              // 당신의 소중한
              opacity: 0,
              // y: -40,
              ease: Circ.easeIn
            },
            {
              opacity: 1,
              // y: -100,
              ease: Circ.easeIn
            },
            '-=1'
          )
          .addLabel('scene3start')
          .to('.text7, .text8', 0.5, {
            delay: 0.5,
            opacity: 0,
            ease: Circ.easeIn,
            onStart: () => {
              if (this.blockSceneEvent === true || this.isScrolling === true) {
                return false
              }
              // this.renderCanvas(this.images, 0)
              this.forceScroll(this.pixelByOneSecond, 1.6)
            }
          })
          .to('.scene--3', 0.5, { opacity: 1, zIndex: 30 })
          .to('.scene--2 .dimmed', 0.1, {
            opacity: 0,
            ease: Circ.easeIn
          })
          .fromTo(
            // 내 주방의 인테리어 (캔버스 시작)
            '.text9',
            1,
            {
              //  y: 500,
              y: 205,
              ease: Circ.easeIn
            },
            {
              opacity: 1,
              y: 205,
              ease: Circ.easeIn,
              onStart: () => {
                if (
                  this.blockSceneEvent === true ||
                  this.isScrolling === true
                ) {
                  return false
                }
                // this.renderCanvas(this.images, 0)
                // this.forceScroll(this.pixelByOneSecond, 1)
              },
              onReverseComplete: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                // this.renderCanvasReverse(this.images, this.images.length - 1)
              }
            },
            '-=0.6'
          )
          .fromTo(
            '.text10',
            1,
            {
              // y: 500,
              y: 205,
              ease: Circ.easeIn
            },
            {
              opacity: 1,
              y: 205,
              ease: Circ.easeIn,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                // this.renderCanvas(this.images2, 0)
                // this.forceScroll(this.pixelByOneSecond, 1)
              },
              onReverseComplete: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                // this.renderCanvasReverse(this.images2, this.images2.length - 1)
              }
            },
            '-=1'
          )
          .fromTo(
            '.color-chip',
            1,
            { y: 0, opacity: 0, ease: Circ.easeIn },
            { y: 0, opacity: 1, ease: Circ.easeIn },
            '-=1'
          )
          // .fromTo(
          //   '.price',
          //   1,
          //   { y: 570 },
          //   {
          //     opacity: 1,
          //     y: 260,
          //     ease: Circ.easeIn
          //   },
          //   '-=1'
          // )
          .fromTo(
            '.paragraph1',
            1,
            { y: 240, ease: Circ.easeIn },
            {
              opacity: 1,
              y: 240,
              ease: Circ.easeIn,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                // this.renderCanvas(this.images3, 0)
                // this.forceScroll(this.pixelByOneSecond, 1)
              },
              onReverseComplete: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                // this.renderCanvasReverse(this.images3, this.images3.length - 1)
              }
            },
            '-=1'
          )
          .addLabel('breakPoint2')
          .to('.scene--3 .scene__inner--1', 0.5, {
            delay: 0.4,
            opacity: 0,
            ease: Circ.easeIn,
            onStart: () => {
              if (this.blockSceneEvent === true || this.isScrolling === true) {
                return false
              }
              // this.renderCanvas(this.images3, 0)
              this.forceScroll(this.pixelByOneSecond, 0.5)
            }
          })
          .to('.scene--3 .scene__inner--1', 0.1, {
            zIndex: 0,
            ease: Circ.easeIn
          })

          .fromTo(
            '.scene--3 .scene__inner--2',
            1,
            {
              opacity: 0
            },
            {
              opacity: 1,
              ease: Circ.easeIn,
              onStart: () => {
                if (
                  this.blockSceneEvent === true ||
                  this.isScrolling === true
                ) {
                  return false
                }
                this.forceScroll(this.pixelByOneSecond, 1)
              }
            }
          )
          .fromTo(
            '.text11',
            1,
            { opacity: 0, y: 205, ease: Circ.easeIn },
            {
              opacity: 1,
              y: 205,
              ease: Circ.easeIn,
              onStart: () => {
                if (
                  this.blockSceneEvent === true ||
                  this.isScrolling === true
                ) {
                  return false
                }
                // this.forceScroll(this.pixelByOneSecond, 1)
              }
            },
            '-=1'
          )
          .fromTo(
            '.text12',
            1,
            { opacity: 0, y: 205, ease: Circ.easeIn },
            {
              opacity: 1,
              y: 205,
              ease: Circ.easeIn,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                // this.forceScroll(this.pixelByOneSecond, 1)
              }
            },
            '-=1'
          )
          .fromTo(
            '.paragraph2',
            1,
            { y: 245, ease: Circ.easeIn },
            {
              opacity: 1,
              y: 245,
              ease: Circ.easeIn,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                // this.forceScroll(this.pixelByOneSecond, 1)
              }
            },
            '-=1'
          )
          .addLabel('breakPoint3')
          .to('.scene--3 .scene__inner--2', 0.5, {
            delay: 0.2,
            opacity: 0,
            ease: Circ.easeIn
          })
          .fromTo(
            '.scene--3 .scene__inner--3',
            1,
            {
              opacity: 0,
              ease: Circ.easeIn
            },
            {
              opacity: 1,
              ease: Circ.easeIn,
              onStart: () => {
                if (
                  this.blockSceneEvent === true ||
                  this.isScrolling === true
                ) {
                  return false
                }
                this.forceScroll(this.pixelByOneSecond, 1)
              }
            }
          )
          .fromTo(
            '.text13',
            1,
            { opacity: 0, y: 205, ease: Circ.easeIn },
            {
              opacity: 1,
              y: 205,
              ease: Circ.easeIn,
              onStart: () => {
                if (
                  this.blockSceneEvent === true ||
                  this.isScrolling === true
                ) {
                  return false
                }
                // this.forceScroll(this.pixelByOneSecond, 1)
              }
            },
            '-=1'
          )
          .fromTo(
            '.text14',
            1,
            { opacity: 0, y: 205, ease: Circ.easeIn },
            {
              opacity: 1,
              y: 205,
              ease: Circ.easeIn,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                // this.forceScroll(this.pixelByOneSecond, 1)
              }
            },
            '-=1'
          )
          .fromTo(
            '.paragraph3',
            1,
            { y: 245, ease: Circ.easeIn },
            {
              opacity: 1,
              y: 245,
              ease: Circ.easeIn,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                // this.forceScroll(this.pixelByOneSecond, 1)
              }
            },
            '-=1'
          )
          .addLabel('breakPoint4')
          .to('.scene--3 .scene__inner--3', 0.5, {
            delay: 0.2,
            opacity: 0,
            ease: Circ.easeIn
          })
          .fromTo(
            '.scene--3 .scene__inner--4',
            1,
            {
              opacity: 0
            },
            {
              opacity: 1,
              ease: Circ.easeIn,
              onStart: () => {
                if (
                  this.blockSceneEvent === true ||
                  this.isScrolling === true
                ) {
                  return false
                }
                this.forceScroll(this.pixelByOneSecond, 1)
              }
            }
          )
          .fromTo(
            '.text15',
            1,
            { opacity: 0, y: 205 },
            {
              opacity: 1,
              y: 205,
              ease: Circ.easeIn,
              onStart: () => {
                if (
                  this.blockSceneEvent === true ||
                  this.isScrolling === true
                ) {
                  return false
                }
                // this.forceScroll(this.pixelByOneSecond, 1)
              }
            },
            '-=1'
          )
          .fromTo(
            '.text16',
            1,
            { opacity: 0, y: 205 },
            {
              opacity: 1,
              y: 205,
              ease: Circ.easeIn,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                // this.forceScroll(this.pixelByOneSecond, 1)
              }
            },
            '-=1'
          )
          .fromTo(
            '.paragraph4',
            1,
            { y: 245 },
            {
              opacity: 1,
              y: 245,
              ease: Circ.easeIn,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                // this.forceScroll(this.pixelByOneSecond, 1)
              }
              // onComplete: () => {
              //   if (
              //     this.blockSceneEvent === true ||
              //     this.isScrolling === true
              //   ) {
              //     return false
              //   }
              //   disableScroll()
              //   setTimeout(() => {
              //     enableScroll()
              //   }, 1000)
              // }
            },
            '-=1'
          )
          .addLabel('breakPoint5')
          .to('.scene--3 .scene__inner--4', 0.5, {
            delay: 0.2,
            opacity: 0,
            ease: Circ.easeIn
          })
          .fromTo(
            '.scene--3 .scene__inner--5',
            1,
            {
              opacity: 0,
              ease: Circ.easeIn
            },
            {
              zIndex: 50,
              opacity: 1,
              ease: Circ.easeIn,
              onStart: () => {
                if (
                  this.blockSceneEvent === true ||
                  this.isScrolling === true
                ) {
                  return false
                }
                this.forceScroll(this.pixelByOneSecond, 1)
              }
            }
          )
          .fromTo(
            '.text17',
            1,
            { opacity: 0, y: 0 },
            {
              opacity: 1,
              y: 0,
              ease: Circ.easeIn,
              onStart: () => {
                if (
                  this.blockSceneEvent === true ||
                  this.isScrolling === true
                ) {
                  return false
                }
                // this.forceScroll(this.pixelByOneSecond, 1)
              }
            },
            '-=1'
          )
          .fromTo(
            '.text18',
            1,
            { opacity: 0, y: 0 },
            {
              opacity: 1,
              y: 0,
              ease: Circ.easeIn,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                // this.forceScroll(this.pixelByOneSecond, 1)
              }
            },
            '-=1'
          )
          .fromTo(
            '.gallery-wrap',
            1,
            { opacity: 0, y: 0 },
            {
              opacity: 1,
              y: 0,
              ease: Circ.easeIn,
              onStart: () => {
                if (this.blockSceneEvent === true) {
                  return false
                }
                // this.forceScroll(this.pixelByOneSecond, 1)
              }
            },
            '-=1'
          )
          /* .to('.scene--3 .scene__inner--1-1', 0.5, {
            delay: 0.2,
            opacity: 0,
            ease: Circ.easeIn
          }) */
          .addLabel('breakPoint6')
          .to('.scene--3 .dimmed', 1, {
            delay: 0.1,
            opacity: 0,
            ease: Circ.easeIn,
            onStart: () => {
              if (this.blockSceneEvent === true || this.isScrolling === true) {
                return false
              }
              disableScroll()
              setTimeout(() => {
                enableScroll()
              }, 1000)
              // this.forceScroll(this.pixelByOneSecond, 1)
            }

            // display: 'block'
            // onStart: () => {
            //   console.log('dsfsdfs')
            //   //   if (this.blockSceneEvent === true) {
            //   //     return false
            //   //   }
            //   //   $('.blockScroll').addClass('on')
            //   //   document
            //   //     .getElementById('blockScroll')
            //   //     .focus({ preventScroll: false })
            //   //   // this.goToScene('scene4')
            //   //   setTimeout(() => {
            //   //     $('.blockScroll').removeClass('on')
            //   //   }, 2000)
            // }
          })

        this.scene1 = new ScrollMagic.Scene({
          triggerElement: '#trigger--1',
          triggerHook: 'onLeave',
          duration: '100%'
        })
          .setPin('.scene--1', { pushFollowers: false })
          .setTween(this.animationScene1)
          // .addIndicators({ name: '1' }) // add indicators (requires plugin)
          .addTo(this.controller)
          .on('update progress', (e) => {})

        this.scene2 = new ScrollMagic.Scene({
          triggerElement: '#trigger--2',
          triggerHook: 'onLeave',
          duration: '2200%'
        })
          .setPin('#pinned')
          .setTween(this.animationScene2)
          // .addIndicators({ name: '2' }) // add indicators (requires plugin)
          .addTo(this.controller)
          .on('start update progress', (e) => {
            if (
              e.type === 'progress' &&
              e.target.controller().info('scrollDirection') === 'FORWARD'
            ) {
              let progress = e.progress
              progress = progress.toFixed(2)
              if (parseInt(progress) > 0.95) {
                this.goToScene('scene4')
              }
            }

            if (e.type === 'update') {
              if (this.isLoading === true) {
                this.setLoading(false)
              }

              // this.scene2.update(true)
              this.sceneTotalScroll = e.endPos - e.startPos
              this.scene4Offset = e.endPos + this.scrollOffsetAmount
              this.totalDuration = this.animationScene2
                .totalDuration()
                .toFixed(1)
              this.scene2flag = this.animationScene2.getLabelTime('scene2start')
              this.scene3flag = this.animationScene2.getLabelTime('scene3start')
              this.sceneTextFlag = this.animationScene2.getLabelTime(
                'sceneTextstart'
              )
              this.breakPoint1flag = this.animationScene2.getLabelTime(
                'breakPoint1'
              )

              this.breakPoint2flag = this.animationScene2.getLabelTime(
                'breakPoint2'
              )

              this.breakPoint3flag = this.animationScene2.getLabelTime(
                'breakPoint3'
              )

              this.breakPoint4flag = this.animationScene2.getLabelTime(
                'breakPoint4'
              )

              this.breakPoint5flag = this.animationScene2.getLabelTime(
                'breakPoint5'
              )

              this.breakPoint6flag = this.animationScene2.getLabelTime(
                'breakPoint6'
              )
            }

            if (
              e.type === 'start' &&
              e.target.controller().info('scrollDirection') === 'REVERSE'
            ) {
              window.scrollTo(0, 0)
            }

            if (this.isScrolling === true) {
              return false
            }

            /* 스크롤 이벤트 발생 시 양 증가 */
            /* if (e.target.controller().info('scrollDirection') === 'FORWARD') {
              console.log('test scroll forward')
              if (this.isScrolling === true) {
                return false
              }
              this.isScrolling = true
              $('html, body')
                .stop()
                .animate(
                  { scrollTop: window.pageYOffset + this.scrollOffsetAmount },
                  600,
                  () => {
                    setTimeout(() => {
                      this.isScrolling = false
                    }, 500)
                  }
                )
            } else {
              console.log('test scroll backward')
              if (this.isScrolling === true) {
                return false
              }
              this.isScrolling = true
              $('html, body')
                .stop()
                .animate(
                  { scrollTop: window.pageYOffset - this.scrollOffsetAmount },
                  600,
                  () => {
                    setTimeout(() => {
                      this.isScrolling = false
                    }, 500)
                  }
                )
            } */
          })

        /* 화면 인디케이터 */
        /* this.indicator = new ScrollMagic.Scene({
          triggerElement: '#trigger--2',
          triggerHook: 'onLeave',
          duration: '2500%'
        })
          .setTween(TweenMax.to('.indicator__bullet', 1, { top: '80%' }))
          // .addIndicators() // add indicators (requires plugin)
          .addTo(this.controller) */

        /* 이벤트 페이지 모델(lsj) 이미지 */
        this.scene6 = new ScrollMagic.Scene({
          triggerElement: '#trigger--4',
          triggerHook: 'onEnter',
          duration: '100%'
        })
          .setPin('#pinned', { pushFollowers: false })
          .on('start', (e) => {
            if (e.scrollDirection === 'FORWARD') {
              disableScroll()
              setTimeout(() => {
                enableScroll()
              }, 2000)
              // $('.blockScroll').addClass('on')
              // // document
              // //   .getElementById('blockScroll')
              // //   .focus({ preventScroll: false })
              // // this.goToScene('scene4')
              // setTimeout(() => {
              //   $('.blockScroll').removeClass('on')
              // }, 2000)
            }
          })
          .addTo(this.controller)

        /* 이벤트 사전예약하기 페이지 */
        /* this.scene7 = new ScrollMagic.Scene({
          triggerElement: '#trigger--4',
          triggerHook: 'onLeave',
          duration: '100%'
        })
          .setPin('.event-description--1', { pushFollowers: false })
          .on('progress start', (e) => {
            if (
              e.type === 'progress' &&
              e.progress > 0.2 &&
              e.scrollDirection === 'FORWARD'
            ) {
              // this.goToScene('scene5')
            }
            // if (e.type === 'start') {
            //   console.log(e)
            // }
          })
          .addTo(this.controller) */
      })
    }
  },
  methods: {
    tests() {
      console.log('클릭 됨')
    },
    ...mapActions('popup', ['openPop', 'setLoading']),
    calcFloat(num) {
      return Math.round((num + Number.EPSILON) * 100) / 100
    },
    goToNext() {
      if (this.currentScrollPosition < this.breakPoint1Offset) {
        this.goToScene('b1')
      } else if (
        this.currentScrollPosition >= this.breakPoint1Offset &&
        this.currentScrollPosition < this.scene3Offset
      ) {
        this.goToScene('scene3')
      } else if (
        this.currentScrollPosition >= this.scene3Offset &&
        this.currentScrollPosition < this.breakPoint2Offset
      ) {
        this.goToScene('b2')
      } else if (
        this.currentScrollPosition >= this.breakPoint2Offset &&
        this.currentScrollPosition < this.breakPoint3Offset
      ) {
        this.goToScene('b3')
      } else if (
        this.currentScrollPosition >= this.breakPoint3Offset &&
        this.currentScrollPosition < this.breakPoint4Offset
      ) {
        this.goToScene('b4')
      } else if (
        this.currentScrollPosition >= this.breakPoint4Offset &&
        this.currentScrollPosition < this.breakPoint5Offset
      ) {
        this.goToScene('b5')
      } else if (
        this.currentScrollPosition >= this.breakPoint5Offset &&
        this.currentScrollPosition < this.breakPoint6Offset
      ) {
        this.goToScene('b6')
      } else {
        this.goToScene('scene4')
      }
    },
    /* 씬 이동 */
    goToScene(scene, boolean) {
      let newPos
      switch (scene) {
        case 'scene1':
          newPos = 0
          break
        case 'scene2':
          /* this.ctx.clearRect(0, 0, 640, 640)
          this.ctx.drawImage(this.images[0], 50, 0) */

          newPos = this.scene2Offset
          break
        case 'scene3':
          /* this.ctx.clearRect(0, 0, 640, 640)
          this.ctx.drawImage(this.images[0], 50, 0) */

          newPos = this.scene3Offset
          break
        case 'scene4':
          // console.log(this.images3[this.images3.length - 1])
          /* this.ctx.clearRect(0, 0, 640, 640)
          this.ctx.drawImage(this.images3[this.images3.length - 1], 50, 0) */

          newPos = this.scene4Offset
          break
        case 'scene5':
          newPos = this.scene5Offset
          break
        case 'sceneText':
          newPos = this.sceneTextOffset
          break
        case 'b1':
          newPos = this.breakPoint1Offset
          break
        case 'b2':
          newPos = this.breakPoint2Offset
          break
        case 'b3':
          newPos = this.breakPoint3Offset
          break
        case 'b4':
          newPos = this.breakPoint4Offset
          break
        case 'b5':
          newPos = this.breakPoint5Offset
          break
        case 'b6':
          newPos = this.breakPoint6Offset
          break
      }

      this.controller.scrollTo(newPos, boolean)
    },
    /* 네비 클릭시 화면 전환 효과 */
    sceneChangeEffect() {
      const $dimmed = $('.sceneChanged')
      $dimmed.addClass('on')
      this.blockSceneEvent = true
      setTimeout(() => {
        this.blockSceneEvent = false
        $dimmed.removeClass('on')
      }, 1100)
    },
    /* sceneOffset 구하기 */
    calcHeight() {
      return window.innerHeight * 15
    },
    forceScroll(args, time) {
      // console.log(args, time)
      // if(this.isSafari === true) {
      //   return false
      // }

      let offset = args
      let scrollTime = time

      this.isScrolling = true

      if (offset === null || offset === 'undefined') {
        offset = this.scrollOffsetAmount
      }

      if (scrollTime === null || scrollTime === 'undefined') {
        scrollTime = 1
      }

      offset = offset * scrollTime

      $('html, body')
        .stop()
        .animate(
          { scrollTop: window.pageYOffset + offset },
          400 * scrollTime,

          () => {
            setTimeout(() => {
              this.isScrolling = false
            }, 400 * scrollTime)
          }
        )
    },
    checkScrollDirection(event) {
      this.currentScrollPosition = window.pageYOffset
      if (this.currentScene === 'scene1' || this.currentScene === 'scene4') {
        return false
      }
      if (this.checkScrollDirectionIsUp(event)) {
        if (this.isScrolling === true) {
          return false
        }
        this.isScrolling = true
        $('html, body')
          .stop()
          .animate(
            { scrollTop: window.pageYOffset - this.scrollOffsetAmount },
            600,
            () => {
              setTimeout(() => {
                this.isScrolling = false
              }, 500)
            }
          )
      } else {
        // console.log('test scroll backward')
        if (this.isScrolling === true) {
          return false
        }
        this.isScrolling = true
        $('html, body')
          .stop()
          .animate(
            { scrollTop: window.pageYOffset + this.scrollOffsetAmount },
            600,
            () => {
              setTimeout(() => {
                this.isScrolling = false
              }, 500)
            }
          )
      }
    },
    checkScrollDirectionIsUp(event) {
      if (event.wheelDelta) {
        return event.wheelDelta > 0
      }
      return event.deltaY < 0
    },
    initCanvasImages() {
      for (let i = 1; i < 29; i++) {
        const img = new Image(604, 640)
        img.src = `${this.imageUrl}` + '/crop/s-' + ('0' + i).slice(-2) + '.png'
        this.images.push(img)
      }

      for (let i = 1; i < 29; i++) {
        const img = new Image(604, 640)
        img.src = `${this.imageUrl}` + '/crop/c-' + ('0' + i).slice(-2) + '.png'
        this.images2.push(img)
      }

      for (let i = 28; i > 0; i--) {
        const img = new Image(604, 640)
        img.src = `${this.imageUrl}` + '/crop/w-' + ('0' + i).slice(-2) + '.png'
        this.images3.push(img)
      }
    },
    renderCanvas(imgs, idx, callback, callbackParam1, callbackParam2) {
      if (idx >= imgs.length) {
        cancelAnimationFrame(this.renderer)
        // callback(callbackParam1, callbackParam2)
        // setTimeout(() => {
        //   this.forceScrolled = false
        // }, 1000)
        return false
      }

      this.ctx.clearRect(0, 0, 640, 640)
      // this.ctx.drawImage(imgs[idx], 500, 0, 920, 1080, 110, 0, 920, 1080)
      this.ctx.drawImage(imgs[idx], 50, 0)

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

      this.ctx.clearRect(0, 0, 640, 640)
      // this.ctx.drawImage(imgs[idx], 500, 0, 920, 1080, 110, 0, 920, 1080)
      this.ctx.drawImage(imgs[idx], 50, 0)

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
    },
    changeColor(color) {
      this.colorChip = color
      // console.log('test')
      window.CI360.destroy()
      setTimeout(() => {
        window.CI360.init()
      }, 500)
    },
    checkHash(hash) {
      let scene
      switch (hash) {
        case '#01':
          scene = 'scene1'
          break
        case '#02':
          scene = 'scene3'
          break
        case '#03':
          scene = 'scene4'
          break
      }
      if (hash) this.goToScene(scene, false)
    },
    selectGallery(idx) {
      this.galleryIdx = idx
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/pre-reservation/style';
</style>
