<template>
  <section class="wrap">
    <vue-scroll>
      <div class="wrap__inner">
        <h1 class="tit">
          메가존클라우드 <br v-if="$device.isMobile" />Digital Spectrum 2020<br
            v-if="$device.isMobile"
          />
          개인정보 처리방침
        </h1>
        <p class="desc">
          메가존클라우드 주식회사(이하 ‘회사’)의 메가존클라우드 Digital Spectrum
          2020 서비스에 대해 이용자의 ‘동의를 기반으로 개인정보를 수집⋅이용 및
          제공’하고 있으며, ‘이용자의 권리(개인정보 자기결정권)를 적극적으로
          보장’합니다.
          <br />회사는 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계
          법령 및 개인정보보호 규정, 가이드라인을 준수하고 있습니다.
        </p>

        <!-- 1장 -->
        <div class="policy policy__depth1">
          <h2 class="policy__tit a11y">제 1 장</h2>
          <div class="policy__group">
            <h3 class="policy__stit">제1조(수집하는 개인정보 항목)</h3>
            <p>
              회사는 다음의 개인정보를 수집하여 처리하고 있습니다. 이용자의
              개인정보를 수집하는 경우에는 반드시 사전에 이용자에게 해당 사실을
              알리고 동의를 구하도록 하겠습니다.
            </p>
            <ol class="policy__depth2">
              <li>
                <h4>1. 이용자의 동의 후 수집되는 정보</h4>
                <table>
                  <thead>
                    <tr>
                      <th class="cell">구분</th>
                      <th class="cell">수집 항목</th>
                      <th class="cell">수집 시점</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="firstRow">
                      <td class="cell">이용자 등록</td>
                      <td class="cell">
                        [필수] 이메일, 비밀번호, 이름, 휴대폰 번호, 회사명,
                        직책/직급
                      </td>
                      <td class="cell">사전 등록/멤버십 등록 시</td>
                    </tr>
                    <tr>
                      <td class="cell">마케팅/ 이벤트 및 경품 응모</td>
                      <td class="cell">[필수] 이름, 휴대폰 번호, 주소</td>
                      <td class="cell">이벤트 및 경품 응모 시</td>
                    </tr>
                    <tr>
                      <td class="cell">상담 신청</td>
                      <td class="cell">
                        [필수] 회사명, 이름, 휴대폰 번호, 이메일, 도입 시기,
                        서비스 대상 국가, 사업장 위치, 문의 내용
                      </td>
                      <td class="cell">상담 신청 시</td>
                    </tr>
                    <tr>
                      <td class="cell">세션 설문 조사</td>
                      <td class="cell">
                        [필수] 회사명, 이름, 휴대폰 번호, 이메일
                      </td>
                      <td class="cell">세션 설문 조사 시</td>
                    </tr>
                    <tr class="lastRow">
                      <td class="cell">서비스 이용</td>
                      <td class="cell">[필수] 휴대폰 번호</td>
                      <td class="cell">콘텐츠 알림 신청 시</td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <h4>2. 서비스 이용 중 자동으로 수집되는 정보</h4>
                <table>
                  <thead>
                    <tr>
                      <th class="cell">구분</th>
                      <th class="cell">수집 항목</th>
                      <th class="cell">수집 시점</th>
                      <th class="cell">수집 방법</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="cell">자동 생성 정보</td>
                      <td class="cell">
                        IP 주소, 쿠키, 서비스 이용 기록, 방문 기록, 불량 이용
                        기록 등
                      </td>
                      <td class="cell">서비스 이용 중 자동 생성</td>
                      <td class="cell">자동 수집 장치를 통한 수집</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ol>
          </div>
          <div class="policy__group">
            <h3 class="policy__stit">제2조(개인정보의 처리 목적)</h3>
            <p>
              회사는 다음의 목적으로 이용자의 개인정보를 처리합니다. 처리하고
              있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용
              목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의
              동의를 받는 등 필요한 조치를 이행할 것입니다.
            </p>
            <ol class="policy__depth2">
              <li>
                <h4>1. 개인정보의 처리 목적</h4>
                <table>
                  <thead>
                    <tr>
                      <th class="cell">구분</th>
                      <th class="cell">처리 목적</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="firstRow">
                      <td class="cell">이용자 등록</td>
                      <td class="cell">
                        Digital Spectrum 서비스 제공 및 관리, 서비스 이용 및
                        상담업무 처리, 행사 관련 안내(이메일 또는전화, 문자
                        알림)
                      </td>
                    </tr>
                    <tr>
                      <td class="cell">마케팅/ 이벤트 및 경품 응모</td>
                      <td class="cell">
                        신규 상품 및 서비스 소개 및 이벤트 안내, 경품 증정 등
                      </td>
                    </tr>
                    <tr>
                      <td class="cell">상담 신청</td>
                      <td class="cell">고객 상담 업무 처리</td>
                    </tr>
                    <tr>
                      <td class="cell">세션 설문 조사</td>
                      <td class="cell">
                        세션 시청 후 응답 확인, 설문 내용 처리
                      </td>
                    </tr>
                    <tr class="lastRow">
                      <td class="cell">서비스 이용</td>
                      <td class="cell">콘텐츠 오픈 안내 SMS 발송</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ol>
          </div>
          <div class="policy__group">
            <h3 class="policy__stit">제3조(개인정보의 보유 및 이용기간)</h3>
            <p>
              회사는 법령에 따른 개인정보 보유⋅이용기간 또는
              정보주체(이용자)로부터 개인정보를 수집 시에 동의 받은 개인정보
              보유⋅이용기간 내에서 개인정보를 처리 및 보유합니다.
            </p>
            <ol class="policy__depth2">
              <li>
                <h4>
                  1. 메가존클라우드 Digital Spectrum 2020 서비스 제공을 위한
                  개인정보 보유 및 이용기간
                </h4>
                <table>
                  <thead>
                    <tr>
                      <th class="cell">구분</th>
                      <th class="cell">보유 및 이용기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="firstRow">
                      <td class="cell">이용자 등록</td>
                      <td class="cell">
                        세미나 종료 후 1 년까지
                      </td>
                    </tr>
                    <tr>
                      <td class="cell">마케팅 / 이벤트 및 경품 응모</td>
                      <td class="cell">
                        마케팅 / 이벤트 및 경품 응모 참여 후 1 년까지
                      </td>
                    </tr>
                    <tr>
                      <td class="cell">상담 신청</td>
                      <td class="cell">이용 묙적 달성 시까지</td>
                    </tr>
                    <tr>
                      <td class="cell">세션 설문 조사</td>
                      <td class="cell">이용 묙적 달성 시까지</td>
                    </tr>
                    <tr class="lastRow">
                      <td class="cell">서비스 이용</td>
                      <td class="cell">이용 묙적 달성 시까지</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  ※ 관계 법령의 규정에 의해 보존의 필요가 있는 경우는 해당
                  기간까지 이용 및 보관합니다.
                </p>
              </li>
              <li>
                <h4>2. 재화 또는 서비스 제공에 따른 법률에 의한 보존</h4>
                <table>
                  <thead>
                    <tr>
                      <th class="cell">구분</th>
                      <th class="cell">관련법률</th>
                      <th class="cell">보존기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="firstRow">
                      <td class="cell">
                        계약 또는 청약 철회 등에 관한 기록
                      </td>
                      <td class="cell" rowspan="4">
                        전자상거래 등에서의 소비자보호에 관한 법률
                      </td>
                      <td class="cell">5년</td>
                    </tr>
                    <tr>
                      <td class="cell">
                        대금 결제 및 재화 등의 공급에 관한 기록
                      </td>
                      <td class="cell">5년</td>
                    </tr>
                    <tr>
                      <td class="cell">
                        소비자의 불만 또는 분쟁 처리에 관한 기록
                      </td>
                      <td class="cell">3년</td>
                    </tr>
                    <tr>
                      <td class="cell">표시·광고에 관한 기록</td>
                      <td class="cell">6개월</td>
                    </tr>
                    <tr>
                      <td class="cell">
                        세법이 규정하는 모든 거래에 관한 장부 및 증빙서류
                      </td>
                      <td class="cell">국세기본법</td>
                      <td class="cell">5년</td>
                    </tr>
                    <tr>
                      <td class="cell">전자금융 거래에 관한 기록</td>
                      <td class="cell">전자금융거래법</td>
                      <td class="cell">5년</td>
                    </tr>
                    <tr class="lastRow">
                      <td class="cell">방문에 관한 기록</td>
                      <td class="cell">통신비밀보호법</td>
                      <td class="cell">3개월</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ol>
          </div>

          <div class="policy__group">
            <h3 class="policy__stit">제4조(개인정보의 위탁 및 국외이전)</h3>
            <p>
              회사는 서비스 제공에 있어 반드시 필요한 업무 중 일부를 외부업체로
              하여금 수행하도록 개인정보를 위탁하고 있습니다. 그리고 위탁받은
              업체가 관계 법령을 위반하지 않도록 관리⋅감독 하고 있습니다
            </p>
            <ol class="policy__depth2">
              <li>
                <h4>
                  1. 개인정보 위탁 업무 내용
                </h4>
                <table>
                  <thead>
                    <tr>
                      <th class="cell">수탁 업체</th>
                      <th class="cell">
                        제공 목적 (위탁 업무 내용)
                      </th>
                      <th class="cell">보유 및 이용기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="firstRow">
                      <td class="cell">메가존㈜</td>
                      <td class="cell">행사 전반 운영 및 관리</td>
                      <td class="cell" rowspan="4">
                        이용 목적 달성 또는 위탁 계약 종료 시까지
                      </td>
                    </tr>
                    <tr>
                      <td class="cell">와이제이정보 주식회사</td>
                      <td class="cell">SMS 발송</td>
                    </tr>
                    <tr>
                      <td class="cell">㈜모바일이앤엠애드</td>
                      <td class="cell">
                        이벤트 경품 발송
                      </td>
                    </tr>
                    <tr class="lastRow">
                      <td class="cell">필립앤푸드㈜</td>
                      <td class="cell">
                        이벤트 경품 배송
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <h4>
                  2. 회사는 위탁계약 체결 시 개인정보 보호법 제25조에 따라
                  위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적
                  보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등
                  책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가
                  개인정보를 안전하게 처리하는지를 감독하고 있습니다.
                </h4>
              </li>
              <li>
                <h4>
                  3. 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본
                  개인정보 처리방침을 통하여 공개하도록 하겠습니다.
                </h4>
              </li>
            </ol>
          </div>

          <div class="policy__group">
            <h3 class="policy__stit">제5조(개인정보의 제3자 제공)</h3>
            <p>
              회사는 정보주체(이용자)의 개인정보를 “제2조(개인정보의 처리
              목적)”에서 명시한 범위 에서만 처리하며, 정보주체의 동의, 법률의
              특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는
              경우에만 개인정보를 제3자에게 제공합니다.
            </p>
            <ol class="policy__depth2">
              <li>
                <h4>
                  1. 개인정보 제3자 제공 내용
                </h4>
                <table>
                  <thead>
                    <tr>
                      <th class="cell">제공받는 자</th>
                      <th class="cell">제공 항목</th>
                      <th class="cell">제공 목적</th>
                      <th class="cell">보유 및 이용 기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="lastRow">
                      <td class="cell">
                        아마존웹서비스(AWS)<br />
                        Odo<br />
                        Sprinklr<br />
                        Zadara VPSA<br />
                        Elastic<br />
                        NewRelic<br />
                        HANKOOK Corporation<br />
                        Syapse<br />
                        Gitlab<br />
                        Rescale<br />
                        Hashicorp<br />
                        VMware<br />
                        Datadog<br />
                        Dell Technology
                      </td>
                      <td class="cell">
                        이름, 휴대폰 번호,회사명, 회사 이메일, 직책/직급, 주소
                      </td>
                      <td class="cell">
                        Digital Spectrum 세미나 이용자 제공,<br />
                        고객 상담/설문 내용 처리 및 관리,<br />
                        경품 추첨 및 증정
                      </td>
                      <td class="cell">
                        세미나 종료 후 1 년까지
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ol>
          </div>

          <div class="policy__group">
            <h3 class="policy__stit">제6조(개인정보의 파기)</h3>
            <p>
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
              불필요하게 되었을 때에는 지체없이 해당 정보를 파기합니다.
            </p>
            <ol class="policy__depth2">
              <li>
                <h4>
                  1. 정보 주체로부터 동의 받은 개인정보 보유기간이 경과하거나
                  처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를
                  계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의
                  데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
                </h4>
              </li>
              <li>
                <h4>2. 개인정보 파기의 절차 및 방법은 다음과 같습니다.</h4>
                <ul class="policy__depth3">
                  <li>
                    ① 파기 절차 : 회사는 파기 사유가 발생한 개인정보를 선정하고,
                    회사의 개인정보 보호책임자의 승인을 받아 개인정보를
                    파기합니다.
                  </li>
                  <li>
                    ② 파기 방법 : 전자적 파일 형태로 기록·저장된 개인정보는
                    기록을 재생할 수 없도록 파기, 종이 문서에 기록·저장 된
                    개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
                  </li>
                </ul>
              </li>
            </ol>
          </div>

          <div class="policy__group">
            <h3 class="policy__stit">
              제7조(정보주체의 권리•의무 및 행사 방법)
            </h3>
            <!-- <p>
              회사는 법령에 따른 개인정보 보유⋅이용기간 또는
              정보주체(이용자)로부터 개인정보를 수집 시에 동의 받은 개인정보
              보유⋅이용기간 내에서 개인정보를 처리 및 보유합니다.
            </p> -->
            <ol class="policy__depth2">
              <li>
                <h4>
                  1. 정보주체(이용자)는 회사에 대해 언제든지 다음 각 호의
                  개인정보보호 관련 권리를 행사할 수 있습니다.
                </h4>
                <ul class="policy__depth3">
                  <li>① 개인정보 열람 요구</li>
                  <li>② 오류 등이 있을 경우 정정 요구</li>
                  <li>③ 삭제 요구</li>
                  <li>④ 처리 정지 요구</li>
                </ul>
              </li>
              <li>
                <h4>
                  2. 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편,
                  모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해
                  지체없이 조치하겠습니다.
                </h4>
              </li>
              <li>
                <h4>
                  3. 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를
                  요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해
                  개인정보를 이용하거나 제공하지 않습니다.
                </h4>
              </li>
              <li>
                <h4>
                  4. 제1항에 따른 권리 행사는 정보 주체의 법정대리인이나 위임을
                  받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보
                  보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하여야
                  합니다.
                </h4>
              </li>
              <li>
                <h4>
                  5. 정보 주체는 개인정보 보호법 등 관계 법령을 위반하여 회사가
                  처리하고 있는 정보주체 본인이나 타인의 개인정보 및 사생활을
                  침해하여서는 아니됩니다.
                </h4>
              </li>
            </ol>
          </div>

          <div class="policy__group">
            <h3 class="policy__stit">제8조(개인정보의 안전성 확보 조치)</h3>
            <p>
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
              있습니다.
            </p>
            <ol class="policy__depth2">
              <li>
                <h4>
                  1. 관리적 조치 : 내부 관리 계획 수립․시행, 정기적 직원 교육 등
                </h4>
              </li>
              <li>
                <h4>
                  2. 기술적 조치 : 개인정보 처리시스템 등의 접근 권한 관리, 접근
                  통제 시스템 설치, 고유 식별 정보 등의 암호화, 보안 프로그램
                  설치 등
                </h4>
              </li>
              <li>
                <h4>3. 물리적 조치 : 전산실, 자료 보관실 등의 접근통제 등</h4>
              </li>
            </ol>
          </div>

          <div class="policy__group">
            <h3 class="policy__stit">
              제9조(개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항))
            </h3>
            <ol class="policy__depth2">
              <li>
                <h4>
                  1. 회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해
                  이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를
                  사용합니다.
                </h4>
              </li>
              <li>
                <h4>
                  2. 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의
                  컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC
                  컴퓨터내의 하드디스크에 저장되기도 합니다.
                </h4>
                <ul class="policy__depth3">
                  <li>
                    ① 쿠키의 사용 목적: 이용자가 방문한 각 서비스와 웹
                    사이트들에 대한 방문 및 이용형태, 인기
                  </li>
                  <li>
                    ② 쿠키의 설치∙운영 및 거부 : 웹브라우저 상단의 도구 > 인터넷
                    옵션 > 개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할
                    수 있습니다.
                  </li>
                  <li>
                    ③ 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이
                    발생할 수 있습니다.
                  </li>
                </ul>
              </li>
            </ol>
          </div>

          <div class="policy__group">
            <h3 class="policy__stit">제10조(개인정보 보호책임자)</h3>
            <p>
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
              처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
              같이 개인정보 보호책임자를 지정하고 있습니다.
              <br />
              또한, 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
              있습니다.
            </p>
            <ol class="policy__depth2">
              <li>
                <h4>
                  1. 개인정보 보호책임자 및 담당부서
                </h4>
                <table>
                  <thead>
                    <tr>
                      <th class="cell">
                        개인정보 보호 책임자
                      </th>
                      <th class="cell">
                        개인정보 보호 담당 부서
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="firstRow">
                      <td class="cell">
                        성명 : 이주완<br />직책 : 대표이사<br />전화번호 :
                        1644-2243
                      </td>
                      <td class="cell">
                        부서명 : IRM<br />
                        전화번호 : 1644-7378<br />
                        이메일 : irm@mz.co.kr
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <h4>
                  2. 정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서
                  발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에
                  관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수
                  있습니다.
                  <br />
                  회사는 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴
                  것입니다.
                </h4>
              </li>
            </ol>
          </div>

          <div class="policy__group">
            <h3 class="policy__stit">제11조(개인정보 열람청구)</h3>
            <p>
              정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를
              아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보
              열람청구가 신속하게 처리되도록 노력하겠습니다.
            </p>
            <ol class="policy__depth2">
              <li>
                <h4 class="a11y">
                  개인정보 열람청구 접수•처리 부서
                </h4>
                <table>
                  <thead>
                    <tr>
                      <th class="cell">
                        개인정보 열람청구 접수•처리 부서
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="firstRow">
                      <td class="cell">
                        부서명 : 마케팅팀<br />
                        담당자 : 고재필<br />
                        연락처 : 02-2108-9171 / 이메일 : jpkoh@megazone.com /
                        팩스 : +82-2-546-2599
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ol>
          </div>

          <div class="policy__group">
            <h3 class="policy__stit">제12조(권익침해 구제 방법)</h3>
            <p>
              정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담
              등을 문의하실 수 있습니다.
            </p>
            <ol class="policy__depth2">
              <li>
                <h4 class="a11y">
                  문의업체 리스트
                </h4>
                <table class="vertical">
                  <tr>
                    <th rowspan="4">
                      개인정보 침해 신고 센터<br />
                      (한국인터넷진흥원 운영)
                    </th>
                    <th>소관업무</th>
                    <td class="cell">개인정보 침해사실 신고, 상담 신청</td>
                  </tr>
                  <tr>
                    <th>홈페이지</th>
                    <td class="cell">privacy.kisa.or.kr</td>
                  </tr>
                  <tr>
                    <th>전화</th>
                    <td class="cell">(국번없이) 118</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td class="cell">
                      (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층
                      개인정보침해신고센터
                    </td>
                  </tr>

                  <tr>
                    <th rowspan="4">
                      개인정보 분쟁조정위원회<br />(개인정보보호위원회 운영)
                    </th>
                    <th>소관업무</th>
                    <td class="cell">
                      개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)
                    </td>
                  </tr>
                  <tr>
                    <th>홈페이지</th>
                    <td class="cell">www.kopico.go.kr</td>
                  </tr>
                  <tr>
                    <th>전화</th>
                    <td class="cell">(국번없이) 1833-6972</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td class="cell">
                      (03171)서울특별시 종로구 세종대로 209 정부서울청사 4층
                    </td>
                  </tr>
                  <tr>
                    <th class="cell" colspan="2">대검찰청 사이버범죄 수사과</th>
                    <td class="cell">(국번없이) 1301 | www.spo.go.kr</td>
                  </tr>

                  <tr>
                    <th class="cell" colspan="2">경찰청 사이버안전국</th>
                    <td class="cell">
                      (국번없이) 182 | http://cyberbureau.police.go.kr
                    </td>
                  </tr>
                </table>
              </li>
            </ol>
          </div>

          <div class="policy__group">
            <h3 class="policy__stit">13조(링크 사이트에 대한 책임)</h3>
            <p>
              회사는 이용자에게 다른 회사의 웹사이트 또는 자료에 대한 링크를
              제공할 수 있습니다.
              <br />
              이 경우 회사는 외부사이트 및 자료에 대한 아무런 통제권이 없으므로
              그로부터 제공받는 서비스나 자료의 유용성, 진실성, 적법성에 대해
              책임질 수 없으며 보증할 수 없습니다. 회사가 포함하고 있는 링크를
              클릭(click)하여 타 사이트(site)의 페이지로 옮겨갈 경우 해당
              사이트의 개인정보처리방침은 회사와 무관하므로 새로 방문한 사이트의
              정책을 확인하시기 바랍니다.
            </p>
          </div>

          <div class="policy__group">
            <h3 class="policy__stit">14조(개인정보 처리 방침 변경)</h3>
            <p>
              개인정보 처리방침은 2020.11.1 부터 적용됩니다.
            </p>
          </div>
        </div>
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
      margin-top: 50px;
      line-height: 26px;
    }
    a {
      color: #fff;
    }
  }
}

.policy {
  &__tit {
    font-size: 20px;
  }
  &__stit {
    margin: 20px 0 5px;
    display: inline-block;
  }

  // 리스트 시작
  &__group {
    line-height: 26px;
    word-break: keep-all;
  }
  // policy__depth1
  &__depth1 {
    margin: 50px 0;

    li {
      & > :not(:first-child) {
        //   padding-left: 20px;
        font-size: 14px;
      }
    }
  }
  // policy__depth2
  &__depth2 {
    & > li {
      // h4 {
      //   list-style: decimal;
      //   list-style-position: inside;
      // }
      h4 {
        margin-top: 10px;
        font-size: 14px;
      }
    }
  }
  &__depth3 {
    padding-left: 16px;
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
  }

  &.vertical {
    th {
      background: #444;
    }
  }
}
</style>
