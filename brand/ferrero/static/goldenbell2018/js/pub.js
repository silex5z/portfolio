(function () {
  var config = {
    device: getDeviceName(),
    $slider: $('.relay-slider'),
    ml: 0,
    opt: {}
  };

  if (config.device === 'w') {

    config.$slider.on('init', function() {
      config.ml = config.$slider.css('margin-left').indexOf('.5') > 0 ? '-2px' : '-1px';
    });

    config.$slider.on('afterChange', function() {
        config.ml = config.$slider.css('margin-left').indexOf('.5') > 0 ? '-2px' : '-1px';
        config.$slider.find('.slick-track').css({ 'margin-left': config.ml });
    });

    config.opt = {
      centerMode: true,
      slidesToShow: 3,
      variableWidth: true,
      infinite: true
    };

  } else {
    config.opt = {
      centerMode: true,
      centerPadding: '110px',
      slidesToShow: 1,
    };
  }

  config.$slider.slick(config.opt);
  config.$slider.find('.slick-track').css({ 'margin-left': config.ml });

}());

// stick banner
(function() {

  var config = {
    viewHeight: 1230,
    standScrollTop: 290,
    docHeight: 0,
    $window: $(window),
    $stick: $('.floating-nav'),
    aArray: [],
    device: null
  };

  var setCurrentSection = function() {
    for (var i = 0; i < config.aArray.length; i += 1) {
      var id = config.aArray[i];

      var sectionOffset = $(id).offset().top;
      var sectionHeight = $(id).height();

      if (config.$window.scrollTop() >= (sectionOffset - config.standScrollTop) && config.$window.scrollTop() < (sectionOffset + sectionHeight)) {
        $('a[href="' + id + '"]').addClass('isActive');
      } else {
        $('a[href="' + id + '"]').removeClass('isActive');
      }
    }
      /*
    console.log('scrollTop: ' + config.$window.scrollTop());
    console.log('windowHeight: ' + config.$window.height());
    console.log('docHeight: ' + config.docHeight);
    */
    if (config.$window.scrollTop() + config.$window.height() === config.docHeight) {      
        config.$stick.find('.isActive').removeClass('isActive');
        config.$stick.find('li:nth-last-child(2) a').addClass('isActive');
    }
  };

  // dom event =====================================

  // floating nav 영역이동
  config.$stick.on('click', 'a[href^=#]', function (e) {
    // debugger;
    
    //if (e.target.selector === 'gift-link') {
    //  window.open('http://item.gmarket.co.kr/Item?goodscode=1505661030');
    //}
    e.preventDefault();
    var $target = $(this.hash);
     //console.log(this.hash);
    var opt = {};
    
    opt.scroll = config.device === 'm' ? $target.offset().top - config.$stick.height() : $target.offset().top;
    opt.duration = config.device === 'm' ? 400 : 500;

    if ($target.selector === '#event2') {
        opt.scroll += config.device !== 'm' ? 85 : 85;
    }

    //console.log(opt.scroll);
    $('body,html').stop().animate({ scrollTop: opt.scroll }, opt.duration);

    //return false;
  });

  config.$window.on('scroll', setCurrentSection);

  config.$window.on('resize', function () {
    config.standScrollTop = $(this).height() > config.viewHeight ? 400 : 300;
  });

  // init ============================================
  (function () {
    config.device = getDeviceName();
    config.docHeight = $(document).height();

    config.$stick.css({
      position: 'fixed',
      top: top
    });

    $.each(config.$stick.find('a[href^=#]'), function () {
      config.aArray.push(this.hash);
    });

    setCurrentSection();
  }());
})();

(function () {
  var clipboard = new ClipboardJS(".btn--copy-hash");
  clipboard.on("success", function (e) {
    alert("해시태그가 복사되었습니다.");
    e.clearSelection();
  });
})();