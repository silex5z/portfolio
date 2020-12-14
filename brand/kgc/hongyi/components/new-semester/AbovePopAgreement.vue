<template>
  <PopBase
    v-show="isShow"
    :show="isShow"
    :className="'agreement'"
    :mask="false"
    class="popup__agree"
  >
    <template #header>
      <img
        :src="`${imageUrl}/tit-agreement.jpg`"
        v-show="currentAgree === 'agree0'"
        alt="개인정보 수집 및 이용에 대한 동의"
      />
      <img
        :src="`${imageUrl}/tit-agreement2.jpg`"
        v-show="currentAgree === 'agree1'"
        alt="개인정보 처리 위탁에 대한 동의"
      />
      <img
        :src="`${imageUrl}/tit-agreement-review-proof.jpg`"
        v-show="currentAgree === 'review-agree'"
        alt="개인정보 처리 위탁에 대한 동의"
      />
    </template>

    <template #content>
      <div v-show="currentAgree === 'agree0' || currentAgree === 'agree1'">
        <img :src="`${imageUrl}/txt-agreement-v2.jpg`" alt="" />
        <div class="a11y">
          <p>
            이벤트 참여를 위해서는 아래 사항에 대한 동의가 필요합니다. 아래
            사항에 동의하지 않을 수 있으나, 동의하지 않으실 경우 이벤트 참여가
            불가능함을 알려 드립니다. 본인은 귀사가 아래의 내용과 같이 본인의
            개인정보를 수집/이용하는 것에 동의합니다.
          </p>
          <dl>
            <dt>개인정보를 위탁 받는 자</dt>
            <dd>메가존㈜</dd>
            개인정보를 위탁 받는 자:
            <dt>개인정보 위탁 목적</dt>
            <dd>영상 확인, 경품 배송 등 이벤트 진행 관련 업무</dd>
            <dt>위탁 대상 개인정보</dt>
            <dd>성명, 연락처, 주소</dd>
            <dt>위탁 받는 자의 개인정보 보유 및 이용 기간</dt>
            <dd>
              이벤트 종료 및 경품 배송 완료 시점에 지체없이 삭제
            </dd>
          </dl>
        </div>
      </div>

      <div v-show="currentAgree === 'review-agree'">
        <img :src="`${imageUrl}/txt-agreement-review-proof.jpg`" alt="" />
        <div class="a11y">
          <p>
            이벤트 참여를 위해서는 아래 사항에 대한 동의가 필요합니다. 아래
            사항에 동의하지 않을 수 있으나, 동의하지 않으실 경우 이벤트 참여가
            불가능함을 알려 드립니다. 본인은 본 동의에 따라 회사가 이용하고자
            하는 “인스타그램 게시물(이미지, 영상, 초상, 텍스트 등)”에 대한
            초상권, 저작권(2차 저작물 작성권 등 포함) 등의 본래적, 파생적,
            부수적 권리 일체에 대한 권리자로서 다음과 같은 사항을 보증하며, 이에
            대한 이용을 허락합니다.
          </p>
          <ul>
            <li>1 ) 이용 저작물 : 홍이장군 이벤트에 참여한 리뷰 저작물</li>
            <li>
              2) 이용 방법 : “인스타그램 게시물”을 그대로 홍이장군 인스타그램
              계정(@hong_yi_official)에 리그램
            </li>
            <li>
              3) “인스타그램 게시물”은 본인에 의해 창작된 저작물로서 제3자의
              지적재산권, 초상권 및 기타 권리를 도용, 표절 및 허락 없이 이용하지
              않았으며, 관련 법률도 위반하지 않았습니다.
            </li>
            <li>
              4) 회사는“인스타그램 게시물”에 어떠한 책임도 없음에 동의합니다.
            </li>
          </ul>
        </div>
      </div>
    </template>

    <template #footer>
      <button
        @click="close"
        type="button"
        class="popupBtn popupBtn__close--full popupBtn--full"
      >
        닫기
      </button>
      <div class="btnBox"></div>
    </template>

    <template #closeButton>
      <button @click="close" type="button" class="popupBtn__close">
        닫기
      </button>
    </template>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'

import { mapState } from 'vuex'

export default {
  name: 'PopAgreement',
  components: { PopBase },
  model: {
    // v-model custom
    prop: 'currentAgree',
    event: 'close'
  },
  props: {
    currentAgree: {
      type: String,
      default: null
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.newSemester.imageUrlRoot}/popup`
    }),
    isShow() {
      return !!this.currentAgree
    }
  },
  methods: {
    close() {
      this.$emit('close', null)
    }
  }
}
</script>
