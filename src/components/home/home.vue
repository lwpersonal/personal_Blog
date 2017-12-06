<template>
  <div class="content">
    <!-- 网页主体 -->
    <elm-slide></elm-slide>
    <div class="home-box">
      <div class="home-content">
        <!--左边布局-->
        <div class="home-content_right">
          <!--文章推荐-->
          <dl class="home-article">
            <dt class="iconfont home-article_title">&#xe601;文章导读：</dt>
            <dd class="line"></dd>
            <dd v-for="(text,index) in articles" v-if="index<5" class="home-article_text">
              <router-link :to="'/articleText?id='+text.id">{{text.title}}
                <span class="article-time">{{new Date(text.time).toLocaleDateString()+'-'+new Date(text.time).toLocaleTimeString()}}</span>
              </router-link>
            </dd>
          </dl>
  
          <div v-for="article in articles" class="article-box">
            <router-link style="display:block;" :to="'/articleText?id='+article.id">
              <h2 class="article-title">{{article.title}}</h2>
              <p class="article-title_info">
                <span style="color:#0577b6" class="iconfont">&#xe8cd;</span> 发表于{{new Date(article.time).toLocaleDateString()+'-'+new Date(article.time).toLocaleTimeString()}}
              </p>
              <p class="article-title_content" v-html="article.content"></p>
  
              <div class="radius-time">
                <p class="radius-month">5月</p>
                <p class="radius-date">15</p>
              </div>
              <div class="article-sort">{{article.sort}}</div>
            </router-link>
          </div>
  
        </div>
  
        <!--右边布局-->
        <div class="home-content_left">
          <div class="home-timer" data-scroll>
            <div class="time-title clearfix">
              <div class="time-title_left iconfont">&#xe600;日期</div>
              <div class="time-title_right">
                <span class="time-blod">{{time.year}}年</span><span>{{time.month}}月</span><span>{{time.date}}日</span><span class="time-blod time-title_week">周{{time.week}}</span>
              </div>
              <img class="dateimg" src="./img/img-7.jpg" alt="">
            </div>
          </div>
  
          <div class="home-carte" :style="caretSty">
            <div class="home-carte_img"></div>
            <ul class="home-creat_iconBox">
              <el-tooltip content="GitHub" placement="top">
                <li class="iconfont home-creat_icon">
                  <a href="https://github.com/lwpersonal" target="_blank">&#xe69f;</a>
                </li>
              </el-tooltip>
              <el-tooltip content="知乎" placement="top">
                <li class="iconfont home-creat_icon">
                  <a href="https://www.zhihu.com/people/xue-wu-zhi-jing-9-15" target="_blank">&#xe6bd;</a>
                </li>
              </el-tooltip>
              <el-tooltip content="掘金" placement="top">
              <li class="iconfont home-creat_icon">
                <a href="https://juejin.im/user/57cfd1560e3dd90069b6050e" target="_blank" >&#xe605;</a>
              </li>
              </el-tooltip>
            </ul>
            <ul class="home-creat_iconBox">
              <el-tooltip content="CSDN" placement="top">
              <li class="iconfont home-creat_icon">
                <a href="http://my.csdn.net/qq_25243451" target="_blank">&#xe611;</a>
              </li>
              </el-tooltip>
              <el-tooltip content="简书" placement="top">
              <li class="iconfont home-creat_icon">
                <a href="http://www.jianshu.com/u/dc0cf2cb01f8" target="_blank">&#xe66a;</a>
              </li>
              </el-tooltip>
              <el-tooltip content="新浪微博" placement="top">
              <li class="iconfont home-creat_icon">
                <a href="http://weibo.com/u/5146489434" target="_blank">&#xe60c;</a>
              </li>
              </el-tooltip>
              <el-tooltip content="网易云音乐" placement="top">
              <li class="iconfont home-creat_icon">
                <a href="http://music.163.com/#/user/home?id=98868511" target="_blank">&#xe622;</a>
              </li>
              </el-tooltip>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 组件
import elm_slide from '../slide.vue'

// lodash,curry-柯里化
import curry from 'lodash/curry'
import throttle from 'lodash/throttle'

