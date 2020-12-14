<template>
  <section class="wrap">
    <vue-scroll>
      <div class="wrap__inner">
        <h1 class="tit">
          개인정보 수집∙이용 동의 (필수)
        </h1>
        <p class="desc">
          메가존클라우드 주식회사는 고객의 사이트 내 서비스 이용을 위하여 아래와
          같은 개인정보를 수집·이용합니다. 개인정보를 제공하는데 동의를 거부할
          권리가 있습니다.<br />그러나
          <strong
            >동의를 거부할 경우 일부 서비스 이용에 제한을 받을 수
            있습니다.</strong
          >
        </p>
        <table>
          <thead>
            <th>수집 항목</th>
            <th>수집 목적</th>
            <th>보유 기간</th>
          </thead>
          <tbody>
            <th>주소</th>
            <th>이벤트 경품 발송</th>
            <th>처리 목적 달성 후 지체 없이 파기</th>
          </tbody>
        </table>
      </div>
    </vue-scroll>
  </section>
</template>

<script>
export default {
  name: 'Policy',
  mounted() {
    if (process.browser) {
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  height: var(--vh);
  &__inner {
    margin: 0 auto;
    @include breakpoint() {
      width: 100%;
      padding: 50px 20px 0;
    }
    @include breakpoint('pc') {
      width: 1000px;
      padding: 50px 0;
    }
    & > .tit {
      font-size: 40px;
      line-height: 50px;
      text-align: center;
      font-weight: $font-bold;
    }
    & > .desc {
      margin: 50px 0 30px;
      line-height: 26px;
    }
    a {
      color: #fff;
    }
    strong {
      font-weight: $font-bold;
    }
  }
}

table {
  width: 100%;
  margin-bottom: 10px;
  thead {
    background: #444;
  }
  th,
  td {
    border: 1px solid #666;
    text-align: center;
    vertical-align: middle;
    padding: 2px 5px;
    font-size: 14px;
    line-height: 26px;
  }

  &.vertical {
    th {
      background: #444;
    }
  }
}
</style>
