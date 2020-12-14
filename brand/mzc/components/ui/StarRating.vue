<template>
  <div class="starRating">
    <label
      v-for="(star, idx) in 5"
      :key="idx"
      :for="`star${idx + 1}`"
      class="starRating__label"
    >
      <input
        :id="`star${idx + 1}`"
        v-model="starRating"
        type="radio"
        name="starRating"
        class="starRating__input"
        :value="idx + 1"
      />
      <Icon
        :size="$device.isMobile ? 40 : 26"
        :view-box0="2"
        :view-box1="2"
        :view-box="$device.isMobile ? 30 : 26"
        :name="'star'"
        :stroke="idx + 1 <= starRating ? '#fff' : '#777'"
        :stroke-width="2"
        :fill="idx + 1 <= starRating ? '#fff' : 'none'"
        class="starRating__icon"
      ></Icon>
    </label>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon'

export default {
  name: 'StarRating',
  components: {
    Icon
  },
  data() {
    return {
      starRating: 0
    }
  }
}
</script>

<style lang="scss">
.starRating__icon path {
  stroke-linejoin: initial;
  stroke-linecap: initial;
  transition: all 0.5s ease;
  transform: translate(2px, 2px);
}
</style>
<style lang="scss" scoped>
.starRating {
  font-size: 0;
  &__label {
    position: relative;
    padding: 0 5px;
    cursor: pointer;
  }
  &__input {
    position: absolute;
    top: 0;
    left: 0;
  }
  &__icon {
  }
}
</style>
