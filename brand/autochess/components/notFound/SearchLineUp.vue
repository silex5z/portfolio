<template>
  <div class="search__lineUp">
    <div class="search__lineUp__inner">
      <img src="@/assets/img/icons/etc/alzip.png" alt />
      <strong>검색된 라인업이 없습니다</strong>
      <span>검색 필터를 다시 설정해 주세요</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.search__lineUp {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 740px;
  height: 852px;
  background-color: #fff;
}

.search__lineUp__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 174px;
  height: 174px;

  strong {
    display: block;
    margin: 20px 0 6px;
    color: #57646f;
    font-size: 14px;
    font-weight: bold;
  }
  span {
    color: #9aa4af;
    font-size: 12px;
  }

  img {
    width: 110px;
  }
}

@media (max-width: 1280px) {
  .search__lineUp {
    width: 100%;
    height: 441px;

    .search__lineUp__inner {
      img {
        width: 90px;
      }
    }
  }
}
</style>
