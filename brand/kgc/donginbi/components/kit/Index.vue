<template>
  <div>
    <Pc v-if="this.$device.isDesktop"></Pc>
    <Mo v-else></Mo>
    <Nav />

    <section id="visual" class="section visual">
      <div class="section__inner"></div>
      <svg
        @click="goSection()"
        width="92px"
        height="45px"
        class="visual__svg floating"
      >
        <path
          fill-rule="evenodd"
          fill="#FDFCF9"
          d="M52.567 34.857L43.55 44.6c-.238.257-.553.37-.865.357-.312.013-.627-.1-.866-.357l-9.016-9.743a1.32 1.32 0 010-1.771 1.098 1.098 0 011.638 0l8.243 8.906 8.245-8.906a1.098 1.098 0 011.638 0 1.324 1.324 0 010 1.771z"
        />
        <text
          font-family="Noto Sans KR"
          transform="translate(0 17.909) scale(3.13632)"
          font-size="7.652"
        >
          <tspan font-family="Noto Sans KR" fill="#FDFCF9">SCROLL</tspan>
        </text>
      </svg>
    </section>

    <!-- review -->
    <section id="review" class="section review">
      <div class="section__inner">
        <div class="tabBox">
          <button
            v-for="(list, idx) in review.titList"
            :key="idx"
            :class="{ active: review.activeIdx === idx }"
            @click="setReview(idx)"
            type="button"
            class="btn"
          >
            <span>{{ list }}</span>
          </button>
        </div>
        <div class="reviewBox">
          <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
              <div
                v-for="(list, idx) in review.list"
                :key="idx + list"
                class="swiper-slide"
              >
                <div class="review__header">
                  <img
                    :src="
                      `${imageUrl}/reviewThumb/0${review.activeIdx + 1}_${idx +
                        1}_${list.id}.jpg`
                    "
                    alt="image"
                  />
                  <p class="review__id">@{{ list.id }}</p>
                </div>
                <div class="review__desc">
                  <p v-html="list.desc"></p>
                </div>
                <a
                  :href="list.url"
                  :data-gtm-action="review.titList[review.activeIdx]"
                  :data-gtm-label="`@${list.id}`"
                  target="_blank"
                  class="review__link"
                  data-gtm-category="REVIEW"
                ></a>
              </div>
            </div>
            <div class="swiper-pagination swiper-pagination-bullets"></div>
            <div v-if="this.$device.isDesktop" class="swiper-navigations">
              <div class="swiper-button-custom-prev">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21.5"
                  height="28.5"
                >
                  <path
                    stroke="#FFF"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                    d="M15.786 3.097L2.91 14.39l11.876 11.294"
                  />
                </svg>
              </div>
              <div class="swiper-button-custom-next">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20.5"
                  height="28.5"
                >
                  <path
                    stroke="#FFF"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                    d="M4.214 2.097L17.09 13.39 4.214 24.684"
                  />
                </svg>
              </div>
            </div>
            <div v-else class="swiper-navigations">
              <div class="swiper-button-custom-prev">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15.5"
                  height="22.5"
                >
                  <path
                    stroke="#FFF"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                    d="M11.15 4.865l-6.3 5.525 6.3 5.526"
                  />
                </svg>
              </div>
              <div class="swiper-button-custom-next">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14.5"
                  height="22.5"
                >
                  <path
                    stroke="#FFF"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                    d="M3.85 3.865l6.3 6.525-6.3 6.526"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- video -->
    <section id="video" class="section video">
      <div class="section__inner">
        <div class="tabBox">
          <button
            :class="{ active: video.activeIdx === 0 }"
            @click="setVideo(0)"
            type="button"
            class="btn eng"
          >
            <span data-gtm-category="VIDEO" data-gtm-action="TVC"
              ><b data-gtm-category="VIDEO" data-gtm-action="TVC">TVC</b></span
            >
          </button>
          <button
            :class="{ active: video.activeIdx === 1 }"
            @click="setVideo(1)"
            type="button"
            class="btn"
          >
            <span data-gtm-category="VIDEO" data-gtm-action="피부진정편">
              <b data-gtm-category="VIDEO" data-gtm-action="피부진정편"
                >피부진정</b
              >편
            </span>
          </button>
          <button
            :class="{ active: video.activeIdx === 2 }"
            @click="setVideo(2)"
            type="button"
            class="btn"
          >
            <span data-gtm-category="VIDEO" data-gtm-action="피부보습편">
              <b data-gtm-category="VIDEO" data-gtm-action="피부보습편"
                >피부보습</b
              >편
            </span>
          </button>
        </div>
        <div class="videoBox">
          <youtube
            ref="youtube"
            @ready="ready"
            @playing="playing"
            @ended="ended"
            :video-id="video.id"
            :player-vars="playerVars"
            class="youtube"
            width="100%"
            height="100%"
          ></youtube>
          <transition name="fade">
            <div
              v-show="playState !== 1"
              @click="play()"
              :class="tabOn"
              :data-gtm-action="
                video.activeIdx === 0
                  ? 'TVC'
                  : video.activeIdx === 1
                  ? '피부진정편'
                  : '피부보습편'
              "
              class="video__cover"
              data-gtm-category="VIDEO"
              data-gtm-label="재생"
            ></div>
          </transition>
        </div>
        <div class="shareBox">
          <button
            @click="kakaoShare()"
            class="btn"
            data-gtm-category="SHARE"
            data-gtm-action="KAKAO"
          >
            <span class="a11y">카카오톡 공유하기</span>
          </button>
          <button
            @click="copyUrl"
            class="btn"
            data-gtm-category="SHARE"
            data-gtm-action="URL"
          >
            <span class="a11y">링크 복사하기</span>
          </button>
        </div>
      </div>
    </section>

    <!-- event -->
    <section id="event" class="section event">
      <div class="section__inner">
        <div class="a11y">
          <h1>event</h1>
          <h2>
            내 피부 맞춤 체험 kit를 신청하세요! 매일 당첨자 1,000명에게 체험 kit
            각 500개를 드립니다.
          </h2>
        </div>
        <div :class="stepIdx" class="solution">
          <transition name="fade" mode="out-in">
            <div v-show="stepIdx === 0" class="step1">
              <form action>
                <label
                  :class="{ active: selectedSolution === 'soothing' }"
                  for="solutionSkinSoothing"
                  class="label__solution"
                >
                  <input
                    id="solutionSkinSoothing"
                    v-model="selectedSolution"
                    value="soothing"
                    type="radio"
                    name="solution"
                  />
                  <span class="a11y"
                    >자극 받은 피부를 순하게 피부 파워진정</span
                  >
                </label>
                <label
                  :class="{ active: selectedSolution === 'moisture' }"
                  for="solutionSkinMoisture"
                  class="label__solution"
                >
                  <input
                    id="solutionSkinMoisture"
                    v-model="selectedSolution"
                    value="moisture"
                    type="radio"
                    name="solution"
                  />
                  <span class="a11y">피부를 촉촉하게 채워주는 24시간 보습</span>
                </label>
                <button
                  @click="nextStep"
                  type="button"
                  class="btn btn__choice"
                  data-gtm-category="EVENT"
                  data-gtm-action="체험 KIT 확인"
                >
                  <span class="a11y">체험 KIT 확인</span>
                </button>
              </form>
            </div>
          </transition>
          <transition name="fade">
            <div v-show="stepIdx === 1" class="step2">
              <img
                :src="
                  `${imageUrl}/${imgPath}/${
                    selectedSolution === 'soothing'
                      ? 'img_solutionSkinSoothing'
                      : 'img_solutionSkinMoisture'
                  }.jpg`
                "
                alt="image"
              />
              <div v-if="!this.$device.isDesktop" class="btnBox">
                <button
                  @click="prevStep"
                  type="button"
                  class="btn btn__prevStep"
                >
                  <span class="a11y">다시 선택</span>
                </button>
                <button
                  @click="openEntryPopup"
                  :data-gtm-label="
                    selectedSolution === 'soothing' ? '진정 KIT' : '보습 KIT'
                  "
                  type="button"
                  class="btn btn__apply"
                  data-gtm-category="EVENT"
                  data-gtm-action="체험 KIT 신청"
                >
                  <span class="a11y">체험 kit 신청하기</span>
                </button>
              </div>
              <div v-else class="btnBox">
                <button
                  @click="openEntryPopup"
                  :data-gtm-label="
                    selectedSolution === 'soothing' ? '진정 KIT' : '보습 KIT'
                  "
                  type="button"
                  class="btn btn__apply"
                  data-gtm-category="EVENT"
                  data-gtm-action="체험 KIT 신청"
                >
                  <span class="a11y">체험 kit 신청하기</span>
                </button>
                <button
                  @click="prevStep"
                  type="button"
                  class="btn btn__prevStep"
                >
                  <span class="a11y">다시 선택</span>
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- product -->
    <section id="product" class="section product">
      <div class="section__inner">
        <div class="a11y">
          <h1>product</h1>
          <h2>10% 할인 혜택으로 경험하는 동인비 1899 싱글 에센스</h2>
          <ul>
            <li>
              <h4>맑은 홍삼 추출물 100%</h4>
              <p>
                홍삼 단일추출물[AbsoRoot-RG™]이 스킨 케어 첫 단계에 순하게
                흡수되어 홍삼의 항산화 성분을 피부에 전달합니다.
              </p>
            </li>
            <li>
              <h4>어린빛 항산화 워터 에센스</h4>
              <p>
                피부 결을 매끄럽게 고돈하고 투명도 개선에 도움을 주어 맑고
                건강한 어린빛을 선사합니다.
              </p>
            </li>
            <li>
              <h4>풍부한 수분의 밀착 흡수</h4>
              <p>
                수분감이 풍부하게 느껴지는 트리트먼트 에센스 제형이 밀착
                흡수되어 하루종일 촉촉한 피부를 유지시켜 줍니다.
              </p>
            </li>
          </ul>
          <h3>스페셜 구매 혜택</h3>
          <p>70ml 본품 구매 시 소비자가 9만원 상당 샘플 증정</p>
          <dl>
            <dt>샘플명</dt>
            <dd>동인비 1899 싱글 에센스</dd>
            <dt>용량</dt>
            <dd>70ml</dd>
            <dt>가격</dt>
            <dd>57000원</dd>
            <dt>전성분</dt>
            <dd>홍삼추출물 100%</dd>
          </dl>
        </div>
        <img
          :src="`${imageUrl}/reviewThumb/product-thumbnail.gif`"
          class="product__thumbnail"
          alt="에센스 이미지"
        />
        <a
          class="link link__mall"
          href="https://www.kgcshop.co.kr/shop/goodsView?itemId=56399&utm_source=event_p&utm_medium=buy&utm_campaign=DongP_event"
          target="_blank"
          data-gtm-category="PRODUCT"
          data-gtm-action="구매하기"
        >
          <span class="a11y">정관장몰 구매하기</span>
        </a>
      </div>
    </section>

    <!-- notice -->
    <section class="section notice">
      <div class="section__inner">
        <h1 class="a11y">유의사항 및 안내</h1>
        <h2 class="notice__tit">유의사항</h2>
        <ul>
          <li>
            부적절한 이벤트 참여를 방지하기 위해 본인 인증은 필수이며, 허위 정보
            및 부적절한 형태로 이벤트에 참여 및 당첨된 경우에는 사전 안내 없이
            참여 이력 삭제 및 당첨 취소가 될 수 있습니다.
          </li>
          <li>
            이벤트 참여는 1일 1회 가능하며, 당첨되지 않은 경우 다음 날 재응모
            가능합니다.
          </li>
          <li>
            이벤트 기간 중 체험 KIT 당첨은 연락처 1개당 1회만 가능하며, 당첨자는
            하루 1,000명 (체험 KIT 각 500개) 으로 제한됩니다.
          </li>
          <li>체험 KIT는 온라인 및 오프라인 수령 중 택1 하실 수 있습니다.</li>
          <li>
            잘못된 개인정보 (휴대폰 번호 / 경품 수령 주소) 입력으로 연락이
            불가능하거나, 경품 수령이 불가한 경우 이는 당사가 책임지지 않으며,
            경품 반송 시 재발송 되지 않습니다.
          </li>
          <!-- <li>
            백화점 입점 매장에서만 오프라인 수령 가능하며, 오프라인 수령 시 체험
            KIT와 동일한 구성의 제품이 제공됩니다.
          </li>
          <li>매장별 제품 재고 수량은 각 매장 연락 후 확인 가능합니다.</li> -->
          <li>
            오프라인 수령은 이벤트 진행 백화점 입점 매장에서만 가능합니다. ‘수령
            가능 매장 찾기’를 통해 이벤트 진행 매장을 확인할 수 있습니다.
          </li>
          <li>
            매장 상황에 따라 재고 수량이 상이할 수 있으므로, 방문 전 각 매장
            번호로 연락하여 확인을 추천드립니다.
          </li>
          <li>
            오프라인 수령 시 체험 KIT와 동일한 구성의 제품이 제공됩니다.
          </li>
          <li>
            경품 배송 및 정보 확인을 위해 이벤트 참여 시 입력한 휴대폰 번호로
            연락을 요청할 수 있습니다.
          </li>
          <li>
            준비된 경품이 모두 소진될 경우 이벤트는 조기 마감될 수 있으며,
            이벤트 기간 및 경품은 운영 사정에 따라 공지 없이 변경될 수 있습니다.
          </li>
        </ul>
        <h2 class="notice__tit">이벤트 관련 문의</h2>
        <dl>
          <dt class="a11y">문의 이메일</dt>
          <dd>
            <a href="mailto:singleessence_event@mz.co.kr"
              >singleessence_event@mz.co.kr</a
            >
          </dd>
          <dt class="a11y">문의 가능 시간</dt>
          <dd>
            <a href="tel:02-2108-9111">02-2108-9111</a> (평일 오전 10시 ~ 오후
            6시, 주말 및 공휴일 제외)
          </dd>
        </dl>
      </div>
    </section>

    <!-- debug -->
    <!-- 
      personal 개인정보
      address 주소
      complete 입력완료
      duplicate 중복 당첨
      won 당첨
      fail 꽝
    -->
    <!-- popup -->
    <PopPersonal :isShow="currentPop === 'personal'" />
    <PopAddress :isShow="currentPop === 'address'" />
    <PopPost />
    <PopComplete :isShow="currentPop === 'complete'"></PopComplete>
    <PopDuplicated :isShow="currentPop === 'duplicate'"></PopDuplicated>
    <PopWon :isShow="currentPop === 'won'"></PopWon>
    <PopFail :isShow="currentPop === 'fail'"></PopFail>
    <PopStore
      :isShow="currentPop === 'store'"
      :isDirectStoreList="isDirectStoreList"
      @sendEvent="sendEvent"
    ></PopStore>
  </div>
