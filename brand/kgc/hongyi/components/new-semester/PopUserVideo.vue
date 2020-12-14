<template>
  <PopBase
    v-show="isShow"
    :show="isShow"
    :className="'userVideo'"
    :type="'empty'"
  >
    <!-- <div
      style="position:fixed; top:0; left:0; z-index:9999; color:#fff;  font-size:14px;"
    >
      <p style="background:rgba(0,0,0,.8); ">{{ log }}</p>
      <p style="background:rgba(0,0,0,.4); ">{{ log2 }}</p>
    </div> -->
    <div class="videoBox">
      <!-- <pre style="position:fixed; top: 20px; left: 100px; color: #fff">{{
          userVideo.currentTime
        }}</pre> -->
      <video
        id="movie"
        ref="movie"
        @timeupdate="movie.currentTime = $event.target.currentTime"
        @play="movie.isPlay = true"
        @pause="movie.isPlay = false"
        :src="isSchool ? movie.url[1] : movie.url[0]"
        v-if="isShow"
        preload
        playsinline
        controls
      ></video>
      <div v-if="userVideoList.length > 0" class="layerBox">
        <div
          :class="{
            step1: step1,
            step2: step2,
            end: stepEnd,
            school: isSchool
          }"
          class="imgBox"
        >
          <img :src="currentuserVideoList.step01ImgURL" alt />

          <!-- 취학, 미취학 기본 이미지 -->
          <img
            v-if="isSchool"
            :src="`${imageUrl}/img-school-default.jpg`"
            alt
          />
          <img v-else :src="`${imageUrl}/img-preschool-default.jpg`" alt />

          <img :src="currentuserVideoList.step02ImgURL" alt />
        </div>

        <p class="txtBox">
          <span :class="{ on: showChildName }" class="txt">{{
            currentuserVideoList.step01Name
          }}</span>
        </p>
      </div>

      <div :class="{ on: !movie.isPlay }" class="sliderBox">
        <div v-swiper:movieSlider="swiperOption">
          <div class="swiper-wrapper">
            <div
              v-for="(data, idx) in userVideoList"
              :key="idx"
              class="swiper-slide"
            >
              <div :class="{ school: isSchool }" class="layerBox">
                <div class="imgBox">
                  <img :src="currentuserVideoList.step01ImgURL" alt />
                </div>
                <p class="txtBox">
                  <span class="txt">{{ currentuserVideoList.step01Name }}</span>
                </p>
                <button
                  @click="playVideo(idx)"
                  type="button"
                  class="popBtn popBtn__playVideo"
                >
                  영상 재생
                </button>
                <img
                  :src="`${imageUrl}/bg-play-video.png`"
                  class="cover"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!fromSharedUrl" class="btnBox">
      <p class="a11y">우리 아이의 하나뿐인 영상, 지인과 공유하세요!</p>
      <button
        @click="kakaoShare"
        type="button"
        class="popBtn popBtn__shareKakao"
        data-gtm-category="공유하기"
        data-gtm-action="영상 시청_KAKAO"
      >
        카카오톡으로 이벤트 공유하기
      </button>
      <button
        @click="copyUrl"
        type="button"
        class="popBtn popBtn__shareLink"
        data-gtm-category="공유하기"
        data-gtm-action="영상 시청_URL"
      >
        이벤트 주소 복사하기
      </button>
    </div>

    <div v-else class="btnBox btnBox--confirm">
      <p class="a11y">우리 아이의 하나뿐인 영상, 지금 제작해보세요!</p>
      <button @click="closePop" type="button" class="popBtn popBtn__confirm">
        확인
      </button>
    </div>

    <!-- swipter controller 영역 -->
    <div class="swiper__controls">
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
      <!-- Add Arrows -->
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopUserVideo',
  components: { PopBase },
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    },
    userVideoList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      movie: {
        currentTime: null,
        isPlay: false,
        currentNum: 0,
        url: [
          'https://hongyi.s3.amazonaws.com/static/new-semester/video/preschool.mp4',
          'https://hongyi.s3.amazonaws.com/static/new-semester/video/school-v2.mp4'
        ]
      },
      swiperOption: {
        effect: 'fade',
        slidesPerView: 1,
        observer: true,
        observerUpdate: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.newSemester.imageUrlRoot}/popup`,
      fromSharedUrl: (state) => state.newSemester.userState.fromSharedUrl,
      shareId: (state) => state.newSemester.userState.shareId
    }),
    currentuserVideoList() {
      return this.userVideoList[this.movie.currentNum]
    },
    isSchool() {
      return this.currentuserVideoList.hongyiLevel === 'THREE'
    },
    // 영상 이미지, 텍스트 영상에 초수에 따른 show/hide 시간 제어
    step1() {
      return this.movie.currentTime > 3.2 && this.movie.currentTime <= 7.15
    },
    step2() {
      return this.movie.currentTime > 7.15 && this.movie.currentTime <= 10.7
    },
    stepEnd() {
      return this.movie.currentTime > 10.7
    },
    showChildName() {
      return this.isSchool
        ? this.movie.currentTime > 5 && this.movie.currentTime < 7.4
        : this.movie.currentTime > 0.8 && this.movie.currentTime < 4
    }
  },
  watch: {
    isShow() {
      this.movieSlider.slideTo(
        // 스토어에 저장된 videoIndex값으로 이동
        this.$store.state.newSemester.userState.videoIndex
      )
    }
  },
  mounted() {
    this.movieSlider.on('slideChange', () => {
      if (this.$refs.movie) this.$refs.movie.pause()
      this.movie.isPlay = false
      setTimeout(() => {
        this.movie.currentNum = this.movieSlider.activeIndex
      }, 300)
    })
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop']),
    playVideo(idx) {
      this.$refs.movie.load()
      this.$refs.movie.play()
      this.movie.currentNum = idx
      this.movie.isPlay = true
    },
    increaseShareCount() {
      return this.$axios
        .get(`/api/hongyi/movie/share/cnt?randomNum=${this.shareId}`)
        .catch((error) => alert(error.response.data.error))
    },
    async kakaoShare() {
      const user = this.userVideoList[this.movie.currentNum]
      await window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '',
          description: `홍이장군 모델이 된 ${user.step01Name}의 영상이 도착했어요! 면역력을 달고 사는 우리 아이의 모습을 지금 확인해보세요!`,
          imageUrl: user.sharedKakaoImageURL,
          imageWidth: 300,
          imageHeight: 300,
          link: {
            mobileWebUrl: `${location.origin}/share/${this.shareId}-${this.movie.currentNum}?utm_source=share&utm_medium=popup&utm_campaign=kakao`,
            webUrl: `${location.origin}/share/${this.shareId}-${this.movie.currentNum}?utm_source=share&utm_medium=popup&utm_campaign=kakao`
          }
        },
        buttons: [
          {
            title: '영상 보러가기',
            link: {
              mobileWebUrl: `${location.origin}/share/${this.shareId}-${this.movie.currentNum}?utm_source=share&utm_medium=popup&utm_campaign=kakao`,
              webUrl: `${location.origin}/share/${this.shareId}-${this.movie.currentNum}?utm_source=share&utm_medium=popup&utm_campaign=kakao`
            }
          }
        ]
      })
      await this.increaseShareCount()
    },
    async copyUrl() {
      await this.$copyText(
        `${location.origin}/share/${this.shareId}-${this.movie.currentNum}?utm_source=share&utm_medium=popup&utm_campaign=url_copy`
      ).then(
        (e) => {
          alert('URL 복사가 완료되었습니다')
        },
        (e) => {
          alert('URL 복사에 실패했습니다')
        }
      )
      await this.increaseShareCount()
      // this.$axios
      //   .get(`/api/hongyi/movie/share/cnt?randomNum=${this.shareId}`)
      //   .then((res) => {
      //     alert(res)
      //     this.log = res
      //   })
      //   .catch((error) => alert(error.response.data.error))
    }
  }
}
</script>
