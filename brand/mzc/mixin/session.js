// NOTE:
// 세션존에서 사용하는  mixin입니다
// pc, table, mobile 공용 사용 할 수 있는 코드만 넣어주세요
import { mapState, mapActions } from 'vuex'
import { groupBy } from 'lodash'
export default {
  data() {
    return {
      isOpenCategory: {
        application: true,
        data: true,
        infrastructure: true,
        platform: true
      },
      subCategories: [
        {
          tit: 'keynote',
          desc:
            '전문가가 이야기하는 성공적인<br/><span class="uppercase">Digital Transformation</span>'
        },
        {
          tit: 'offering',
          desc: '메가존클라우드가 제시하는<br/>성공 비즈니스 노하우 '
        },
        {
          tit: 'Partner',
          desc: '메가존클라우드와 함께한<br/>글로벌 NO.1 파트너사 이야기'
        },
        {
          tit: 'Industry Case',
          desc:
            '메가존클라우드와 함께한<br/><span class="uppercase">Digital Transformation</span><br/>성공 사례 '
        },
        {
          tit: 'interview',
          desc:
            '<span class="uppercase">Mr</span>. 디지털맨이 함께하는<br/>알아두면 이로운<br/><span class="uppercase">Digital Transformation</span>'
        }
      ],
      videoListOrigin: [],
      // ui
      isScrollBlock: true
    }
  },
  computed: {
    ...mapState({
      currentZone: (state) => state.currentZone,
      isVisitThroughLectureUrl: (state) => state.isVisitThroughLectureUrl,
      imageUrl: (state) => state.imageUrlRoot,
      currentPop: (state) => state.popup.currentPop,
      isLogin: (state) => state.auth.user.isLogin,
      currentSceneIdx: (state) => state.sessionZone.sceneIdx,
      currentCategoryIdx: (state) => state.sessionZone.categoryIdx,
      categories: (state) => state.session.categories,
      isNecessaryCategoryListUpdate: (state) =>
        state.session.isNecessaryCategoryListUpdate
    }),
    isOpenSelectedCategory() {
      return this.categories[this.currentCategoryIdx].isOpen
    },
    keyNoteBanner() {
      return this.videoListOrigin.banner ? this.videoListOrigin.banner[0] : []
    },
    lectureList() {
      return this.videoListOrigin.list
        ? groupBy(this.videoListOrigin.list, 'subCategory')
        : []
    }
  },
  watch: {
    isNecessaryCategoryListUpdate(boolean) {
      if (boolean) {
        // this.setIsOpenCategory()
        if (this.$device.isMobile) this.isBtnBoxOpen = false
      }
      // console.log(
      //   'isNecessaryCategoryListUpdate :::::: ' + this.currentCategoryIdx
      // )
      if (boolean && this.currentCategoryIdx !== null) {
        this.setCategory(this.currentSceneIdx, this.currentCategoryIdx)
      }
      setTimeout(() => {
        this.toggleNecessaryCategoryListUpdate(false)
      }, 1000)
    },
    currentSceneIdx(newVal) {
      setTimeout(() => {
        if (this.currentSceneIdx === 2 && this.currentPop.length > 0) return // => 강의 바로보기로 왔을 때 스크롤 풀지 않도록 제어
        this.isScrollBlock = false
      }, 1000)
      this.isScrollBlock = true
    }
  },
  mounted() {
    if (process.browser) {
      // => 강의 url 로 바로 들어왔을 때
      if (this.isVisitThroughLectureUrl) {
        // this.setIsOpenCategory()
        this.setCategory(this.currentSceneIdx, this.currentCategoryIdx)
      }
    }
  },
  methods: {
    ...mapActions(['setSessionScene', 'setSessionCategory']),
    ...mapActions('popup', ['openPop', 'openAbovePop']),
    ...mapActions('session', [
      'getIsOpenCategory',
      'getCategory',
      'setVideoId',
      'toggleNecessaryCategoryListUpdate'
    ]),
    // async setIsOpenCategory() {
    //   if (this.isLogin) {
    //     this.isOpenCategory = await this.getIsOpenCategory()
    //   }
    // },
    async setCategory(sceneIdx, categoryIdx) {
      if (this.currentZone !== 'session') return

      // => 현재와 변경 되는 값 비교하여 값이 변경 될 때만 실행
      if (this.currentSceneIdx !== sceneIdx) this.setSessionScene(sceneIdx)
      if (this.currentCategoryIdx !== categoryIdx)
        this.setSessionCategory(categoryIdx)

      const videoListOrigin = await this.getCategory(
        this.categories[categoryIdx].name.toUpperCase()
      )

      if (!videoListOrigin) return
      this.videoListOrigin = videoListOrigin

      this.isScrollBlock = false

      // => scroll 최상단으로 이동 시킴
      this.scrollToTop()
    },
    openPopLecture(videoId) {
      if (!this.isLogin) {
        this.openPop({ name: 'login' })
        return
      }
      if (!this.isOpenCategory[this.categories[this.currentCategoryIdx].name])
        return
      this.setVideoId(videoId)
      this.openPop({ name: 'lecture' })
    },
    // => ui :: 세설 설명 보기 제어
    toggleDesc(e) {
      const btn = $(e.target).parent()
      const desc = $(e.target)
        .closest('.lecture')
        .find('.lecture__desc')
      const lectureId = $(e.target)
        .closest('.lecture')
        .attr('id')
      const descHeight =
        $(desc)
          .find('p')
          .prop('scrollHeight') +
        $(desc)
          .find('.infoBox')
          .prop('scrollHeight')

      if ($(desc).hasClass('-isActive')) {
        $(desc)
          .removeClass('-isActive')
          .css('height', '1px')
        $(btn).removeClass('-isActive')
        return
      }

      $('.lecture__desc')
        .removeClass('-isActive')
        .css('height', '1px')
      $(desc)
        .addClass('-isActive')
        .css('height', descHeight)

      $('.btn__lectureDesc').removeClass('-isActive')
      $(btn).addClass('-isActive')

      setTimeout(() => {
        this.scrollToLecture(lectureId)
      }, 200)
    }
  }
}
