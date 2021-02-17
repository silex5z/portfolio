//---------------------------------------------------
// eventIntro btns hover
//---------------------------------------------------
$('.intro-btns .event1-go, .intro-btns .event2-go, .intro-btns .product-go').hover(function () {
    var tgClass = $(this).attr('class');
    $('.intro-btns').addClass(tgClass);
}, function () {
    var tgClass = $(this).attr('class');
    $('.intro-btns').removeClass(tgClass);
});

//---------------------------------------------------
// slick slider (backup)
//---------------------------------------------------
//function sliderActon() {
//    var $slider = $('.review-box');
//    var $sliderIndicator = $('.review-indicator>div');
//    var $sliderItem;
//    var $sliderItemGroup;

//    // slider option
//    if (device === 'm') {
//        var filesrc = 'm';
//        var slickOptions = {
//            lazyLoad: 'ondemand',
//            centerMode: true,
//            vertical: true,
//            slidesToShow: 2,
//            centerPadding: '0',
//            dots: true,
//            customPaging: function () {
//                $sliderIndicator.html(1 + '/' + $sliderItem.length);
//                $slider.show();
//            },
//            prevArrow: $('.review-prev'),
//            nextArrow: $('.review-next')
//        }
//    } else {
//        var filesrc = 'w';
//        var slickOptions = {
//            lazyLoad: 'ondemand',
//            centerMode: true,
//            slidesToShow: 3,
//            centerPadding: '10px',
//            dots: true,
//            customPaging: function () {
//                $sliderIndicator.html(1 + '/' + $sliderItem.length);
//                $slider.show();
//            },
//            prevArrow: $('.review-prev'),
//            nextArrow: $('.review-next')
//        }
//    }

//    // 리뷰어들 링크 목록
//    $sliderItem = [
//        'http://blog.naver.com/mkhiya1/221123545336',
//        'http://blog.naver.com/eunjunmommy/221125211736',
//        'http://blog.naver.com/gittygittygitty/221124335145'
//    ];

//    // add slide item
//    $.each($sliderItem, function (i, v) {
//        $sliderItemGroup = '<div class="review-item"><a href=' + $sliderItem[i] + ' target="_blank"><img src="/Images/GoldenBell/' + filesrc + '/review/r' + (i + 1) + '.jpg" alt="" /></a>';
//        $slider.append($sliderItemGroup);
//        if (i == $sliderItem.length - 1) {
//            setTimeout(reviewSliderStart, 500);
//            //reviewSliderStart();
//        }
//    });

//    function reviewSliderStart() {
//        $slider.slick(slickOptions);
//        $('.review-loading').hide();
//        // On before slide change
//        $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
//            $sliderIndicator.html((nextSlide + 1) + '/' + $sliderItem.length);
//        });
//    }
//}

//---------------------------------------------------
// floating navi - right position
//---------------------------------------------------
$(window).on("resize", updateNavPos);

updateNavPos();
function updateNavPos() {
    var navPos;
    var winWidth = $(window).width();
    if (winWidth >= 1920) {
        navPos = (winWidth - 1920) / 2 - 3;
        $('#floatingNavi').css('right', navPos);
    } else {
        $('#floatingNavi').css('right', 0);
    }
}