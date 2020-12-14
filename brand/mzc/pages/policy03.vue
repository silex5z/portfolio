<template>
  <section class="wrap">
    <vue-scroll>
      <div class="wrap__inner">
        <h1 class="tit">
          개인정보 제 3자 제공에 대한 동의 <span class="red">(선택)</span>
        </h1>
        <p class="desc">
          메가존클라우드 주식회사는 Digital Spectrum 세미나 서비스를 제공을 위해
          귀하의 개인정보를 아래와 같은 목적으로 제공됩니다. 제공된 개인정보는
          해당 목적과 관련된 범위 내에서만 보유/이용 됩니다.
        </p>
        <table>
          <thead>
            <th>제공받는 자</th>
            <th>제공 목적</th>
            <th>제공 항목</th>
            <th>보유 기간</th>
          </thead>
          <tbody>
            <th>
              아마존웹서비스(AWS),<br />
              Odo,<br />
              Sprinklr,<br />
              Zadara VPSA,<br />
              Elastic,<br />
              NewRelic,<br />
              HANKOOK Corporation,<br />
              Syapse,<br />
              Gitlab,<br />
              Rescale,<br />
              Hashicorp,<br />
              VMware,<br />
              Datadog,<br />
              Dell Technology
            </th>
            <th>
              이름, 휴대폰번호, 회사명, 회사 이메일, 직책/직급, 주소(경품 응모
              시)
            </th>
            <th>
              Digital Spectrum 세미나 이용자 제공, 고객 상담/설문 내용 처리 및
              관리, 경품 추첨 및 증정
            </th>
            <th>
              세미나 종료 후 1년까지<br />
              (단, 관계 법령에 의해 보존이 필요할 시 해당 기간까지)
            </th>
          </tbody>
        </table>
        <ul class="notice">
          <li>
            <strong
              >※ 귀하께서는 동의를 거부할 권리가 있습니다.<br />
              미 동의 시, 세미나 참여, 경품 추첨 등과 같은 서비스 제공이 제한 될
              수 있습니다.
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
