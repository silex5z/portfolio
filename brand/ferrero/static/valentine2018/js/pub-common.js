//---------------------------------------------------
// pub-common
// 자주쓰는 function 관리
//---------------------------------------------------
// [function list]
// deviceCheck : device, deviceOS체크
// goPosition(to) : to = 목표 selector id나 고정값
// openPop, closePop
// placeholder
//---------------------------------------------------


//---------------------------------------------------
// device check
//---------------------------------------------------
var device = getDeviceName(); //웹인지 모바일인지
var deviceOs = getMobileKind(); // 모바일 os

//---------------------------------------------------
// goPosition(to) : 위치로 이동
//---------------------------------------------------
function goPosition(to) {
    scrollReady = false;
    var tg = to;
    if (tg.indexOf('#') != -1) {
        var tg = $(tg).offset().top;
    }
    //if (to == '#eventArea') {
    //    tg += 0;
    //}
    $("html, body").stop().animate(
        { scrollTop: tg },
        500,
        function () { scrollReady = true; }
    );
}

//---------------------------------------------------
// 레이어팝업 여닫기
//---------------------------------------------------
// mov setting
var mainMovePlay = false;

function openPop(flag, dimmedBoolean) {
    
    if (mainMovePlay) {
        mainMovePlay = !mainMovePlay;
        stopVideo(mainPlayer);
    }
    if (flag == 'mov-view') {
        stopVideo(mainPlayer);
        playVideo(popPlayer);
    } 
    
    var scrollTop = $(window).scrollTop();
    //if (device === 'm') {

    //} else {

    //}
    var $selector = $('#pop-' + flag);
    var dim = dimmedBoolean; // true or false
    if (dimmedBoolean != false) $("#dimmed").show();
    $selector.css('top', scrollTop + 'px').show().focus();
};

function closePop(flag, dimmedBoolean) {

    if (flag == 'mov-view') {
        stopVideo(popPlayer);
        $('.mov-cover').hide();
    } 

    var dim = dimmedBoolean; // true or false
    if (dimmedBoolean != false) $("#dimmed").hide();
    $('#pop-' + flag).hide();
};

//---------------------------------------------------
// inapp
//---------------------------------------------------
//var showInapp = function() {
//    var $inapp = $('.inapp');
//    var winHeight = $(window).height();
//    var scrollTop = $(window).scrollTop();
//    var inappHeight = $inapp.height();

//    openPop('inapp');

//    $inapp.css({
//        top: Math.max(0, (winHeight - inappHeight) / 2) + scrollTop
//    });
//};

//---------------------------------------------------
// placeholder
//---------------------------------------------------

//placeholderSelector = ['ab1', 'ab2', 'ab3'];
//placeholder(placeholderSelector);

//var placeholder = function (array, position) {
//    $.each(array, function(i,e){
//        var $selector = '.input-'+array[i];
//        $($selector).placeholder(function () {
//            type: 'background',
//            background: '/Images/PraiseStory/pop/ph-'+array[i]+'.png'
//        });
//        $($selector).css('background-position', position);
//    });
//}

//---------------------------------------------------
// loading
//---------------------------------------------------
function loading() {
    var duration = 6; // duration in seconds
    var fadeAmount = 0.5 // fade duration amount relative to the time the image is visible

    var images = $("#loading .img-loader");
    var numImages = images.size();
    var durationMs = duration * 1000;
    var imageTime = durationMs / numImages; // time the image is visible 
    var fadeTime = imageTime * fadeAmount; // time for cross fading
    var visibleTime = imageTime - (imageTime * fadeAmount * 2);// time the image is visible with opacity == 1
    var animDelay = visibleTime * (numImages - 1) + fadeTime * (numImages - 2); // animation delay/offset for a single image 

    images.each(function (index, element) {
        if (index != 0) {
            $(element).css("opacity", "0");
            setTimeout(function () {
                doAnimationLoop(element, fadeTime, visibleTime, fadeTime, animDelay);
            }, visibleTime * index + fadeTime * (index - 1));
        } else {
            setTimeout(function () {
                $(element).animate({ opacity: 0 }, fadeTime, function () {
                    setTimeout(function () {
                        doAnimationLoop(element, fadeTime, visibleTime, fadeTime, animDelay);
                    }, animDelay)
                });
            }, visibleTime);
        }
    });

    // creates a animation loop
    function doAnimationLoop(element, fadeInTime, visibleTime, fadeOutTime, pauseTime) {
        fadeInOut(element, fadeInTime, visibleTime, fadeOutTime, function () {
            setTimeout(function () {
                doAnimationLoop(element, fadeInTime, visibleTime, fadeOutTime, pauseTime);
            }, pauseTime);
        });
    }

    // shorthand for in- and out-fading
    function fadeInOut(element, fadeIn, visible, fadeOut, onComplete) {
        return $(element).animate({ opacity: 1 }, fadeIn).delay(visible).animate({ opacity: 0 }, fadeOut, onComplete);
    }
}

