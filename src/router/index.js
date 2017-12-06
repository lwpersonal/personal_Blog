import Vue from 'vue'
import Router from 'vue-router'

import home from '../components/home/home.vue'
import article from '../components/article/article.vue'
import learn from '../components/article/learn.vue'
import articleText from '../components/article/articleText.vue'
import aboutme from '../components/aboutme.vue'
import message from '../components/message.vue'
import system from '../components/system/system.vue'
// import content_1 from '../components/head/head.vue'

Vue.use(Router)
let router;
export default router = new Router({
  routes: [
    {
      path: '/',
      component: home
    },
    {
      path: '/review',
      component: message
    },
    {
      path: '/aboutMe',
      component: aboutme
    },
    {
      path: '/article',
      component: article
    },
    {
      path: '/articleText',
      component: articleText
    },
    {
      path: '/learn',
      component: learn
    },
    {
      path: '/system',
      component: system
    },

  ],
  // 更改默认的路由class名
  linkActiveClass: 'routered'
})

// router.go('/home')