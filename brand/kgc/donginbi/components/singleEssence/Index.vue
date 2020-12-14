<template>
  <div>
    <Nav />

    <!-- visual -->
    <section id="visual" ref="visual" class="visual">
      <h1 class="visual_logo">
        <img :src="imageUrl + '/logo.png'" alt="donginbi" />
      </h1>
      <div class="section__inner">
        <h2 class="a11y">
          정관장 홍삼, 단 하나로 <b>어린빛 맑은 피부를 깨우다.</b>
        </h2>
        <span @click="goSection('#vide')" class="floating visual_scroll"
          ><img :src="imageUrl + '/icon_scroll.png'" alt="scroll down"
        /></span>
      </div>
    </section>

    <!-- video 영역 -->
    <section id="video" ref="videoShared" class="videoShared">
      <div class="section__inner">
        <h2 class="a11y">VIDEO</h2>
        <div class="videoShared__tab">
          <button
            @click="videoChange('tvc')"
            :class="{ on: videoTabOn == 'tvc' }"
            class="videoShared__tab01"
            type="button"
            data-gtm-category="영상선택"
            data-gtm-action="영상_TVC"
          >
            TVC
          </button>

          <button
            @click="videoChange('digital')"
            :class="{ on: videoTabOn == 'digital' }"
            class="videoShared__tab02"
            type="button"
            data-gtm-category="영상선택"
            data-gtm-action="영상_Digital_A"
          >
            DIGITAL
          </button>
          <button
            @click="videoChange('digital_b')"
            :class="{ on: videoTabOn == 'digital_b' }"
            class="videoShared__tab03"
            type="button"
            data-gtm-category="영상선택"
            data-gtm-action="영상_Digital_B"
          >
            TVC
          </button>
        </div>

        <div class="videoShared__wrap">
          <youtube
            ref="youtube"
            @ready="ready"
            @playing="playing"
            @ended="ended"
            :video-id="videoId"
            :player-vars="playerVars"
            class="youtube"
            width="100%"
            height="100%"
          ></youtube>
          <transition name="fade">
            <div
              v-show="playState !== 1"
              @click="play()"
              :class="videoTabOn"
              class="video__cover"
            ></div>
          </transition>
        </div>
        <!-- 공유버튼 -->
        <div class="share_btnWarp">
          <button
            @click="facebookShare"
            class="btn__share btn__facebook"
            type="button"
            data-gtm-category="공유하기"
            data-gtm-action="공유하기_FB"
          >
            페이스북 공유
          </button>
          <button
            @click="kakaoShare"
            class="btn__share btn__kakao"
            type="button"
            data-gtm-category="공유하기"
            data-gtm-action="공유하기_카톡"
          >
            카카오톡 공유
          </button>
          <button
            @click="copyUrl('url')"
            class="btn__share btn__copy"
            type="button"
            data-gtm-category="공유하기"
            data-gtm-action="공유하기_링크"
          >
            url복사
          </button>
        </div>
      </div>
    </section>

    <!-- event1 영역 -->
    <div id="event1" ref="event1" class="eventWrap">
      <!-- step1 kv -->
      <transition name="fade">
        <section v-show="eventStep == 'step1'" class="event1">
          <div class="section__inner">
            <div class="a11y">
              <h2>
                나의 피부에 홍삼 추출물 100% 황산화 에센스로 답하다.
              </h2>
              <p>
                내 피부의 변화를 가져다 줄 싱글 에센스의 기능을 선택하고 2주간
                체험할 수 있는 샘플kit를 받으세요.
              </p>
            </div>

            <img
              v-if="deviceKind == 'pc'"
              :src="`${imageUrl}/product.gif?_=`"
              :data-animated="`${imageUrl}/product.gif?_=`"
              :data-static="`${imageUrl}/product.gif?_=`"
              class="product__gif"
              alt=""
            />

            <ul class="product__item">
              <li
                v-for="list in selectList"
                :key="list.tit"
                :class="{ on: userSelect == list }"
                @click="showEvent1Select(list)"
                :data-gtm-action="eventStep == 'step1' ? list.gtmStepOne : ''"
                data-gtm-category="EVENT 01 1단계"
              >
                {{ list.tit }}
              </li>
              <li @click="event1ClickReset()"></li>
            </ul>

            <div v-if="deviceKind == 'pc'" class="product__textBox">
              <p class="product__text">
                <img
                  :src="
                    `${imageUrl}/list_showText` + userSelect.number + '.png'
                  "
                  alt=""
                />
              </p>
            </div>

            <button
              @click="eventCheck()"
              :class="{ on: userSelect.tit }"
              class="btn btn__kit"
              data-gtm-category="EVENT 01 1단계"
              data-gtm-action="샘플신청"
            >
              2주 체험kit 신청하기
            </button>
          </div>
        </section>
      </transition>

      <!-- step2  -->
      <transition name="fade">
        <section
          ref="eventStep2"
          v-if="deviceKind == 'pc'"
          v-show="eventStep == 'step2'"
          class="eventStep2"
        >
          <div v-if="eventStep == 'step2'" class="section__inner">
            <h2 class="a11y">
              정관장 홍삼, 단 하나로 어린빛 맑은 피부를 깨우다.
            </h2>
            <p class="eventStep2__txt">
              <img
                :src="`${imageUrl}/graphTxt` + userSelect.number + '.png'"
                alt=""
              />
            </p>
            <Graph />
            <button
              @click="
                openPop({ popName: 'PopPersonal', popPos: eventOffsetTop })
              "
              class="btn btn__event1Join"
              data-gtm-category="EVENT 01 2단계"
              data-gtm-action="신청하기"
            >
              신청하기
            </button>

            <ul class="thum__item">
              <li
                v-for="list in selectList"
                :key="list.tit"
                :class="{ on: userSelect == list }"
                @click="eventStep2Select(list)"
                :data-gtm-action="eventStep == 'step2' ? list.gtmStepTwo : ''"
                data-gtm-category="EVENT 01 2단계"
              >
                {{ list.tit }}
              </li>
            </ul>
            <img
              :src="`${imageUrl}/emblem` + userSelect.number + '.png'"
              class="emblem"
              alt=""
            />
          </div>
          <button @click="eventRetrun" type="button" class="btn btn__retrun">
            이벤트 되돌아가기
          </button>
        </section>
      </transition>
    </div>

    <!-- evnet2 : 인증이벤트 -->
    <section id="event2" ref="reviewEvent" class="reviewEvent">
      <div class="section__inner">
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img :src="`${imageUrl}/event_slide01.jpg`" alt="" />
            </div>
            <div class="swiper-slide">
              <img :src="`${imageUrl}/event_slide02.jpg`" alt="" />
            </div>
          </div>
        </div>

        <div class="a11y">
          <h2>EVENT2 : 홍삼추출물 100% 에센스 사용후기를 남겨주세요.</h2>
          <p>
            샘플 수령 후 사용 후기를 본인의 instagram 계정에 필수 해시태그와
            함께 업로드 해주신 분들에 한해 추첨을 통해 500명 선정!
          </p>

          <p>
            동인비 1899 싱글에센스 70ml 본품<sub>(57,000원 상당)</sub>을
            보내드립니다!
          </p>
          <p>
            <span>#홍삼추출물100</span> <span>#홍삼추출물100에센스</span>
            <span>#동인비</span> <span>#정관장에센스</span>
            <span>#동인비싱글에센스</span> <span>#1988싱글에센스</span>
          </p>
        </div>
        <button
          @click="eventEnd()"
          type="button"
          class="btn btn__hashCopy"
          data-gtm-category="EVENT 02"
          data-gtm-action="해시태그 복사"
        >
          필수 해시태그 복사
        </button>

        <a
          v-if="deviceKind === 'pc'"
          class="btn btn__reviewJoin"
          href="https://www.instagram.com/"
          target="_blank"
          data-gtm-category="EVENT 02"
          data-gtm-action="인스타 바로가기"
          >인스타그램 바로가기</a
        >
        <button
          v-else
          @click="instaAppGo()"
          class="btn btn__reviewJoin"
          type="button"
          data-gtm-category="EVENT 02"
          data-gtm-action="인스타 바로가기"
        >
          인스타그램 바로가기
        </button>
      </div>
    </section>

    <!-- 제품설명 -->
    <section id="product" ref="product" class="product">
      <div class="product_01">
        <div class="section__inner">
          <div class="thum-icon">
            <img :src="imageUrl + '/thum_icon.gif'" alt="" />
          </div>
          <div class="a11y">
            <h2>PRODUCT : 동인비 1899 싱글 에센스</h2>
            <p>동인비 1899 싱글에센스</p>
            <dl>
              <dt>용량</dt>
              <dd>120ml</dd>

              <dt>가격</dt>
              <dd>90,000</dd>

              <dt>전성분</dt>
              <dd>홍삼 추출물 100%</dd>
            </dl>

            <dl>
              <dt>맑은 홍삼 추출물 100%</dt>
              <dd>
                홍삼 단일추출물이 스킨케어 첫 단계에 순하게 흡수되어 홍삼의
                항산화 성분을 피부에 전달합니다.
              </dd>

              <dt>어린빛 항산화 워터 에센스</dt>
              <dd>
                피부 결을 매끄럽게 정돈하고 투명도 개선에 도움을 주어 맑고
                건강한 어린빛을 선사합니다.
              </dd>

              <dt>풍부한 수분의 밀착 흡수</dt>
              <dd>
                수분감이 풍부하게 느껴지는 트리트먼트 에센스 제형이 밀착
                흡수되어 하루종일 촉촉한 피부를 유지시켜 줍니다.
              </dd>
            </dl>
          </div>

          <button
            @click="openPop({ popName: 'PopStore' })"
            type="button"
            class="btn btn__buy"
            data-gtm-category="제품구매"
            data-gtm-action="구매하기"
          >
            구매하기
          </button>
          <a
            href="https://www.donginbi.com/communications/location.php?board=location"
            target="_blank"
            class="btn btn__storeGo"
            data-gtm-category="제품구매"
            data-gtm-action="매장찾기"
            >매장 찾아보기</a
          >
        </div>
      </div>
      <div class="product_02">
        <h2 class="a11y">동인비 1899 싱글 에센스 화해 화장품 설문단 리뷰</h2>
        <ul class="a11y">
          <li>순하다고 느꼈어요 96%</li>
          <li>제품이 전반적으로 만족스러워요 90%</li>
          <li>피부결이 매끄러워진 것 같아요 90%</li>
          <li>사용 후 피부과 진정된 것 같아요 86%</li>
        </ul>
      </div>
    </section>

    <!-- 유의사항 -->
    <section id="notice" ref="notice" class="notice">
      <div class="section__inner">
        <h3>
          <img :src="`${imageUrl}/notice_title.png`" alt="이벤트 유의사항" />
        </h3>
        <div v-if="deviceKind === 'pc'">
          <p class="notice__title">EVENT 01</p>
          <ul>
            <li>
              부적절한 이벤트 참여를 방지하기 위해 본인 인증은 필수 단계이며,
              허위 정보 및 부적절한 형태로 이벤트에 참여하거나 당첨된 경우<br />
              사전 안내 없이 참여 이력 삭제 및 당첨 취소가 될 수 있습니다.
            </li>
            <li>
              이벤트 기간 중 샘플 당첨은 연락처 1개당 1회만 가능하며, 샘플
              당첨자는 하루 290명으로 제한됩니다.
            </li>
            <li>
              이벤트 참여는 1일 1회 가능하며, 당첨되지 않은 경우 다음 날 재응모
              가능합니다.
            </li>
            <li>
              잘못된 개인정보 (휴대폰 번호 / 경품 수령 주소 / 인스타그램 ID)
              입력으로 연락이 불가능하거나,<br />경품 수령이 불가한 경우 이는
              당사가 책임지지 않으며 경품 반송 시 재발송 되지 않습니다.
            </li>
            <li>
              경품 배송을 위해 이벤트 참여 시 입력한 휴대폰 번호로 연락을 요청할
              수 있습니다.
            </li>
            <li>
              준비된 경품이 모두 소진될 경우, 이벤트는 조기 마감 될 수 있습니다.
            </li>
            <li>
              촬영을 위한 소품은 트레이와 미니 전구 두가지 중 한 가지
              랜덤발송되며 선택하실 수 없습니다.
            </li>
          </ul>

          <p class="notice__title">EVENT 02</p>
          <ul>
            <li>
              리뷰 인증은 여러 번 가능하나, 경품은 최초 1회 인증 시에만
              증정됩니다.
            </li>
            <li>
              비공개 계정 참여 또는 형식에 맞지 않거나 당첨자 선정 기간 이전
              리뷰가 삭제된 경우, 선정에서 제외됩니다.
            </li>
            <li>
              EVENT 02 참여자의 경우 EVENT 01 참여 시 입력하셨던 주소지로 경품이
              배송됩니다.
            </li>
            <li>
              경품 배송을 위해 이벤트 참여 시 입력한 휴대폰 번호로 연락을 요청할
              수 있습니다.
            </li>
          </ul>

          <p class="notice__title">이벤트 관련 문의</p>
          <ul>
            <li>
              <a href="mailto:singleessence_event@mz.co.kr"
                >singleessence_event@mz.co.kr</a
              >
            </li>
          </ul>
        </div>

        <div v-else>
          <p class="notice__title">EVENT 01</p>
          <ul>
            <li>
              부적절한 이벤트 참여를 방지하기 위해 본인 인증은 필수 단계이며,
              허위 정보 및 부적절한 형태로 이벤트에 참여하거나 당첨된 경우 사전
              안내 없이 참여 이력 삭제 및 당첨 취소가 될 수 있습니다.
            </li>
            <li>
              이벤트 기간 중 샘플 당첨은 연락처 1개당 1회만 가능하며, 샘플
              당첨자는<br />하루 290명으로 제한됩니다.
            </li>
            <li>
              이벤트 참여는 1일 1회 가능하며, 당첨되지 않은 경우 다음 날 재응모
              가능합니다.
            </li>
            <li>
              잘못된 개인정보 (휴대폰 번호 / 경품 수령 주소 / 인스타그램 ID)
              입력으로 연락이 불가능하거나, 경품 수령이 불가한 경우 이는 당사가
              책임지지 않으며 경품 반송 시 재발송 되지 않습니다.
            </li>
            <li>
              경품 배송을 위해 이벤트 참여 시 입력한 휴대폰 번호로 연락을 요청할
              수 있습니다.
            </li>
            <li>
              준비된 경품이 모두 소진될 경우, 이벤트는 조기 마감 될 수 있습니다.
            </li>
            <li>
              촬영을 위한 소품은 트레이와 미니 전구 두가지 중 한 가지
              랜덤발송되며 선택하실 수 없습니다.
            </li>
          </ul>

          <p class="notice__title">EVENT 02</p>
          <ul>
            <li>
              리뷰 인증은 여러 번 가능하나, 경품은 최초 1회 인증 시에만
              증정됩니다.
            </li>
            <li>
              비공개 계정 참여 또는 형식에 맞지 않거나 당첨자 선정 기간 이전
              리뷰가 삭제된 경우, 선정에서 제외됩니다.
            </li>
            <li>
              EVENT 02 참여자의 경우 EVENT 01 참여 시 입력하셨던 주소지로 경품이
              배송됩니다.
            </li>
            <li>
              경품 배송을 위해 이벤트 참여 시 입력한 휴대폰 번호로 연락을 요청할
              수 있습니다.
            </li>
          </ul>

          <p class="notice__title">이벤트 관련 문의</p>
          <ul>
            <li>
              <a href="mailto:singleessence_event@mz.co.kr"
                >singleessence_event@mz.co.kr</a
              >
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- popup -->
    <PopPersonal :is-show="currentPop === 'PopPersonal'" />
    <PopAlert :is-show="currentPop === 'PopAlert'" />
    <PopStore :is-show="currentPop === 'PopStore'" />
    <PopPost />

    <!-- pop:mobile만 사용 -->
    <PopEvent1Step1 :is-show="currentPop === 'PopEvent1Step1'" />
    <PopEvent1Step2 :is-show="currentPop === 'PopEvent1Step2'" />

    <Loading v-show="loading" />
  </div>
