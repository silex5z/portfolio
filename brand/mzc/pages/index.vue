<template>
  <div>
    <Mo v-if="$device.isMobile" :mzc-pass="preset.mzcPass"></Mo>

    <Pc v-else :mzc-pass="preset.mzcPass"></Pc>

    <!-- Popup -->
    <PopEvent
      :is-show="currentPop.includes('event')"
      @setEventType="setEventType"
    ></PopEvent>
    <PopEventParticipate
      :is-show="currentPop.includes('participateEvent')"
      :event-data="eventData"
    ></PopEventParticipate>
    <PopAdditionalInfo
      :is-show="currentPop.includes('additionalInfo')"
    ></PopAdditionalInfo>
    <PopConsultation
      :id="'consultation'"
      :is-show="currentPop.includes('consultation')"
    ></PopConsultation>
    <PopBrochure :is-show="currentPop.includes('brochure')"></PopBrochure>
    <PopInterest :is-show="currentPop.includes('interest')"></PopInterest>
    <PopPointHistory
      :is-show="currentPop.includes('pointHistory')"
    ></PopPointHistory>
    <PopLecture :is-show="currentPop.includes('lecture')"></PopLecture>

    <PopSurvey :is-show="currentPop.includes('survey')"></PopSurvey>
    <PopLogin
      :is-show="currentPop.includes('login') || currentPop.includes('resetPW')"
    ></PopLogin>
    <PopJoin :is-show="currentPop.includes('join')"></PopJoin>

    <AbovePop :is-show="isShowAbovePop"></AbovePop>

    <!-- Alert -->
    <Alert :is-show="isShowAlert"></Alert>
    <!-- <StyleSheet :isDesktop="preset.isDesktop"></StyleSheet> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PopLogin from '@/components/popup/PopLogin'
import PopJoin from '@/components/popup/PopJoin'
import PopAdditionalInfo from '@/components/popup/PopAdditionalInfo'
import PopConsultation from '@/components/popup/PopConsultation'
import PopBrochure from '@/components/popup/PopBrochure'
import PopInterest from '@/components/popup/PopInterest'
import PopPointHistory from '@/components/popup/PopPointHistory'
import PopLecture from '@/components/popup/PopLecture'
import PopEvent from '@/components/popup/PopEvent'
import PopEventParticipate from '@/components/popup/PopEventParticipate'
import PopSurvey from '@/components/popup/PopSurvey'
import AbovePop from '@/components/popup/AbovePop'
import Alert from '@/components/ui/Alert'

function getQueryStringObject(queryList) {
  const a = queryList.split('&')
  if (a === '') return {}
  const b = {}
  a.forEach((list) => {
    const p = list.split('=', 2)
    if (p.length === 1) b[p[0]] = ''
    else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '))
  })
  return b
}
// import desc from '@/static/video/desc.js'

export default {
  name: 'Index',
  components: {
    Pc: () => import('@/components/Pc'),
    Mo: () => import('@/components/Mo'),
    PopLogin,
    PopJoin,
    PopAdditionalInfo,
    PopConsultation,
    PopBrochure,
    PopInterest,
    PopPointHistory,
    PopLecture,
    PopEvent,
    PopEventParticipate,
    PopSurvey,
    AbovePop,
    Alert
  },
  async asyncData(context) {
    // Server-side
    if (process.server) {
      const { req, store, $cookies, $device, $axios, redirect } = context

      let lectureInfo
      const query = req._parsedOriginalUrl.query
      const authToken = $cookies.get('X-AUTH-TOKEN')
      const isMZCPass = $cookies.get('INTRO-PASSED')
      const isDesktop = $device.isDesktop
      const MZC_CPM_INFO = {
        authorization: process.env.MZC_CPM_AUTHORIZATION,
        endpoint: process.env.MZC_CPM_ENDPOINT,
        projectId: process.env.MZC_CPM_PROJECT_ID,
        collect: {
          endpoint: process.env.MZC_CPM_COLLECT_ENDPOINT,
          key: process.env.MZC_CPM_COLLECT_KEY
        }
      }

      store.commit('SET_DEVICE', isDesktop) // => device set
      await store.commit('session/SET_CPM_INFO', MZC_CPM_INFO) // => 환경변수 set

      if (query) {
        const queryObj = getQueryStringObject(query)
        if (queryObj.videoId) {
          // videoId가 있으면 강의 정보 get (meta 변경용)
          lectureInfo = await store.dispatch(
            'session/getVideo',
            queryObj.videoId
          )

          if (!lectureInfo) {
            redirect('/404')
          }
        }
      }

      const metaInfo = {
        // => sns 공유 메타 정보
        title: '메가존클라우드 Digital Spectrum',
        description: lectureInfo
          ? `[${lectureInfo.title}] 세션 시청하기`
          : 'Digital spectrum의 모든 것을 만나보세요!', // lectureInfo.title,
        image:
          'https://mzc-webinar.s3.amazonaws.com/static/images/sns/default.jpg',
        url: `${$axios.defaults.baseURL}${req._parsedOriginalUrl.path}`
      }

      // => 로그인 유저 체크
      authToken
        ? await store.dispatch('auth/getLoginStateValid')
        : await store.dispatch('setLoginValid', {}) // setLoginValid default 값 loginState= false
      // => 첫 화면 set
      lectureInfo
        ? store.dispatch('gotoLecture', [lectureInfo.id, lectureInfo.category]) // => 강의 url 로 들어 왔을 때
        : store.dispatch('gotoZone', ['intro'])

      const preset = {
        mzcPass: isMZCPass,
        pageTitle: '메가존클라우드 Digital Spectrum',
        isDesktop,
        ...metaInfo
      }

      return { preset }
    }
  },
  data() {
    return {
      eventData: {
        eventType: '',
        giftType: ''
      }
    }
  },
  computed: {
    ...mapState({
      currentPop: (state) => state.popup.currentPop,
      isShowAbovePop: (state) => state.popup.abovePop.isShow,
      isShowAlert: (state) => state.popup.alert.isShow
    })
  },
  mounted() {
    if (process.browser) {
      window.onNuxtReady((app) => {})
      window.Kakao.init('cdd69346886865d3a1db0001f1c07647')
    }
  },
  methods: {
    setEventType(eventData) {
      this.eventData = {
        eventType: eventData.eventType,
        giftType: eventData.giftType,
        giftName: eventData.giftName
      }
    }
  },
  head() {
    return {
      title: this.preset.pageTitle,
      meta: [
        {
          name: 'description',
          content:
            '메가존클라우드 세미나, 메가존클라우드 디지털 세미나, digital spectrum, 디지털 스펙트럼, 디스펙트럼'
        },
        {
          name: 'google',
          content: 'notranslate'
        },
        {
          property: 'og:title',
          content: '메가존클라우드 Digital Spectrum',
          vmid: 'og:title'
        },
        {
          property: 'og:type',
          content: 'website',
          vmid: 'og:type'
        },
        {
          property: 'og:url',
          content: this.preset.url,
          vmid: 'og:url'
        },
        {
          property: 'og:description',
          content: this.preset.description,
          vmid: 'og:description'
        },
        {
          property: 'og:image',
          content: this.preset.image,
          vmid: 'og:image'
        }
      ]
    }
  }
}
</script>

<style lang="scss"></style>
