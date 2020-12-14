// =================================
// util
// up to the top
// =================================
var goToLoc = function(loc) {
  // debugger;
  $('html, body').animate({
    scrollTop: loc ? loc : 0
  });
};

// =================================
// img download
// =================================
var downloadImg = function(el, imgData) {
  var dateObj = new Date();
  var year = dateObj.getFullYear();
  var mon = dateObj.getMonth() + 1;
  var date = dateObj.getDate();
  //a.downloaded 에 현재시간으로 이미지 이름 대체
  el.download = dateObj + '.png';
  el.setAttribute('href', imgData);
}

// =================================
// shuffle
// =================================
function shuffle(array) {
  var counter = array.length;
  var index;
  var temp;
  // While there are elements in the array
  while (counter > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
  }
  return array;
}

// =================================
// timer
// =================================

var timer = (function () {
  var totalWatchingTime = 0;
  var timerId = 0;
  // var t = 0;
  // var start = 0;
  // var stop = 0;

  function _startTimer() {
    timerId = setInterval(function() {
      totalWatchingTime += 200;
    }, 200);
    // start = new Date().getTime();
    
  }

  function _stopTimer() {
    clearInterval(timerId);
    // stop = new Date().getTime();
    // t = stop - start;
    return totalWatchingTime;
  }

  function _initTimer() {
    totalWatchingTime = 0;
  }

  function _getTotal() {
    
    return totalWatchingTime;
  }

  return {
    startTime: _startTimer,
    stopTime: _stopTimer,
    getTotal: _getTotal,
    initTimer: _initTimer
  }
}())