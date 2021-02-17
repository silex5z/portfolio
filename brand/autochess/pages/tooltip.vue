<template>
  <div class="root">
    <button
      v-tooltip.top-center="
        '1등: 5% 2등: 15% 3등: 25% 4등: 15% 5등: 15% 6등: 15% 7등: 5% 8등: 5%'
      "
    >
      Hover me (text)
    </button>

    <button
      v-if="isMounted"
      v-tooltip.top-center="$tooltip(tooltipInfo.title, tooltipInfo.text)"
    >
      Hover me (title, text)
    </button>

    <button
      v-if="isMounted"
      v-tooltip.top-center="
        $tooltip(tooltipInfo.title, tooltipInfo.text, tooltipInfo.icons)
      "
    >
      Hover me (title, text, img)
    </button>

    <!-- show: true로 변경하면 이벤트 없이 노출 -->
    <button
      v-if="isMounted"
      v-tooltip="{
        content: $tooltip(
          tooltipInfo.title,
          tooltipInfo.text,
          tooltipInfo.icons
        ),
        show: false,
        trigger: 'manual',
        placement: 'top'
      }"
    >
      A button
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMounted: false,
      tooltipInfo: {
        title: '조류족',
        text: `(3) 모든 아군 조류족이 20%의 회피 확률을 얻습니다.
(6) 모든 아군 조류족이 40%의 회피 확률을 얻고, 다른 아군은 25%의 회피 확률을 얻습니다.
(9) 모든 아군 조류족이 65%의 회피 확률을 얻고, 다른 아군은 45%의 회피 확률을 얻습니다.`,
        icons: [
          'http://static.ilongyuan.cn/official_website/dev/060959293015562489303181772.png',
          'https://zzb-dl.dragonest.com/data/chess/icon-0627/IconHero_1058_1.png'
        ]
      }
    }
  },
  mounted() {
    this.isMounted = true
  }
}
</script>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  margin-top: 150px;
}
button {
  display: block;
  margin-top: 50px;
}
</style>
