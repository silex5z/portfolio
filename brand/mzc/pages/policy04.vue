<template>
  <section class="wrap">
    <vue-scroll>
      <div class="wrap__inner">
        <h1 class="tit">마케팅 활용 동의 <span class="red">(선택)</span></h1>
        <p class="desc">
          메가존클라우드 주식회사는 고객정보를 마케팅 목적으로 이용하는 경우
          개인정보보호법 등에 따라 사전에 고객에게 동의를 얻고 있습니다.
        </p>
        <table>
          <thead>
            <th>수집 항목</th>
            <th>수집 목적</th>
            <th>보유 기간</th>
          </thead>
          <tbody>
            <th>
              이름, 휴대폰번호, 회사명, 회사 이메일, 직책/직급, 주소(경품 응모
              시)
            </th>
            <th>
              신규상품 및 서비스 소개 및 이벤트 안내, 경품 증정 등
            </th>
            <th>
              세미나 종료 후 1년까지<br />
              (이용자 동의 철회 시 파기)
            </th>
          </tbody>
        </table>
        <ul class="notice">
          <li>
            <strong
              >※ 귀하께서는 동의를 거부할 권리가 있습니다.<br />마케팅 활용 동의
              시, 경품 추첨 및 신규 상품 안내 등 마케팅과 관련된 유용한 정보를
              받으실 수 있습니다.
            </strong>
          </li>
          <li>
            <strong>
              ※ 귀하께서는 광고성 정보에 기재되어 있는 수신거부 안내방법에 따라
              수신을 거부하실 수 있습니다.
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
    .red {
      color: $red;
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
