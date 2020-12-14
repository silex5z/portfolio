<template>
  <PopBase v-show="isShow" :show="isShow" :class-name="'survey'" :width="1000">
    <template #contents>
      <header class="popup__header">
        <h2 class="popup__tit">세션 설문조사</h2>
        <p class="popup__desc">
          <span>
            시청하신 세션에 대한 설문 참여를 부탁드리며
            <br v-if="$device.isMobile" />관련 문의 내용을 남겨주시면 담당자가
            <br v-if="$device.isMobile" />빠른 시간 안에 연락드리겠습니다.
          </span>
          <span class="popup__notice">
            * 설문 참여 시
            <b>30,000</b> 포인트를 지급해 드리며
            <br v-if="$device.isMobile" />허위 정보 입력 시에는 포인트 지급
            대상에서 제외됩니다.
          </span>
        </p>
      </header>

      <div class="popup__content">
        <form :key="forceUpdate" @submit.prevent>
          <div class="info__group">
            <h3 class="survey__mainTit">정보입력</h3>
            <div class="info__row">
              <!-- 회사명 -->
              <div class="info__item">
                <h4>
                  <label for="infoSurveyCompany" class="info__label"
                    >회사명</label
                  >
                </h4>
                <span class="info__input">
                  <input
                    id="infoSurveyCompany"
                    v-model="companyName"
                    placeholder="회사명을 입력해주세요"
                    type="text"
                    name="companyName"
                  />
                </span>
              </div>

              <!-- 이름 -->
              <div class="info__item">
                <h4>
                  <label for="infoSurveyManager" class="info__label"
                    >이름</label
                  >
                </h4>
                <span class="info__input">
                  <input
                    id="infoSurveyManager"
                    v-model="managerName"
                    placeholder="이름을 입력해주세요"
                    type="text"
                    name="managerName"
                  />
                </span>
              </div>
            </div>

            <div class="info__row">
              <!-- 휴대폰 번호 -->
              <div class="info__item">
                <h4>
                  <label for="infoSurveyPhone" class="info__label"
                    >휴대폰 번호</label
                  >
                </h4>
                <span class="info__input">
                  <input
                    id="infoSurveyPhone"
                    v-model="phoneNo"
                    placeholder=" ' - ' 없이 입력해주세요 "
                    type="tel"
                    name="phoneNo"
                    maxlength="11"
                  />
                </span>
              </div>

              <!-- 이메일 -->
              <div class="info__item">
                <h4>
                  <label for="infoSurveyEmail" class="info__label"
                    >이메일</label
                  >
                </h4>
                <span class="info__input">
                  <input
                    id="infoSurveyEmail"
                    v-model="email"
                    placeholder="이메일을 입력해주세요 "
                    type="text"
                    name="email"
                  />
                </span>
              </div>
            </div>
          </div>

          <!-- 세션 만족도 평가 -->
          <div class="survey__group">
            <h3 class="survey__mainTit">세션 만족도 평가</h3>
            <div class="survey__row survey__evaluation">
              <h4 class="survey__tit">
                세션에 대한 만족도는 어떠셨나요 ?
              </h4>
              <StarRating ref="starRating"></StarRating>
            </div>
            <div class="survey__row">
              <h4 class="survey__tit a11y">
                세션에 대한 소감이나 의견을 자유롭게 작성해 주세요.
              </h4>
              <span class="info__textarea">
                <textarea
                  id="infoSurveyEvaluation"
                  v-model="evaluation"
                  cols="30"
                  rows="15"
                  class="checkBox__textarea"
                  placeholder="세션에 대한 소감이나 의견을 자유롭게 작성해 주세요."
                ></textarea>
              </span>
            </div>
          </div>
          <template v-if="isSurvey">
            <div class="survey__group">
              <h3 class="survey__mainTit">세션 관련 설문조사</h3>
              <div
                v-for="(sv, svIdx) in surveyPartnerQuestions"
                :key="svIdx"
                class="survey__row"
              >
                <h4 class="survey__tit">{{ svIdx + 1 }}. {{ sv.question }}</h4>
                <component
                  :is="componentType(sv.questionType)"
                  :options="sv.selectionList"
                  @change="onChange"
                ></component>
              </div>
            </div>
          </template>
          <div class="survey__group">
            <h3 class="survey__mainTit">상담 및 추가 문의사항</h3>
            <div class="survey__row">
              <h4 class="survey__tit">
                귀사의 IT 인프라 환경은 어떻게 운영되고 있습니까?
              </h4>
              <div class="checkBox">
                <label
                  v-for="(val, idx) in optData.consultation[0]"
                  :key="idx"
                  :for="`detailQuestionOne${idx}`"
                  class="checkBox__label"
                >
                  <input
                    :id="`detailQuestionOne${idx}`"
                    v-model="detailQuestionOne"
                    :value="val"
                    name="detailQuestionOne"
                    type="radio"
                    class="checkBox__input"
                  />
                  <i class="checkBox__ir">
                    <Icon
                      :name="'check'"
                      :size="$device.isMobile ? 24 : 20"
                    ></Icon>
                  </i>
                  <span class="checkBox__desc">{{ val }}</span>
                </label>
              </div>
            </div>

            <div class="survey__row">
              <h4 class="survey__tit">
                현재 계획중이신 신규 워크로드가 있으십니까? (중복 체크 가능)
              </h4>
              <div class="checkBox">
                <label
                  v-for="(val, idx) in optData.consultation[1]"
                  :key="idx"
                  :for="`detailQuestionTwo_${idx}`"
                  class="checkBox__label"
                >
                  <input
                    :id="`detailQuestionTwo_${idx}`"
                    :ref="`detailQuestionTwo_${idx}`"
                    :value="val"
                    name="detailQuestionTwo"
                    type="checkbox"
                    class="checkBox__input"
                    @change="InputCheckbox(idx, val, $event.target)"
                  />
                  <i class="checkBox__ir">
                    <Icon
                      :name="'check'"
                      :size="$device.isMobile ? 24 : 20"
                    ></Icon>
                  </i>
                  <span v-if="val === '기타'">
                    <input
                      type="text"
                      placeholder="기타 (100자)"
                      maxlength="100"
                      data-question="questionEtc"
                      @input="onInput(idx, $event.target.value)"
                    />
                  </span>
                  <span v-else class="checkBox__desc">{{ val }}</span>
                </label>
              </div>
            </div>
            <!-- 문의내용 -->
            <div class="survey__row survey__inquiry">
              <h4>
                <label for="infoInquiry" class="info__label">문의 내용</label>
              </h4>
              <span class="info__textarea">
                <textarea
                  id="infoSurveyInquiry"
                  v-model="questionContents"
                  name="InquiryContents"
                  cols="30"
                  rows="10"
                  placeholder="상담받으실 문의 내용을 입력해주세요"
                ></textarea>
              </span>
            </div>
          </div>
        </form>

        <div class="btnBox">
          <button
            id="surveySubmitBtn"
            :movie-id="`${sortNum}`"
            :class="[
              'btn',
              'btn--white',
              $device.isMobile ? 'btn--long' : 'btn--medium '
            ]"
            type="button"
            @click="saveSurvey"
          >
            제출하기
          </button>
        </div>
      </div>
    </template>
  </PopBase>
