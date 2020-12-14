@@ -1,48 +0,0 @@
<template>
  <div class="checkBox">
    <label
      v-for="(op, opIdx) in options"
      :key="opIdx"
      :for="`survey${op.questionId}${op.selectionNumber}`"
      class="checkBox__label"
    >
      <input
        :id="`survey${op.questionId}${op.selectionNumber}`"
        :ref="`survey${op.questionId}${op.selectionNumber}`"
        :value="op"
        type="checkbox"
        class="checkBox__input"
        @change="
          onChange(
            op.questionId,
            op.selectionNumber,
            op.selectionContents,
            $event.target
          )
        "
      />
      <i class="checkBox__ir">
        <Icon :name="'check'" :size="$device.isMobile ? 24 : 20"></Icon>
      </i>
      <span v-if="op.selectionType !== 'INPUT'" class="checkBox__desc">{{
        op.selectionContents
      }}</span>
      <span v-if="op.selectionType === 'INPUT'" class="checkBox__inputBox">
        <input
          v-model="userModel[`${op.selectionNumber}`]"
          type="text"
          maxlength="100"
          :placeholder="op.selectionContents"
          @input="
            onInput(op.questionId, op.selectionNumber, $event.target.value)
          "
        />
      </span>
    </label>
    <!-- {{ options }} -->
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon'

import { mapState } from 'vuex'

export default {
  name: 'Checkbox',
  components: { Icon },
  props: {
    options: { type: Array, default: () => [], required: true }
  },
  data: () => ({
    userModel: [],
    userModelInput: '',
    isSelectionTypeInput: false
  }),
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot
    })
  },
  methods: {
    onChange(questionNumber, selectionNumber, value, element) {
      if (element.checked) {
        if (value !== '기타') {
          this.userModel[selectionNumber] = value
        }
      } else {
        if (value === '기타') {
          this.$set(this.userModel, selectionNumber, '')
        }
        delete this.userModel[selectionNumber]
      }
      // console.log(this.userModel)
      // let data = this.userModel.join('^')
      // if (this.isSelectionTypeInput) {
      //   data = data + '^' + this.userModelInput
      // }
      this.$emit('change', { [questionNumber]: this.userModel })
    },
    onInput(questionNumber, selectionNumber, inputValue) {
      const ele = this.$refs[`survey${questionNumber}${selectionNumber}`]
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
@include breakpoint() {
  .checkBox__inputBox {
    width: 100%;
    input {
      width: 130%;
    }
  }
}
</style>
