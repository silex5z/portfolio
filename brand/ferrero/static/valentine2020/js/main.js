var clipboard = null

var app = new Vue({
  el: '#app',
  data: {
    isMobile: null,
    dimmed: false,
    loading: false,
    currentPopup: '',
    playBtnState: true,
    youtubeCheck: false,
    currentSection: '',
    scrollTop: null,
    isImgLoading: false,
    vs01Count: 0,
    navList: [{
      name: 'event1',
      area: null
    },
    {
      name: 'event2',
      area: null
    },
    {
      name: 'shop',
      area: null
    }
    ],
    shopList: [
      {
        name: 'btn--emart',
        url: 'http://emart.ssg.com/plan/planShop.ssg?dispCmptId=6000224235',
        txt: '이마트 바로가기',
        shopName: 'emart'
      },
      {
        name: 'btn--lotte',
        url: 'http://www.lottemart.com/product/ProductDetail.do?CategoryID=C001001700140020&ProductCD=0000080135906&socialSeq=&koostYn=',
        txt: '롯데마트 바로가기',
        shopName: 'lotte'
      },
      {
        name: 'btn--naver',
        url: 'https://smartstore.naver.com/maeil_store/products/4697488041',
        txt: '네이버 바로가기',
        shopName: 'naver'
      }
      // {
      //   name: 'btn--cu',
      //   url: '',
      //   txt: 'CU 바로가기'
      // }
    ],

    /* 즉당 */
    lotteryResult: 'Rhkdlek3dl1a2ak',
    lotteryCount: 1,
    hasLotteryShared: false,
    lotteryUserData: {
      //event1
      name: '',
      mobile: '',
      agree1: false,
      agree2: true
    },

    /* 카드 만들기 */
    cardCount: null,
    hasCardShared: false,
    cardUserData: {
      //event2 user
      name: '',
      mobile: '',
      age: '',
      gender: '',
      snsid: '',
      visitAgree: null,
      agree: null,

      toName: '',

      /* 카드 메세지 */
      message: '',
      /* 업로드 이미지 */
      encodedImageString: '',
      /* 카카오톡 공유 합성 이미지 */
      kakaoTalkString: '',
    },

    /* 카드만들기 결과 */
    cardResultData: {
      toName: '',
      message: '',
      fromName: ''
    },

    /* 공유하기 관련 */
    personalUrl: '',
    kakaoShareImg: '',
    cardImgUrl: '',

    /* 캔버스 백그라운드 */
    backgroundImg: null
  },
  computed: {
    length: function () {
      return this.cardUserData.message.length
    }
  },
  created: function () {
    callMediaTag(1);
    this.isMobile = this.detactingDevice()

    // alert(navigator.userAgent)
  },
  mounted: function () {
    var self = this

    // canvas 전역변수 설정    
    var shareKt = document.getElementById('shareKt')
    self.preloadImage();
    self.openPop('card-message')
    //nav
    this.setSectionArea();

    ['scroll', 'load'].forEach(function (e) {
      window.addEventListener(e, self.handleScroll)
    })
  },
  methods: {
    /* 이미지 업로드 */
    onUpload: function (e) {
      var self = this

      loadImage(
        e.target.files[0],
        function (canvas) {
          if (canvas.type === "error") {
            alert('다시 시도해 주세요')
          } else {
            if (document.getElementById('previewCanvas')) {
              document.getElementById('imagePreview').removeChild(document.getElementById('previewCanvas'))
            }
            canvas.setAttribute('id', 'previewCanvas')
            document.getElementById('imagePreview').appendChild(canvas)
            self.cardUserData.encodedImageString = canvas.toDataURL('image/png')
          }
        },
        {
          maxWidth: 480,
          maxHeight: 480,
          minWidth: 480,
          minHeight: 480,
          cover: true,
          crop: true,
          canvas: true,
          orientation: true
        }
      )
    },
    onEnter: function (e) {

      if (e.target.value.length > 24) {
        e.preventDefault()
        alert('24자 이상 입력하실 수 없습니다.')
        return false
      }
      if ((e.target.value.match(/\n/g) || []).length > 0) {
        e.preventDefault()
        alert('2줄 이상 입력하실 수 없습니다.')
        return false
      }
    },

    onInput: function (e) {
      /* var event = e
      var self = this
      if(self.isProcessing !=  true) {
        self.cardUserData.message = event.target.value
      } else {
        event.target.value = event.target.value
      }

      if(event.target.value.length > 20) {
        alert(event.target.value.length + 'input')
      } */

      if (e.target.value.length < 25) {
        this.cardUserData.message = ''
        this.cardUserData.message += e.target.value
      } else {
        this.cardUserData.message = ''
        this.cardUserData.message += e.target.value.substr(0, 24)
        e.target.value = e.target.value.substr(0, 24)
      }
    },
    countLength: _.debounce(function (e) {
      var temp
      // console.log(e)
      // console.log(this) 
      // if (this.cardUserData.message.split('\n').length > 2) {
      //   temp = this.cardUserData.message.replace(/\n([^\n]*)$/g, '$1')
      //   this.cardUserData.message = temp 
      //   e.target.value = temp
      //   alert('2줄 이상 입력할 수 없습니다.')
      //   return false
      // }
      
      if (e.target.value.length >= 24) {
        alert('24자 이상 입력할 수 없습니다.')
        return false
      }
      
      
      /* if (e.target.value.split('\n').length > 2) {
        var temp = e.target.value.replace(/\n([^\n]*)$/g, '$1')
        // e.target.value = e.target.value.replace(/\n([^\n]*)$/, '$1')
        // this.cardUserData.message = e.target.value
        this.cardUserData.message = temp

        alert('2줄 이상 입력할 수 없습니다.')
      } */

      // this.messageLength = e.target.value.length
      }, 500, { leading:false, trailing:true} )
    ,
    countLine: function(e){
      var temp
      if (this.cardUserData.message.split('\n').length > 2) {
        temp = this.cardUserData.message.replace(/\n([^\n]*)$/g, '$1')
        this.cardUserData.message = temp 
        e.target.value = temp
        alert('2줄 이상 입력할 수 없습니다.')
        return false
      }
    },
    openPop: function (popName) {
      if (popName === 'card-user') callMediaTag(6);
      this.dimmed = true
      var scrollTop = $(window).scrollTop()

      setTimeout(function () {
        $('.pop').css('top', scrollTop)
      }, 100)
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

    /* canvas 배경 프리로드 */
    preloadImage: function () {
      var self = this
      var ktImg = '/valentine2020/images/shared_kt.jpg'
      self.backgroundImg = new Image()
      self.backgroundImg.src = ktImg
      self.backgroundImg.crossOrigin = 'Anonymous'

    },

    /* 캔버스 이름 합성 */
    shareImage: function (id, imgW, imgH) {
      var self = this
      var userName = this.cardUserData.toName + '님'
      // canvas 요소와 context 가져오기
      var canvas = document.getElementById(id)
      var context = canvas.getContext('2d')

      context.drawImage(self.backgroundImg, 0, 0, imgW, imgH)
      context.fillStyle = '#b68413'
      //카톡 300*200
      context.textAlign = 'center'
      context.font = '24px NotoSansKR'
      context.fillText(userName, 150, 40)

      self.cardUserData.kakaoTalkString = document.getElementById('shareKt').toDataURL('image/png')

    },

    /* 영상 이벤트 참여하기 클릭시 시청완료 체크 */
    movCheck: function () {
      if (isOpen !== true) {
        return alert('1월 21일부터 참여 가능합니다.')
      }
      callMediaTag(2);
      !this.youtubeCheck ? alert('영상 시청을 완료해야 참여 가능합니다!') : this.openPop('lottery-user')
    },

    /* 카드 이벤트 오픈일 체크 */
    isCardEventOpen: function () {
      if (isOpen !== true) {
        return alert('1월 21일부터 참여 가능합니다.')
      }
      this.openPop('card-user')
    },

    detactingDevice: function () {
      return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) ? true : false
    },

    //nav
    setSectionArea: function () {
      //section 높이값 get
      var addValue
      addValue = this.isMobile ? 120 : 10

      return this.navList.map(function (section) {
        section.area = Math.ceil($('#' + section.name).offset().top + $('#' + section.name).height() - addValue)

        if (section.name == 'event2') {
          section.area += 1127
        }
      })
    },
    getCurrentSection: function () {
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
    // 영상 즉당
    sendValentineLottery: function () {
      callMediaTag(3);
      var self = this
      self.lotteryUserData.vs01Count = self.vs01Count > 0 ? true : false;
      $.ajax({
        url: '/api/2020-valentines/video',
        type: 'POST',
        data: self.lotteryUserData,
        success: function (res) {

          if (res.success) {
            self.lotteryResult = res.prizeName
            self.lotteryCount = res.count
            if (res.event) self.openPop('lottery-result')
            else self.openPop('lottery-share')
          } else {
            alert(res.error)
          }
          self.vs01Count = 0;
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

    // sns 공유
    /* 
      eventType: 'VS01', '...'
      shareType: 'share1', 'share2', 'card'
      snsType: 'facebook', 'kakaoTalk', 'kakaoStory'
    */

    shareEvent: function (eventType, shareType, snsType) {
      var self = this
      if (eventType === 'VS01' && shareType === 'share1') {
        self.vs01Count = self.vs01Count + 1;
        if (!/^(010|011|016|017|019)[0-9]{7,8}$/.test(self.lotteryUserData.mobile)) {
          alert('개인정보 입력 후 공유를 진행해주세요.')
          return
        }
      } else if ((eventType === 'VS01' && shareType === 'share2' && self.hasLotteryShared)
        || (eventType === 'CD01' && self.hasCardShared)) {
        alert('이미 공유하셨습니다!\n다시 참여하기 버튼을 눌러주세요.')
        return
      }

      switch (snsType) {
        case 'facebook':
          self.shareFacebook(eventType)
          break
        case 'kakaotalk':
          self.shareKakaotalk(eventType);
          break;
        case 'kakaostory':
          self.shareKakaoStory(eventType);
          break;
      }

      if (eventType === 'VS01') {
        self.getLotteryChance(shareType, snsType)
      } else {
        self.getCardChance(snsType)
      }
    },
    shareCard: function () {
      this.shareKakaotalk('CD02');
    },
    shareFacebook: function (eventType) {
      var url = 'https://' + location.host + '/2020-valentines?utm_source=facebook&utm_medium=sns&utm_campaign=vday&evt=' + eventType
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), "fbPop", "menubar=false, scrollbars=no,width=600px,height=450px")
    },

    shareKakaoStory: function (eventType) {
      var url = 'https://' + location.host + '/2020-valentines?utm_source=kakaostory&utm_medium=sns&utm_campaign=vday&evt=' + eventType
      window.open('https://story.kakao.com/share?url=' + encodeURIComponent(url), "fbPop", "menubar=false, scrollbars=no,width=600px,height=450px")
    },

    shareKakaotalk: function (eventType) {
      var url = 'https://' + location.host + '/2020-valentines?utm_source=kakaotalk&utm_medium=sns&utm_campaign=vday&evt=' + eventType;
      this.checkEventShare += 1;

      var templateId = -1;
      switch (eventType) {
        case 'VS01': //영상공유 내 공유
          templateId = 20179;
          break;
        case 'CD01': //로맨틱 데이트 추가 기회 공유
          templateId = 20181;
          break;
        case 'CD02': //친구에게 카드 보내기 (합성)
          var url = this.personalUrl + '?utm_source=kakaotalk&utm_medium=sns&utm_campaign=vday&evt=' + eventType;
          Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
              title: '',
              description: '청담 씨네시티에서 즐기는 특별한 데이트부터 페레로 로쉐까지! 풍성한 경품 당첨의 기회를 놓치지마세요.',
              imageUrl: this.kakaoShareImg,
              imageWidth: 300,
              imageHeight: 200,
              link: {
                mobileWebUrl: url,
                webUrl: url
              }
            }
          });
          break;
      }
      if (templateId > -1) {
        Kakao.Link.sendCustom({
          //단순공유
          templateId: templateId,
          success: function () {
          }
        })
      }

    },

    // 즉당 추가 기회
    getLotteryChance: function (shareType, snsType) {
      var self = this
      var url = '/api/2020-valentines/video/sns-simple'
      var data = { snsType: snsType }
      if (shareType != 'share1') {
        url = '/api/2020-valentines/video/sns'
        if (self.hasLotteryShared === true) {
          return false
        } else {
          self.hasLotteryShared = true
        }
      } else {
        data.mobile = self.lotteryUserData.mobile
      }

      _apiCall()
      function _apiCall() {
        $.ajax({
          url: url,
          type: 'POST',
          data: data,
          success: function (res) {
            if (res.success) {
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
      }
    },

    // 카드 추가 기회
    getCardChance: function (snsType) {
      var self = this
      if (self.hasCardShared === true) {
        return false
      } else {
        self.hasCardShared = true

        $.ajax({
          url: '/api/2020-valentines/card-sns',
          type: 'POST',
          data: {
            snsType: snsType
          },
          success: function (res) {
            if (res.result == false) {
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

      }
    },

    /* 카드 개인정보 validation */
    checkCardUserInfo: function () {
      callMediaTag(7);
      var self = this

      $.ajax({
        url: '/api/2020-valentines/card/check',
        type: 'POST',
        data: self.cardUserData,

        success: function (res) {
          if (res.result) {
            self.openPop('card-message')

          } else {
            self.cardCount = res.cnt
            self.openPop('card-share')
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

    /* 카드 개인정보 저장 */
    sendCardUserInfo: function () {
      callMediaTag(8);
      var self = this
      self.shareImage('shareKt', 300, 200)
      var data = {
        name: self.cardUserData.name,
        mobile: self.cardUserData.mobile,
        age: self.cardUserData.age,
        snsid: self.cardUserData.snsid,
        gender: self.cardUserData.gender,
        visitAgree: self.cardUserData.visitAgree,
        agree: self.cardUserData.agree,
        image: self.cardUserData.encodedImageString,
        toName: self.cardUserData.toName,
        content: self.cardUserData.message,
        cardImage: self.cardUserData.kakaoTalkString,
      }
      _apiCall()

      function _apiCall() {
        $.ajax({
          url: '/api/2020-valentines/card',
          type: 'POST',
          data: data,
          success: function (res) {
            if (res.result) {
              self.kakaoShareImg = res.cardImage
              self.personalUrl = res.url
              self.cardCount = res.cnt
              self.cardImgUrl = res.image

              self.cardResultData.toName = res.toName
              self.cardResultData.message = res.content.replace(/\n/, "<br />")
              self.cardResultData.fromName = res.fromName

              if (res.event) self.openPop('card-result')
              else self.openPop('card-share')

            } else {
              alert(res.message)
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

      }
    },
    dataReset: function () {
      this.lotteryResult = ''
      this.lotteryUserData = {
        //event1
        name: '',
        mobile: '',
        agree1: false,
        agree2: true
      }
      this.cardUserData = {
        //event2 user
        name: '',
        mobile: '',
        age: '',
        gender: '',
        snsid: '',
        visitAgree: null,
        agree: null,

        toName: null,
        message: '',
        encodedImageString: '',
        kakaoTalkString: ''
      }
      if (document.getElementById('previewCanvas')) {
        document.getElementById('imagePreview').removeChild(document.getElementById('previewCanvas'))
        var placeholderImg = document.createElement('img')
        placeholderImg.src = 'https://fr-ferrerorocher.s3.ap-northeast-2.amazonaws.com/static/2020-valentine/popup/imageplaceholder.jpg'
        placeholderImg.setAttribute('id', 'previewCanvas')

        document.getElementById('imagePreview').appendChild(placeholderImg)
      }

      if (this.youtubeCheck === true) {
        this.youtubeCheck = false
      }

    },
    blockLink: function () {
      alert('2월 1일부터 구매하실 수 있습니다!');
    },
    tryLottery: function () {
      callMediaTag(5);
      if (this.hasLotteryShared === true) {
        this.closePop();
        this.hasLotteryShared = false;
      } else {
        alert('공유를 1회 진행 후 다시 도전해주세요.');
      }
    },
    tryCard: function () {
      if (this.hasCardShared === true) {
        this.closePop();
        this.openPop('card-user');
        this.hasCardShared = false;
      } else {
        alert('공유를 1회 진행 후 다시 도전해주세요.');
      }
    },
    popupClose: function (type) {
      if (type === 'win') callMediaTag(4);
      else if (type === 'lose') callMediaTag(5);
      else if (type === 'card') callMediaTag(9);
      this.closePop();
    },
    openShopPage: function (url, shop) {
      if (shop === 'emart') callMediaTag(10);
      else if (shop === 'lotte') callMediaTag(11);
      else if (shop === 'naver') callMediaTag(12);
      else if (shop === 'cu') callMediaTag(13);
      window.open(url, '_blank');
    }
  }
})