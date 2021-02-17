var clipboard = null

var app = new Vue({
  el: '#app',
  data: {
    isMobile: null,
    dimmed: false,
    loading: true,
    currentPopup: '',
    playBtnState: true,
    youtubeCheck: false,
    currentSection: '',
    scrollTop: null,
    navList: [{
        name: 'event1',
        area: null
      },
      {
        name: 'event2',
        area: null
      },
      {
        name: 'gift',
        area: null
      },
      {
        name: 'shop',
        area: null
      }
    ],
    shopList: [{
        name: 'btn__emart',
        url: 'http://emart.ssg.com/planshop/detail.ssg?dispCmptId=6000313440', //'http://emart.ssg.com/item/itemView.ssg?itemId=0000006612167',
        txt: '이마트 바로가기'
      },
      {
        name: 'btn__11market',
        url: 'http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=2563738232',
        txt: '11번가 바로가기'
      },
      {
        name: 'btn__lotte',
        url: 'http://www.lottemart.com/product/ProductDetail.do?CategoryID=C001001700140020&ProductCD=0000080135906&socialSeq=&koostYn=',
        txt: '롯데마트 바로가기'
      }
    ],
    userAnswer: '',
    userAnserEtc: '',
    quizData: [
      ['외식', '문화 생활', '국내외 여행', '쇼핑'],
      ['걱정하지마, 다 잘 될거야', '넌 언제나 최고야', '지금까지 수고했어, 힘내자!', '넌 할 수 있어']
    ],
    lotteryResult: 'E13dfdfewaWR',
    lotteryUserData: {
      //event1
      name: '',
      mobile: '',
      agree1: false,
      agree2: false
    },
    quizUserData: {
      //event2 user
      name: '',
      mobile: '',
      age: null,
      agree1: '',
      agree2: ''
    },
    quizAnswerData: {
      //event2 Quiz
      quiz1: null,
      quiz2: null,
      kakaoTalkString: '',
      kakaoStoryString: '',
      facebookString: ''
    },
    personalUrl: '',
    kakaoShareImg: '',
    checkEventShare: 0,
    winnerList: winner
  },
  created: function () {
    this.isMobile = this.detactingDevice()
  },
  mounted: function () {
    setClipboard()

    // canvas 전역변수 설정
    var shareFb = document.getElementById('shareFb')
    var shareKt = document.getElementById('shareKt')
    var shareKs = document.getElementById('shareKs')

    this.$nextTick(function () {
      this.loading = false
      this.sparkleEffect()
      this.handleScroll()
      this.openPop('winner')
    })

    //nav
    this.setSectionArea()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    openPop: function (popName) {
      this.dimmed = true
      var scrollTop = $(window).scrollTop()

      setTimeout(function () {
        $('.pop').css('top', scrollTop + 20)
      }, 100)

      setTimeout(function () {
        //ios focus err
        if (popName == 'quiz-survey') {
          $('.check__only').focus()
        }
      }, 500)

      this.currentPopup = popName
    },
    closePop: function () {
      this.dimmed = false
      this.currentPopup = ''
      this.dataReset()
    },
    playMv: function () {
      onPlayerReady()
    },
    sparkleEffect: function () {
      var $el = $('.sparkle'),
        tot = $el.length,
        c = 0

      setInterval(function () {
        var starOrder = [0, 3, 1, 2]
        $el
          .removeClass('on')
          .delay(3000)
          .eq(starOrder[++c % tot])
          .addClass('on')
      }, 5000)
    },
    shareImage: function (id, imgW, imgH) {
      var self = this
      var userName = this.quizUserData.name
      var customUserName = this.quizUserData.name + ' 탐구영역'
      var userLastName = userName.substring(1, userName.length) // 성빼고

      var fbImg = '/goldenbell2019/image/shared_fb.jpg'
      var ktImg = '/goldenbell2019/image/shared_kt.jpg'
      var ksImg = '/goldenbell2019/image/shared_ks.jpg'

      //bg 전역변수 선언
      var background_img = new Image()
      //bg 초기 설정
      if (id === 'shareFb') {
        background_img.src = fbImg
      } else if (id === 'shareKt') {
        background_img.src = ktImg
      } else {
        background_img.src = ksImg
      }
      // canvas 요소와 context 가져오기
      var canvas = document.getElementById(id)
      var context = canvas.getContext('2d')
      var smallText = canvas.getContext('2d')
      var lastNameText = canvas.getContext('2d')

      // 배경 이미지 선언 및 설정
      var bgImage = new Image()
      bgImage.src = background_img.src
      bgImage.crossOrigin = 'Anonymous'
      // 이미지 로드되면 canvas 자막 그리기
      bgImage.onload = function () {
        // bg 그리기 - x : y : width : height
        //타이틀
        context.drawImage(bgImage, 1, 1, imgW, imgH)
        context.fillStyle = '#fceab8'
        //context.textAlign = "center";

        //유저이름
        smallText.drawImage(bgImage, 1, 1, imgW, imgH)
        smallText.fillStyle = '#fcebb8'
        //smallText.textAlign = "right";

        if (id === 'shareFb') {
          //페이스북 600*315\
          context.textAlign = 'center'
          context.font = '44px NotoSerifKR'
          context.fillText(customUserName, 300, 105)
          smallText.textAlign = 'right'
          smallText.font = '22px NotoSansKR'
          smallText.fillText(userLastName, 368, 176)

          self.quizAnswerData.facebookString = document.getElementById('shareFb').toDataURL('image/jpeg')
        } else if (id === 'shareKt') {
          //카톡 300*200
          context.textAlign = 'center'
          context.font = '24px NotoSerifKR'
          context.fillText(customUserName, 150, 64)

          self.quizAnswerData.kakaoTalkString = document.getElementById('shareKt').toDataURL('image/jpeg')
        } else {
          //카카오스토리 632*300
          context.textAlign = 'center'
          context.font = '44px NotoSerifKR'
          context.fillText(customUserName, 316, 105)
          smallText.textAlign = 'right'
          smallText.font = '22px NotoSansKR'
          smallText.fillText(userLastName, 383, 174)

          self.quizAnswerData.kakaoStoryString = document.getElementById('shareKs').toDataURL('image/jpeg')
        }
      }
    },
    checkConfirm: function (event) {
      tg = event.currentTarget
      tgVal = $(tg).val()

      var $etcInput = $('.check__only')
      this.quizAnswerData.quiz2 = tgVal
      if ($('#answerEtc').is(':checked')) {
        $etcInput.removeAttr('readonly')
        $etcInput.focus()
      } else {
        $etcInput.attr('readonly', 'readonly')
        this.userAnserEtc = ''
      }
    },
    movCheck: function () {
      if (!isOpen) {
        alert('이벤트가 종료되었습니다.')
      } else {
        !this.youtubeCheck ? alert('영상 시청을 완료해야 참여 가능합니다!') : this.openPop('lottery-user')
      }
    },
    event2OpenCheck: function () {
      !quizIsOpen ? alert('이벤트가 종료되었습니다.') : this.openPop('quiz-user')
    },
    detactingDevice: function () {
      return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) ? true : false
    },
    //nav
    setSectionArea: function () {
      //section 높이값 get
      var addValue
      this.isMobile ? (addValue = 120) : (addValue = 10)

      return this.navList.map(function (section) {
        section.area = Math.ceil($('#' + section.name).offset().top + $('#' + section.name).height() - addValue)
      })
    },
    getCurrentSection: function () {
      // if (this.scrollTop <= this.navList[0].area) {
      //   return (this.currentSection = this.navList[0].name)
      // } else if (this.scrollTop > this.navList[0].area && this.scrollTop <= this.navList[1].area) {
      //   return (this.currentSection = this.navList[1].name)
      // } else if (this.scrollTop > this.navList[1].area && this.scrollTop <= this.navList[2].area) {
      //   return (this.currentSection = this.navList[2].name)
      // } else if (this.scrollTop > this.navList[2].area && this.scrollTop <= this.navList[3].area) {
      //   return (this.currentSection = this.navList[3].name)
      // } else if (this.scrollTop > this.navList[3].area && this.scrollTop <= this.navList[4].area) {
      //   return (this.currentSection = this.navList[4].name)
      // }
      var self = this
      for (var section in self.navList) {
        if (self.scrollTop <= self.navList[section].area - 10) {
          return self.navList[section].name
        }
      }
    },
    goSection: function (section) {
      var topAddValue
      this.isMobile ? (topAddValue = 110) : (topAddValue = 0)

      $('html, body').animate({
          scrollTop: Math.ceil($('#' + section).offset().top - topAddValue)
        },
        500
      )
    },
    handleScroll: function (e) {
      this.scrollTop = Math.ceil($(window).scrollTop())
      this.currentSection = this.getCurrentSection()
      this.scrollBottomCheck()
    },
    scrollBottomCheck: function () {
      var docHeight = document.body.offsetHeight
      docHeight = docHeight == undefined ? window.document.documentElement.scrollHeight : docHeight

      var winheight = window.innerHeight + 300
      winheight = winheight == undefined ? document.documentElement.clientHeight : winheight

      var scrollpoint = window.scrollY
      scrollpoint = scrollpoint == undefined ? window.document.documentElement.scrollTop : scrollpoint

      if (scrollpoint + winheight >= docHeight) {
        this.currentSection = 'shop'
      }
    },
    //api
    sendGoldenBellEvent: function () {
      //영상즉당
      var self = this

      $.ajax({
        url: '/api/2019-golden',
        type: 'POST',
        data: self.lotteryUserData,

        success: function (res) {
          if (res.success) {
            self.lotteryResult = res.prizeName
            self.openPop('lottery-result')
            self.checkEventShare = 0
          } else {
            alert(res.error)
          }
        },
        error: function (err) {
          alert(err.responseJSON.error)
        },
        beforeSend: function () {
          self.loading = true
        },
        complete: function () {
          self.loading = false
        }
      })
    },
    quizUserInfo: function () {
      var self = this

      $.ajax({
        url: '/api/2019-golden-quiz/user-info',
        type: 'POST',
        data: self.quizUserData,

        success: function (res) {
          if (res.success) {
            self.openPop('quiz-survey')

            //공유이미지 생성;
            self.shareImage('shareFb', 600, 315)
            self.shareImage('shareKt', 300, 200)
            self.shareImage('shareKs', 632, 300)
          } else {
            alert(res.error)
          }
        },
        error: function (err) {
          alert(err.responseJSON.error)
        },
        beforeSend: function () {
          self.loading = true
        },
        complete: function () {
          self.loading = false
        }
      })
    },
    userAnserSend: function () {
      //퀴즈api
      var self = this
      //퀴즈 기타 체크시
      if ($('#answerEtc').is(':checked')) {
        self.quizAnswerData.quiz2 = self.userAnserEtc
      }

      $.ajax({
        url: '/api/2019-golden-quiz',
        type: 'POST',
        data: self.quizAnswerData,

        success: function (res) {
          if (res.success) {
            self.kakaoShareImg = res.data.kakaTalkImg
            self.personalUrl = res.data.personalUrl
            self.openPop('quiz-share')
          } else {
            alert(res.error)
          }
        },
        error: function (err) {
          alert(err.responseJSON.error)
        },
        beforeSend: function () {
          self.loading = true
        },
        complete: function () {
          self.loading = false
        }
      })
    },
    dataReset: function () {
      this.userAnswer = ''
      this.userAnserEtc = ''
      this.lotteryResult = ''
      this.lotteryUserData = {
        //event1
        name: '',
        mobile: '',
        agree1: false,
        agree2: false
      }
      this.quizUserData = {
        //event2 user
        name: '',
        mobile: '',
        age: null,
        agree1: '',
        agree2: ''
      }
      this.quizAnswerData = {
        //event2 Quiz
        quiz1: null,
        quiz2: null,
        kakaoTalkString: '',
        kakaoStoryString: '',
        facebookString: ''
      }
      this.personalUrl = ''
      this.checkEventShare = 0

      $('#answerEtc').attr('checked', false)
    },
    //sns share
    shareFacebook: function (event) {
      var shareData = {}
      shareData.snsType = 'facebook'
      shareData.url = '/api/2019-golden-quiz/sns'
      var quizPageUrl = this.personalUrl
      var url = 'https://' + location.host + '/2019_goldenbell?utm_source=share&utm_medium=FB_event01&utm_campaign=2019_goldenbell'
      this.checkEventShare += 1

      if (event == 'event2') {
        url = quizPageUrl + '?utm_source=share&utm_medium=FB_event02&utm_campaign=2019_goldenbell'
        saveSnsShare(shareData, function () {})
      }
      window.open(
        'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url),
        'fbPop',
        'menubar=false, scrollbars=no,width=600px,height=450px'
      )
    },
    shareKakaostory: function (event) {
      var shareData = {}
      shareData.snsType = 'kakaostory'
      shareData.url = '/api/2019-golden-quiz/sns'
      var quizPageUrl = this.personalUrl
      var url = 'https://' + location.host + '/2019_goldenbell?utm_source=share&utm_medium=KS_event01&utm_campaign=2019_goldenbell'
      this.checkEventShare += 1

      if (event == 'event2') {
        url = quizPageUrl + '?utm_source=share&utm_medium=KS_event02&utm_campaign=2019_goldenbell'
        saveSnsShare(shareData, function () {})
      }
      window.open('https://story.kakao.com/share?url=' + encodeURIComponent(url), 'fbPop', 'menubar=false, scrollbars=no,width=600px,height=450px')
    },
    shareKakaotalk: function (event) {
      var self = this
      var shareData = {}
      shareData.snsType = 'kakaotalk'
      shareData.url = '/api/2019-golden-quiz/sns'
      this.checkEventShare += 1
      if (event == 'event1') {
        var templateId = 18435

        Kakao.Link.sendCustom({
          //단순공유
          templateId: templateId,
          success: function () {
            var shareData = {}
            shareData.sharingType = 'kakao'
            //shareData.url = self.snsData.url;
          }
        })
      } else {
        saveSnsShare(shareData, function () {})
        Kakao.Link.sendDefault({
          //합성이미지 공유
          objectType: 'feed',
          content: {
            title: '페레로 로쉐 YOU 퀴즈 이벤트',

            description: '지금 ' + self.quizUserData.name + '에 대한 문제를 풀고 황금빛 경품 당첨의 기회도 잡아보세요!',
            imageUrl: self.kakaoShareImg,
            imageWidth: 300,
            imageHeight: 200,
            link: {
              mobileWebUrl: self.personalUrl + '?utm_source=share&utm_medium=KT_event02&utm_campaign=2019_goldenbell',
              webUrl: self.personalUrl + '?utm_source=share&utm_medium=KT_event02&utm_campaign=2019_goldenbell'
            }
          },
          buttons: [{
            title: '지금 확인하러가기',
            link: {
              mobileWebUrl: self.personalUrl + '?utm_source=share&utm_medium=KT_event02&utm_campaign=2019_goldenbell',
              webUrl: self.personalUrl + '?utm_source=share&utm_medium=KT_event02&utm_campaign=2019_goldenbell'
            }
          }]
        })
      }
    },
    checkEvent1End: function () {
      var name = this.lotteryUserData.name
      var mobile = this.lotteryUserData.mobile
      if (name === '') {
        alert('이름을 입력해주세요.')
      } else if (mobile === '') {
        alert('연락처를 입력해주세요.')
      } else {
        this.checkEventShare == 0 ? alert('SNS로 영상을 공유해주세요!') : this.sendGoldenBellEvent()
      }
    },
    checkEvent2End: function () {
      this.checkEventShare == 0 ? alert('내가 만든 퀴즈를 공유해주세요!') : this.closePop()
    }
  }
})

// clipboard
function setClipboard() {
  clipboard = new Clipboard('.codecopy')
  clipboard.on('success', function (e) {
    app.checkEventShare += 1
    alert('복사가 완료되었습니다!')
  })

  clipboard.on('error', function (e) {
    alert('복사실패')
  })
}

function saveSnsShare(data, successCallback) {
  $.ajax({
    url: data.url,
    type: 'POST',
    data: {
      snsType: data.snsType
    },
    success: function (res) {
      /* console.log(res) */
      if (typeof successCallback == 'function') {
        successCallback()
      }
    },
    error: function (res) {
      alert(res.responseJSON.error)
    }
  })
}