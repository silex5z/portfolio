@@ -1,48 +0,0 @@
<template>
  <!-- {{ options }} -->
  <!-- <label :for="`survey${question.questionId}${question.selectionNumber}`">
      <input
        :id="`survey${question.questionId}${question.selectionNumber}`"
        v-model="userModel[modelId]"
        type="checkbox"
        class="checkBox__input"
      />
      <i class="checkBox__ir"
        > <Icon :name="'check'" :size="$device.isMobile ? 24 : 20"></Icon></i>
      <span>{{ question.selectionContents }}</span>
    </label> -->
  <span class="info__textarea">
    <textarea
      v-model="userModel"
      placeholder="내용을 입력해주세요."
      @change="onChange(`${options[0].questionId}`, $event)"
    ></textarea>
  </span>
</template>

<script>
// import Icon from '@/components/ui/Icon'
import { mapState } from 'vuex'

export default {
  name: 'Textarea',
  // components: { Icon },
  props: {
    options: { type: Array, default: () => [], required: true }
  },
  data: () => ({
    userModel: ''
  }),
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot
    })
  },
  methods: {
    onChange(id) {
      this.$emit('change', { [id]: this.userModel })
    }
  }
}
</script>

<style lang="scss" scoped>
textarea {
  resize: none;
  padding: 20px;
  border: none;
  @include breakpoint() {
    height: 130%;
    width: 130%;
  }
  @include breakpoint('pc') {
    height: inherit;
  }
}
</style>
