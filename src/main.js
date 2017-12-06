/*
 * @Author: AI 
 * @Date: 2017-04-06 13:52:25 
 * @Last Modified by: AI
 * @Last Modified time: 2017-10-11 21:44:58
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import scss from './static/css/defaultStyle.scss'
// 组件
import App from './App'
// 公共方法库
import {
  judgeBrowser
} from './static/js/script'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(Element)
Vue.config.productionTip = false

/* eslint-disable no-new */
var main = new Vue({
  el: '#app',
  data:{},
  // store,
  router,
  template: '<App/>',
  components: {
    App
  },
  methods: {
    /**
     * @description 状态初始化
     * 
     */
    variate(type) {
      // 根据设备大小调整页面可视区域
      let scrollWidth = window.innerWidth - document.body.offsetWidth,
        viewWidth = window.screen.availWidth - scrollWidth;
      if (type === 'Chrome') {
        // chrom不知道为什么多两像素的宽度，待解决
        viewWidth -= 2;
      }
      $('body').css('width', viewWidth);
    }
  },
  // created() {
  //   window.onload = function () {
  //     main.variate(judgeBrowser().type);
  //   };
  // }
})
// router.go('/home')
