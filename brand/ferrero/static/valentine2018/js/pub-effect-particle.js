//---------------------------------------------------
// effect-particle
//---------------------------------------------------
(function ($) {

    var particles = [];
    for (var i = 2; i <= 3; i++) {
        var $div = '<div class="particle particle-' + i + '"></div>';
        particles.push($div);
    }

    // 팝업용
    var effectBg = $('<div class="popup-bg"></div>');
    effectBg.prependTo('.popup');
    $('.popup-bg').html(particles);

    // 페이지용
    var pageBg = $('<div class="page-bg"></div>');
    pageBg.insertAfter('.bacgkround-wrap');
    $('.page-bg').html(particles);

})(jQuery);