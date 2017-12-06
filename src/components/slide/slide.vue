<template>
  <div class="slide"
       data-js="slide"
       data-setting='{"height": 500,"posterWidth": 900,"posterHeight": 500,"scale": 0.9,"speed": 1000,"verticalAlign": "middle"}'>
    <div class="slide-btn_left slide-btn iconfont"
         data-left
         data-a="s">&#xe602;</div>
    <ul class="slide-list">
      <li class="slide-item">
        <a a1
           href="#"><img src="./img/head_1.jpg"
               width="800"
               height="500"
               alt=""></a>
      </li>
      <li class="slide-item">
        <a a2
           href="#"><img src="./img/head_2.jpg"
               width="800"
               height="500"
               alt=""></a>
      </li>
      <li class="slide-item">
        <a a3
           href="#"><img src="./img/head_1.jpg"
               width="800"
               height="500"
               alt=""></a>
      </li>
      <li class="slide-item">
        <a a4
           href="#"><img src="./img/head_2.jpg"
               width="800"
               height="500"
               alt=""></a>
      </li>
      <li class="slide-item">
        <a a5
           href="#"><img src="./img/head_1.jpg"
               width="800"
               height="500"
               alt=""></a>
      </li>
      <li class="slide-item">
        <a a5
           href="#"><img src="./img/head_2.jpg"
               width="800"
               height="500"
               alt=""></a>
      </li>
      <li class="slide-item">
        <a a5
           href="#"><img src="./img/head_1.jpg"
               width="800"
               height="500"
               alt=""></a>
      </li>
    </ul>
  
    <div data-a="ss"
         class="slide-btn_right slide-btn iconfont">&#xe603;</div>
  </div>
</template>

<script>
// 轮播图初始化
import { Slide } from '../../static/js/slide.js'

export default {
  name: 'slide',
  data() {
    return {}
  },
  methods: {
  },
  created() {
    $(function () {
      Slide.init($('[data-js="slide"]'));
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../static/css/common';

.slide {
  @include flexDiv();
  overflow: hidden;
  padding: .5rem 0;
  height: 5rem;
}

.slide-btn {
  position: relative;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  line-height: 5rem;
}

.slide-btn::selection {
  background: none;
}

.slide-btn::-moz-selection {
  background: none;
}

.slide-btn_left {
  left: 0;
}

.slide-btn_right {
  right: 0;
}

.slide-list {
  position: relative;
  margin: 0 auto;
}

.slide-item {
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 0;
  img {
    display: block;
    position: relative;
    width: 100%;
  }
}
</style>