// (function (Swiper) {
//   var slider = new Swiper('.swiper-container', {
//     slidesPerView: 3,
//     freeMode: true,
//     spaceBetween: 150,
//     scrollbar: {
//       el: '.swiper-scrollbar',
//       hide: true
//     },
//     mousewheel: true
//   });
// }(Swiper));

// 업로드한 이미지 캔버스에 그리기

function handleFiles(e) {
  if (!imgFilter.test(e.target.files[0].type)) {
    alert("이미지파일 (jpg,gif,png,bmp)만 업로드 가능합니다.");
  } else if (e.target.files[0].size > maxImageSize) {
    alert("이미지 용량이 10MB를 초과하여 등록할 수 없습니다.");
  } else {
    $('#loading').show();
    img.onload = function () {
      self.resetSlider();
      self.scaleSlider.options.readOnly = false;
      self.rotateSlider.options.readOnly = false;
      self.resetCanvas();
      self.drawImage();
      $('#loading').hide();
    }
    var originalImage = URL.createObjectURL(e.target.files[0]);

    // ios에서 이미지 회전
    if (isMobile.iOS()) {
      getOrientation(e.target.files[0], function (val) {
        if (val == 6) {
          var iosImage = new Image();
          iosImage.onload = function () {
            var iosCanvas = document.getElementById('ios_canvas');
            var iosCtx = iosCanvas.getContext('2d');
            iosCanvas.width = iosImage.height;
            iosCanvas.height = iosImage.width;
            iosCtx.transform(0, 1, -1, 0, iosImage.height, 0);

            iosCtx.drawImage(iosImage, 0, 0);
            img.src = iosCanvas.toDataURL('image/png');
          }
          iosImage.src = originalImage;
        } else {
          img.src = originalImage;
        }
      });
    } else {
      img.src = originalImage;
    }
  }
}

// imgae Orientation값 가져오기
function getOrientation(file, callback) {
  var reader = new FileReader();
  reader.onload = function (e) {

    var view = new DataView(e.target.result);
    if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
    var length = view.byteLength,
      offset = 2;
    while (offset < length) {
      var marker = view.getUint16(offset, false);
      offset += 2;
      if (marker == 0xFFE1) {
        if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
        var little = view.getUint16(offset += 6, false) == 0x4949;
        offset += view.getUint32(offset + 4, little);
        var tags = view.getUint16(offset, little);
        offset += 2;
        for (var i = 0; i < tags; i++)
          if (view.getUint16(offset + (i * 12), little) == 0x0112)
            return callback(view.getUint16(offset + (i * 12) + 8, little));
      } else if ((marker & 0xFF00) != 0xFF00) break;
      else offset += view.getUint16(offset, false);
    }
    return callback(-1);
  };
  reader.readAsArrayBuffer(file);
}