<template>
  <PopBase
    v-show="isShow"
    :show="isShow"
    :className="'make'"
    :class="`step${makingStep}`"
  >
    <template #header>
      <h1>
        <img :src="`${imageUrl}/tit-make.jpg`" alt="우리 아이 영상 만들기" />
      </h1>
    </template>
    <template #content>
      <!-- step1 -->
      <div v-show="makingStep === 1" class="cropBox">
        <h2 class="a11y">
          step1. 신학기를 맞이한 우리 아이의 사진과 이름을 등록해주세요.
        </h2>
        <croppa
          v-model="croppaStep1"
          :width="540"
          :height="474"
          :prevent-white-space="true"
          :file-size-limit="10485760"
          :show-remove-button="false"
          @file-type-mismatch="onFileTypeMismatch"
          @file-size-exceed="onFileSizeExceed"
          placeholder
          canvas-color="transparent"
        ></croppa>
        <div
          v-show="croppaStep1 && croppaStep1.loading"
          class="croppa__loading"
        >
          <Loading></Loading>
        </div>
        <button
          v-show="croppaStep1.imageSet"
          @click="croppaStep1.remove()"
          class="popupBtn popupBtn__removeImage"
        >
          이미지 제거하기
        </button>
        <div class="inputBox">
          <p class="a11y">성을 제외한 이름을 입력해 주세요</p>
          <label for="childName"
            ><span class="a11y">신학기를 맞이한</span>
            <input
              id="childName"
              v-show="makingStep === 1"
              v-model="userModel.step01Name"
              placeholder="예) 하윤이"
              type="text"
              maxlength="3"
            />
            <span class="a11y">에게</span>
          </label>
        </div>

        <!-- step3 -->
      </div>
      <div v-show="makingStep === 2" class="cropBox">
        <h2 class="a11y">
          step2. 면역력을 달고 사는 우리 아이는 어떤 모습일까요?
        </h2>
        <croppa
          v-model="croppaStep2"
          :width="540"
          :height="474"
          :prevent-white-space="true"
          :file-size-limit="10485760"
          :show-remove-button="false"
          @file-type-mismatch="onFileTypeMismatch"
          @file-size-exceed="onFileSizeExceed"
          placeholder
          canvas-color="transparent"
        ></croppa>
        <div v-if="croppaStep2 && croppaStep2.loading" class="croppa__loading">
          <Loading></Loading>
        </div>

        <button
          v-show="croppaStep2.imageSet"
          @click="croppaStep2.remove()"
          class="popupBtn popupBtn__removeImage"
        >
          이미지 제거하기
        </button>
        <div style="opacity:0.001;position:absolute;z-index:-100;top:0;left:0;">
          <canvas
            id="shareCanvas1"
            class="canvas"
            width="300"
            height="300"
          ></canvas>
          <canvas
            id="shareCanvas2"
            class="canvas"
            width="600"
            height="300"
          ></canvas>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="btnBox">
        <p class="a11y">
          * 저작권 또는 초상권에 문제가 없도록 유의해주세요! 관련 문제 발생 시
          책임은 작성자에게 있습니다.
        </p>
        <button
          v-if="makingStep === 2"
          @click="prevStep()"
          type="button"
          class="popupBtn popupBtn--half popupBtn__prev"
        >
          이전
        </button>
        <button
          @click="nextStep()"
          v-text="makingStep === 2 ? '완료' : '다음'"
          :class="[
            { 'popupBtn__complete popupBtn--half': makingStep === 2 },
            { 'popupBtn--full': makingStep === 1 },
            'popupBtn__next'
          ]"
          :data-gtm-action="
            `${makingStep === 2 ? 'STEP02_완료' : 'STEP01_다음'}`
          "
          type="button"
          class="popupBtn"
          data-gtm-category="EVENT 01"
        >
          다음
        </button>
      </div>
    </template>
    <template #closeButton>
      <button
        @click="
          closePop()
          makingStep = 1
        "
        type="button"
        class="popupBtn__close"
      >
        닫기
      </button>
    </template>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'
