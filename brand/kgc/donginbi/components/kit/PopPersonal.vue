<template>
  <div>
    <PopBase
      v-show="isShow"
      :show="isShow"
      :className="'personal'"
      :class="[receiptType]"
    >
      <template #header>
        <h2>개인정보 입력</h2>
      </template>
      <template #content>
        <div class="receiptType">
          <p class="receiptType__desc">경품 수령방법을 선택해 주세요</p>

          <form @submit.prevent class="receiptType__form">
            <label
              :class="{ active: receiptType === 'online' }"
              for="online"
              class="receiptType__label"
            >
              <input
                id="online"
                v-model="receiptType"
                value="online"
                type="radio"
                name="receiptType"
                class="receiptType__input"
              />
              <svg width="72px" height="72px" class="receiptType__svg">
                <path
                  :fill="receiptType === 'online' ? '#7d052a' : '#ffeded'"
                  :stroke="receiptType === 'online' ? 'none' : '#e9cccc'"
                  fill-rule="evenodd"
                  stroke-width="4px"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  d="M35.000,2.000 C53.225,2.000 68.000,16.775 68.000,35.000 C68.000,53.225 53.225,68.000 35.000,68.000 C16.775,68.000 2.000,53.225 2.000,35.000 C2.000,16.775 16.775,2.000 35.000,2.000 Z"
                />
                <path
                  :stroke="receiptType === 'online' ? '#ffeded' : '#e9cccc'"
                  fill-rule="evenodd"
                  stroke-width="4px"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                  d="M17.448,33.701 L29.798,45.365 L51.754,23.409 "
                />
              </svg>
              <span class="receiptType__txt">온라인 (택배 수령)</span>
            </label>
            <label
              :class="{ active: receiptType === 'offline' }"
              for="offline"
              class="receiptType__label"
            >
              <input
                id="offline"
                v-model="receiptType"
                value="offline"
                type="radio"
                name="receiptType"
                class="receiptType__input"
              />
              <svg width="72px" height="72px" class="receiptType__svg">
                <path
                  :fill="receiptType === 'offline' ? '#7d052a' : '#ffeded'"
                  :stroke="receiptType === 'offline' ? 'none' : '#e9cccc'"
                  fill-rule="evenodd"
                  stroke-width="4px"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  d="M35.000,2.000 C53.225,2.000 68.000,16.775 68.000,35.000 C68.000,53.225 53.225,68.000 35.000,68.000 C16.775,68.000 2.000,53.225 2.000,35.000 C2.000,16.775 16.775,2.000 35.000,2.000 Z"
                />
                <path
                  :stroke="receiptType === 'offline' ? '#ffeded' : '#e9cccc'"
                  fill-rule="evenodd"
                  stroke-width="4px"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                  d="M17.448,33.701 L29.798,45.365 L51.754,23.409 "
                />
              </svg>
              <span class="receiptType__txt">오프라인 (백화점 매점 수령)</span>
            </label>
          </form>
        </div>

        <PersonalForm
          ref="personal"
          :id="'personal'"
          :key="forceUpdate"
          :eventName="$store.state.kit.eventName"
          :infoAddress="false"
          :phoneCorpAuth="true"
          :closeOnClickMask="true"
          :agreement="{
            list: [
              {
                txt: '개인정보 보호를 위한 이용자 동의사항',
                name: 'agree0'
              },
              {
                txt: '개인정보 처리 위탁에 대한 동의',
                name: 'agree1'
              }
            ],
            agreeAll: false,
            checkboxSize: [31, 31, 10]
          }"
          @openAbovePop="openAbove"
        ></PersonalForm>
        <div v-if="receiptType === 'online'" class="popup__notice">
          <ul>
            <li>수집된 개인정보는 이벤트 최종 종료 후 일괄 삭제됩니다.</li>
          </ul>
        </div>
        <div v-else class="popup__notice">
          <a
            @click.prevent="openPop({ popName: 'store' })"
            href="https://www.donginbi.com/communications/location.php?bbs_div=&board=location&bbs_etc4=1&search_state=&type=&search_word="
            class="popupBtn__findStore"
          >
            <span data-gtm-category="EVENT" data-gtm-action="매장 찾기"
              >수령 가능 매장 찾기</span
            >
          </a>
          <ul>
            <li>‘수령 가능 매장’에서만 오프라인 수령이 가능합니다.</li>
            <li>
              오프라인 수령 시 체험 KIT와 동일한 구성의 제품이 제공됩니다.
            </li>
            <li>매장별 제품 재고 수량은 각 매장 연락 후 확인 가능합니다.</li>
            <li>[오프라인 수령] 선택 완료 시 수령 안내 문자가 발송됩니다.</li>
            <li>수집된 개인정보는 이벤트 최종 종료 후 일괄 삭제됩니다.</li>
          </ul>
        </div>
      </template>
      <template #footer>
        <div class="popup__footer">
          <button
            @click="closePop"
            type="button"
            class="popupBtn popupBtn__close"
          >
            <span>닫기</span>
          </button>
          <button
            @click="nextStep"
            type="button"
            class="popupBtn popupBtn__result"
          >
            <span
              :data-gtm-label="receiptType === 'online' ? '온라인' : '오프라인'"
              data-gtm-category="EVENT"
              data-gtm-action="당첨 확인"
              >당첨여부 확인하기</span
            >
          </button>
        </div>
      </template>
      <template #closeButton>
        <button type="button" hidden></button>
      </template>
    </PopBase>
    <AbovePop v-model="currentAgree"></AbovePop>
  </div>
