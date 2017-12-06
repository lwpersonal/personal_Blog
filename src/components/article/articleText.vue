<template>
  <div class="article-text_wrap">
    <div class="article-text_box">
      <h3 class="essay-title">{{article.title}}</h3>
      <h4 class="essay-tag tag iconfont">&#xe78b;&nbsp;{{article.sort}}</h4>
      <h4 class="essay-author tag iconfont">&#xe736;&nbsp;{{article.author}}</h4>
      <h4 class="essay-time tag iconfont">&#xe610;&nbsp;{{new Date(article.time).toLocaleDateString()+'-'+new Date(article.time).toLocaleTimeString()}}</h4>
      <div class="essay-content" v-html="article.content"></div>
      <div class="essay-review">
        <div class="review-content flexB">
          <el-input class="review-input" placeholder="文章评论" icon="close" v-model="input" :on-icon-click="handleIconClick">
          </el-input>
          <el-button class="review-req" @click="reviewreq(article.id)" type="primary">提交</el-button>
        </div>
        <h3 class="review-re_title">最新评论：</h3>
        <ul class="essay-review_item">
          <li v-for="(item,index) in review" class="essay-review_list">
            <span class="essay-reply">评论文章：</span>
            <p class="flexB">
              <span class="essay-reply_con">{{item.content}}</span>
              <span class="essay-review_time">{{new Date(item.time).toLocaleDateString()+'-'+new Date(item.time).toLocaleTimeString()}}</span>
            </p>
            <div class="reply-box">
              <p class="iconfont essay-review_reply" @click="showinput">回复&nbsp;&#xe621;</p>
              <div data-show class="reply-input">
                <el-input placeholder="评论回复" v-model="input_2">
                  <el-button slot="append" icon="edit" @click="replayreq(item.id,index)"></el-button>
                </el-input>
              </div>
            </div>
            <ul class="replay">
              <li class="flexB" v-for="list of item.replay">
                <span style="color:#e74851;font-size:.14rem;">回复评论：</span><span style="display:inline-block;width:80%;">{{list.content}}</span><span style="display:inline-block;margin:0 0 0 .2rem">{{new Date(list.time).toLocaleDateString()+'-'+new Date(list.time).toLocaleTimeString()}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  urlParam
} from '../../static/js/script'
export default {
  data() {
    return {
      article: [],
      review: [],
      date: '',
      input: '',
      input_2: ''
    }
  },
  methods: {
    handleIconClick(ev) {
      this.input = '';
    },
    reviewreq(id) {
      const _this = this;
      if (this.input) {
        this.date = new Date();
        this.axios.get('api/review/add', {
          params: {
            articleid: id,
            date: _this.date,
            content: _this.input
          }
        }).then(function (res) {
          console.log(res.data);
          if (res.data.code === 0) {
            _this.review.push({
              content: _this.input,
              time: _this.date,
              id: res.data.id,
              replay: []
            });
            _this.input = '';
            _this.$notify({
              title: '成功',
              message: '评论成功！',
              type: 'success'
            });
          }
        }).catch(function (err) {
          _this.$notify.error({
            title: '错误',
            message: '评论失败，请稍后重试！'
          });
          console.log(err);
        })
      } else {
        _this.$notify.error({
          title: '错误',
          message: '请填写评论信息！'
        });
      }
    },
    replayreq(id, index) {
      const _this = this;
      if (this.input_2) {
        this.date = new Date();
        this.axios.get('api/replay/add', {
          params: {
            reviewid: id,
            date: _this.date,
            content: _this.input_2
          }
        }).then(function (res) {
          console.log(res.data);
          if (res.data.code === 0) {
            _this.review[index].replay.push({
              content: _this.input_2,
              time: _this.date
            });
            _this.input_2 = '';
            _this.$notify({
              title: '成功',
              message: '评论成功！',
              type: 'success'
            });
          }
        }).catch(function (err) {
          _this.$notify.error({
            title: '错误',
            message: '评论失败，请稍后重试！'
          });
          console.log(err);
        })
      } else {
        _this.$notify.error({
          title: '错误',
          message: '请填写回复信息！'
        });
      }
    },
    showinput(e) {
      const inputDom = $(e.currentTarget).next();
      if (inputDom.css('height') === '0px') {
        inputDom.css('height', '0.4rem');
      } else if (inputDom.css('height') === '40px') {
        inputDom.css('height', '0');
      }
    }
  },
  created() {
    const _this = this;
    this.axios.get('api/review?articleid=' + urlParam('id')).then(function (res) {
      console.log(res.data);
      if (res.data.code === 0) {
        _this.article = res.data.article;
        _this.review = res.data.content;
      }
    }).catch(function (err) {
      console.log(err);
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '../../static/css/common.styl'
.flexB
  flexDiv()
.flexC
  flexChild()
.article-text_wrap
  padding .4rem
  color #756F71
  .article-text_box
    padding .2rem
    border-radius .03rem
    background rgba(229,234,242,1)
    .essay-title
      font-size .18rem
      color #333
    .tag
      display inline-block
      margin .1rem 0 0 0
      padding .05rem .1rem
      border-radius .03rem
      color #fff
    .essay-tag
      background rgba(101,176,32,1)
    .essay-author
      background rgba(5,119,182,1)
    .essay-time
      background rgba(247,133,133,1)
    .essay-content
      margin .2rem 0 0 0
      padding .2rem
      border-radius .03rem
      line-height .3rem
      background #fff
    .essay-review
      margin .2rem 0 0 0
      padding .2rem
      border-radius .03rem
      background #fff
      .review-content
        padding .2rem
        .review-input
          width 70%
        .review-req
          margin 0 0 0 1rem
      .review-re_title
        border-bottom 1px solid #e74851
        line-height .3rem
        font-size .16rem
      .essay-review_item
        padding .2rem
        border-radius .03rem
        background #fff
        .essay-review_list
          padding 0 0 .2rem 0
          border-bottom 1px #c9c9c9 solid
          line-height  .3rem
          .essay-reply
            color #e74851
            font-size .16rem
            text-align center
          .essay-reply_con
            flexChild(6)
            text-indent 2em
          .essay-review_time
            flexChild();
            text-align right
          .reply-box
            .essay-review_reply
              display block
              cursor pointer
              text-align right
            .reply-input
              overflow hidden
              height 0
              margin .15rem 0 0 0
              transition all .5s ease
          .replay
            padding 0 .2rem

</style>