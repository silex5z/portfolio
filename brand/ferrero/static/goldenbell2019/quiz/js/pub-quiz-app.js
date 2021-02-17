var goldenbell2019Quiz = new Vue({
  el: '#app',
  data: {
    currentPage: 'entryBoard',
    // entryBoard, questionBoard, scoreBoard
    currentPopup: '',
    userModel: {
      name: '',
      number: '',
      userAge: null,
      agree1: '',
      agree2: '',
      q1Ans: '',
      q2Ans: '',
      q2UserAns: '',
      userCheerMessage: ''
    },

    // 출제자 이름
    userName: '',

    // 퀴즈 참여자 리스트
    quizUserList: [],

    /* quizUserInfo: [
    
    ], */

    // api 응답

    correctAnswer1: '',
    correctAnswer2: '',
    userScore: '',

    isLoading: false,

    // 문제 보기 텍스트
    answerStaticText: {
      ANSWER1: ['외식', '문화 생활', '국내외 여행', '쇼핑'],
      ANSWER2: ['걱정하지마, 다 잘 될거야', '넌 언제나 최고야', '지금까지 수고했어, 힘내자!', '넌 할 수 있어']
    }
  },

  computed: {
    // api 요청시 보낼 url query string (userId)
    enStr: function () {
      return location.pathname.split('2019_goldenbell/')[1]
    },

    // 점수 비주얼 클래스
    userScoreVisual: function () {
      return {
        zero: this.userScore == 0,
        'fifty': this.userScore == 50,
        'hundred': this.userScore == 100
      }
    },

    // 1번 문제 정답 텍스트
    correctAnswer1Text: function () {
      return this.answerStaticText.ANSWER1.indexOf(this.correctAnswer1) + 1 + ' ) ' + this.correctAnswer1;
    },

    // 1번 문제 오답 텍스트
    yourAnswer1Text: function () {
      return this.userModel.q1Ans + ' ) ' + this.answerStaticText.ANSWER1[this.userModel.q1Ans - 1];
    },

    // 2번 문제 정답 텍스트
    correctAnswer2Text: function () {
      return this.answerStaticText.ANSWER2.indexOf(this.correctAnswer2) == -1 ? '5 ) ' + this.correctAnswer2 : this.answerStaticText.ANSWER2.indexOf(this.correctAnswer2) + 1 + ' ) ' + this.correctAnswer2
    },

    // 2번 문제 오답 텍스트
    yourAnswer2Text: function () {
      return this.userModel.q2Ans == 5 ? '5 ) ' + this.userModel.q2UserAns : this.userModel.q2Ans + ' ) ' + this.answerStaticText.ANSWER2[this.userModel.q2Ans - 1]
    },

    isCorrectAns1: function () {
      return this.correctAnswer1Text == this.yourAnswer1Text
    },

    isCorrectAns2: function () {
      return this.correctAnswer2Text == this.yourAnswer2Text
    }
  },

  watch: {
    'userModel.q2Ans': function (val) {
      if (val != 5) {
        this.userModel.q2UserAns = ''
      }
    }
  },

  mounted: function () {
    var self = this;

    this.onEntry();
    document.onreadystatechange = function () {
      document.readyState == 'complete' ?
        (self.isLoading = false) :
        (self.isLoading = true);
    };
  },

  methods: {
    // 페이지 설정
    setPage: function (name) {
      window.scrollTo(0, 0);
      this.currentPage = name;
    },

    // 팝업 띄우기
    openPop: function (popupName) {
      window.scrollTo(0, 0);
      var popup = document.getElementById('popup');
      popup.style.cssText = 'top:' + window.pageYOffset + 'px'
      this.currentPopup = popupName;
    },

    // 팝업 닫기
    closePop: function (name) {
      this.currentPopup = '';
    },

    // api
    onEntry: function () {
      var self = this;
      $.ajax({
        url: '/api/2019-golden-solver?path=' + self.enStr,
        type: 'GET',
        beforeSend: function () {
          self.isLoading = true;
        },
        success: function (res) {
          self.userName = res.name;
          self.quizUserList = res.list;
          // console.log(res)
          self.isLoading = false;
        },
        error: function (res) {
          // console.log(res)
          alert(res.responseJSON.error)
          // alert('오류가 발생했습니다. 관리자에게 문의해주세요.');
          self.isLoading = false;
        }
      });
    },

    // 문제풀기
    onSubmitUserInfo: function () {
      var self = this;
      if (!quizIsOpen) {
        alert('이벤트가 종료되었습니다.')
      } else {
        if (self.userModel.agree1 != true || self.userModel.agree2 != true) {
          return alert('필수 동의 사항을 확인해주세요');
        }
        $.ajax({
          url: '/api/2019-golden-solver/user-info',
          type: 'POST',
          data: {
            name: self.userModel.name,
            mobile: self.userModel.number,
            age: self.userModel.userAge,
            enStr: self.enStr,
            agree: self.userModel.agree1,
            agree2: self.userModel.agree2
          },
          beforeSend: function () {
            self.isLoading = true;
          },
          success: function (res) {
            // console.log('success')
            // console.log(res)
            if (res.success) {
              self.setPage('questionBoard');
            }
            self.isLoading = false;
          },
          error: function (res) {
            /* console.log('error')
            console.log(res.responseJSON.error) */
            alert(res.responseJSON.error)
            // alert('오류가 발생했습니다. 관리자에게 문의해주세요.');
            self.isLoading = false;
          }
        });
      }


    },

    // 정답제출
    onSubmitAnswer: function () {
      var self = this;
      $.ajax({
        url: '/api/2019-golden-solver',
        type: 'POST',
        data: {
          answer1: self.answerStaticText.ANSWER1[self.userModel.q1Ans - 1],
          answer2: self.userModel.q2Ans == 5 ? self.userModel.q2UserAns : self.answerStaticText.ANSWER2[self.userModel.q2Ans - 1],
          message: self.userModel.userCheerMessage
        },
        beforeSend: function () {
          self.isLoading = true;
        },
        success: function (res) {
          if (res.success) {
            self.correctAnswer1 = res.data.answer;
            self.correctAnswer2 = res.data.answer2;
            self.userScore = res.data.score;
            self.setPage('scoreBoard');
          }
          self.isLoading = false;
          // console.log(res)
        },
        error: function (res) {
          /* alert('오류가 발생했습니다. 관리자에게 문의해주세요.'); */
          // console.log(res)
          alert(res.responseJSON.error)
          self.isLoading = false;
        }
      });
    }

  },

});