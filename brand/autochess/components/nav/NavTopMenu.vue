<template>
  <div>
    <nav class="header">
      <ul class="gnb">
        <li :class="activeName === HOME && 'active'">
          <NuxtLink :to="`/${HOME}`">홈</NuxtLink>
        </li>
        <li :class="activeName === SYNERGY && 'active'">
          <NuxtLink :to="`/${SYNERGY}`">시너지</NuxtLink>
        </li>
        <li :class="activeName === LINE_UP && 'active'">
          <NuxtLink :to="`/${LINE_UP}`">라인업</NuxtLink>
        </li>
        <li :class="activeName === OBJECT && 'active'">
          <NuxtLink :to="`/${OBJECT}`">기물</NuxtLink>
        </li>
        <li :class="activeName === ITEM && 'active'">
          <NuxtLink :to="`${ITEM}`">아이템</NuxtLink>
        </li>
        <li :class="activeName === RANKING && 'active'">
          <NuxtLink :to="`/${RANKING}`">랭킹</NuxtLink>
        </li>
        <li :class="activeName === ACP && 'active'">
          <NuxtLink :to="`/${ACP}`">ACP</NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {
  HOME,
  SYNERGY,
  LINE_UP,
  OBJECT,
  ITEM,
  RANKING,
  ACP
} from '@/components/const/PageName'

export default {
  props: {
    activeName: {
      type: String,
      default: HOME,
      required: true
    }
  },
  data() {
    return {
      HOME,
      SYNERGY,
      LINE_UP,
      OBJECT,
      ITEM,
      RANKING,
      ACP
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  transition: all 0.5s;
  z-index: 100;
  background-color: #703c47;

  .gnb {
    display: flex;
    justify-content: space-between;

    li {
      a {
        position: relative;
        display: block;
        padding: 0 8px;
        font-size: 14px;
        color: #ffbac3;
        line-height: 42px;
        text-decoration-line: none;
      }

      @media (min-width: 330px) {
        &:first-child {
          a {
            padding-left: 16px;
          }
        }

        &:last-child {
          a {
            padding-right: 16px;
          }
        }
      }

      &:hover {
        a {
          color: #fff;
        }
      }

      &.active {
        a {
          color: #fff;
          font-weight: bold;

          &:after {
            content: '';
            display: block;
            height: 3px;
            margin-top: -3px;
            background-color: #fff;
          }
        }
      }
    }
  }
}
</style>