let time = new Date();
export default {
  name: 'home',
  data() {
    return {
      // 滚动条绑定
      caretSty: {},
      scrollH: 0,
      scrollShow: false,
      scrollSty: {
        transform: 'translateY(0)'
      },
      // 时间获取
      time: {
        year: time.getFullYear(),
        month: (time.getMonth() + 1),
        date: time.getDate(),
        week: this.weekInit(time.getDay())
      },
      // 后台数据绑定
      articles: []
    }
  },
  components: {
    "elm-slide": elm_slide
  },
  methods: {
    articleT(url, id) {
      router.push({ path: url, query: { id: id } });
    },
    weekInit: (week) => {
      switch (week) {
        case 1:
          return '一';
        // break;
        case 2:
          return '二';
        // break;
        case 3:
          return '三';
        // break;
        case 4:
          return '四';
        // break;
        case 5:
          return '五';
        // break;
        case 6:
          return '六';
        // break;
        case 0:
          return '日';
        // break;
      }
    },
    scrollEve: function () {
      try {
        const carte = $('[data-scroll]');
        const carteH = carte.offset().top;
        this.scrollH = carteH;
        if ($(document).scrollTop() - 20 >= carteH + carte.height()) {
          this.caretSty = {
            top: $(document).scrollTop() - (carteH + carte.height() + 20) + 'px'
          };
        } else {
          this.caretSty = {};
        }
      } catch (err) {
        $(window).off('scroll');
      }
    }
  },
  created() {
    const _this = this;
    // 数据渲染
    this.axios.get('api/home').then(function (res) {
      if (res.data.code === 0) {
        _this.articles = res.data.data;
      }
    }).catch(function (err) {
      console.log(err);
    })
    $(function () {
      $(window).on('scroll', throttle(_this.scrollEve, 300, { leading: true }));
    })
  }
}

</script>

<style lang="stylus" scoped>
@import '../../static/css/common.styl'
a
  color #756f71
.content
  width 100%
  margin .1rem 0
.line
  width 100%
  height .01rem
  margin .1rem 0
  background #333
.home-box
  padding 0 .5rem .5rem .5rem
  color #756F71
  .home-content
    flexDiv()
    margin 0 auto
    .home-content_left
      position relative
      flexChild()
      .home-timer
        position relative
        margin 0 0 0 .2rem
        padding .2rem
        border-radius .03rem
        color #333
        background #e5eaf2
        .dateimg
          width 100%
          padding .2rem 0 0 0 
        .time-title_right
          float right
          .time-title_week
            color #de5246
        .time-title_left
          float left
          font-weight bold
          font-size .16rem
        .time-blod
          font-size .16rem
        .time-plan
          line-height .3rem
          .weekly-plan_line
            padding 0 0 0 .05rem
            border-bottom 0.01rem dashed #c9c9c9
            color #756f71
            .plan-line_yes
              float right
              color #007046
              font-size .14rem
            .plan-line_none
              float right
              color #de5246
              font-size .14rem
      .home-carte
        position relative
        top 0
        margin .2rem 0 0 .2rem
        padding .15rem
        border-radius .03rem
        background #e5eaf2
        transition all .5s ease
        .home-carte_img
          height 2rem
          margin 0 0 .15rem 0
          border-radius .03rem
          background url(./img/img-10.jpg) no-repeat center center
          background-size 100% auto
        .home-creat_iconBox
          justify-content center
          padding .1rem 0
          text-align center
        .home-creat_icon
          flex-shrink 1
          display inline-block
          cursor pointer
          margin 0 .1rem
          width d = .4rem
          height d
          border-radius 50%
          line-height d
          font-size .16rem
          text-align center
          background #dadada
          transition all .5s ease
          a
            display block
            width 100%
            height 100%
            border-radius 50%
            color #333
            transition all .5s ease
        .home-creat_icon:hover
          background #007046
          a
            color #fff
    .home-content_right
       flexChild(3)
      .home-article
        padding .2rem
        border-radius .03rem
        background #e5eaf2
        .home-article_title
          font-size .16rem
          font-weight bold
          color #333
        .home-article_text 
          a
            display block
            padding 0 .15rem
            cursor pointer
            border-bottom .01rem dashed #c9c9c9
            font-size .14rem
            line-height .4rem
            color #333
            .article-time
              float right
        .home-article_text:hover
          a
            color #de5246
            font-weight bold
      .article-box
        position relative
        cursor pointer
        margin .3rem 0 0 0
        padding .2rem
        border-radius .03rem
        background rgba(229,234,242,1)
        .radius-time
          wid = .5rem
          position absolute
          top -(wid/3)
          left -(wid/2)
          width wid
          height wid
          border-radius 50%
          box-shadow 0 .02rem .02rem rgba(5,119,182,.5)
          text-align center
          background #97dffd
          .radius-month
            padding .05rem 0 0 0
            color #de5246
            font-size .14rem
          .radius-date
            line-height (wid/2)
            color #de5246
            font-weight bolder   
            font-size .16rem
        .article-sort
          wid = .5rem
          position absolute
          z-index 100
          display inline-block
          top (wid*2)
          left -(wid / 2)
          padding .1rem .1rem .1rem .2rem
          border-radius .03rem
          box-shadow 0 .02rem .02rem rgba(5,119,182,.5)
          font-size .14rem
          color #65b020
          font-weight bolder
          transform rotate(10deg)
          background #97dffd
        .article-title
          font-size .2rem
          font-weight bold
          text-align center
          line-height .4rem
          color #333
        .article-title_info
          margin .3rem 0
          font-size .16rem
          text-align center
        .article-title_content
          margin .3rem 0 0 0
          line-height .4rem
          text-indent 2em
          font-size .14rem
        .article-img
          display block
          margin 0 auto
          border-radius .03rem
</style>