<template>
  <section
    :class="['session', !!currentSceneIdx ? `step${currentSceneIdx}` : '']"
  >
    <div ref="navBox" class="btnBox">
      <div
        :class="[
          'btnBox__inner',
          isBtnBoxOpen ? '-isOpen' : null,
          currentSceneIdx > 0 ? '-isActive' : null
        ]"
      >
        <button
          v-for="(category, idx) in categories"
          :key="category.name"
          :class="['uppercase', 'btn', $device.isMobile ? '' : 'btn--big']"
          :style="{
            order:
              currentCategoryIdx === idx && currentSceneIdx !== 0 ? -1 : idx
          }"
          type="button"
          @click="btnBoxHandler(1, idx)"
        >
          {{ category.name }}
          <p v-if="!isOpenCategory[category.name]" class="openFlag uppercase">
            {{ category.openDate }} open !
          </p>
        </button>
      </div>
    </div>

    <div class="inner">
      <section class="session__main">
        <h1 class="uppercase tit">
          Session
          <br />Zone
        </h1>
        <p class="txt">
          세상을 바꾸고 있는 클라우드 서비스 분야별
          <br />전문가들의 강연과 성공사례, 최신 기술에 대한 <br />다양하고 깊이
          있는 세션들을 만나보세요!
        </p>
      </section>

      <section v-if="currentCategoryIdx !== null" class="session__banner">
        <h3 class="tit uppercase">
          {{ categories[currentCategoryIdx].name }}
        </h3>
        <h4 class="stit">{{ categories[currentCategoryIdx].desc }}</h4>

        <div
          v-if="!isOpenCategory[categories[currentCategoryIdx].name]"
          class="banner__inner alarm__inner"
        >
          <button
            :id="
              `sessionMovieAlarm_${categories[currentCategoryIdx].name}_${keyNoteBanner.subCategory}`
            "
            type="button"
            class="btn btn--big btn--white"
            @click="
              openAbovePop({
                name: 'alarmSubscription',
                message: categories[currentCategoryIdx].name.toUpperCase()
              })
            "
          >
            <span>
              <Icon :name="'alert'" :fill="'#000'" class="btn__icon"></Icon>
              알림설정
            </span>
          </button>
          <p class="alarm__desc">
            {{ categories[currentCategoryIdx].openDate }} 에 오픈되는 세션영상을
            리스트에서 확인해주세요 <br />오픈알림을 신청하시면 해당 오픈일에
            알림 문자를 드립니다.
          </p>
        </div>
        <div
          v-else
          :data-category-idx="currentCategoryIdx"
          :data-scategory="keyNoteBanner.subCategory"
          :class="{ '-beReady': !isOpenSelectedCategory }"
          class="banner"
          @click="openPopLecture(keyNoteBanner.id)"
        >
          <div class="banner__inner">
            <p class="banner__subCategory colors">
              {{ keyNoteBanner.subCategory }}
            </p>
            <p class="banner__tit">{{ keyNoteBanner.title }}</p>
            <p class="banner__info">
              {{ keyNoteBanner.lecturerName }} /
              {{ keyNoteBanner.lecturerCompany }}
            </p>
            <div
              :id="
                `sessionMovie_${categories[currentCategoryIdx].name}_${keyNoteBanner.subCategory}`
              "
              class="btn__goLecture ui__point bgs"
            >
              <span>세션 시청하기</span>
            </div>
          </div>
        </div>
        <div class="session__banner__more">
          <svg width="47px" height="108px">
            <text kerning="auto" fill="rgb(255, 255, 255, .5)" x="0px" y="11px">
              <tspan font-size="16px" font-weight="bold" class="uppercase">
                more
              </tspan>
            </text>

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

      <!-- list -->
      <div ref="vs" class="session__scrollbar">
        <section id="sessionList" ref="ts" class="session__list">
          <ul class="session__lists">
            <li
              v-for="(scategory, categoryTit, idx) in lectureList"
              :key="idx"
              :data-scategory="categoryTit"
              class="category"
            >
              <div>
                <h3
                  class="category__tit uppercase colors"
                  v-html="subCategories[idx].tit"
                ></h3>
                <p class="category__desc" v-html="subCategories[idx].desc"></p>
              </div>
              <ul class="lectures">
                <li
                  v-for="(lecture, lectureIdx) in scategory"
                  :id="`${categoryTit.toLowerCase()}Lecture${lectureIdx + 1}`"
                  :key="lecture.id"
                  :class="{
                    '-beReady': !isOpenCategory[
                      categories[currentCategoryIdx].name
                    ]
                  }"
                  class="lecture bgs"
                >
                  <div class="lecture__card">
                    <p class="lecture__tit">{{ lecture.title }}</p>
                    <p class="lecture__lecturer">
                      <span v-html="lecture.lecturerName"></span>
                      <span v-if="lecture.lecturerCompany"
                        >&nbsp;&nbsp;|&nbsp;&nbsp;</span
                      >
                      <span v-html="lecture.lecturerCompany"></span>
                      <span v-if="lecture.lecturerCompanyTeam"
                        >&nbsp;&nbsp;|&nbsp;&nbsp;</span
                      >
                      <span v-html="lecture.lecturerCompanyTeam"></span>
                    </p>
                    <div class="btnBox">
                      <div
                        :class="{ isGiven: lecture.completeGivenPointYN }"
                        class="btn__goLecture ui__point"
                      >
                        <span v-if="!lecture.completeGivenPointYN">
                          <span class="icon">
                            <Icon
                              :name="'plus'"
                              :size="20"
                              class="svg__fills"
                            ></Icon>
                          </span>
                          <span class="txt">
                            <span class="txt--0">영상 시청 완료 시</span>
                            <br v-if="!$device.isMobile" />
                            {{ lecture.point | currency }} P
                          </span>
                        </span>
                        <span v-else>포인트 지급완료</span>
                      </div>
                      <a
                        v-if="lecture.presentation"
                        class="btn  btn__lectureDown colors sessionLectureDocumentDownloadBtn"
                        download
                        :href="lecture.presentation"
                      >
                        <span>
                          <Icon
                            :name="'download'"
                            class="btn__icon svg__fills"
                          ></Icon>
                          강연 자료 다운
                        </span>
                      </a>
                      <button
                        type="button"
                        class="btn colors sessionLectureWatingMovieBtn"
                        :class="{ 'btn--full': !lecture.presentation }"
                        @click.stop="openPopLecture(lecture.id)"
                      >
                        <span>
                          <Icon
                            :name="'play'"
                            :fill="'none'"
                            :stroke-width="2"
                            class="btn__icon svg__stroke"
                          ></Icon>
                          세션 영상 보기
                        </span>
                      </button>
                    </div>
                  </div>
                  <div class="lecture__desc">
                    <p>
                      {{ lecture.description }}
                    </p>
                    <dl class="infoBox">
                      <dt>키워드</dt>
                      <dd>{{ lecture.keywords }}</dd>
                      <dt>대상</dt>
                      <dd>{{ lecture.targets }}</dd>
                      <dt>난이도</dt>
                      <dd>{{ lecture.difficulty }}</dd>
                    </dl>
                  </div>
                  <button
                    id="sessionLectureDetailDocument"
                    :movie-id="`${lecture.sortNum}`"
                    type="button"
                    class="btn btn__lectureDesc"
                    @click="toggleDesc"
                  >
                    <span :movie-id="`${lecture.sortNum}`">
                      <Icon
                        :movie-id="`${lecture.sortNum}`"
                        :name="'triangle'"
                        :fill="'rgba(0, 0, 0, 0.4)'"
                      ></Icon>
                    </span>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import Icon from '@/components/ui/Icon'
