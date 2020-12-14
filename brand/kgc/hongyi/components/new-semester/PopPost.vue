<template>
  <PopPost :eventName="$store.state.newSemester.eventName" @complete="complete">
    <template #header>
      <img :src="imageUrl + '/tit-post.jpg'" alt="우편번호 찾기" />
    </template>
    <template #footer>
      <button
        @click="openPop({ popName: 'personal' })"
        type="button"
        class="popupBtn popupBtn__close--full popupBtn--full"
      >
        닫기
      </button>
    </template>
    <template #closeButton>
      <button @click="openPop({ popName: 'personal' })" class="popupBtn__close">
        닫기
      </button>
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
      imageUrl: (state) => `${state.newSemester.imageUrlRoot}/popup`
    })
  },
  methods: {
    ...mapActions('popup', ['openPop']),
    complete() {
      this.openPop({ popName: 'personal' })
    }
  }
}
</script>
