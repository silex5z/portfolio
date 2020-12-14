<template>
  <div>
    <div class="tabBox" :class="[`step${currentSceneIdx}`]">
      <ul class="tab">
        <li :class="{ '-isActive': artistIdx === 0 }" @click="setArtist(0)">
          Collaboration Artist<br /><span>강운</span>
        </li>
        <li :class="{ '-isActive': artistIdx === 1 }" @click="setArtist(1)">
          Collaboration Artist<br /><span class="eng">IAN FISHER</span>
        </li>
      </ul>
    </div>

    <div :class="[`step${currentSceneIdx}`]" class="collabo__wrap">
      <h1 class="logo">
        <a
          v-if="entryType !== 'type1'"
          href="/?utm_source=collabo&utm_medium=detail"
        >
          <img
            :src="`${imageUrl}/collabo/logo.png`"
            alt="Digital Spectrum 2020"
          />
        </a>
        <img
          v-else
          :src="`${imageUrl}/collabo/logo.png`"
          alt="Digital Spectrum 2020"
        />
      </h1>

      <section ref="section0" class="collabo collabo__visual">
        <div ref="section0Inner" class="collabo__inner">
          <img
            :src="
              `${imageUrl}/collabo/visual_txt${
                $device.isMobile ? '_m' : ''
              }.png`
            "
            alt=""
            class="visual__txt"
          />
          <button type="button" class="seal" @click="currentSceneIdx = 1">
            <svg
              width="128"
              height="128"
              viewBox="-10 -10 128 128"
              class="seal__text"
            >
              <defs>
                <path
                  id="text-path"
                  fill-rule="evenodd"
                  fill="none"
                  d="M53.008,0.055 C81.886,0.055 105.297,23.645 105.297,52.746 C105.297,81.847 81.886,105.438 53.008,105.438 C24.129,105.438 0.719,81.847 0.719,52.746 C0.719,23.645 24.129,0.055 53.008,0.055 Z"
                />
              </defs>
              <text class="cls-1">
                <textPath xlink:href="#text-path">
                  <tspan class="cls-2">
                    COLLABORATION&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
                    &nbsp; COLLABORATION&nbsp; &nbsp;&nbsp; &nbsp;
                    &nbsp;&nbsp;&nbsp; &nbsp;
                  </tspan>
                </textPath>
              </text>
            </svg>
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              class="seal__circle"
            >
              <circle class="cls-3" cx="64" cy="64" r="40" />
              <image
                x="57"
                y="54"
                width="15"
                height="22"
                xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAWCAYAAAAfD8YZAAAAqUlEQVQ4je2TsRHCMAxFn6FKmQ3IBpRsA3TZAmeCwAQkG1CyHZzuFE6xLUhDl99Ytv+TfLYVQl3jKAIXoNM40zf4ZeJQMmw8colWeIX/D0f9x/1C5qr+KI1hG2AAzhqXGkP2j7byzZhOwN2pOAOF24aqegINsNdFGXdmju5bcARa289pZk8CygmRypPnkZygpA+Ywr8SzMAS7CXIQA+eEshlHPQ12swBvAHwVBxfjDv0RQAAAABJRU5ErkJggg=="
              />
            </svg>
          </button>
        </div>
      </section>

      <!-- collabo3 -->
      <section
        id="collaboDetail"
        ref="collaboDetail"
        class="collabo collabo__detail"
        :class="artistIdx === 0 ? 'kangun' : 'ianfisher'"
      >
        <vue-scroll v-if="!$device.isMobile" ref="vs" :ops="ops">
          <!-- <div class="collabo__inner"> -->
          <div class="img1"></div>
          <div class="img2"></div>
          <div class="img3"></div>
          <div class="img4"></div>
          <div class="img5"></div>
          <div id="event" class="img6"></div>
          <!-- </div> -->
        </vue-scroll>
        <div v-else ref="detail" class="detail">
          <div class="img1">
            <img
              :src="`${imageUrl}/collabo/img${artistIdx + 1}_1_m.jpg`"
              alt=""
            />
          </div>
          <div class="img2">
            <img
              :src="`${imageUrl}/collabo/img${artistIdx + 1}_2_m.jpg`"
              alt=""
            />
          </div>
          <div class="img3">
            <img
              :src="`${imageUrl}/collabo/img${artistIdx + 1}_3_m.jpg`"
              alt=""
            />
          </div>
          <div class="img4">
            <img
              :src="`${imageUrl}/collabo/img${artistIdx + 1}_4_m.jpg`"
              alt=""
            />
          </div>
          <div class="img5">
            <img
              :src="`${imageUrl}/collabo/img${artistIdx + 1}_5_m.jpg`"
              alt=""
            />
          </div>
          <div id="event" class="img6">
            <img
              :src="`${imageUrl}/collabo/img${artistIdx + 1}_6_m.jpg`"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
    <a
      v-if="currentSceneIdx === 1 && entryType !== 'type1'"
      class="btn__goSeminar"
      href="/?utm_source=collabo&utm_medium=detail"
    >
      <img :src="`${imageUrl}/collabo/btn_floating.png`" alt="" />
    </a>
    <button v-if="entryType === 'type1'" class="btn__close" @click="close">
      <Icon :name="'close'" :stroke="'#fff'" :stroke-width="2"></Icon>
    </button>
  </div>
