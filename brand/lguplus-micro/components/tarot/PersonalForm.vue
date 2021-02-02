<template>
  <!-- NOTE: tarot(성향분석) 용 custom component 입니다 -->

  <form @submit.prevent>
    <div class="info-group">
      <div
        :style="{ order: `${order[0]}` }"
        v-if="infoDefault === true"
        class="info__item info__name d-flex"
      >
        <!-- 성 -->
        <label :for="`${id}InfoName`" class="info__label">성</label>
        <input
          :id="`${id}InfoLastName`"
          :disabled="userModel.isKmcAuthComplete"
          v-model="userModel.lastName"
          type="text"
          class="info__input"
          name="lastnName"
        />

        <!-- 이름 -->
        <label :for="`${id}InfoName`" class="info__label">이름</label>
        <input
          :id="`${id}InfoName`"
          :disabled="userModel.isKmcAuthComplete"
          v-model="userModel.firstName"
          type="text"
          class="info__input"
          name="name"
        />

        <!-- 통신사 선택 -->
        <select
          id="phoneCorp"
          @change="changeCorp($event)"
          :disabled="userModel.isKmcAuthComplete"
          v-if="phoneCorpAuth === true"
          name="phoneCorp"
          class="phone__corp"
        >
          <option value="null" selected disabled>통신사 선택</option>
          <option value="SKT">SKT</option>
          <option value="KTF">KT</option>
          <option value="LGT">LG U+</option>
          <option value="SKM">SKT 알뜰폰</option>
          <option value="KTF">KT 알뜰폰</option>
          <option value="LGT">LG U+ 알뜰폰</option>
        </select>
      </div>

      <div
        :style="{ order: `${order[1]}` }"
        v-if="infoDefault === true"
        class="info__item info__phone"
      >
        <!-- 연락처 -->
        <div class="d-flex">
          <label :for="`${id}InfoPhone`" class="info__label">연락처</label>
          <input
            :id="`${id}InfoPhone`"
            v-model="userModel.phone"
            :disabled="userModel.hasSentKmcAuth"
            class="info__input"
            type="tel"
            name="phone"
            maxlength="11"
            placeholder="'-' 없이 입력해주세요"
          />
          <button
            @click="sendKmcAuth()"
            v-if="phoneCorpAuth === true && !userModel.isKmcAuthComplete"
            type="button"
            class="popupBtn popupBtn__phoneAuth"
          >
            인증확인
          </button>
        </div>
        <!-- 인증번호 -->
        <div
          v-if="userModel.hasSentKmcAuth && !userModel.isKmcAuthComplete"
          class="d-flex indent"
        >
          <input
            :id="`${id}InfoPhone`"
            v-model="userModel.kmcAuthNum"
            class="info__input"
            type="tel"
            name="phone"
            maxlength="11"
            placeholder="인증번호를 입력해주세요"
          />
          <button
            @click="confirmKmcAuth()"
            v-if="phoneCorpAuth === true"
            type="button"
            class="popupBtn popupBtn__phoneAuth--complete"
          >
            인증번호 확인
          </button>
        </div>
      </div>

      <!-- 주소 -->
      <div
        :style="{ order: `${order[2]}` }"
        v-if="infoAddress === true"
        class="info__item info__address d-flex"
      >
        <div class="d-flex">
          <label :for="`${id}InfoAddressDetail`" class="info__label"
            >주소</label
          >
          <input
            :id="`${id}InfoZipcode`"
            v-model="zipcode"
            type="text"
            name="zipcode"
            readonly
            class="info__input zipcode__input"
          />
          <button
            @click="openPop({ popName: 'post' })"
            type="button"
            class="popupBtn popupBtn__zipcode"
          >
            우편번호찾기
          </button>
        </div>
        <input
          :id="`${id}InfoAddress`"
          v-model="address"
          type="text"
          name="address"
          class="info__input address__input indent"
          readonly
        />
        <input
          :id="`${id}InfoAddressDetail`"
          v-model="userModel.addressDetail"
          type="text"
          name="addressDetail"
          class="info__input address__input indent"
          placeholder="상세주소를 입력해주세요"
        />
      </div>

      <!-- url -->
      <div
        :style="{ order: `${order[3]}` }"
        v-if="infoUrl === true"
        class="info__item info__url d-flex"
      >
        <div class="d-flex">
          <label :for="`${id}InfoUrl`" class="info__label">url</label>
          <span v-if="defaultStaticUrl" class="info__url--static"
            >www.instagram.com/</span
          >
          <input
            :id="`${id}InfoUrl`"
            v-model="userModel.url"
            type="text"
            name="url"
            class="info__input url__input"
          />
        </div>
      </div>
    </div>
    <!-- end:: info-group -->
    <p class="auth__notice">
      * 이전에 인증하신 분들은 별도의 본인 인증을 하지 않습니다.
    </p>

    <!-- start :: agree-group -->
    <div v-if="agreements.length >= 1" class="agree-group">
      <p class="agree-group__notice">
        수집된 개인정보는 이벤트 최종 종료 후 일괄 삭제됩니다.
      </p>
      <div v-if="agreement.agreeAll === true" class="agree__all agree__item">
        <label :for="`${id}AgreeAll`">
          <input
            :id="`${id}AgreeAll`"
            v-model="agreeAll"
            type="checkbox"
            name="agreeAll"
            value="false"
          />
          <i
            :style="{
              flex: `0 0 ${agreement.checkboxSize[0]}px`,
              width: `${agreement.checkboxSize[0]}px`,
              height: `${agreement.checkboxSize[1]}px`,
              marginRight: `${agreement.checkboxSize[2]}px`,
              backgroundImage: `url(${imageUrl}/checkbox.png)`,
              backgroundPositionY: 'top'
            }"
            class="ir__checkBox"
          ></i>
          <img
            v-if="agreement.type === 'img'"
            :src="`${imageUrl}/txt-persoanl-agree-all.png`"
            alt="전체동의"
          />
          <span v-else>전체동의</span>
        </label>
      </div>

      <p
        v-for="(agree, idx) in agreements"
        :key="idx"
        :class="{ lgCorpOnly: agree.lgCorpOnly }"
        class="agree__item"
      >
        <label :for="`${id}Agree${idx}`">
          <input
            :id="`${id}Agree${idx}`"
            :name="agree.name"
            :value="agree.agree"
            v-model="userModel[agree.name]"
            type="checkbox"
          />
          <i
            :style="{
              flex: `0 0 ${agreement.checkboxSize[0]}px`,
              width: `${agreement.checkboxSize[0]}px`,
              height: `${agreement.checkboxSize[1]}px`,
              marginRight: `${agreement.checkboxSize[2]}px`,
              backgroundImage: `url(${imageUrl}/checkbox.png)`,
              backgroundPositionY: 'top'
            }"
            class="ir__checkBox"
          ></i>
          <img
            v-if="agreement.type === 'img'"
            :src="`${imageUrl}/${agree.img}`"
            :alt="`${agree.txt}`"
          />
          <span v-else class="agree__desc">{{ agree.txt }}</span>
        </label>

        <!-- 자세히 보기 버튼 -->
        <a
          v-if="!!agree.link"
          :href="agree.link"
          :class="{ fs0: agreement.type === 'img' }"
          class="popupBtn__agreeDetail"
          target="_blank"
        >
          <span class="a11y">{{ agree.txt }}</span> 자세히보기
        </a>
        <button
          @click="$emit('openAbovePop', agree.agreePopName)"
          v-else
          :class="{ fs0: agreement.type === 'img' }"
          class="popupBtn__agreeDetail"
        >
          <span class="a11y">{{ agree.txt }}</span
          >자세히보기
        </button>
      </p>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PersonalForm',
  props: {
    imageUrl: { type: String, default: '', required: true },

    eventName: { type: String, default: '', required: true },
    id: { type: String, default: '', required: true },
    phoneCorpAuth: { type: Boolean, default: false },
    phoneCorpAuthApi: {
      type: Object,
      default: () => {
        return {
          check: '/api/tarot/kmc/authenticate',
          save: '/api/tarot/kmc/save'
        }
      }
    },
    infoDefault: { type: Boolean, default: true },
    infoAddress: { type: Boolean, default: true },
    infoUrl: { type: Boolean, default: false },
    defaultStaticUrl: {
      type: Boolean,
      default: false
    },
    additionalInfo: {
      type: Array,
      default: () => {
        return []
      },
      required: false
    },
    agreement: {
      type: Object,
      default: () => {
        return {
          type: 'img',
          list: [],
          agreeAll: false,
          checkboxSize: [20, 20, 10]
        }
      }
    },
    order: {
      type: Array,
      default: () => {
        return [1, 2, 3, 4, 5, 6]
      }
    }
  },
  data() {
    return {
      userModel: {
        lastName: '',
        firstName: '',
        name: '',
        phoneCorp: null,
        phone: '',
        kmcAuthNum: '',
        hasSentKmcAuth: false,
        isKmcAuthComplete: false,
        // zipcode: '',
        // address: '',
        addressDetail: '',
        url: '',
        agree0: false,
        agree1: false,
        agree2: false,
        agree3: false,
        agree4: false
      },
      phoneCorpAgreementList: [
        {
          txt: '(간편인증서비스) 서비스 이용 동의',
          img: 'txt-corp-agree0.png',
          link: 'https://www.kmcert.com/qauth/terms/qauth_serviceUseAgree.html'
        },
        {
          txt: '(간편인증서비스) 개인정보 수집 및 이용 동의',
          img: 'txt-corp-agree1.png',
          link:
            'https://www.kmcert.com/qauth/terms/qauth_personalInfoAgree.html'
        },
        {
          txt: '(간편인증서비스) 개인정보 제3자 제공 동의',
          img: 'txt-corp-agree2.png',
          link:
            'https://www.kmcert.com/qauth/terms/qauth_thirdPersonSupplyAgree.html',
          lgCorpOnly: true
        }
      ]
    }
  },
  computed: {
    agreements() {
      // 간편인증서비스 사용 여부가 true일때 동의항목 합쳐서 return
      const agreemenstListAll =
        this.phoneCorpAuth === true
          ? this.userModel.phoneCorp === 'LGT'
            ? [...this.agreement.list, ...this.phoneCorpAgreementList]
            : [
                ...this.agreement.list,
                this.phoneCorpAgreementList[0],
                this.phoneCorpAgreementList[1]
              ]
          : this.agreement.list

      return agreemenstListAll.map((agree, idx) => ({
        txt: agree.txt,
        img: agree.img,
        link: typeof agree.link === 'string' ? agree.link : undefined,
        agreePopName: typeof agree.name === 'string' ? agree.name : undefined,
        name: 'agree' + idx,
        lgCorpOnly: agree.lgCorpOnly ? agree.lgCorpOnly : false
      }))
    },
    agreeAll: {
      get() {
        return this.agreements.every((agree) => this.userModel[agree.name])
      },
      set(value) {
        this.agreements.forEach((agree) => (this.userModel[agree.name] = value))
      }
    },
    address() {
      return this.$store.state[this.eventName].userModel.address
    },
    zipcode() {
      return this.$store.state[this.eventName].userModel.zipcode
    }
  },
  methods: {
    ...mapActions('popup', ['openPop', 'setLoading']),
    changeCorp(e) {
      const lgOnly = $('.lgCorpOnly')
      this.userModel.phoneCorp = e.target.value
      e.target.value === 'LGT'
        ? lgOnly
            .css('display', 'flex')
            .hide()
            .fadeIn()
        : lgOnly.fadeOut()
    },
    sendKmcAuth() {
      if (!this.userModel.lastName) {
        alert('성을 입력해주세요.')
        return
      }
      if (!this.userModel.firstName) {
        alert('이름을 입력해주세요.')
        return
      }
      if (!this.userModel.phoneCorp) {
        alert('통신사를 선택해주세요.')
        return
      }
      if (!this.userModel.phone) {
        alert('연락처를 입력해주세요.')
        return
      }
      if (!this.userModel.agree2) {
        alert('(간편인증서비스) 서비스 이용 동의에 동의해 주세요.')
        return
      }
      if (!this.userModel.agree3) {
        alert('(간편인증서비스)개인정보 수집 및 이용 동의에 동의해 주세요.')
        return
      }
      if (
        !this.userModel.agree4 &&
        (this.userModel.phoneCorp === 'LGT' ||
          this.userModel.phoneCorp === 'LGM')
      ) {
        alert('(간편인증서비스) 개인정보 제3자 제공 동의에 동의해 주세요.')
        return
      }
      this.userModel.name = this.userModel.lastName + this.userModel.firstName
      const userPhoneInfo = {
        name: this.userModel.name,
        phoneCorp: this.userModel.phoneCorp,
        phoneNum: this.userModel.phone,
        agree2: this.userModel.agree2,
        agree3: this.userModel.agree3,
        agree4: this.userModel.agree4
      }

      this.setLoading(true)

      this.$axios
        .post(`${this.phoneCorpAuthApi.check}`, userPhoneInfo)
        .then((res) => {
          this.setLoading(false)
          if (res.data.result === 'Y') {
            if (res.data.type === 'success_authentication') {
              alert('인증이 완료되었습니다.')
              this.userModel.kmcAuthNum = 'success'
              this.userModel.hasSentKmcAuth = true
              this.userModel.isKmcAuthComplete = true
              this.$emit('authComplete')
            } else {
              alert('인증 문자가 발송되었습니다')
              this.userModel.hasSentKmcAuth = true
            }
          } else {
            alert(
              '인증이 실패되었습니다.\n본인인증을 다시 시도해 주세요. [' +
                res.data.response +
                ']'
            )
          }
        })
        .catch((err) => {
          this.setLoading(false)
          alert(err.response.data.error)
        })
    },
    confirmKmcAuth() {
      this.$axios
        .get(
          `${this.phoneCorpAuthApi.save}?authNo=${this.userModel.kmcAuthNum}`
        )
        .then((res) => {
          if (res.data.result === true) {
            alert('인증이 완료되었습니다.')
            // 인증번호 입력칸 hide, dimm show
            this.userModel.isKmcAuthComplete = true
            this.$emit('authComplete')
          } else {
            alert(res.data.message)
          }
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    }
  }
}
</script>

<style lang="scss">
.fs0 {
  font-size: 0;
}
.d-flex {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
}

.info {
  &-group {
    display: flex;
    flex-direction: column;
  }

  &__item {
    // border: 1px solid red;
    input,
    button {
      line-height: 1;
    }

    .info__input {
      width: 100%;
      flex-grow: 1;
      flex-shrink: 1;
      // &::placeholder {
      //   font-size: 90%;
      //   letter-spacing: -1px;
      //   opacity: 0.7;
      // }
      &[type='radio'] {
        width: 1px;
        height: 1px;
        opacity: 0.00001;
      }
    }

    // custom
    &.info {
      &__name {
        .phone__corp {
          flex-basis: auto;
        }
      }
      &__address {
        flex-direction: row;
        flex-wrap: wrap;
        .address__input {
          width: 100%;
        }
      }
    }
  }
  &__label {
    display: inline-block;
    img {
      pointer-events: none;
    }
  }
}

.agree-group {
  .agree__item {
    position: relative;
    display: flex;
    justify-content: space-between;
    label {
      display: flex;
      align-items: center;
      line-height: 1;
      cursor: pointer;
    }
  }
  input {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0;
    width: 1px;
    height: 1px;
    opacity: 0.00001;
    &:checked ~ .ir__checkBox {
      background-position-y: bottom !important;
    }
  }

  .irCheckbox {
    display: inline-block;
    overflow: hidden;
  }
}
</style>
