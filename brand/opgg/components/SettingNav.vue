<template>
  <nav class="setting__sideNavi">
    <ul>
      <li>
        <NuxtLink to="/setting/team">
          <Icon
            :name="'team'"
            :width="20"
            :height="20"
            :viewBox="[20, 20]"
            class="icon"
          ></Icon>
          팀 정보</NuxtLink
        >
      </li>
      <li v-if="hasApiKey">
        <NuxtLink to="/setting/player">
          <Icon
            :name="'player'"
            :width="20"
            :height="20"
            :viewBox="[20, 20]"
            class="icon"
          ></Icon>

          선수/소환사 관리</NuxtLink
        >
      </li>
      <li>
        <NuxtLink to="/setting/data">
          <Icon
            :name="'data'"
            :width="20"
            :height="20"
            :viewBox="[20, 20]"
            class="icon"
          ></Icon>

          데이터</NuxtLink
        >
      </li>
      <li>
        <NuxtLink to="/setting/password">
          <Icon
            :name="'password'"
            :width="20"
            :height="20"
            :viewBox="[20, 20]"
            class="icon"
          ></Icon>

          비밀번호 변경</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import Icon from '@/components/ui/Icon'

export default {
  name: 'SettingNav',
  components: { Icon },
  computed: {
    hasApiKey() {
      return this.$auth.user.teamInfo.apiKey
    }
  }
}
</script>

<style lang="scss" scoped>
nav.setting__sideNavi {
  height: inherit;
  border-right: 1px solid #ebeef1;
  background: #fff;

  ul {
    width: 200px;
    padding-left: 0;
    li {
      display: flex;
      align-items: center;
      height: 60px;
      @extend .opgg--title;
      border-bottom: 1px solid #ebeef1;
      a {
        padding-left: 30px;
        color: #9aa4af;
        line-height: 1;
        vertical-align: middle;
        svg {
          vertical-align: middle;
          margin: -4px 10px 0 0;
        }
        &.nuxt-link-active {
          color: #202d37;
          .icon {
            fill: #202d37 !important;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.setting__sideNavi {
  .nuxt-link-active {
    font-weight: 500;
    color: #202d37;
    .icon path {
      fill: #202d37;
    }
  }
}
</style>
