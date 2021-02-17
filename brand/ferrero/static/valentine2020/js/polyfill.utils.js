var utils = (function() {
  // responsive
  function toCoverImg(containerSelector) {
    var containers = $(containerSelector);
    var $container = null;
    var $img = null;
    var imgUrl = '';

    for (var i = 0; i < containers.length; i++) {
      $container = $(containers[i]);
      $img = $container.find('img');
      imgUrl = $img.attr('src');
      $img.css('display', 'none');

      $container.css({
        'background-image': 'url(' + imgUrl + ')',
        'background-size': 'cover',
        'background-position': 'center center'
      });
    }
  }
  return {
    toCoverImg: toCoverImg
  };
})();