</template>

<script>
import PopBase from '@/components/shared/PopBase'
import PersonalForm from '@/components/shared/PersonalForm'
import AbovePop from '@/components/kit/AbovePopAgreement'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopPersonal',
  components: { PopBase, PersonalForm, AbovePop },
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      currentAgree: null,
      receiptType: 'online'
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.kit.imageUrlRoot}/popup`,
      forceUpdate: (state) => state.popup.forceUpdate,
      userSelect: (state) => state.kit.userSelect
    })
  },
  updated() {
    if (this.isShow) {
    }
  },
  mounted() {
    if (process.browser) {
      // this.selectHandler()
    }
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop']),
    ...mapActions('kit', ['saveUserModel']),
    nextStep() {
      const userData = {
        phoneCorp: this.$refs.personal.userModel.phoneCorp,
        phoneNo: this.$refs.personal.userModel.phone,
        name: this.$refs.personal.userModel.name,
        kmcAuthNum: this.$refs.personal.userModel.kmcAuthNum,
        isKmcAuthComplete: this.$refs.personal.userModel.isKmcAuthComplete,
        hasSentKmcAuth: this.$refs.personal.userModel.hasSentKmcAuth,
        agree: this.$refs.personal.userModel.agree0,
        agree2: this.$refs.personal.userModel.agree1,
        agree3: this.$refs.personal.userModel.agree2,
        agree4: this.$refs.personal.userModel.agree3,
        agree5: this.$refs.personal.userModel.agree4
      }
      if (userData.phoneCorp !== 'LGT') {
        userData.agree5 = true
      }

      userData.prizeReceiptType =
        this.receiptType === 'online'
          ? 'EXPERIENCE_KIT_PRIZE_RECEIPT_TYPE_ONLINE'
          : 'EXPERIENCE_KIT_PRIZE_RECEIPT_TYPE_OFFLINE'
      this.saveUserModel(userData)
    },
    openAbove(agreePopName) {
      this.currentAgree = agreePopName
    },
    selectHandler() {
      $('#phoneCorp').change((e) => {
        e.target.value === 'LGT'
          ? $('.popup__content ').addClass('lgt')
          : $('.popup__content ').removeClass('lgt')
      })
    }
  }
}
</script>
