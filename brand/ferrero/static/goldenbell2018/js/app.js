var validationName = function(name) {
  var regx = /[^a-zA-Z가-힣]/;
  return !regx.test(name);
};
var validationPhone = function(phone) {

    //var regx = /^\d{10,11}$/;
    var regx = /^(010|011|016|017|019)[0-9]{7,8}$/;
  return regx.test(phone);
};
var validationInsta = function(id) {
    //var regx = /^[a-z]+[a-z0-9]{5,20}$/g;
    var regx = /^[a-z0-9\._-]{4,20}/;
  return regx.test(id);
};

var isMobile = navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/);


var app = new Vue({
  el: '#app',
  data: {
    prizeName:'initial-image.png',
    /* 팝업 제어 */
    popupCurrent: '',
    popupCurrentCat: '',
    prevPop: '',
    isLoading: false,
    /* 개인정보 */
    userInfo: {
      Name: '',
      Mobile: '',
      InstagramId: '',
      Image: '', // data:image/png:base64 제외
      TodaysGoal: '',
      ImageType: 'c',
      RelayName: '',
      RelayMessage: '',
      agree1: false,
      agree2: false
    },
    userInfoInit:{},
    // 즉석당첨 정보수집동의
    instantAgreeAll: false,
    instantAgree1: false,
    instantAgree2: false,
    // 즉석당첨 정보수집동의
    relayMsgValue: 0,
    agreeAll: false,
    WrittenMessage: true,
    deviceType: '',
    videoWatched: false,
    timeNow: -1,
    capturedTime: -1,
    relayMsgList: ['직접입력', '함께 힘내자!', '오늘도 파이팅!', '열심히 준비하자!', '넌 언제나 최고야'],
    initialImg: { image: "https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/page-images/pc/temp-slide.png" },

    /* 캡쳐된 이미지 */
    capturedCanvas: '',

    /* 슬라이드 이미지 리스트*/
    slideImgList: [{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115835.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115805.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115723.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115654.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115604.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115527.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115511.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115421.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115418.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115349.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115302.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115243.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115154.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115141.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115108.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115047.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115016.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108115027.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108114957.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108114857.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108114802.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108113427.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108113227.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108113202.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108113101.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108113021.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108113014.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108113013.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108112949.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108112910.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108112903.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108112806.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108112741.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108112651.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108112550.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108112505.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108112438.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108112308.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108112214.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108112145.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108112055.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108111954.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108111931.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108111847.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108111758.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108111708.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108111621.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108111548.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108111527.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108111440.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108111354.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108111307.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108111240.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108111205.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108111133.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108111022.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108110939.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108110823.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108110732.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108110623.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108110526.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108110413.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108110241.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108105409.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108105214.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108104052.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108103214.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108102901.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108102211.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108101534.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108101029.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108100735.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108100535.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108100340.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108100252.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108095044.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108094627.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108094257.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108094128.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108093654.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108091856.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108091123.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108090326.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108085248.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108082650.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108082112.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108081917.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108075931.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108073918.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108073234.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108073000.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108071103.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108070457.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108065012.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108064929.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108064852.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108064358.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108064137.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108063840.jpg"},{"image":"https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/images/20181108062538.jpg"}],

    /* stamp */
    stampList: [],
    historyList : []
  },

  created: function () {
    var self = this;
    self.deviceType = getDeviceName();
    self.userInfoInit = JSON.parse(JSON.stringify(self.userInfo));
    self.createList();
    //self.determineState();
    self.getSlideImgList();
    //self.getStampList();
    // self.openPop('userinfo-ev2');
    self.getTimeNow();
      // self.getDday();
    setInterval(function () {
        self.getTimeNow();
    }, 20000);
  },

  computed: {
    joinedMessage: function(){
      //  if (this.userInfo.RelayMessage == '0') {
      //  return '@' + this.userInfo.RelayName + '  ' + this.WrittenMessage;
      //} else {
      //  return '@' + this.userInfo.RelayName + '  ' + this.relayMsgList[this.userInfo.RelayMessage];
      //}
      return '@' + this.userInfo.RelayName + ' ' + this.userInfo.RelayMessage;
    }

  },
  methods: {
      //trimExeededLetter: function(event, maxNum){
      //    if (event.target.value.length > maxNum) {
      //        alert(maxNum + '자 이내로 입력해주세요.');
      //        event.target.value = event.target.value.substr(0,maxNum);
      //    }
      //},
      checkAllAgree: function () {
          this.agreeAll = this.userInfo.agree1 && this.userInfo.agree2 ? true : false;
      },
      // 즉석당첨 methods
      beginEntry: function () {
          this.isLoading = true;
          //$('#loading').show();
      },
      completeEntry: function () {
          this.isLoading = false;
          //$('#loading').hide();
      },
      successEntry: function (res) {

          $('#frmGoldenBell2018Entry').clearForm();
          this.instantAgreeAll = false;
          this.instantAgree1 = false;
          this.instantAgree2 = false;

          this.closePop('userinfo');
          this.openPop('share');
      },
      failEntry: function (xhr, err) {
          if (err !== 'abort') {
              alert(xhr.responseJSON.message);
          }
      },
    openPop: function (Name) {
      if(Name === 'prev'){
        this.popupCurrent = this.prevPop;
        this.popupCurrentCat = this.determineCat(this.popupCurrent);
      } else {
          if (Name == 'userinfo-ev2' || Name == 'userinfo') {
              this.initUserInfo();
              this.videoWatched = false;
          }
          this.prevPop = this.popupCurrent;
          this.popupCurrent = Name;
          this.popupCurrentCat = this.determineCat(Name);
      }
      this.scrolltoTop(this.popupCurrentCat);
    },

    openPopOnCurrentPosition: function(Name){
        this.popupCurrent = Name;
        this.popupCurrentCat = this.determineCat(Name);
        $('.popup--ev1').css({ top: $(window).scrollTop() + 'px'});
    },
    scrolltoTop: function (cat) {
        if (this.deviceType == 'm') {
            var offset = cat == 'cat1' ? 0 : 1222;
        } else {
            var offset = cat == 'cat1' ? 0 : 1100;
        }

        $('html, body').animate({
            scrollTop: offset
        });
        /* $('.popup').css({ top: $(window).scrollTop() + 'px'}); */
    },

    closePop: function (name) {
        this.popupCurrent = '';
        $('.popup--ev1').css({ top: 0 + 'px' });
        if (name == 'video') {
            if (player) {
                stopVideo(player);
            }
        }
        
    },
    initUserInfo: function () {
        this.userInfo = {};
        this.userInfo = JSON.parse(JSON.stringify(this.userInfoInit));
        this.agreeAll = false;
        this.relayMsgValue = 0;
    },
    determineCat: function(Name){
      switch(Name){
        case 'userinfo-ev2' :
        case 'relay-message-select' :
        case 'relay-message-result' :
        case 'participation-history' :
          return 'cat2'
          break;
        default :
          return 'cat1'
          break;
      }
    },

    getTimeNow : function(){
        var self = this;
        var now = new Date();
        self.timeNow = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
    },
    setImgsrc: function(deviceType, imgName){
        return 'https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/page-images/pop/' + deviceType + '-' + imgName + '.png';
    },

    checkWatched : function(){
        if (this.videoWatched) {
            this.openPop('userinfo');
        } else {
            alert('영상을 모두 시청해주세요.');
      }
      //console.log('asdfa');
        //this.openPop('userinfo');
        // 랩사트래킹
        var device = 'pc';
        var cmpNo = 3661;
        var depth = 3;

        if (isMobile) {
            device = 'm';
            cmpNo = 1944;
            depth = 3
        }

        mzSendClickTag(cmpNo, depth, device);
    },

    makeCanvas: function(){
      captureImg();
    },

    downloadCanvas: function(){
      downloadImg();
    },

    createList: function () {
        var self = this;
      var tmpList = [];
      var end = new Date(2018,10,10);
      var obj = {};
      for(var d = new Date(2018,9,14); d <= end; d.setDate(d.getDate()+ 1)){
          var i = d.getDate();
          //console.log(i);
        obj.day = d.getDate();
        obj.join = false;
        if(i == 14 || i == 9 || i == 10){
          obj.pass = true;
        }
        tmpList.push(obj);
        // console.log(tmpList);
        obj = {};

      };
      self.devideList(tmpList);
      //console.log(self.historyList);
    },

    devideList: function (list) {
        //console.log(list);
        var self = this;
        var tmpArr = [];
        for (var i = 1; i < list.length + 1; i++) {
            tmpArr.push(list[i - 1]);
            //console.log(tmpArr);
            if (tmpArr.length > 1 && i % 7 == 0) {
                self.historyList.push(tmpArr);
                tmpArr = [];
                //console.log(self.historyList)
            }
        }
        //console.log(self.historyList);

    },
    determineState : function(data){
      var self = this;
      self.historyList.forEach(function(week, idx){
        week.filter(function(obj){
          self.stampList.forEach(function(val, i){
            if(obj.day === val.day){
              return obj.join = true;
            }
          })
        })
      })
    },
    getSlideImgList: function(){
//      var self = this;
//      $.ajax({
//        url    : '/api/GoldenBell2018RelayApi/GetGoldenBell2018RelayEntryList',
//        type   : 'get',
//        async  : false,
//        success: function (res) {
//            // console.log(res);
//            self.slideImgList = res;
//            var slideLength = self.slideImgList.length;
//            if (slideLength < 5) {
//                //console.log(self.slideImgList.length);
//                for (var i = 0; i < 5 - slideLength; i++) {
//                    self.slideImgList.push(self.initialImg);
//                }
//            }
//            self.$nextTick(function () {
//                if ($('.relay-slider')[0].slick) {
//                    $('.relay-slider')[0].slick.refresh();
//                }
//            });
//            
//        }.bind(this),
//        error:function(e){
//          alert(e.responseJSON.message);
//        }
//      });
    },

    getStampList: function () {
        var self = this;
        $.ajax({
        url    : '/api/GoldenBell2018RelayApi/GetGoldenBell2018EntryDate',
        type   : 'get',
        async  : false,
        success: function (res) {
             //console.log(res);
            self.stampList = res;
            self.determineState();
        }.bind(this),
        error:function(e){
          //console.log(e);
        }
      });
    },

    /* 릴레이 이미지 캔버스 */
    saveUserInfo : function(){
      var self = this;
      $.ajax({
       url    : '/api/GoldenBell2018RelayApi/CreateGoldenBell2018RelayEntry',
       type   : 'post',
       async  : false,
       data   : self.userInfo,
       success: function (res) {
           //console.log(res);
           alert('인스타그램에 이미지를 업로드 해야 참여가 완료됩니다!');

           self.openPop('relay-message-result');
           self.isLoading = false;
           self.getStampList();
           self.getSlideImgList();
           
       }.bind(this),
       error: function (e) {
         self.isLoading = false;
         alert(e.responseJSON.message);
       }
      });
    },

    captureImg: function () {
        // 랩사트래킹
        var device = 'pc';
        var cmpNo = 3661;
        var depth = 13;

        if (isMobile) {
            device = 'm';
            cmpNo = 1944;
            depth = 13
        }
        mzSendClickTag(cmpNo, depth, device);

        var self = this;
        self.capturedTime = self.timeNow;
        self.isLoading = true;
        setTimeout(function () {
            html2canvas(document.querySelector("#relay-canvas"), { scale: 1 }).then(function (canvas) {
                // document.querySelector('.test').appendChild(canvas);
                self.capturedCanvas = canvas;

                var imgSrc = canvas.toDataURL('image/png');
                self.userInfo.Image = imgSrc.split(',')[1];
                // console.log(imgSrc);
                self.saveUserInfo();
            })
        }, 800);
        
    },

    // function drawImg(src) {
    //     var img = document.createElement('img');
    //     img.src = src;
    //     img.style = 'position: absolute; bottom: 0; z-index: 9999;';

    //     document.body.appendChild(img);
    // }

    downloadImg: function (cvs) {

        // 랩사트래킹
        var device = 'pc';
        var cmpNo = 3661;
        var depth = 15;

        if (isMobile) {
            device = 'm';
            cmpNo = 1944;
            depth = 15
        }

        mzSendClickTag(cmpNo, depth, device);

        //debugger;
        var self = this;
        self.isLoading = true;
        //  console.log(cvs);
        if (cvs.msToBlob) {
            var blob = cvs.msToBlob();
            window.navigator.msSaveBlob(blob, 'ferrero rocher golden bell event.png');
            // alert('msblob');
            // console.log('msblob');
            self.isLoading = false;
        } else {
        var href = cvs.toDataURL('image/png');
        var link = document.createElement('a');
        link.href = href;
        link.download = 'ferrero rocher golden bell event.png';
        link.innerHTML = 'download';
        // link.style = 'position: absolute; top: 0; right: 0; color: #fff; z-index: 9999; display: block; width: 100px; height: 100px; font-size:35px';
        document.body.appendChild(link);
  
        if(getMobileKind() == 'ios'){
            alert('새 창으로 이동하여 이미지를 꾸욱 눌러 저장해주세요!');
            self.isLoading = false;
            window.open(href, '_blank');
            return false;
        }

        link.click();
        document.body.removeChild(link);
        self.isLoading = false;
        //} else {
        //  window.open(href);
        //  alert('toData window open');
        //}

        /* var iframe = '<iframe src="' + href + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
        var x = window.open();
        x.document.write(iframe);
        x.document.close(); */
        }
    },

    setImgsrc: function (deviceType, imgName) {
      if (deviceType == 'm') {
        return 'https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/page-images/pop/' + deviceType + '/' + imgName + '.png';
      } else {
        return 'https://fr-ferrerorocher.s3.amazonaws.com/static/goldenBell2018/page-images/pop/' + imgName + '.png';
      }
    },
    setSynthesisImgsrc: function(deviceType, imgName) {
      if(deviceType == 'm'){
          return '/Images/GoldenBellRelay/pop/' + deviceType + '/' + imgName + '.png';
      } else {
          return '/Images/GoldenBellRelay/pop/' + imgName + '.png';
      }
    },
    onSelectMsg: function(e) {
      // var idx = parseInt(e.target.value);

      if (this.relayMsgValue) {
        this.WrittenMessage = false;
        this.userInfo.RelayMessage = this.relayMsgList[this.relayMsgValue];
      } else {
        this.showInsertMsg();
      }
    },
    showInsertMsg: function() {
      this.userInfo.RelayMessage = '';
      this.WrittenMessage = true;
    },
    checkValues: function(infoObj) {
      return infoObj.Name.length && infoObj.Mobile.length && infoObj.InstagramId.length;
    },
    _displayMsg: function(msg) {
      alert(msg);
    },
    validateUserInfo: function () {
        // 랩사트래킹
        var device = 'pc';
        var cmpNo = 3661;
        var depth = 12;

        if (isMobile) {
            device = 'm';
            cmpNo = 1944;
            depth = 12
        }
        mzSendClickTag(cmpNo, depth, device);

      //debugger;
      var isPassName = validationName(this.userInfo.Name);
      var isPassPhone = validationPhone(this.userInfo.Mobile);
      var isPassInsta = validationInsta(this.userInfo.InstagramId);
      var isValues = this.checkValues(this.userInfo);
      // console.log('name', isPassName);
      // console.log('phone', isPassPhone);
      // console.log('insta', isPassInsta);

      // 입력되었을때
      if (isValues) {
        if (!isPassName) {
          this._displayMsg('이름을 정확히 입력하세요');
          return;
        } else if (!isPassPhone) {
          this._displayMsg('연락처를 정확히 입력하세요');
          return;
        } else if (!isPassInsta) {
          this._displayMsg('인스타 아이디를 정확히 입력하세요');
          return;
        } else if (!this.userInfo.agree1 || !this.userInfo.agree2) {
          this._displayMsg('개인정보 제공에 동의해 주세요');
          return;
        } else {
          this.openPop('relay-message-select');
        }
      } else {
        alert('입력칸에 내용을 입력해주세요.');
        return;
      }
    },
    toggleAgree :function(){
        if (this.agreeAll) {
            this.userInfo.agree1 = true;
            this.userInfo.agree2 = true;
        } else {
            this.userInfo.agree1 = false;
            this.userInfo.agree2 = false;
        }
    },
    toggleInstantAgree: function () {
        if (this.instantAgreeAll) {
            this.instantAgree1 = true;
            this.instantAgree2 = true;
        } else {
            this.instantAgree1 = false;
            this.instantAgree2 = false;
        }
    },
    shareFacebook: function (eventType) {
        if (eventType == 'goldenBell') {
            // 랩사트래킹
            var device = 'pc';
            var cmpNo = 3661;
            var depth = 5;

            if (isMobile) {
                device = 'm';
                cmpNo = 1944;
                depth = 5
            }
            mzSendClickTag(cmpNo, depth, device);

            var url = 'https://www.ferrerorocher-event.co.kr/2018-golden-bell?utm_source=share&utm_campaign=goldenbell2018&utm_medium=facebook';
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), "fbPop", "menubar=false, scrollbars=no,width=600px,height=450px");
            saveSnsShareInfo(1, null, null, null);
        } else {
            // 랩사트래킹
            var device = 'pc';
            var cmpNo = 3661;
            var depth = 18;

            if (isMobile) {
                device = 'm';
                cmpNo = 1944;
                depth = 18
            }
            mzSendClickTag(cmpNo, depth, device);

            var url = 'https://www.ferrerorocher-event.co.kr/2018-golden-bell?utm_source=relay-share&utm_campaign=goldenbell2018&utm_medium=facebook';
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), "fbPop", "menubar=false, scrollbars=no,width=600px,height=450px");
        }

    },
    shareKakaostory: function (eventType) {
        var data = {};
        if (eventType == 'goldenBell') {
            // 랩사트래킹
            var device = 'pc';
            var cmpNo = 3661;
            var depth = 6;

            if (isMobile) {
                device = 'm';
                cmpNo = 1944;
                depth = 6
            }
            mzSendClickTag(cmpNo, depth, device);

            var url = 'https://www.ferrerorocher-event.co.kr/2018-golden-bell?utm_source=share&utm_campaign=goldenbell2018&utm_medium=kakaostory';
            window.open('https://story.kakao.com/share?url=' + encodeURIComponent(url), "fbPop", "menubar=false, scrollbars=no,width=600px,height=450px");
            saveSnsShareInfo(4, null, null, null);
            //data.link = 'https://www.ferrerorocher-event.co.kr/2018-golden-bell?utm_source=share&utm_campaign=goldenbell2018&utm_medium=kakaostory';
            //data.description = '페레로 로쉐 골든벨 이벤트';

            //kakaostoryShareVideo(data, function (snsId, snsNickName, scrapURL) {
            //    saveSnsShareInfo(4, snsId, snsNickName, scrapURL);
            //}, function (e) {
            //    alert(e.msg);
            //});
        } else {
            // 랩사트래킹
            var device = 'pc';
            var cmpNo = 3661;
            var depth = 19;

            if (isMobile) {
                device = 'm';
                cmpNo = 1944;
                depth = 19
            }
            mzSendClickTag(cmpNo, depth, device);

            var url = 'https://www.ferrerorocher-event.co.kr/2018-golden-bell?utm_source=relay-share&utm_campaign=goldenbell2018&utm_medium=kakaostory';
            window.open('https://story.kakao.com/share?url=' + encodeURIComponent(url), "fbPop", "menubar=false, scrollbars=no,width=600px,height=450px");

            //data.link = 'https://www.ferrerorocher-event.co.kr/2018-golden-bell?utm_source=relay-share&utm_campaign=goldenbell2018&utm_medium=kakaostory';
            //data.description = '골든벨 릴레이 이벤트';

            //kakaostoryShareVideo(data, function (snsId, snsNickName, scrapURL) {
            //    alert('공유가 완료되었습니다.');
            //}, function (e) {
            //    alert(e.msg);
            //});
        }
    },
    shareKakaotalk: function (eventType) {
        if (eventType == 'goldenBell') {
            // 랩사트래킹
            var device = 'pc';
            var cmpNo = 3661;
            var depth = 4;

            if (isMobile) {
                device = 'm';
                cmpNo = 1944;
                depth = 4
            }
            mzSendClickTag(cmpNo, depth, device);

            Kakao.Link.sendCustom({
                templateId: 12560,
                success: function () {
                    saveSnsShareInfo(5, null, null, null);
                }
            });
        } else {
            // 랩사트래킹
            var device = 'pc';
            var cmpNo = 3661;
            var depth = 17;

            if (isMobile) {
                device = 'm';
                cmpNo = 1944;
                depth = 17
            }
            mzSendClickTag(cmpNo, depth, device);

            Kakao.Link.sendCustom({
                templateId: 12563
            });
        }

    },
    instantlottery: function () {
        $.ajax({
            url: '/api/GoldenBell2018Api/UpdateGoldenBell2018EntryWinnder',
            type: 'post',
            success: function (res) {
                this.closePop('share');
                if (res.prizeType == 0) {
                    this.openPop('fail');
                } else {
                    this.prizeName = res.prizeName;
                    this.openPop('win');
                }
                $('#loading').hide();
            }.bind(this),
            error: function (xhr, err, obj) {
                $('#loading').hide();
                if (err !== 'abort') {
                    alert(xhr.responseJSON.message);
                }
            }.bind(this),
            complete: function () {
                this.isLoading = false;
            }.bind(this),
            beforeSend: function () {
                this.isLoading = true;
            }.bind(this)
        });

        // 랩사트래킹
        var device = 'pc';
        var cmpNo = 3661;
        var depth = 7;

        if (isMobile) {
            device = 'm';
            cmpNo = 1944;
            depth = 7
        }
        mzSendClickTag(cmpNo, depth, device);

    },
    // 랩사트래킹OpenPop
    openPopTracking: function (popUpName, cmpNoPc, depthPc, cmpNoMobile, depthMobile) {
        if (isClose == 'True') {
            if (popUpName == 'video') {
                alert('이벤트가 종료되었습니다.');
            } else {
                alert('이벤트가 종료되었습니다.');
            }
            return;
        }
        this.openPop(popUpName);

        var device = 'pc';
        var cmpNo = cmpNoPc;
        var depth = depthPc;

        if (isMobile) {
            //console.log('mobile');
            device = 'm';
            cmpNo = cmpNoMobile;
            depth = depthMobile
        }

        mzSendClickTag(cmpNo, depth, device);
    },
    // 랩사트래킹ClosePop
    closePopTracking: function (popUpName, cmpNoPc, depthPc, cmpNoMobile, depthMobile) {
        this.closePop(popUpName);

        var device = 'pc';
        var cmpNo = cmpNoPc;
        var depth = depthPc;

        if (isMobile) {
            //console.log('mobile');
            device = 'm';
            cmpNo = cmpNoMobile;
            depth = depthMobile
        }

        mzSendClickTag(cmpNo, depth, device);
    },
    // 랩사트래킹
    tracking: function (cmpNoPc, depthPc, cmpNoMobile, depthMobile) {
        var device = 'pc';
        var cmpNo = cmpNoPc;
        var depth = depthPc;

        if (isMobile) {
            //console.log('mobile');
            device = 'm';
            cmpNo = cmpNoMobile;
            depth = depthMobile
        }

        mzSendClickTag(cmpNo, depth, device);
    }

  }
});

var saveSnsShareInfo = function (snsType, snsId, snsName, scrapURL) {
    $.post('api/GoldenBell2018Api/CreateGoldenBell2018Sns', {
        SnsType: snsType,
        SnsId: snsId,
        SnsName: snsName,
        Post: scrapURL
    }, function (res) {
       
    }).error(function (xhr, err) {
        alert(xhr.responseJSON.message);
    });
}




