<template>
  <section class="wrap">
    <vue-scroll>
      <div class="wrap__inner">
        <h1 class="tit">
          개인정보 수집∙이용 동의 (필수)
        </h1>
        <p class="desc">
          메가존클라우드 주식회사의 Digital Spectrum 서비스는 아래 목적을 위하여
          개인정보를 수집/이용 합니다.
        </p>
        <table>
          <thead>
            <th>수집 항목</th>
            <th>수집 목적</th>
            <th>보유 기간</th>
          </thead>
          <tbody>
            <th>이름, 휴대폰번호, 회사명, 회사 이메일, 직책/직급</th>
            <th>
              Digital Spectrum 서비스 제공 및 관리,<br />
              서비스 이용 및 상담업무 처리, 행사 관련 안내(이메일 또는 전화,
              문자 알림)
            </th>
            <th>
              세미나 종료 후 1년<br />
              (단, 관계 법령에 의해 보존이 필요할 시 해당 기간까지)
            </th>
          </tbody>
        </table>
        <ul class="notice">
          <li>
            <strong
              >※ 위와 같이 개인정보를 수집/이용하는데 동의를 거부할 권리가
              있습니다.<br />
              그러나, 동의를 거부할 경우 원활한 서비스 제공에 제한을 받을 수
              있습니다
            </strong>
          </li>
        </ul>
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

.notice {
  margin-top: 20px;
  li {
    line-height: 24px;
    font-size: 14px;
    font-weight: $font-bold;
    margin-bottom: 5px;
  }
}
</style>
