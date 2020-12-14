<template>
  <article :class="`scroll--${currentScene}`" class="container">
    <h1 class="logo">
      <img :src="`${imageUrl}/pc/logo.png`" alt="MegazoneCloud" />
    </h1>
    <section class="keyVisual">
      <div class="keyVisual__main">
        <h2>
          <img :src="`${imageUrl}/m/logo-kv.png`" alt="Digital 2020 spectrum" />
        </h2>
        <p class="keyVisual__desc--1">
          메가존클라우드와 함께하는 Digital Transformation!<br />
          기업의 디지털 성장 전략을 위한 메가존클라우드의<br />
          첫 번째 디지털 세미나에 초대합니다.
        </p>
        <p class="keyVisual__desc--2">
          2020. 11. 16(월) ~ 11. 29(일)
        </p>
        <!-- earlybird_register 매체용 class -->
        <button
          type="button"
          class="btn--openEntry earlybird_register"
          @click="openPop({ name: 'join' })"
        >
          <span>사전 등록하기</span>
        </button>
      </div>

      <video
        ref="videoIntro"
        src="https://mzc-webinar.s3.amazonaws.com/static/video/earlyLOGO_mo.mp4"
        muted
        autoplay
        playsinline
        preload
        loop
        class="video--full"
      ></video>

      <div class="keyVisual__indicator">
        <svg width="47px" height="108px">
          <path
            fill-rule="evenodd"
            stroke="rgb(255, 255, 255, .4)"
            stroke-width="2px"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            fill="none"
            d="M22.000,31.000 L22.000,106.000"
          />
          <path
            class="more__line"
            fill-rule="evenodd"
            stroke="rgb(255, 255, 255)"
            stroke-width="2px"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            fill="none"
            d="M22.000,31.000 L22.000,106.000"
          />
        </svg>
      </div>
    </section>

    <section class="intro">
      <div class="intro__contents--1">
        <h2 class="a11y">intro</h2>
        <p class="intro__paragraph">
          <b>클라우드를 통한 Digital Transformation</b>은<br />
          이제 모든 산업이 마주한 큰 변화의 흐름이 되었습니다.
        </p>

        <p class="intro__paragraph">
          팬데믹으로 인해 수많은 변화들이 빠르게 일어나고<br />
          기업들도 기존의 비즈니스 방식에서 벗어나<br />
          <b>디지털 기술들을 활용한 혁신을 가속화</b> 해나가고 있습니다.
        </p>

        <p class="intro__paragraph">
          이에 메가존클라우드는 그동안의 노하우와 경험을 바탕으로<br />
          오는 <b class="colored--green">11월 16일(월)</b>부터
          <b class="colored--green">2주</b>에 걸쳐<br />
          <b>Digital Transformation 의 방법과 혁신 사례</b>를 공유하기 위한<br />
          <b>첫 번째 디지털 세미나</b>를 준비하였습니다.
        </p>

        <p class="intro__paragraph">
          갈수록 고도화되는 비즈니스 환경에서<br />
          새로운 비즈니스 인사이트를 얻는 기회가 되시기를 바라며,<br />
          <b>각 분야별 전문가들의 세션과 다양한 이벤트</b>가 준비되어 있는<br />
          본 세미나에 많은 관심과 참여 바랍니다.
        </p>
        <div class="intro__indicator">
          <svg width="47px" height="108px">
            <path
              fill-rule="evenodd"
              stroke="rgb(255, 255, 255, .4)"
              stroke-width="2px"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              fill="none"
              d="M22.000,31.000 L22.000,106.000"
            />
            <path
              class="more__line"
              fill-rule="evenodd"
              stroke="rgb(255, 255, 255)"
              stroke-width="2px"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              fill="none"
              d="M22.000,31.000 L22.000,106.000"
            />
          </svg>
        </div>
      </div>
    </section>

    <section class="table">
      <!-- <vue-scroll
        ref="vs"
        :ops="ops"
        class="table__scroll"
        @handle-scroll="handleScroll"
      > -->
      <div id="hasNav" class="intro__contents--2">
        <div>
          <div
            ref="navBox"
            class="btnBox fixed"
            :class="[isNavFixed === true ? 'fixed' : '']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="10"
              class="btnBox__arrow"
            >
              <path
                fill-rule="evenodd"
                :fill="isNavFixed ? '#fff' : '#111'"
                d="M9.49 9.85L.358.352h18.265L9.49 9.85"
              />
            </svg>
            <!-- <transition-group
                :class="[
                  'btnBox__inner -isActive',
                  isBtnBoxOpen ? '-isOpen' : null
                ]"
                name="fade-drawer"
                tag="div"
              > -->
            <div
              :class="[
                'btnBox__inner -isActive',
                isBtnBoxOpen ? '-isOpen' : null
              ]"
            >
              <button
                v-for="(category, idx) in categories"
                :id="category.name"
                :key="category.name"
                :class="[
                  'uppercase',
                  'btn',
                  $device.isMobile ? '' : 'btn--big'
                ]"
                :style="{ order: currentTab === idx ? -1 : idx }"
                type="button"
                @click="btnBoxHandler(idx, $event)"
              >
                {{ category.name }}
                <!-- <p v-if="!category.isOpen" class="openFlag uppercase">
                      {{ category.openDate }} open !
                    </p> -->
              </button>
            </div>
            <!-- </transition-group> -->
          </div>
          <div
            id="lectureList"
            :class="[isNavFixed === true ? 'hasPadding' : '']"
            class="lecture"
          >
            <div class="lecture__header">
              {{ categoryHeader[currentTab].desc | convertNewline }}
            </div>
            <ul class="lecture__list">
              <li
                v-for="(scategory, idx) in lectureList"
                :key="idx"
                :class="`listCard--${scategory.name}`"
                class="lecture__listCard listCard"
              >
                <div class="listCard__title">
                  <h3>
                    {{ scategory.name | trimUnderbar }}
                  </h3>
                  <p v-html="categoryDesc[scategory.name]">
                    <!-- {{  }} -->
                  </p>
                </div>
                <ul class="listCard__items">
                  <li
                    v-for="lecture in scategory.list"
                    :key="lecture.id"
                    :class="
                      `listCard__item--${categoryHeader[currentTab].name}`
                    "
                    class="listCard__item"
                  >
                    <div class="listCard__box">
                      <!-- <p class="listCard__tit">{{ lecture.title }}</p> -->
                      <p class="listCard__tit" v-html="lecture.title"></p>
                      <p
                        v-if="
                          scategory.name === 'INTERVIEW' ||
                            lecture.keyword.includes('VMC')
                        "
                        class="listCard__lecturer"
                        v-html="lecture.name"
                      ></p>
                      <p v-else class="listCard__lecturer">
                        {{ lecture.lecturerCompany }}
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        {{ lecture.lecturerName }}
                      </p>
                      <!-- <p
                          v-if="scategory.name === 'KEYNOTE'"
                          class="listCard__desc"
                        >
                          내용 설명
                        </p> -->
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="benefit">
          <h2 class="benefit__title">
            사전 등록 혜택
          </h2>
          <div class="benefit__desc">
            <img
              :src="`${imageUrl}/m/prize-desc_v2.png`"
              alt="경품 안내 스타벅스 아메리카노(Tall) 참여방법 1.사전 등록 신청 2. 세미나 오픈 후 사전 등록 계정으로 로그인등록하신 휴대폰 번호로 기프티콘 경품이 발송될 예정이니 정확한 정보를 입력해주세요. 경품은 로그인한 고객 대상 추첨을 통해 제공되며, 12/1(화) 일괄 발송 예정입니다"
            />
          </div>
          <!-- earlybird_register 매체용 class -->
          <button
            type="button"
            class="btn--openEntry earlybird_register"
            @click="openPop({ name: 'join' })"
          >
            <span>사전 등록하기</span>
          </button>
        </div>
      </div>
      <div class="footer">
        <div class="footer__partnerList">
          <img :src="`${imageUrl}/m/partners.png`" />
        </div>
        <p class="footer__contents">
          <span>사전 등록 및 이벤트 관련 문의</span>
          <a href="mailto:digitalspectrum_cs@dspectrum.com">
            digitalspectrum_cs@dspectrum.com
          </a>
          <a href="/policy01" target="_blank">개인정보처리방침 </a>
        </p>
      </div>
      <!-- </vue-scroll> -->
    </section>
  </article>
