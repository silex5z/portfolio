<template>
  <PopPost :eventName="$store.state.kit.eventName" @complete="complete">
    <template #header>
      <h2>우편번호 찾기</h2>
    </template>
    <template #footer>
      <div class="popup__footer">
        <button
          @click="openPop({ popName: 'address' })"
          type="button"
          class="popupBtn popupBtn__close"
        >
          <span>닫기</span>
        </button>
      </div>
    </template>
  </PopPost>
</template>

<script>
import PopPost from '@/components/shared/PopPost'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopPostSemester',
  components: {
    PopPost
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.kit.imageUrlRoot}/popup`
    })
  },
  methods: {
    ...mapActions('popup', ['openPop']),
    complete() {
      this.openPop({ popName: 'address' })
    }
  }
}
</script>