</template>

<script>
// import { EventBus } from '@/assets/js/event-bus.js'

import Icon from '@/components/ui/Icon'
import { mapState } from 'vuex'

export default {
  name: 'CollaborationCommon',
  components: { Icon },
  props: {
    queryObj: {
      type: Object,
      default: () => ({
        artist: 'kangun'
      })
    },

    entryType: { type: String, default: '' }
  },
  data() {
    return {
      ops: {
        vuescroll: {
          wheelScrollDuration: 0
        }
      },
      isSceneBlock: false,
      isScrollBlock: false,
      currentSceneIdx: 0,
      artistIdx: 0
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot
    })
    // event1SelectedWeekName() {
    //   // return 'data'
    //   // return this.satateCategories[this.event1SelectedWeekIdx].name
    //   return this.stateCategories
    //     ? this.stateCategories[this.event1SelectedWeekIdx].name
    //     : 'infrastructure'
    // }
  },
  watch: {
    currentSceneIdx(newVal) {
      setTimeout(() => {
        this.isSceneBlock = false
      }, 1000)
    }
  },
  mounted() {
    if (process.browser) {
      //   EventBus.$on('setEvent3Complete', (boolean) => {
      //     this.event3.isEntry = boolean
      //   })
      this.addEventListner()
      this.$nextTick(() => {
        if (this.queryObj.artist === 'ianfisher') this.artistIdx = 1
        if (this.queryObj.sectionName === 'event') {
          this.currentSceneIdx = 1
          if (this.$device.isMobile) {
            const eventOffsetTop = document.querySelector('#event').offsetTop
            const vh = window.document.documentElement.clientHeight
            document
              .querySelector('#collaboDetail')
              .scrollTo({ top: eventOffsetTop - vh })
          } else this.$refs.vs.scrollIntoView(`#event`, 0)
        }
      })
    }
  },
  methods: {
    addEventListner() {
      // pc
      if (this.$device.isDesktop) {
        window.addEventListener('mousewheel', this.wheelHandler)
      }
      // mobile & tablet
      else {
        document
          .querySelector('.collabo__detail')
          .addEventListener('scroll', this.scrollHandler)
        window.addEventListener('touchstart', this.touchStartHandler)
        window.addEventListener('touchend', this.touchEndHandler)
      }
    },
    // ui
    wheelHandler(e) {
      if (!this.isScrollBlock) {
        let isScrollDown
        e.wheelDelta < 0 ? (isScrollDown = true) : (isScrollDown = false)
        if (isScrollDown && !this.isSceneBlock) {
          if (this.currentSceneIdx === 1) return
          this.isSceneBlock = true
          this.currentSceneIdx++
        } else if (!isScrollDown && !this.isSceneBlock) {
          if (this.currentSceneIdx === 0) return
          this.isSceneBlock = true
          this.currentSceneIdx--
        }
      }
    },
    scrollHandler(e) {
      this.isScrollBlock = this.$refs.detail.getBoundingClientRect().top < 0
    },
    touchStartHandler(e) {
      this.ts = e.touches[0].clientY
    },
    touchEndHandler(e) {
      if (!this.isScrollBlock) {
        // if (e.target.tagName === 'BUTTON') return false
        const te = e.changedTouches[0].clientY

        const tAmount = this.ts - te
        if ((tAmount >= 0 && tAmount <= 50) || (tAmount < 0 && tAmount >= -50))
          return

        let isTouchDown
        tAmount < 0 ? (isTouchDown = false) : (isTouchDown = true)
        if (this.currentSceneIdx < 1 && isTouchDown) {
          this.currentSceneIdx++
        } else if (this.currentSceneIdx > 0 && !isTouchDown) {
          this.currentSceneIdx--
        }
      }
    },

    setArtist(idx) {
      this.currentSceneIdx = 1
      this.artistIdx = idx

      if (this.$device.isMobile) {
        document.querySelector('.detail').scrollIntoView(100)
      } else {
        this.$refs.vs.scrollTo(
          {
            y: 0
          },
          300
        )
      }
    },
    close() {
      if (process.browser) window.close()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/collaboration';
</style>
