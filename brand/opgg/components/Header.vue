<template>
  <header class="header">
    <div class="inner">
      <h1 class="logo">
        <NuxtLink to="/main"
          ><img src="@/assets/images/opgg-logo.svg" alt=""
        /></NuxtLink>
      </h1>
      <nav class="gnb--left">
        <ul class="menu">
          <li class="opgg--title">
            <NuxtLink to="/main">대시보드</NuxtLink>
          </li>
          <li v-if="hasApiKey" class="opgg--title">
            <NuxtLink
              :class="[
                $route.fullPath.indexOf('player/') > -1
                  ? 'nuxt-link-active'
                  : ''
              ]"
              to="/player/list"
              >선수관리</NuxtLink
            >
          </li>
          <li class="opgg--title">
            <NuxtLink
              :class="[
                $route.fullPath.indexOf('video/') > -1 ? 'nuxt-link-active' : ''
              ]"
              to="/video/list"
              >매치분석</NuxtLink
            >
          </li>
        </ul>
      </nav>
      <div class="gnb--right">
        <div class="team">
          <v-avatar :size="30" class="team__img">
            <img
              v-if="$auth !== null && $auth.user.teamInfo.logo"
              :src="$auth.user.teamInfo.logo"
              alt=""
            />
          </v-avatar>
          <div v-if="$auth !== null" class="team__name">
            {{ $auth.user.teamInfo.name }}
          </div>
        </div>
        <v-menu :rounded="'4px'" :nudge-bottom="28" :nudge-left="153">
          <template v-slot:activator="{ on, attrs }">
            <button v-bind="attrs" v-on="on" type="button">
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="path-1-inside-1" fill="white">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 0L3.99994 4L0 0"
                  />
                </mask>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 0L3.99994 4L0 0"
                  fill="black"
                  fill-opacity="0.01"
                />
                <path
                  d="M3.99994 4L3.29283 4.7071L3.99993 5.41421L4.70704 4.70711L3.99994 4ZM7.2929 -0.707112L3.29284 3.29289L4.70704 4.70711L8.7071 0.707112L7.2929 -0.707112ZM4.70705 3.2929L0.707112 -0.707101L-0.707112 0.707101L3.29283 4.7071L4.70705 3.2929Z"
                  fill="#57646F"
                  mask="url(#path-1-inside-1)"
                />
              </svg>
            </button>
          </template>
          <v-list class="dropdown">
            <v-list-item
              v-for="(item, index) in naviItem"
              :key="index"
              :class="[item.icon, { '-isHidden': !item.isShow }]"
              class="dropdown__list-item"
            >
              <template v-if="item.isShow">
                <v-list-item-title class="dropdown__list-item__tit">
                  <NuxtLink :to="{ path: item.route }">
                    <Icon
                      :name="item.icon"
                      :width="20"
                      :height="20"
                      :viewBox="[20, 20]"
                      :fill="item.color"
                      class="icon"
                    ></Icon>
                    {{ item.title }}
                  </NuxtLink>
                </v-list-item-title>
              </template>
            </v-list-item>

            <v-list-item class="dropdown__list-item logout">
              <v-list-item-title class="dropdown__list-item__tit">
                <button @click="logout">
                  <Icon
                    :name="'logout'"
                    :width="20"
                    :height="20"
                    :viewBox="[20, 20]"
                    :fill="'#D31A45'"
                    class="icon"
                  ></Icon>
                  <span>로그아웃</span>
                </button>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </header>
</template>
<script>
import Icon from '@/components/ui/Icon'
import { mapState } from 'vuex'

export default {
  components: { Icon },
  data: () => ({
    items: [
      { title: '설정', route: '/setting/password', icon: 'setting' },
      {
        title: '팀 정보',
        route: '/setting/team',
        icon: 'team',
        color: '#202D37'
      },
      {
        title: '선수/소환사 관리',
        route: '/setting/player',
        icon: 'player',
        color: '#202D37'
      },
      {
        title: '데이터',
        route: '/setting/data',
        icon: 'data',
        color: '#202D37'
      },
      {
        title: '비밀번호 변경',
        route: '/setting/password',
        icon: 'password',
        color: '#202D37'
      },
      { title: '문의하기', icon: 'question' }
      // { title: '로그아웃', icon: 'logout', color: '#D31A45' }
    ]
  }),
  computed: {
    ...mapState({
      userInfo: (auth) => auth.user
    }),
    hasApiKey() {
      return this.$auth.user.teamInfo.apiKey
    },
    naviItem() {
      return this.items.map((item, idx) => {
        return {
          ...item,
          isShow: item.icon === 'player' ? !!this.hasApiKey : true
        }
      })
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$auth.setToken(false)
      this.$auth.setRefreshToken(false)
      this.$axios.setHeader('Authorization', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  .inner {
    width: 1000px;
    margin: 0 auto;
    height: 50px;
    display: flex;
    align-items: center;
  }

  .logo {
    width: 80px;
    font-size: 0;
    img {
      width: 100%;
    }
  }
}

.dropdown {
  width: 160px;
  padding: 0;
  border: 1px solid #ebeef1;
  box-shadow: none;

  .dropdown__list-item {
    padding: 2px 18px 0 18px;
    &.-isHidden {
      display: none;
    }

    .v-list-item__title {
      line-height: 1;
    }
    .icon {
      margin: -1px 8px 0 0;
    }
    a,
    button {
      display: inline-flex;
      align-items: center;
      font-size: 13px;
      color: #202d37;
    }

    &.setting {
      padding: 8px 20px 6px;
      border-bottom: 1px solid #ebeef1;
      a {
        color: #9aa4af;
      }
    }
    &.team {
      padding-top: 6px;
    }
    &.password {
      padding-bottom: 6px;
    }
    &.question {
      padding-top: 6px;
      border-top: 1px solid #ebeef1;
      a {
        color: #9aa4af;
      }
    }
    &.logout {
      padding-bottom: 8px;
      span {
        color: #d31a45;
      }
    }
  }
}
//   justify-content: space-between;

.gnb--left {
  margin-right: auto;
  .menu {
    padding-left: 0;
    li {
      display: inline-block;
      font-weight: 700;
      margin-left: 60px;
    }
    a {
      color: #202d37;
      &.nuxt-link-active {
        color: #5383e8;
      }
    }
  }
}
.gnb--right {
  display: flex;
  align-items: center;
  .team {
    display: flex;
    align-items: center;
    &__img {
      border: 1px solid #ebeef1;
      background: map-get($baseColor, 'gray00');
    }
    &__name {
      font-weight: 500;
      margin: 0 6px;
      color: map-get($baseColor, 'gray80');
    }
  }
}
</style>