</template>

<script>
import reviewList from '@/assets/js/kit/review-pc.json'

import Nav from '@/components/kit/Nav'
import PopPersonal from '@/components/kit/PopPersonal'
import PopAddress from '@/components/kit/PopAddress'
import PopPost from '@/components/kit/PopPost'
import PopComplete from '@/components/kit/PopComplete'
import PopDuplicated from '@/components/kit/PopDuplicated'
import PopWon from '@/components/kit/PopWon'
import PopFail from '@/components/kit/PopFail'
import PopStore from '@/components/kit/PopStore'
import { mapActions, mapState } from 'vuex'
import { youtubeEmbedMixin } from '@/plugins/youtubeMixin'

export default {
  name: 'Kit',
  components: {
    Nav,
    PopPersonal,
    PopAddress,
    PopPost,
    PopComplete,
    PopDuplicated,
    PopWon,
    PopFail,
    PopStore,
    Pc: () => import('@/components/kit/Pc'),
    Mo: () => import('@/components/kit/Mo')
  },
  mixins: [youtubeEmbedMixin],
  props: {
    isDirectStoreList: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      review: {
        titList: [
          '#믿고쓰는동인비',
          '#홍삼단일성분',
          '#피부파워진정템',
          '#피부수분충전템'
        ],
        activeIdx: 0,
        /* list: reviewList[this.$device.isDesktop ? 'pc' : 'mo'][0] */
        list: reviewList[this.$device.isDesktop ? 'pc' : 'mo'][0]
      },
      video: {
        id: 'BnQvIcxvBXI',
        activeIdx: 0
      },
      // event 참여
      stepIdx: 0,
      selectedSolution: '',
      // slider
      swiperOption: {
        effect: 'slide',
        // direction: 'vertical',
        // loop: true,
        slidesPerView: this.$device.isDesktop ? 3 : 2,
        slidesPerGroup: this.$device.isDesktop ? 3 : 1,
        spaceBetween: 30,
        centeredSlides: !this.$device.isDesktop,
        initialSlide: 0,
        // autoplay: {
        //   delay: 5000
        // },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
          // dynamicBullets: true
        },
        navigation: {
          nextEl: '.swiper-button-custom-next',
          prevEl: '.swiper-button-custom-prev'
        }
      },
      imgPath: this.$device.isDesktop ? 'pc' : 'm'
    }
  },

  computed: {
    ...mapState({
      imageUrl(state) {
        return `${state.kit.imageUrlRoot}`
      },
      currentPop: (state) => state.popup.currentPop,
      forceUpdate: (state) => state.popup.forceUpdate
    }),
    tabOn() {
      return this.video.activeIdx === 0
        ? 'cover--0'
        : this.video.activeIdx === 1
        ? 'cover--1'
        : 'cover--2'
    }
  },
  mounted() {
    window.Kakao.init('1ba05027dea00a874333a6a2bbfa9a80')
    this.$nextTick(() => {
      this.loading = false
    })

    if (process.browser) {
      window.onNuxtReady((app) => {
        // this.init()
      })
    }
  },
  methods: {
    ...mapActions('popup', ['openPop', 'setLoading']),
    ...mapActions('kit', ['setPrizeType']),
    goSection() {
      $('html, body').animate(
        {
          scrollTop: this.$device.isDesktop ? Math.ceil(1080) : Math.ceil(870)
        },
        500
      )
    },
    setReview(idx) {
      this.review.activeIdx = idx
      this.review.list = reviewList[this.$device.isDesktop ? 'pc' : 'mo'][idx]

      this.mySwiper.slideToLoop(0)
      this.mySwiper.update()
    },
    setVideo(idx) {
      switch (idx) {
        case 0:
          this.video.id = 'BnQvIcxvBXI'
          break
        case 1:
          this.video.id = 'U-LzGPaOJNg'
          break
        case 2:
          this.video.id = 'fzde1gJbFqg'
          break
      }

      this.video.activeIdx = idx
      this.ended()
    },
    nextStep() {
      if (!this.selectedSolution) {
        alert('피부 케어 솔루션을 선택해 주세요!')
        return
      }
      this.stepIdx = 1
    },
    prevStep() {
      this.selectedSolution = ''
      this.stepIdx = 0
    },
    openEntryPopup() {
      this.setPrizeType(this.selectedSolution)
      $('.popup__content ').removeClass('lgt')
      this.openPop({ popName: 'personal' })
    },
    // 공유 및 복사
    kakaoShare() {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '동인비 1899 싱글 에센스',
          description:
            '피부케어 솔루션 선택하고\n내 피부 맞춤 체험 KIT를 신청하세요',
          imageUrl:
            'https://donginbi.s3.amazonaws.com/static/singleessence/images/shared/300x300.jpg',
          imageWidth: 300,
          imageHeight: 300,
          link: {
            mobileWebUrl:
              'https://singleessence.event-donginbi.co.kr/?utm_source=Share&utm_medium=Kakao&utm_campaign=sample',
            webUrl:
              'https://singleessence.event-donginbi.co.kr/?utm_source=Share&utm_medium=Kakao&utm_campaign=sample'
          }
        }
      })
    },
    copyUrl(data) {
      const url =
        'https://' +
        location.host +
        '/?utm_source=Share&utm_medium=Link&utm_campaign=sample'
      this.$copyText(url).then(
        (e) => {
          alert('URL 복사가 완료되었습니다')
        },
        (e) => {
          alert('복사에 실패했습니다.\n다시 시도해 주세요.')
        }
      )
    },
    sendEvent(boolean) {
      this.$emit('sendEvent', boolean)
    }
  }
}
</script>
