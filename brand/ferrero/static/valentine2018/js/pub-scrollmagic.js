//---------------------------------------------------
// scrollmagic
//---------------------------------------------------

// init
var firstload = true;

// indicator 색상 변경
var indicatorOption = {
    'colorTigger': '#fe4940',
    'colorStart': '#34c0ff',
    'colorEnd': '#7eff28'
};

// 웹 모바일 분기 - 상단영역은 웹일때는 로딩한 사이즈 기반으로 사이즈 부여
if (device === 'm') {
    durationValueCache = 1090;
} else {
    durationValueCache;
}




// init controller
var controller = new ScrollMagic.Controller({
    reverse: true
});

//// get the current duration value
//var duration = scene.duration();

//// set a new duration
//scene.duration(300);

// use a function to automatically adjust the duration to the window height.
var durationValueCache;
function getDuration() {
    return durationValueCache;
}
function updateDuration(e) {
    durationValueCache = window.innerHeight;
}

$(window).on("resize", updateDuration);
$(window).triggerHandler("resize");
// controller.duration(getDuration);


new ScrollMagic.Scene({ triggerElement: "#eventIntro", duration: durationValueCache })
    .setClassToggle("#floatingNavi", "navi-hide")
    //.addIndicators({
    //    'name': '#eventIntro',
    //    indicatorOption
    //})
    .on("enter leave", function (e) {
        // 최초 시작일때는 작동시키지 않는다
        if (!firstload) {
            if (device === 'w') {
                var video = document.getElementById("backgroundVideo");
                if (e.type == "enter") {
                    video.play();
                } else {
                    video.pause();
                }
            }
            firstload = false;
        }
    })
    .addTo(controller);

new ScrollMagic.Scene({ triggerElement: "#eventArea", duration: $('#eventArea').height() })
    .setClassToggle('#floatingNavi .event1-go', 'on')
    .setClassToggle("#floatingNavi", "event1")
    //.addIndicators({
    //    'name': '#eventArea',
    //    indicatorOption
    //})
    .addTo(controller);

new ScrollMagic.Scene({ triggerElement: "#eventProofShot", duration: $('#eventProofShot').height() })
    .setClassToggle('#floatingNavi .event2-go', 'on')
    .setClassToggle("#floatingNavi", "event2")
    //.addIndicators({
    //    'name': '#eventProofShot',
    //    indicatorOption
    //})
    .addTo(controller);

// 웹일때 리스트 가리는 내비는 잠시 숨기도록
if (device === 'w') {
    new ScrollMagic.Scene({ triggerElement: ".list-box", duration: 260, triggerHook: 0.5 })
        .setClassToggle("#floatingNavi", "navi-back")
        //.addIndicators({
        //    'name': '.list-box',
    //    indicatorOption
        //})
        .addTo(controller);
}


new ScrollMagic.Scene({ triggerElement: "#productInfo", duration: $('#productInfo').height() })
    //.setTween("#productInfo > div", {y: "80%"})
    .setClassToggle('#floatingNavi .product-go', 'on')
    .setClassToggle("#floatingNavi", "product")
    //.addIndicators({
    //    'name': '#productInfo',
    //    indicatorOption
    //})
    .addTo(controller);