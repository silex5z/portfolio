// https://developers.google.com/youtube/iframe_api_reference#Requirements

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: 639,
        width: 358,
        videoId: 'ndR720FOSBA',
        playerVars: {
            controls: 0,
            playlist: 'ndR720FOSBA',
            rel: 0,
            showinfo: 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': mainPlayerEvent
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    //event.target.setPlaybackQuality('hd720');
}

function mainPlayerEvent(event) {
    if (event.data == YT.PlayerState.ENDED) {
        $('.mov-cover').fadeIn(1000);
        event.target.stopVideo();
        //console.dir(event);
    }
}

function playVideo(player) {
    player.playVideo();
}

function stopVideo(player) {
    player.stopVideo();
}
