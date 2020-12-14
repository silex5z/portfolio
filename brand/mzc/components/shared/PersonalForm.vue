<template>
  <form @submit.prevent>
    <div class="info__group">
      <!-- 회사 이메일(id) -->
      <div v-if="!type" class="info__item info__name d--flex">
        <div class="info__row">
          <h4>
            <label :for="`${id}InfoEmail`" class="info__label"
              >회사 이메일</label
            >
          </h4>
          <span
            v-if="id === 'additionalInfo' || id === 'resetPW'"
            class="info__input"
          >
            <input
              :value="
                stateUserInfo.username ? stateUserInfo.username : userInfo.email
              "
              disabled
              readonly
            />
          </span>
          <template v-else-if="id !== 'additionalInfo'">
            <span class="info__input">
              <input
                :id="`${id}InfoEmail`"
                v-model="userInfo.email"
                :placeholder="
                  id === 'join' ? '회사 이메일 입력' : '계정을 입력해주세요'
                "
                type="text"
                name="email"
              />
            </span>
            <button
              v-if="id === 'join'"
              type="button"
              class="btn btn--small btn--white btn__duplicate"
              @click="setEmailDuplicate()"
            >
              <span>중복 확인</span>
            </button>
          </template>
        </div>
      </div>

      <!-- 비밀번호 -->
      <div
        v-if="id !== 'additionalInfo' && !type"
        :class="['info__item', 'flex--column']"
      >
        <div class="info__row info__pw">
          <h4>
            <label
              :for="`${id}InfoPw`"
              class="info__label"
              v-text="id !== 'resetPW' ? '비밀번호' : '변경 비밀번호'"
            ></label>
          </h4>
          <span class="info__input">
            <input
              :id="`${id}InfoPw`"
              v-model="userInfo.pw"
              :placeholder="
                id === 'join'
                  ? '영문+숫자+특수문자 8자리 이상'
                  : '비밀번호를 입력해주세요'
              "
              :autocomplete="id === 'login' ? 'on' : 'off'"
              type="password"
              name="pw"
              minlength="8"
            />
          </span>
        </div>
        <div
          v-if="id === 'join' || id === 'resetPW'"
          class="info__row info__pw indent"
        >
          <span class="info__input">
            <input
              :id="`${id}InfoPwConfirm`"
              v-model="userInfo.pwConfirm"
              :autocomplete="id === 'login' ? 'on' : 'off'"
              type="password"
              name="pw"
              placeholder="비밀번호를 한번 더 입력해주세요"
            />
          </span>
        </div>
      </div>

      <!-- 추가정보 -->
      <div
        v-if="id === 'join' || id === 'additionalInfo' || type"
        :class="{ '-isActive': showAdditionalInfo }"
        class="additionalInfo"
      >
        <!-- 이름 -->
        <div
          v-if="id !== 'login' || !id.includes('event')"
          class="info__item info__name"
        >
          <div class="info__row">
            <h4>
              <label :for="`${id}InfoName`" class="info__label">이름</label>
            </h4>
            <span class="info__input">
              <input
                :id="`${id}InfoName`"
                v-model="userInfo.name"
                :readonly="blokingInput"
                :disabled="blokingInput"
                type="text"
                name="name"
                placeholder="이름을 입력해주세요"
              />
            </span>
          </div>
        </div>

        <!-- 휴대폰 번호 -->
        <div class="info__item info__phone d--flex">
          <div class="info__row">
            <h4>
              <label :for="`${id}InfoPhone`" class="info__label"
                >휴대폰 번호</label
              >
            </h4>
            <span class="info__input">
              <input
                :id="`${id}InfoPhone`"
                v-model="userInfo.phoneNo"
                :readonly="blokingInput"
                :disabled="blokingInput"
                type="tel"
                name="phone"
                placeholder="' - ' 없이 입력해주세요"
                maxlength="11"
              />
            </span>
          </div>
        </div>

        <!-- 주소 -->
        <div v-if="type === 'address'" class="info__item info__address">
          <div class="info__row">
            <h4>
              <label :for="`${id}InfoAddressDetail`" class="info__label"
                >주소</label
              >
            </h4>
            <span class="info__input">
              <input
                :id="`${id}InfoZipcode`"
                v-model="userAddress.zipcode"
                type="text"
                name="zipcode"
                readonly
              />
            </span>
            <button
              type="button"
              class="btn btn--small btn__post"
              @click="$emit('open-post')"
            >
              우편 번호 찾기
            </button>
          </div>
          <div class="info__row">
            <div class="info__item info__address indent">
              <span class="info__input address__input">
                <input
                  :id="`${id}InfoAddress`"
                  v-model="userAddress.address"
                  type="text"
                  name="address"
                  readonly
                />
              </span>
            </div>
          </div>
          <div class="info__row">
            <div class="info__item info__address indent">
              <span class="info__input address__input">
                <input
                  :id="`${id}InfoAddressDetail`"
                  v-model="userInfo.addressDetail"
                  type="text"
                  name="addressDetail"
                  placeholder="상세주소를 입력해주세요"
                />
              </span>
            </div>
          </div>
        </div>

        <!-- 회사명 -->
        <div v-if="!type" class="info__item info__company">
          <div class="info__row">
            <h4>
              <label :for="`${id}InfoCompany`" class="info__label"
                >회사명</label
              >
            </h4>

            <span class="info__input">
              <input
                :id="`${id}InfoCompany`"
                v-model="userInfo.companyName"
                :readonly="blokingInput"
                :disabled="blokingInput"
                type="text"
                name="company"
                placeholder="회사명을 입력해주세요"
              />
            </span>
          </div>
        </div>
        <!-- 직책/직급 -->
        <div v-if="!type" class="info__item info__position">
          <div class="info__row">
            <h4>
              <label :for="`${id}InfoPosition`" class="info__label"
                >직책 / 직급</label
              >
            </h4>
            <span class="info__input">
              <input
                :id="`${id}InfoPosition`"
                v-model="userInfo.jobGrade"
                :readonly="blokingInput"
                :disabled="blokingInput"
                type="text"
                name="position"
                placeholder="직책 / 직급을 입력해주세요"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- end:: info__group -->

    <slot name="middle"></slot>

    <!-- start :: agree_group -->
    <div v-if="showAgreement" class="agree__group">
      <div v-if="showAgreementAgreeAll" class="agree__all agree__item">
        <label :for="`${id}AgreeAll`" class="checkBox__label">
          <input
            :id="`${id}AgreeAll`"
            v-model="agreeAll"
            type="checkbox"
            name="agreeAll"
            value="false"
            class="checkBox__input"
          />
          <i class="checkBox__ir">
            <Icon :name="'check'" :size="$device.isMobile ? 24 : 20"></Icon>
          </i>
          <span>전체동의</span>
        </label>
      </div>

      <p v-for="(agree, idx) in agreements" :key="idx" class="agree__item">
        <label :for="`${id}Agree${idx}`" class="checkBox__label">
          <input
            :id="`${id}Agree${idx}`"
            v-model="userInfo[agree.name]"
            :name="agree.name"
            :value="agree.agree"
            type="checkbox"
            class="checkBox__input"
          />
          <i class="checkBox__ir">
            <Icon :name="'check'" :size="$device.isMobile ? 24 : 20"></Icon>
          </i>
          <span class="agree__desc">{{ agree.txt }}</span>
        </label>

        <a :href="agree.link" target="_blank" class="popupBtn__agreeDetail">
          <span>
            <Icon
              :name="'triangle'"
              :size="18"
              :fill="'none'"
              :stroke="'#fff'"
              :stroke-width="2"
            ></Icon>
          </span>
        </a>
      </p>
    </div>
  </form>
