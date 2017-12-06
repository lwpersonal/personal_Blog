<template>
  <div class="article-wrap">
    <div v-for="article in articles" class="article-box">
      <router-link style="display:block;" :to="'/articleText?id='+article.id">
        <h2 class="article-title">{{article.title}}</h2>
        <p class="article-title_info">
          <span style="color:#0577b6" class="iconfont">&#xe8cd;</span> 发表于{{new Date(article.time).toLocaleDateString()+'-'+new Date(article.time).toLocaleTimeString()}}
        </p>
        <p class="article-title_content" v-html="article.content"></p>
  
        <div class="radius-time">
          <p class="radius-month">{{new Date(article.time).getMonth()+1}}月</p>
          <p class="radius-date">{{new Date(article.time).getDate()}}</p>
        </div>
        <div class="article-sort">{{article.sort}}</div>
      </router-link>
    </div>
    <!--<el-button class="btn-article" type="primary" :loading="false" @click="" :disabled="false">加载更多</el-button>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 2023,
      articles: [],
      sort: []
    }
  },
  created() {
    const _this = this;
    // 数据渲染
    this.axios.get('api/article?byself=false').then(function (res) {
      console.log(res.data);
      if (res.data.code === 0) {
        _this.articles = res.data.data;
      }
    }).catch(function (err) {
      console.log(err);
    })
    this.axios.get('api/article/sort?byself=false').then(function (res) {
      console.log(res.data);
      if (res.data.code === 0) {
        _this.sort = res.data.data;
      }
    }).catch(function (err) {
      console.log(err);
    })
  }
}
</script>

<style lang="stylus">
.article-wrap
  padding .4rem
  color #000
  text-align center
  .btn-article
    margin .5rem 0 0 0
  .article-box
    position relative
    cursor pointer
    margin .3rem 0 0 0
    padding .2rem
    border-radius .03rem
    background rgba(229,234,242,1)
    a
      color #756f71
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
      text-align left
      font-size .14rem
    .article-img
      display block
      margin 0 auto
      border-radius .03rem
</style>