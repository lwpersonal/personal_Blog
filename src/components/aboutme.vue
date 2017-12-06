<template>
  <div class="aboutMe-wrap">
    <div class="aboutMe-box">
      <h2 class="aboutMe-title">关于自己</h2>
      <div class="aboutMe-content">
        <h3 class="personal-title">个人简介</h3>
        <img class="personal-icon" src="../static/img/img-2.jpg" alt="SEO头像">
        <dl class="personal-text">
          <dt>AI</dt>
          <dd>昨夜西风凋碧树，</dd>
          <dd>独上高楼，</dd>
          <dd>望尽天涯路。</dd>
          <dd>&nbsp;</dd>
          <dd>爱生活、爱艺术、爱画画、爱读书、爱编程。</dd>
        </dl>
        <h3 class="personal-title">我的技术链</h3>
        <div class="personal-skill flexB">
          <div class="personal-skill_son">
            <h3>HTML</h3>
            <el-progress type="circle" :percentage="85"></el-progress>
          </div>
          <div class="personal-skill_son">
            <h3>CSS</h3>
            <el-progress type="circle" :percentage="85"></el-progress>
          </div>
          <div class="personal-skill_son">
            <h3>JavaScript</h3>
            <el-progress type="circle" :percentage="80"></el-progress>
          </div>
          <div class="personal-skill_son">
            <h3>NodeJs</h3>
            <el-progress type="circle" :percentage="50"></el-progress>
          </div>
          <div class="personal-skill_son">
            <h3>MySql</h3>
            <el-progress type="circle" :percentage="30"></el-progress>
          </div>
          <div class="personal-skill_son">
            <h3>PhotoShop</h3>
            <el-progress type="circle" :percentage="75"></el-progress>
          </div>
          <div class="personal-skill_son">
            <h3>Python</h3>
            <el-progress type="circle" :percentage="10"></el-progress>
          </div>
  
        </div>
        <h3 class="personal-title">我的链接</h3>
        <div class="personal-href">
          <ul class="home-creat_iconBox">
            <el-tooltip content="GitHub" placement="top">
              <li class="iconfont home-creat_icon">
                <a href="https://github.com/lwpersonal" target="_blank" title="GitHub">&#xe69f;</a>
              </li>
            </el-tooltip>
            <el-tooltip content="知乎" placement="top">
              <li class="iconfont home-creat_icon">
                <a href="https://www.zhihu.com/people/xue-wu-zhi-jing-9-15" target="_blank" title="知乎">&#xe6bd;</a>
              </li>
            </el-tooltip>
            <el-tooltip content="掘金" placement="top">
              <li class="iconfont home-creat_icon">
                <a href="https://juejin.im/user/57cfd1560e3dd90069b6050e" target="_blank" title="掘金">&#xe605;</a>
              </li>
            </el-tooltip>
            <el-tooltip content="CSDN" placement="top">
              <li class="iconfont home-creat_icon">
                <a href="http://my.csdn.net/qq_25243451" target="_blank" title="CSDN">&#xe611;</a>
              </li>
            </el-tooltip>
            <el-tooltip content="简书" placement="top">
              <li class="iconfont home-creat_icon">
                <a href="http://www.jianshu.com/u/dc0cf2cb01f8" target="_blank" title="简书">&#xe66a;</a>
              </li>
            </el-tooltip>
            <el-tooltip content="1521624684" placement="top">
              <li class="iconfont home-creat_icon">
                <a href="JavaScript:;" target="_blank" title="QQ">&#xe617;</a>
              </li>
            </el-tooltip>
            <el-tooltip content="新浪微博" placement="top">
              <li class="iconfont home-creat_icon">
                <a href="http://weibo.com/u/5146489434" target="_blank" title="新浪微博">&#xe60c;</a>
              </li>
            </el-tooltip>
            <el-tooltip content="网易云音乐" placement="top">
              <li class="iconfont home-creat_icon">
                <a href="http://music.163.com/#/user/home?id=98868511" target="_blank" title="网易云音乐">&#xe622;</a>
              </li>
            </el-tooltip>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
@import '../static/css/common.styl'
.flexB
  flexDiv()
.flexC
  flexChild()
.aboutMe-wrap
  padding .4rem
  color #333
  .aboutMe-box
    padding .4rem
    border-radius .03rem
    background #e5eaf2
    .aboutMe-title
      padding 0 0 .2rem 0
      border-bottom 1px #c9c9c9 solid
      font-size .18rem
      font-weight bold
    .aboutMe-content
      padding .2rem 0 0 0
      text-align center
      .personal-title
        padding .2rem 0
        font-size .16rem
      .personal-icon
        display block
        width 1rem
        height 1rem
        margin 0 auto
        border-radius 50%
      .personal-text
        padding .2rem  0 0 0
        color #756F71
        dt
          font-size .14rem
          line-height .25rem
        dd
          line-height .2rem
      .personal-skill
        flex-wrap wrap
        padding .2rem
        border-radius .03rem
        text-align left
        background #f7f7f7
        .personal-skill_son
          padding .5rem
          text-align center
          h3
            line-height .3rem
      .personal-href
        padding .2rem
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

</style>