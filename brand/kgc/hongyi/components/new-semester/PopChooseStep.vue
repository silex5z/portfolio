<template>
  <PopBase v-show="isShow" :show="isShow" :className="'chooseStep'">
    <template #header>
      <h1>
        <img
          :src="`${imageUrl}/tit-step.jpg`"
          alt="아이에게 맞는 홍이장군 단계를 선택하세요"
        />
      </h1>
    </template>
    <template #content>
      <div class="chooseStep">
        <label :for="`step${idx}`" v-for="(i, idx) in 3" :key="i">
          <p v-if="idx === 0" class="a11y">1단계 만3세~만4세 선택하기</p>
          <p v-else-if="idx === 1" class="a11y">
            2단계 만5세~만7세 선택하기
          </p>
          <p v-else class="a11y">3단계 만8세~만10세 선택하기</p>
          <input
            :id="`step${idx}`"
            @click="chooseStep($event.target.value)"
            v-model="hongyiLevel"
            :value="`${idx + 1}`"
            :data-gtm-action="`제품선택_${idx + 1}단계`"
            :data-gtm-category="
              activeEventName == 'movie' ? 'EVENT 01' : 'MAIN'
            "
            type="radio"
            name="hongyiLevel"
          />
        </label>
      </div>
    </template>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'PopStep',
  components: { PopBase },
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    },
    // 이벤트 구분짓기 위해 추가
    // kit || movie
    activeEventName: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      hongyiLevel: '',
      levelList: {
        1: 'ONE',
        2: 'TWO',
        3: 'THREE'
      }
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.newSemester.imageUrlRoot}/popup`
    })
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop']),
    ...mapMutations('newSemester', ['SET_USER_MODEL']),
    chooseStep(hongyiLevel) {
      const level = this.levelList[hongyiLevel]
      this.SET_USER_MODEL({ hongyiLevel: level })
      this.openPop({ popName: 'personal' })
    }
  }
}
</script>
