<template>
  <PopBase
    v-show="isShow"
    :show="isShow"
    :class-name="'consultation'"
    :width="1000"
  >
    <template #contents>
      <header class="popup__header">
        <h2 class="popup__tit">상담 신청</h2>

        <p class="popup__desc">
          메가존클라우드의 서비스 및 솔루션과 관련하여 문의 내용을 남겨주시면
          담당자가 빠른 시간 안에 연락드리겠습니다.
          <span class="popup__notice">
            * 상담 신청 시
            <b>50,000</b> 포인트를 지급해 드리며
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
                  <label for="infoCompany" class="info__label">회사명</label>
                </h4>
                <span class="info__input">
                  <input
                    id="infoCompany"
                    v-model="userInfo.companyName"
                    placeholder="회사명을 입력해주세요"
                    type="text"
                    name="companyName"
                  />
                </span>

                <!-- <p class="validate">필수 값을 입력해주세요.</p> -->
              </div>

              <!-- 이름 -->
              <div class="info__item">
                <h4>
                  <label for="infoManager" class="info__label">이름</label>
                </h4>
                <span class="info__input">
                  <input
                    id="infoManager"
                    v-model="userInfo.managerName"
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
                  <label for="infoPhone" class="info__label">휴대폰 번호</label>
                </h4>
                <span class="info__input">
                  <input
                    id="infoPhone"
                    v-model="userInfo.phoneNo"
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
                  <label for="infoEmail" class="info__label">회사 이메일</label>
                </h4>
                <span class="info__input">
                  <input
                    id="infoEmail"
                    v-model="userInfo.email"
                    placeholder="이메일을 입력해주세요 "
                    type="text"
                    name="email"
                  />
                </span>
              </div>
            </div>

            <div class="info__row">
              <!-- 도입시기 -->
              <div class="info__item">
                <h4>
                  <label for="infoIntroductionTime" class="info__label"
                    >도입시기</label
                  >
                </h4>
                <select
                  id="infoIntroductionTime"
                  v-model="userInfo.applyDate"
                  class="info__select"
                  name="applyDate"
                >
                  <option value>선택</option>
                  <option
                    v-for="(applyDate, idx) in optData.applyDateList"
                    :key="idx"
                    :value="applyDate"
                    >{{ applyDate }}</option
                  >
                </select>
              </div>

              <!-- 서비스 대상 국가 -->
              <div class="info__item">
                <h4>
                  <label for="infoSuportCountry" class="info__label"
                    >서비스 대상 국가</label
                  >
                </h4>
                <select
                  id="infoSuportCountry"
                  v-model="userInfo.serviceTargetNation"
                  class="info__select"
                  name="serviceTargetNation"
                >
                  <option value>선택</option>
                  <option
                    v-for="(serviceTargetNation,
                    idx) in optData.serviceTargetNationList"
                    :key="idx"
                    :value="serviceTargetNation"
                    >{{ serviceTargetNation }}</option
                  >
                </select>
              </div>
            </div>

            <div class="info__row">
              <!-- 사업장(본사)위치 -->
              <div class="info__item info__location">
                <h4>
                  <label for="companyOriginalSido" class="info__label"
                    >사업장(본사)위치</label
                  >
                </h4>
                <!-- v-model="companySido" -->
                <select
                  id="companyOriginalSido"
                  v-model="userInfo.companyOriginalSido"
                  :class="['info__select']"
                  name="si"
                >
                  <option value="" selected>시/도</option>
                  <option
                    v-for="(sido, idx) in optData.sidoList"
                    :key="idx"
                    :value="sido.name"
                    >{{ sido.name }}</option
                  >
                </select>
              </div>
              <div :class="['info__item', { indent: $device.isMobile }]">
                <select
                  id="companyOriginalSigugun"
                  v-model="userInfo.companyOriginalSigugun"
                  :class="['info__select']"
                  name="gu"
                >
                  <option value="" selected>시/구/군</option>
                  <option
                    v-for="(gu, idx) in sigugunList"
                    :key="idx"
                    :value="gu.name"
                    >{{ gu.name }}</option
                  >
                </select>
              </div>
            </div>
          </div>

          <div class="survey__group">
            <h3 class="survey__mainTit">상세 문의 내용</h3>

            <div class="survey__row">
              <h4 class="survey__tit">
                귀사의 IT 인프라 환경은 어떻게 운영되고 있습니까?
              </h4>
              <div class="checkBox">
                <label
                  v-for="(val, idx) in optData.consultation[0]"
                  :key="idx"
                  :for="`detailQuestionOne_${idx}`"
                  class="checkBox__label"
                >
                  <input
                    :id="`detailQuestionOne_${idx}`"
                    v-model="userInfo.detailQuestionOne"
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
                  :for="`detailQuestionTwo_consulting_${idx}`"
                  class="checkBox__label"
                >
                  <input
                    :id="`detailQuestionTwo_consulting_${idx}`"
                    :ref="`detailQuestionTwo_consulting_${idx}`"
                    :value="val"
                    name="detailQuestionTwo"
                    type="checkbox"
                    class="checkBox__input"
                    @change="InputCheckbox(`${idx}`, val, $event.target)"
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
                      value=""
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
                  id="infoInquiry"
                  v-model="userInfo.questionContents"
                  name="questionContents"
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
            id="consultingSubmitBtn"
            :class="[
              'btn',
              'btn--white',
              $device.isMobile ? 'btn--long' : 'btn--medium '
            ]"
            type="button"
            @click="confirm"
          >
            입력완료
          </button>
        </div>
      </div>
    </template>
  </PopBase>
