/*
 * @Author: AI 
 * @Date: 2017-04-10 20:53:20 
 * @Last Modified by: AI
 * @Last Modified time: 2017-04-16 10:59:33
 */
// 轮播图
;
const Slide = function (poster) {
  this.zIndex_num = 100; // 层级管理
  this.poster = poster;
  this.leftBtn = poster.children().eq(0);
  this.rightBtn = poster.children().eq(poster.children().length - 1);
  this.slideList = poster.children().eq(1);
  this.slideItem = this.slideList.children();
  this.slideLastItem = this.slideItem.last();
  this.slideFirstItem = this.slideItem.first();
  this.rotateStatus = true;
  this.status = true;
  const _this = this;
  // 默认参数
  this.setting = {
    "width": parseInt($('body').css("width")), //整体宽高
    "height": 500,
    "posterWidth": 900, //第一帧宽高
    "posterHeight": 500,
    "scale": 0.9, // 后边图片的缩放比
    "speed": 500, // 播放速度
    "autoPlay": true, // 自动播放
    "delay": 3000, // 自动播放速度
    "verticalAlign": "middle" // 幻灯片样式top，bottom
  }
  // console.log(this.setting.posterHeight);
  $.extend(this.setting, this.getSetting());

  // 设置样式
  this.setSettingValue();
  this.setPosters();

  // 事件注册
  this.rightBtn.on('click', () => {
    if (_this.rotateStatus) {
      _this.rotateStatus = false;
      _this.slideMove('right');
    }
  });
  this.leftBtn.on('click', () => {
    if (_this.rotateStatus) {
      _this.rotateStatus = false;
      _this.slideMove('left');
    }
  });
  if (_this.setting.autoPlay) {
    this.autoPlay();
    this.slideList.hover(() => {
      clearInterval(_this.timer);
    }, () => {
      _this.timer = setInterval(() => {
        _this.rightBtn.click();
      }, _this.setting.delay);
    })
    this.leftBtn.hover(() => {
      clearInterval(_this.timer);
    }, () => {
      _this.timer = setInterval(() => {
        _this.rightBtn.click();
      }, _this.setting.delay);
    })
  }
}

Slide.prototype = {
  autoPlay: function () {
    const _this = this;
    if (_this.status) {
      _this.status = false;
      _this.timer = setInterval(function () {
        _this.rightBtn.click();
      }, _this.setting.delay);
    }
  },
  // 轮播图切换
  slideMove: function (dir) {
    const _this = this;
    var zIndexArr = [];
    if (dir === 'right') {
      this.slideItem.each(function () {
        const this_slide = $(this);
        const prev = this_slide.prev().get(0) ? this_slide.prev() : _this.slideLastItem;
        const width = prev.width(),
          height = prev.height(),
          zIndex = prev.css('zIndex'),
          opacity = prev.css('opacity'),
          left = prev.css('left'),
          top = prev.css('top');
        zIndexArr.push(zIndex);

        this_slide.animate({
          width: width,
          height: height,
          opacity: opacity,
          left: left,
          top: top
        }, _this.setting.speed, function () {
          _this.rotateStatus = true;
        });
      });
      this.slideItem.each(function (i) {
        $(this).css('zIndex', zIndexArr[i]);
      });
    } else if (dir === 'left') {
      this.slideItem.each(function () {
        const this_slide = $(this);
        const next = this_slide.next().get(0) ? this_slide.next() : _this.slideFirstItem;
        console.log(next);
        console.log(this_slide);
        const width = next.width(),
          height = next.height(),
          zIndex = next.css('zIndex'),
          opacity = next.css('opacity'),
          left = next.css('left'),
          top = next.css('top');
        zIndexArr.push(zIndex);

        this_slide.animate({
          width: width,
          height: height,
          opacity: opacity,
          left: left,
          top: top
        }, _this.setting.speed, function () {
          _this.rotateStatus = true;
        })
      });
      this.slideItem.each(function (i) {
        $(this).css('zIndex', zIndexArr[i]);
      });
    }
  },
  // 设置数值控制样式
  setSettingValue: function () {
    const gap = this.setting.width - this.setting.posterWidth;
    this.poster.css({
      width: this.setting.width,
      height: this.setting.height
    });
    this.slideList.css({
      width: this.setting.posterWidth,
      height: this.setting.height
    });
    this.leftBtn.css('lineHeight', this.setting.height + 'px').css({
      zIndex: this.zIndex_num,
      width: gap / 2
    });
    this.rightBtn.css('lineHeight', this.setting.height + 'px').css({
      zIndex: this.zIndex_num,
      width: gap / 2
    });;
    this.slideItem.eq(0).css({
      zIndex: this.zIndex_num - 1,
      width: this.setting.posterWidth,
      height: this.setting.posterHeight
    });
  },

  // 设置其他图片的样式
  setPosters: function () {
    let slideItem = this.slideItem;
    let rightSlide = slideItem.slice(1, Math.ceil(slideItem.length / 2)); // 右边图片--23
    let leftSlide = slideItem.slice(Math.ceil(slideItem.length / 2)); // 左边图片--45
    // 各元素位置长度
    const imgGap = ((this.setting.width - this.setting.posterWidth) / 2) / Math.floor(slideItem.length / 2);
    const gap = this.setting.width - this.setting.posterWidth;

    let zIndex = this.zIndex_num - 1;
    let rw = this.setting.posterWidth;
    let rh = this.setting.posterHeight;
    let offsetW,
      offsetH;
    const _this = this;

    rightSlide.each(function (i) {
      zIndex--;
      rw = rw * _this.setting.scale;
      rh = rh * _this.setting.scale;
      offsetW = _this.setting.posterWidth - rw + ((i + 1) * imgGap);

      $(this).css({
        zIndex: zIndex,
        width: rw,
        height: rh,
        opacity: 0.9 / (++i),
        top: _this.setVertucalAling(rh),
        left: offsetW
      });
    });

    rw = this.setting.posterWidth;
    rh = this.setting.posterHeight;
    let lw;
    let lh;
    zIndex -= 1;
    leftSlide.each(function (i) {
      zIndex++;
      i = leftSlide.length - (i + 1);
      lw = rw * Math.pow(_this.setting.scale, i + 1);
      lh = rh * Math.pow(_this.setting.scale, i + 1);
      offsetW = -((i + 1) * imgGap);

      $(this).css({
        zIndex: zIndex,
        width: lw,
        height: lh,
        opacity: 0.9 / (++i),
        top: _this.setVertucalAling(lh),
        left: offsetW
      });
    });
  },

  setVertucalAling: function (height) {
    const type = this.setting.verticalAlign;
    let top = 0;
    if (type === 'middle') {
      top = (this.setting.posterHeight - height) / 2;
    } else if (type === 'top') {
      top = 0;
    } else if (type === 'bottom') {
      top = this.setting.posterHeight - height;
    } else {
      top = (this.setting.posterHeight - height) / 2;
    };
    return top;
  },

  // 获取设置的参数并返回为对象
  getSetting: function () {
    const setting = this.poster.attr('data-setting');
    if (setting && setting != '') {
      return $.parseJSON(setting);
    } else {
      return {};
    }
  }
};

// 出口函数，初始化
Slide.init = function (posters) {
  const _this = this;
  posters.each(function () {
    new _this($(this));
  })
}

window[Slide] = Slide;
export {
  Slide
}