</template>

<script>
import Nav from '@/components/singleEssence/Nav'
import Graph from '@/components/singleEssence/Graph'
import PopPersonal from '@/components/singleEssence/PopPersonal'
import PopEvent1Step1 from '@/components/singleEssence/PopEvent1Step1'
import PopEvent1Step2 from '@/components/singleEssence/PopEvent1Step2'

import PopAlert from '@/components/singleEssence/PopAlert'
import PopPost from '@/components/singleEssence/PopPost'
import PopStore from '@/components/singleEssence/PopStore'
import Loading from '@/components/shared/Loading'
import { youtubeEmbedMixin } from '@/plugins/youtubeMixin'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SingleEssence',
  components: {
    Nav,
    Graph,
    PopPersonal,
    PopEvent1Step1,
    PopEvent1Step2,
    PopAlert,
    PopPost,
    PopStore,
    Loading
  },
  mixins: [youtubeEmbedMixin],
  data() {
    return {
      loading: true,
      eventOffsetTop: null,
      oneSelect: false,
      hash: null,
      deviceKind: this.$device.isDesktop ? 'pc' : 'm',
      ios: null,
      scrollTop: 0,
      videoTabOn: 'tvc',
      videoId: 'BnQvIcxvBXI',
      swiperOption: {
        effect: 'slide',
        direction: 'vertical',
        loop: true,
        autoplay: {
          delay: 5000
        }
      }
    }
  },
  computed: {
    ...mapState({
      imageUrl(state) {
        return `${state.singleEssence.imageUrlRoot}/${this.deviceKind}`
      },
      currentPop: (state) => state.popup.currentPop,
      selectList: (state) => state.singleEssence.selectList,
      userSelect: (state) => state.singleEssence.userSelect,
      eventStep: (state) => state.singleEssence.eventStep
    }),
    swiper() {
      return this.$refs.event2Slider.$swiper
    }
  },
  created() {},
  mounted() {
    window.Kakao.init('1ba05027dea00a874333a6a2bbfa9a80')
    this.$nextTick(() => {
      this.loading = false
    })

    if (process.browser) {
      window.onNuxtReady((app) => {
        this.init()
      })
    }
  },

  methods: {
    ...mapActions('popup', ['openPop', 'setLoading']),
    ...mapActions('singleEssence', ['setUserSelect']),
    init() {
      this.eventOffsetTop = this.$refs.event1.offsetTop
      this.ios = this.checkIos()
      this.hash = location.hash
    },
    checkEventStart() {
      this.$axios
        .get('/api/single-essence/time-check')
        .then((res) => {
          if (res.data.success) {
            this.eventStart(this.userSelect.number)
          } else {
            alert(res.data.error)
          }
        })
        .catch((error) => alert(error.response.data.error))
    },
    videoChange(video) {
      if (video === 'tvc') {
        this.videoId = 'BnQvIcxvBXI'
      } else if (video === 'digital') {
        this.videoId = 'p79tRTGb3F0'
      } else {
        this.videoId = '0eGHeKfp8oE'
      }

      this.videoTabOn = video
      this.ended()
    },
    eventCheck() {
      this.eventEnd()
      // !this.userSelect.tit
      //   ? alert('싱글 에센스의 기능을 먼저 선택해주세요.')
      //   : this.checkEventStart()
    },
    event1ClickReset() {
      this.$store.commit('singleEssence/INIT_EVENT1_RESET')
      $('.product__gif, .product__textBox').removeClass('on')
      this.oneSelect = false
    },
    showEvent1Select(select) {
      this.$store.commit('singleEssence/SET_USER_SELECT', select)

      const $gif = $('.product__gif')
      const src = $gif.attr('src')
      if (!this.oneSelect) {
        this.oneSelect = true
        $gif.addClass('on')
        // $('.product__textBox').addClass('on')
        const newSrc = src + Math.random()
        $gif.attr('src', '')
        $gif.attr('src', newSrc)
        setTimeout(() => {
          $('.product__gif').removeClass('on')
          $('.product__textBox').addClass('on')
        }, 2500)
      }
    },
    eventStart(number) {
      this.eventEnd()
      // if (this.deviceKind === 'pc') {
      //   this.setUserSelect(this.userSelect)
      //   this.$store.commit('singleEssence/SET_EVENT_STEP', 'step2')
      //   this.goSection('#event1')
      //   setTimeout(() => {
      //     $('.graph' + number).addClass('on')
      //   }, 1000)
      // } else {
      //   this.setUserSelect(this.userSelect)
      //   this.openPop({
      //     popName: 'PopEvent1Step1',
      //     popPos: this.eventOffsetTop
      //   })
      // }
    },
    eventRetrun() {
      this.eventEnd()
      // this.$store.commit('singleEssence/SET_EVENT_STEP', 'step1')
      // this.goSection('#event1')
      // $('.graph').removeClass('on')
    },
    eventStep2Select(select) {
      this.eventEnd()
      this.showEvent1Select(select)
      this.setUserSelect(this.userSelect)
      if (this.deviceKind === 'pc') {
        $('.graph').removeClass('on')
        $('.graph' + select.number).addClass('on')
      } else {
      }
    },
    kakaoShare() {
      this.eventEnd()
      // window.Kakao.Link.sendDefault({
      //   objectType: 'feed',
      //   content: {
      //     title: '동인비 1899 싱글 에센스',
      //     description:
      //       '내 피부의 변화를 가져다 줄 2주 체험 KIT 100% 증정 이벤트에 참여하세요.',
      //     imageUrl:
      //       'https://donginbi.s3.amazonaws.com/static/singleessence/images/shared/300x300.jpg',
      //     imageWidth: 300,
      //     imageHeight: 300,
      //     link: {
      //       mobileWebUrl:
      //         'https://singleessence.event-donginbi.co.kr/?utm_source=Share&utm_medium=Kakao&utm_campaign=sample',
      //       webUrl:
      //         'https://singleessence.event-donginbi.co.kr/?utm_source=Share&utm_medium=Kakao&utm_campaign=sample'
      //     }
      //   }
      // })
    },
    facebookShare() {
      this.eventEnd()
      // const url =
      //   'https://' +
      //   location.host +
      //   '/?utm_source=Share&utm_medium=FB&utm_campaign=sample'
      // window.open(
      //   'https://www.facebook.com/sharer/sharer.php?u=' +
      //     encodeURIComponent(url),
      //   'fbPop',
      //   'menubar=false, scrollbars=no,width=600px,height=450px'
      // )
    },
    copyUrl(data) {
      this.eventEnd()
      // const url =
      //   'https://' +
      //   location.host +
      //   '/?utm_source=Share&utm_medium=Link&utm_campaign=sample'
      // this.$copyText(
      //   data === 'url'
      //     ? url
      //     : '#홍삼추출물100 #홍삼추출물100에센스 #동인비 #정관장에센스 #동인비싱글에센스 #1899싱글에센스'
      // ).then(
      //   (e) => {
      //     data === 'url'
      //       ? alert('URL 복사가 완료되었습니다')
      //       : alert('필수 해시태그 복사가 완료되었습니다')
      //   },
      //   (e) => {
      //     alert('복사에 실패했습니다.\n다시 시도해 주세요.')
      //   }
      // )
    },
    goSection(section, toggle) {
      const offsetTop = $(section).offset().top
      $('html, body').animate(
        {
          scrollTop: Math.ceil(offsetTop)
        },
        500
      )
      if (toggle) this.toggleNav()
    },
    checkIos() {
      const varUA = navigator.userAgent.toLowerCase() // userAgent 값 얻기

      if (varUA.includes('android')) {
        // 안드로이드
        return 'android'
      } else if (
        varUA.includes('iphone') ||
        varUA.includes('ipad') ||
        varUA.includes('ipod')
      ) {
        // IOS
        return 'ios'
      } else {
        // 아이폰, 안드로이드 외
        return 'other'
      }
    },
    instaAppGo() {
      const deviceKind = this.deviceKind
      if (deviceKind === 'm') {
        if (this.ios === 'ios') {
          setTimeout(function() {
            window.open(
              'https://itunes.apple.com/kr/app/instagram/id389801252?mt=8'
            )
          }, 1500)
          location.href = 'instagram://media'
        } else {
          location.href =
            'intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end'
        }
      }
    },
    eventEnd() {
      alert('이벤트가 종료되었습니다.')
      // alert(
      //   '인증 이벤트 참여해주신 모든 분들께 감사 드립니다.\n당첨자에게는 7월 27일 (월) 개별 연락 드릴 예정입니다.'
      // )
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/singleEssence/style';
</style>