</template>

<script>
import lectureList from '@/assets/js/lectureList.json'
import { groupBy } from 'lodash'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Mo',
  filters: {
    trimUnderbar(value) {
      return value.replace('_', ' ')
    },
    convertNewline(value) {
      return value.split('\n').join('<br/>')
    }
  },
  props: {
    imageUrl: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    /* 
    0: infrastructure,
    1: platform,
    2: application,
    3: data,
     */
    return {
      isBtnBoxOpen: false,
      ops: {
        vuescroll: {
          wheelScrollDuration: 0
        }
        /* scrollPanel: {
          scrollingY: true,
          speed: 500,
          easing: 'easeInOutCubic'
        } */
      },
      currentTab: 0,
      isScrolled: false,
      isScrollBlock: false,
      isNavFixed: true,
      ts: null,
      currentScene: 0,
      categoryHeader: {
        0: {
          name: 'infrastructure',
          desc: '클라우드 이전 / 경영 전략 / 운영'
        },
        1: {
          name: 'platform',
          desc: '솔루션 및 비즈니스 운영 플랫폼'
        },
        2: {
          name: 'application',
          desc: '엔터프라이즈 지원 서비스'
        },
        3: {
          name: 'data',
          desc: '빅데이터 활용 및 신기술 도입'
        }
      },
      categoryDesc: {
        KEYNOTE: '전문가가 이야기하는 성공적인<br />Digital Transformation',
        OFFERING: '메가존클라우드가 제시하는<br /> 성공 비즈니스 노하우 ',
        PARTNER: '메가존클라우드와 함께한<br /> 글로벌 NO.1 파트너사 이야기',
        INDUSTRY_CASE:
          '메가존클라우드와 함께한<br /> DIGITAL TRANSFORMATION 성공 사례',
        INTERVIEW:
          'MR. 디지털맨이 함께하는<br /> 알아두면 이로운 DIGITAL TRANSFORMATION'
      },
      hasNav: null
      // lectureList: lectureList.list
    }
  },
  computed: {
    lectureList() {
      return Object.keys(this.filteredList).reduce((acc, cur) => {
        const obj = {}
        obj.name = cur
        obj.list = this.filteredList[cur]
        acc.push(obj)
        // console.log(acc)
        return acc
      }, [])
    },
    lectureDesc() {
      return lectureList[this.currentTab].keyword
    },
    filteredList() {
      return groupBy(lectureList[this.currentTab].list, 'subCategory')
    },
    ...mapState({
      currentPop: (state) => state.popup.currentPop,
      categories: (state) => state.session.categories
    }),
    offsetTop() {
      return this.hasNav.offsetTop
    }
  },
  mounted() {
    this.hasNav = document.getElementById('hasNav')

    /* window.addEventListener('mousewheel', (e) => {
      if (!this.isScrollBlock && !this.currentPop.includes('join')) {
        // console.log('isScrollBlock ::::::: ' + this.isScrollBlock)
        const scrollDirection = e.wheelDelta < 0 ? 'down' : 'up'
        if (scrollDirection === 'down') {
          this.isScrolled = true
        } else {
          this.isScrolled = false
        }
      }
    }) */
    document
      .querySelector('.table')
      .addEventListener('scroll', this.scrollHandler)

    window.addEventListener('touchstart', (e) => {
      this.ts = e.touches[0].clientY
    })
    window.addEventListener('touchend', (e) => {
      if (!this.isScrollBlock && !this.currentPop.includes('join')) {
        // if (e.target.tagName === 'BUTTON') return false
        const te = e.changedTouches[0].clientY

        const tAmount = this.ts - te
        if ((tAmount >= 0 && tAmount <= 50) || (tAmount < 0 && tAmount >= -50))
          return

        let isTouchDown
        tAmount < 0 ? (isTouchDown = false) : (isTouchDown = true)

        if (this.currentScene < 2 && isTouchDown) {
          this.currentScene++
        } else if (this.currentScene > 0 && !isTouchDown) {
          this.currentScene--
        }
        // alert(this.currentScene)
        if (this.isBtnBoxOpen) this.toggleBtnBox()
      }
      // alert(this.isScrollBlock)
    })
    // console.log(this.filteredList)
    // console.log(this.lectureList)
  },
  methods: {
    ...mapActions('popup', ['openPop']),
    scrollHandler() {
      this.isScrollBlock = this.hasNav.getBoundingClientRect().top < 0
    },
    handleScroll(vertical, horizontal, nativeEvent) {
      // alert(vertical.process)
      this.isScrollBlock = vertical.process > 0
      // console.log(vertical)
      // this.isNavFixed = this.$refs.vs.getCurrentviewDom()[0].id === 'hasNav'
    },
    setTab(idx) {
      this.currentTab = idx
      setTimeout(() => {
        // this.$refs.vs.scrollIntoView('#hasNav', 300)
        this.scrollIntoView()
      }, 500)
    },
    toggleBtnBox(boolean) {
      // console.log('toggle')
      if (boolean !== undefined && boolean !== null) {
        this.isBtnBoxOpen = boolean
        return false
      }
      this.isBtnBoxOpen = !this.isBtnBoxOpen
    },
    btnBoxHandler(idx, e) {
      // console.log(e)
      e.preventDefault()
      // console.log('sceneIdx' + sceneIdx + ' , cat' + categoryIdx)

      if (this.isBtnBoxOpen) {
        // console.log(this.isBtnBoxOpen)
        // console.log('set')
        /* this.currentTab = idx
        this.$refs.vs.scrollIntoView('#hasNav', 300) */
        setTimeout(() => {
          this.setTab(idx)
        }, 300)
      }

      this.toggleBtnBox()
    },
    scrollIntoView() {
      // console.log(this.offsetTop)
      document.querySelector('#hasNav').scrollIntoView()
      // window.scrollTo(0, this.offsetTop)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/register/style-m.scss';
</style>

<style lang="scss">
/* .video--full {
  object-fit: cover;
  width: 100%;
  height: var(--vh);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
} */
</style>