</template>

<script>
import Icon from '@/components/ui/Icon'
import StarRating from '@/components/ui/StarRating'
import PopBase from '@/components/shared/PopBase'
import Checkbox from '@/components/shared/Checkbox'
import Radiobox from '@/components/shared/Radiobox'
import Textarea from '@/components/shared/Textarea'
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
// import { StarRating } from 'vue-rate-it'
import { consultation } from '@/assets/js/additionalInfo.js'

export default {
  name: 'PopSurvey',
  components: {
    Icon,
    PopBase,
    StarRating,
    Checkbox,
    Radiobox,
    Textarea
  },
  props: { isShow: { type: Boolean, default: false, required: true } },
  data() {
    return {
      optData: {
        consultation
      },
      surveyPartnerName: '',
      surveyPartnerIntroduce: '',
      surveyPartnerQuestions: {},
      surveyAnswer: {},
      answers: {},
      inputs: {},
      componentPayload: {},
      isSurvey: false,
      evaluation: '',
      detailQuestionOne: '',
      detailQuestionTwo: [],
      questionContents: '',
      email: '',
      managerName: '',
      companyName: '',
      phoneNo: ''
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot,
      currentPop: (state) => state.popup.currentPop,
      // email: (state) => state.auth.user.info.username,
      partnerName: (state) => state.session.partnerName,
      sortNum: (state) => state.session.sortNum,
      cpmInfo: (state) => state.session.cpmInfo,
      // managerName: (state) => state.auth.user.info.name,
      // companyName: (state) => state.auth.user.info.companyName,
      // phoneNo: (state) => state.auth.user.info.phoneNo,
      forceUpdate: (state) => state.popup.forceUpdate,
      stateUserInfo: (state) => state.auth.user.info
    })
  },
  watch: {
    async isShow(isShow) {
      if (isShow) {
        this.email = this.stateUserInfo.username
        this.managerName = this.stateUserInfo.name
        this.companyName = this.stateUserInfo.companyName
        this.phoneNo = this.stateUserInfo.phoneNo

        const response = await this.$Survey.getSuveyQuestions(
          this.sortNum,
          this.email
        )
        if (response.data.result === 'true') {
          this.isSurvey = true
          this.surveyPartnerQuestions = response.data.survey.questionList
          this.surveyPartnerName = response.data.survey.partnerName
          this.surveyPartnerIntroduce = response.data.survey.partnerIntroduce
        } else if (response.data.result === 'false') {
          this.closePop()
          this.openAlert({
            message: '이미 설문 조사 참여가 완료된 세션입니다.'
          })
        }
      } else {
        this.resetData()
        this.isSurvey = false
      }

      document.getElementsByName('detailQuestionTwo').forEach((e, i) => {
        e.checked = false
      })
    }
  },
  mounted() {},
  methods: {
    ...mapActions('popup', [
      'openAlert',
      'openAbovePop',
      'openPop',
      'closePop'
    ]),
    onChange(payload) {
      this.componentPayload = {
        ...this.componentPayload,
        ...payload
      }
    },
    componentType(questionType) {
      return questionType === 'MULTI_ONLY'
        ? Radiobox
        : questionType === 'MULTI'
        ? Checkbox
        : Textarea
    },
    async saveSurvey() {
      const detailQuestionTwo = _.compact(this.detailQuestionTwo).join('^')
      const answers = this.componentPayload

      for (const indx in answers) {
        if (Array.isArray(this.componentPayload[indx])) {
          answers[indx] = _.compact(answers[indx]).join('^')
        }
      }

      const submitDocument = {
        companyName: this.companyName,
        username: this.managerName,
        phoneNo: this.phoneNo,
        email: this.email,
        sortNum: this.sortNum,
        evaluationValue: this.$refs.starRating.starRating,
        evaluation: this.evaluation,
        detailQuestionOne: this.detailQuestionOne,
        detailQuestionTwo,
        questionContents: this.questionContents,
        answers
      }

      await this.$Survey
        .saveSuveyQuestions(submitDocument)
        .then((res) => {
          this.initSurveyAnswer()
          this.closePop()

          this.openAbovePop({
            name: 'point',
            message: res.data.point
          })
          // this.openAlert({
          //   message: '세션 설문 조사 제출이 완료되었습니다.',
          //   dynamicId: 'surveyCompleteBtn'
          // })
        })
        .catch((err) => {
          this.openAlert({
            message: err.response.data.error
          })
        })
        .finally()
    },
    selectAnswer(questionInfo, selectionInfo) {
      let answer = {}
      answer = selectionInfo.selectionNumber

      if (questionInfo.questionType === 'MULTI_ONLY') {
        if (selectionInfo.selectionType === 'INPUT') {
          // 뭘쓰지 ?
        } else if (selectionInfo.selectionType === 'CHOICE') {
          // 단일선택, 단일 기타 선택 항목을 변경할때 값을 초기화
          delete this.inputs[questionInfo.questionNumber]
        }
        this.answers[questionInfo.questionNumber] = answer
      } else if (questionInfo.questionType === 'MULTI') {
        // 다중선택 값이 비어있을때 초기화
        if (this.answers[questionInfo.questionNumber] == null) {
          this.answers[questionInfo.questionNumber] = []
          this.answers[questionInfo.questionNumber].push(answer)
        } else if (this.answers[questionInfo.questionNumber] != null) {
          if (!this.answers[questionInfo.questionNumber].includes(answer)) {
            // 다중선택값을 처음 선택할 때
            this.answers[questionInfo.questionNumber].push(answer)
          } else {
            // 다중선택 값을 또 선택 할 때
            const index = this.answers[questionInfo.questionNumber].findIndex(
              (item) => {
                return item === answer
              }
            )
            this.answers[questionInfo.questionNumber].splice(index, 1)
          }
        }
      } else if (questionInfo.questionType === 'SHORT') {
      }
    },
    initSurveyAnswer() {
      this.surveyAnswer = {}
      this.answers = {}
      this.inputs = {}
      this.componentPayload = {}
      this.detailQuestionTwo = []
    },
    InputCheckbox(index, value, element) {
      if (element.checked) {
        this.detailQuestionTwo[index] = value
      } else {
        if (value === '기타') {
          this.$set(this.detailQuestionTwo, index, '')
        }
        delete this.detailQuestionTwo[index]
      }
    },
    onInput(index, inputValue) {
      const ele = this.$refs[`detailQuestionTwo_${index}`]
      if (!ele[0].checked) {
        ele[0].click()
      }

      if (inputValue === '') {
        if (ele[0].checked) {
          ele[0].click()
        }
      }
    }
  }
}
</script>

<style lang="scss">
.popup__survey .popup__mask {
  background: #000;
}
.vjs-user-active {
  .vjs-control-bar {
    display: flex;
  }
}
</style>

<style lang="scss" scoped>
@import '@/assets/scss/pages/_form';
@import '@/assets/scss/pages/_survey';

.survey {
  $this: &;
  // 만족도 평가
  &__evaluation {
    position: relative;
    #{$this}__tit {
      @include breakpoint() {
        height: 140px;
        line-height: 50px;
      }
      @include breakpoint('pc') {
        height: 80px;
        line-height: 80px;
      }
    }
    .starRating {
      position: absolute;

      @include breakpoint() {
        bottom: 30px;
        left: 15px;
      }
      @include breakpoint('pc') {
        top: 26px;
        right: 30px;
      }
    }
    & + #{$this}__row {
      margin-top: 0;
    }
  }
}
</style>
