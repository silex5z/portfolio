(function () {
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}());

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: 'v9rrZlegOfA',
    playerVars: {
      showinfo: 0,
      controls: 0,
      autohide: 1,
      rel: 0
    },
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  app.playBtnState = false;
  player.playVideo();
}

function onPlayerStateChange(event) {
  var currentState = event.data;
  if (currentState === YT.PlayerState.ENDED) {
    app.youtubeCheck = true;
    stopVideo();
  }
}

function stopVideo() {
  player.stopVideo();
  app.playBtnState = true;
}