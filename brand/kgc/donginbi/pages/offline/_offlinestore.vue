<template>
  <div>
    <h1 class="a11y">DONGINBI(동인비)1899</h1>
    <article>
      <header class="visual">
        <h2 class="a11y">
          동인비 1899 싱글 에센스 샘플 KIT 오프라인 수령 안내
        </h2>
      </header>

      <section class="checkUserInfo">
        <h2 class="a11y">개인정보 확인</h2>
        <dl class="checkUserInfo__inputBoxWrap">
          <dt class="a11y">당첨자명</dt>
          <dd class="checkUserInfo__inputBox">{{ userInfo.name }}</dd>

          <dt class="a11y">체험 KIT</dt>
          <dd class="checkUserInfo__inputBox">{{ userInfo.kit }}</dd>
        </dl>

        <div v-show="currentStep === 1" class="step step--1">
          <div class="a11y">
            <h2>오프라인 수령 쿠폰</h2>
            <dl>
              <dt>쿠폰 교환 일정</dt>
              <dd>11/23(월)까지</dd>
            </dl>
            <p>
              1층 수령 매장 방문 후 본 쿠폰을 제시하면
              <b>동인비 1899 싱글 에센스 체험 KIT</b>를 드립니다. 직원 확인 전
              버튼 클릭 시 제품 수령이 불가합니다.
            </p>
          </div>
          <button
            @click="nextStep"
            type="button"
            class="btn--staffConfirm btn--full"
          >
            <span class="a11y">직원 확인 완료</span>
          </button>
        </div>

        <div v-show="currentStep === 2" class="step step--2">
          <div class="a11y">
            <h2>최종 확인 안내</h2>
            <p>
              본 버튼을 누르시면 제품 수렬이 불가합니다.
              <em>직원인 경우에만 확인 버튼을 눌러주시기 바랍니다.</em>
            </p>
          </div>

          <label for="userlocation" class="selectBox--label">
            <select
              id="userlocation"
              v-model="userLocation"
              class="selectBox--location"
              name="location"
            >
              <option value>지역선택</option>
              <option
                v-for="(location, idx) in locationList"
                :value="location"
                :key="idx"
                >{{ location }}</option
              >
            </select>
          </label>

          <label for="userstore" class="selectBox--label">
            <select
              id="userstore"
              v-model="userStore"
              class="selectBox--store"
              name="store"
            >
              <option value>매장선택</option>
              <option
                v-for="(store, idx) in filteredList[0].storeList"
                :value="store"
                :key="idx + store"
                >{{ store }}</option
              >
            </select>
          </label>

          <div class="btnWrap">
            <button @click="prevStep" type="button" class="btn--cancel">
              <span class="a11y">취소</span>
            </button>
            <button
              @click="submitStoreInfo"
              type="button"
              class="btn--staffConfirm"
            >
              <span class="a11y">직원 확인 완료</span>
            </button>
          </div>
        </div>

        <div v-show="currentStep === 3" class="step step--3">
          <div class="a11y">
            <h2>동인비 1899 싱글 에센스 샘플 KIT 오프라인 수령</h2>
            <p>쿠폰 사용이 완료되었습니다.</p>
          </div>
          <!-- <button
            @click="completeStep"
            type="button"
            class="btn--couponComplete"
          >
            <span class="a11y">쿠폰 사용 완료</span>
          </button> -->
        </div>
      </section>

      <footer class="note">
        <div class="a11y">
          <h2>쿠폰 사용 유의사항</h2>
          <p>
            직원 확인 완료 버튼은 샘플 수령 시 매장 직원이 누르는 버튼입니다.
            샘플 수령 전 직원 확인 완료 버튼을 누르시면 쿠폰 사용이 불가합니다.
            쿠폰 교환 일정이 지난 경우 샘플 KIT 수령이 불가합니다. 본 쿠폰은
            현금 및 다른 상품으로 교환 불가합니다.
          </p>
        </div>
      </footer>
    </article>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Offlinestore',
  data() {
    return {
      // userInfo: {},
      userLocation: '',
      userStore: '',
      filteredList: [{ location: '', storeList: [] }],
      locationList: [
        '경기',
        '경남',
        '경북',
        '광주',
        '대구',
        '대전',
        '부산',
        '서울',
        '울산',
        '인천',
        '충남',
        '충북'
      ],
      storeLists: [
        {
          location: '경기',
          storeList: [
            '갤러리아 광교점',
            '경기 롯데백화점 구리점',
            '경기 롯데백화점 수원점',
            '경기 롯데백화점 일산점',
            '경기 신세계백화점 의정부점',
            '롯데백화점 분당점',
            '롯데백화점 중동점',
            '롯데백화점평촌점',
            '롯데수원점',
            'AK수원점',
            'AK플라자 평택점'
          ]
        },
        {
          location: '경남',
          storeList: ['갤러리아 진주점', '롯데백화점 창원점', '신세계마산점']
        },
        { location: '경북', storeList: ['롯데백화점 포항점'] },
        { location: '광주', storeList: ['광주 롯데백화점 광주점'] },
        {
          location: '대구',
          storeList: [
            '대구 대구백화점 플라자점',
            '대구 롯데백화점 상인점',
            '대구 롯데백화점 대구점'
          ]
        },
        {
          location: '대전',
          storeList: ['대전 롯데백화점 대전점', '대전세이점']
        },
        {
          location: '부산',
          storeList: [
            '부산 롯데백화점 동래점',
            '부산 롯데백화점 광복점',
            '부산 롯데백화점 센텀시티점'
          ]
        },
        {
          location: '서울',
          storeList: [
            '서울 롯데백화점 관악점',
            '서울 롯데백화점 김포공항점',
            '서울 롯데백화점 잠실점',
            '서울 현대백화점 천호점',
            '서울 롯데백화점 미아점',
            '롯데백화점 청량리점',
            '롯데백화점 영등포점'
          ]
        },
        {
          location: '울산',
          storeList: ['울산 현대백화점 울산동구점', '울산 롯데백화점 울산점']
        },
        { location: '인천', storeList: ['인천 롯데백화점 인천터미널점'] },
        { location: '충남', storeList: ['롯데충청점'] },
        { location: '충북', storeList: ['현대백화점 충청점'] }
      ],
      currentStep: 1,
      couponCode: ''
    }
  },
  computed: {
    ...mapState({
      imageUrl(state) {
        return `${state.kit.imageUrlRoot}`
      },
      currentPop: (state) => state.popup.currentPop,
      forceUpdate: (state) => state.popup.forceUpdate,
      userName: (state) => state.offlinestore.userName,
      userKit: (state) => state.offlinestore.userKit
    })
    // /* filteredList() {
    //   return this.storeLists.filter((val) => {
    //     return val.location === this.userLocation ? val.storeList : []
    //   })
    // } */
  },
  watch: {
    userLocation(newval, oldval) {
      if (newval === undefined || newval === null || newval === '') {
        this.userStore = ''
        this.filteredList = [{ location: '', storeList: [] }]
        return false
      }
      this.filteredList = this.storeLists.filter((val) => {
        return val.location === this.userLocation
      })
      this.userStore = ''
    }
  },
  async asyncData({ params, store, $axios, redirect }) {
    let userInfo = {}
    let currentStep = null
    await $axios
      .post(`/api/offline/${params.offlinestore}`)
      .then((res) => {
        if (res.data.result) {
          const body = res.data.body
          body.couponeCode = params.offlinestore
          userInfo = body
          currentStep = userInfo.usedCoupon === true ? 3 : 1
        }
      })
      .catch((error) => {
        console.log(error)
        redirect('/error')
      })
      .finally(() => {})
    return { userInfo, currentStep }
  },
  head() {
    return {
      title: '동인비 1899 싱글 에센스',
      meta: [
        {
          property: 'og:title',
          content: '동인비 1899 싱글 에센스',
          vmid: 'og:title'
        },
        {
          property: 'og:type',
          content: 'website',
          vmid: 'og:type'
        },
        {
          property: 'og:url',
          content: 'https://singleessence.event-donginbi.co.kr',
          vmid: 'og:url'
        },
        {
          property: 'og:description',
          content: '정관장 홍삼, 단 하나로 어린 빛 맑은 피부를 깨우다.',
          vmid: 'og:description'
        },
        {
          property: 'og:image',
          content:
            'https://donginbi.s3.amazonaws.com/static/singleessence/images/shared/600x315.jpg',
          vmid: 'og:image'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap'
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loading = false
      if (this.userInfo.usedCoupon === true) {
        this.currentStep = 3
      }
    })

    if (process.browser) {
      window.onNuxtReady((app) => {
        // this.init()
      })
    }
  },
  methods: {
    ...mapActions('popup', ['openPop', 'setLoading']),
    nextStep() {
      this.currentStep++
    },
    prevStep() {
      this.currentStep--
    },
    async submitStoreInfo() {
      this.setLoading(true)

      const userModel = {
        couponeCode: this.userInfo.couponeCode,
        storeRegion: this.userLocation,
        storeName: this.userStore
      }
      await this.$axios
        .post('/api/offline/confirm', userModel)
        .then((res) => {
          this.nextStep()
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
        .finally(() => {
          this.setLoading(false)
        })
    },
    completeStep() {
      alert('완료')
    },
    mockupApi(data) {
      return new Promise((resolve, reject) => {
        if (data) {
          setTimeout(() => {
            resolve(data)
          }, 1000)
        } else {
          setTimeout(() => {
            reject(new Error('error'))
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/offlinestore/style';
</style>