</template>

<script>
import Icon from '@/components/ui/Icon'
import { mapState, mapActions } from 'vuex'
import { sidoList, sigugunList } from '@/assets/js/additionalInfo.js'

export default {
  name: 'PersonalForm',
  components: { Icon },
  props: {
    isShow: { type: Boolean, default: false },
    id: { type: String, default: '', required: true },
    type: { type: String, default: '' },
    showAdditionalInfo: { type: Boolean, default: false },
    showAgreement: { type: Boolean, default: false },
    showAgreementAgreeAll: { type: Boolean, default: false },
    agreements: {
      type: Array,
      default: () => {
        return [
          {
            txt: '이용약관 동의(필수)',
            link: '/terms',
            name: 'agree0'
          },
          {
            txt: '개인정보 수집 및 이용동의(필수)',
            link: '/policy02',
            name: 'agree1'
          },
          {
            txt: '마케팅 활용 동의(선택)',
            link: '/policy04',
            name: 'agree2'
          },
          {
            txt: '개인정보 제 3자 제공에 대한 동의(선택)',
            link: '/policy03',
            name: 'agree3'
          }
        ]
      }
    },
    // 주소, 우편번호
    userAddress: {
      type: Object,
      default: () => ({
        address: '',
        zipcode: ''
      })
    }
  },
  data() {
    return {
      optData: {
        sidoList,
        sigugunList
      },
      userInfo: {
        // 필수정보
        email: '',
        tempPW: '',
        pw: '',
        pwConfirm: '',
        // 추가정보
        // address: '',
        addressDetail: '',
        name: '',
        phoneNo: '',
        companyName: '',
        companySido: '',
        companySigugun: '',
        jobGrade: '',
        job: '',
        industry: '',
        // 중복체크 여부에 따라 중복체크 했으면 true 반환
        isExistUsername: false,
        // 동의
        agree0: false,
        agree1: false,
        agree2: false,
        agree3: false
      },
      isExistUsername: false,
      setInputValue: this.blokingInput
    }
  },
  computed: {
    ...mapState({
      stateUserInfo: (state) => state.auth.user.info,
      abovePopName: (state) => state.popup.abovePop.name
    }),
    imageUrl() {
      return `${this.$store.state.imageUrlRoot}`
    },
    isExistAdditionalInfo() {
      return this.$store.getters['auth/isExistAdditionalInfo']
    },
    isRelatedEvent() {
      return this.id.includes('event')
    },
    blokingInput() {
      if (this.isRelatedEvent) return false
      else if (this.id === 'join') return false
      else if (this.id === 'additionalInfo' && !this.isExistAdditionalInfo)
        return false
      else return true
    },
    sigugunList() {
      // if (this.isExistAdditionalInfo) return
      const key = this.optData.sidoList.find((sido) => {
        return sido.name === this.userInfo.companySido
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
    },
    agreeAll: {
      get() {
        return this.agreements.every((agree) => this.userInfo[agree.name])
      },
      set(value) {
        this.agreements.forEach((agree) => (this.userInfo[agree.name] = value))
      }
    }
  },
  watch: {
    isShow(isShow) {
      if (isShow) {
        this.userInfo = {
          ...this.userInfo,
          ...this.stateUserInfo,
          email: this.stateUserInfo.username
        }
      } else {
        this.resetData()
      }
    },
    sigugunList(val, oldVal) {
      if (oldVal.length > 0) this.userInfo.companySigugun = ''
    }
  },
  methods: {
    ...mapActions('popup', ['openPop']),
    ...mapActions('auth', ['checkEmailDuplicate']),
    async setEmailDuplicate() {
      this.userInfo.isExistUsername = await this.checkEmailDuplicate(
        this.userInfo.email
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/_form';

// .popup {
//   &__join {
//     .additionalInfo {
//       &.-isActive {
//         opacity: 1;
//         @include breakpoint() {
//           height: 512px;
//           margin: 0;
//         }
//         @include breakpoint('pc') {
//           height: 210px;
//           margin: 0;
//         }
//       }
//     }
//   }
// }
</style>
