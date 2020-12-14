var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// console.log(firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
// NOTE: videoId is taken out and instead is placed as the generated IFRAME src from the postSelection function

var currentIdx = 0;
var players = [];
// var videoList = shuffle(['YOVuhKgB054','YOVuhKgB054','YOVuhKgB054']);
var videoList = ['YOVuhKgB054','cpiWr-dSGXU','DasPdoIAwr8','3Hqg06ZRjRQ','RpYty2dKKDg'];

// if (YT) {
//   var controls = onYouTubeIframeAPIReady();
// } else {
//   setTimeout(function() {
//     var controls = onYouTubeIframeAPIReady();
//   }, 1000);
// }


function pauseAll(players, callback) {
  // console.log('pauseAll')
  players.forEach(function(val) {
    if(val.getPlayerState() == 3){
      val.stopVideo();
      // console.log('pauseAll-1')
    } else {
      val.pauseVideo();
      // console.log('pauseAll-2')
    }
  });

  if(callback) {
    setTimeout(function(){
      callback();
    }, 100)
  }
}

function onYouTubeIframeAPIReady() {
  
  for (var i = 0; i < videoList.length; i++) {
    players[i] = new YT.Player("player" + i, {
      height: "550",
      width: "550",
      videoId: videoList[i],
      playerVars: {
        rel: '0',
        showinfo: '0',
        autoplay: '0',
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  }
  // console.log('players ready');
  
};

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  note10spenSignStore.videoData.isVideoReady += 1
  event.target.setVolume(50)
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

function onPlayerStateChange(event) {
  if (event.data == 1) {
    currentIdx = event.target.i.id.replace("player", "");
    // note10spenSignStore.videoData.videoStartTime = new Date().getTime();
    timer.startTime();
    
  } else if (event.data == 2) {
    timer.stopTime();
    // note10spenSignStore.videoData.videoStopTime = new Date().getTime();
    // note10spenSignStore.videoData.totalWatchingTime += note10spenSignStore.videoData.videoStopTime - note10spenSignStore.videoData.videoStartTime;
    // console.log('시작시간 : ' + app.videoData.videoStartTime)
    // console.log('종료시간 : ' + app.videoData.videoStopTime)
    // console.log('시청시간 : ' + app.flownTime)
    // console.log('총시청시간 : ' + app.videoData.totalWatchingTime / 1000)
  } else if (event.data == 0) {
    pauseAll(players);
    if(currentIdx < videoList.length - 1) {
      note10spenSignStore.swiper.slideNext();
      players[++currentIdx].playVideo();
    }
  } else {
    // console.log(event.target);
  }
  
  // console.log('총 시청한 시간 : ' + note10spenSignStore.videoData.totalWatchingTime / 1000)
}