import Loading from '@/components/shared/Loading'

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'PopMake',
  components: { PopBase, Loading },
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      makingStep: 1,
      croppaStep1: {},
      croppaStep2: {},
      croppaShare: {},
      userModel: {
        step01Name: '',
        step01Img: '',
        step02Img: '',
        sharedKakaoImage: '',
        sharedURLCopyImage: ''
      },
      backgroundImg1: null,
      backgroundImg2: null,
      userImageKakao: null
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.newSemester.imageUrlRoot}/popup`,
      canvasImgSrc: (state) => state.newSemester.userModel.step02Img,
      userHistory: (state) => state.newSemester.userState.history
    })
  },

  mounted() {
    this.preloadImage()
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop', 'setLoading']),
    ...mapActions('newSemester', ['saveUserModelMovie', 'saveImageOnly']),
    ...mapMutations('popup', ['FORCE_UPDATE']),
    ...mapMutations('newSemester', ['SET_USER_MODEL']),
    prevStep() {
      if (!confirm('이전 화면으로 가시겠습니까?')) return

      this.makingStep === 1
        ? this.openPop({ popName: 'personal' })
        : this.makingStep--
    },
    nextStep() {
      if (!this[`croppaStep${this.makingStep}`].hasImage()) {
        alert('사진을 등록해주세요')
        return
      }

      if (this.makingStep === 1 && !this.userModel.step01Name) {
        alert('이름을 입력해주세요')
        return
      }

      if (this.makingStep === 1) {
        // 비속어 체크
        this.validateBadword()
      } else if (this.makingStep === 2) {
        this.openNextPop()
      }
    },
    openNextPop() {
      this.userModel.step01Img = this.croppaStep1.generateDataUrl(
        'image/png',
        0.9
      )
      this.userModel.step02Img = this.croppaStep2.generateDataUrl(
        'image/png',
        0.9
      )

      this.userImageKakao = new Image()
      this.userImageKakao.crossOrigin = 'Anonymous'
      this.userImageUrl = new Image()
      this.userImageUrl.crossOrigin = 'Anonymous'

      this.userImageKakao.onload = (event) => {
        // console.log(event.target)
        this.makeShareImg(this.userImageKakao)
        this.makeShareUrlImage(this.userImageKakao)

        this.SET_USER_MODEL(this.userModel)

        if (this.userHistory === 'Y') {
          this.saveUserModelMovie()
        } else {
          this.saveImageOnly(this.userHistory)
        }

        // this.saveUserMovieImage()
        // 이미지만 저장 K || M
        // this.setLoading(true)
        // if (this.hasHistory) {
        //   /* 연락처 중복, 영상만 제작 api */
        // } else {
        //   /* 최초 참여, 주소 입력팝업 */
        //   this.setLoading(false)
        //   this.setPopAlertParam('waiting-make-movie')
        //   this.openPop({ popName: 'alert' })
        // }
      }

      this.userImageKakao.src = this.userModel.step02Img
    },
    validateBadword() {
      this.setLoading(false)
      this.$axios
        .post(
          encodeURI(
            `/api/hongyi/movie/badword?word=${this.userModel.step01Name}`
          )
        )
        .then((res) => {
          if (res.result === false) {
          } else {
            this.makingStep++
          }
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
        .finally(() => {
          this.setLoading(false)
        })
    },
    onFileTypeMismatch(file) {
      alert('지원하지 않는 파일 형식입니다. jpg나 png파일을 업로드 해주세요.')
    },
    onFileSizeExceed(file) {
      // console.log(file)
      alert('10mb 미만의 이미지만 업로드 가능합니다.')
    },
    preloadImage() {
      const ktImg = `${this.imageUrl}/kakaotalk-share/placeholder.jpg`
      this.backgroundImg1 = new Image()
      this.backgroundImg1.crossOrigin = 'Anonymous'
      this.backgroundImg1.src = ktImg

      const urlImg = `${this.imageUrl}/kakaotalk-share/placeholder-600.jpg`
      this.backgroundImg2 = new Image()
      this.backgroundImg2.crossOrigin = 'Anonymous'
      this.backgroundImg2.src = urlImg
    },
    makeShareImg(img) {
      const canvas = document.getElementById('shareCanvas1')
      const context = canvas.getContext('2d')

      context.clearRect(0, 0, 300, 300)
      context.drawImage(this.backgroundImg1, 0, 0, 300, 300)
      context.drawImage(img, 46, 42, 206, 185)

      this.userModel.sharedKakaoImage = canvas.toDataURL('image/png')
    },
    makeShareUrlImage(img) {
      const canvas = document.getElementById('shareCanvas2')
      const context = canvas.getContext('2d')

      context.clearRect(0, 0, 600, 300)
      context.drawImage(this.backgroundImg2, 0, 0, 600, 300)
      context.drawImage(img, 41, 37, 252, 228)

      this.userModel.sharedURLCopyImage = canvas.toDataURL('image/png')
    }
  }
}
</script>