</template>

<script>
import Icon from '@/components/ui/Icon'
import PopBase from '@/components/shared/PopBase'
import _ from 'lodash'
import {
  applyDateList,
  serviceTargetNationList,
  sidoList,
  sigugunList,
  consultation
} from '@/assets/js/additionalInfo.js'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'PopConsultation',
  components: { Icon, PopBase },
  props: {
    isShow: { type: Boolean, default: false, required: true },
    id: { type: String, defalut: '', required: true }
  },
  data() {
    return {
      userInfo: {
        agree1: false,
        agree2: false,
        applyDate: '',
        companyName: '',
        companyOriginalSido: '', // 시도
        companyOriginalSigugun: '', // 시구군
        email: '',
        managerName: '',
        phoneNo: '',
        questionContents: '',
        serviceTargetNation: '',
        detailQuestionOne: '',
        detailQuestionTwo: []
      },
      optData: {
        applyDateList,
        serviceTargetNationList,
        sidoList,
        sigugunList,
        consultation
      }
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot,
      stateUserInfo: (state) => state.auth.user.info,
      forceUpdate: (state) => state.popup.forceUpdate
    }),
    ...mapGetters('auth', ['isExistAdditionalInfo']),
    sigugunList() {
      const key = this.optData.sidoList.find((sido) => {
        const name = this.userInfo.companyOriginalSido
        return sido.name === name
      })
      let result = []
      if (key) {
        result = this.optData.sigugunList.filter((sigun) => {
          return sigun.code.startsWith(key.code)
        })
        return result
      } else {
        return result
      }
    }
  },
  watch: {
    isShow(isShow) {
      this.userInfo = {
        ...this.userInfo,
        companyName: this.stateUserInfo.companyName,
        managerName: this.stateUserInfo.name,
        email: this.stateUserInfo.username,
        phoneNo: this.stateUserInfo.phoneNo
      }
      if (!isShow) {
        this.resetData()
      }
    },
    sigugunList(val, oldVal) {
      if (oldVal.length > 0) this.userInfo.companyOriginalSigugun = ''
    }
  },
  mounted() {},
  methods: {
    ...mapActions('consultation', ['saveApplication']),
    async confirm() {
      const detailQuestionTwo = _.compact(this.userInfo.detailQuestionTwo).join(
        '^'
      )

      await this.saveApplication({
        userInfo: {
          ...this.userInfo,
          detailQuestionTwo
        }
      })
    },
    InputCheckbox(index, value, element) {
      if (element.checked) {
        this.userInfo.detailQuestionTwo[index] = value
      } else {
        if (value === '기타') {
          this.$set(this.userInfo.detailQuestionTwo, index, '')
        }
        delete this.userInfo.detailQuestionTwo[index]
      }
    },
    onInput(index, inputValue) {
      const ele = this.$refs[`detailQuestionTwo_consulting_${index}`]
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
<style lang="scss" scoped>
@import '@/assets/scss/pages/_form';
@import '@/assets/scss/pages/_survey';
</style>