import sessionMixin from '@/mixin/session.js'

export default {
  name: 'SessionMobile',
  components: { Icon },
  mixins: [sessionMixin],
  data() {
    return {
      // ui
      ts: null,
      isBtnBoxOpen: true
    }
  },
  watch: {
    currentSceneIdx(newVal, oldVal) {
      if (newVal === 0) this.isBtnBoxOpen = true
    }
  },
  mounted() {
    if (process.browser) {
      document.querySelector('.session').addEventListener('touchstart', (e) => {
        this.ts = e.touches[0].clientY
      })
      document
        .querySelector('.session')
        .addEventListener('touchend', this.touchEndHandler)
    }
  },
  methods: {
    scrollToTop() {
      this.$refs.vs.scrollTo(0, 0)
    },
    scrollToLecture(lectureId) {
      const scrollBarOffsetTop = this.$refs.vs.offsetTop
      const lectureOffsetTop = document.getElementById(lectureId).offsetTop
      this.$refs.vs.scrollTo({
        top: lectureOffsetTop - scrollBarOffsetTop,
        behavior: 'smooth'
      })
    },
    // => ui :: 버튼박스 제어
    toggleBtnBox(boolean) {
      if (boolean !== undefined && boolean !== null) {
        this.isBtnBoxOpen = boolean
        return false
      }
      this.isBtnBoxOpen = !this.isBtnBoxOpen
    },
    async btnBoxHandler(sceneIdx, categoryIdx) {
      if (this.isBtnBoxOpen) await this.setCategory(sceneIdx, categoryIdx)
      this.toggleBtnBox()
    },
    // => ui :: touch end evet 제어
    touchEndHandler(e) {
      if (!this.isScrollBlock && this.currentSceneIdx !== 0) {
        // if (e.target.tagName === 'BUTTON') return false
        const te = e.changedTouches[0].clientY

        const tAmount = this.ts - te
        if ((tAmount >= 0 && tAmount <= 50) || (tAmount < 0 && tAmount >= -50))
          return

        let isTouchDown
        tAmount < 0 ? (isTouchDown = false) : (isTouchDown = true)

        if (isTouchDown) {
          if (this.currentSceneIdx === 2) return
          this.setSessionScene(this.currentSceneIdx + 1)
        } else if (!isTouchDown) {
          // alert('위로')
          if (this.currentSceneIdx === 0) return
          else if (
            this.$refs.ts.getBoundingClientRect().top <
            this.$refs.vs.getBoundingClientRect().top
          )
            return
          // else if (this.$refs.vs.scrollTop > 0) return

          this.setSessionScene(this.currentSceneIdx - 1)
        }

        if (this.isBtnBoxOpen) this.toggleBtnBox()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/session';
</style>
