<template>
  <div class="review-wrap">
    <div class="review-box">
      <h2 class="review-title">留言反馈</h2>
      <div class="review-content flexB">
        <el-input class="review-input" placeholder="说点什么吧！" icon="close" v-model="input" :on-icon-click="handleIconClick">
        </el-input>
        <el-button class="review-req" @click="messagereq" type="primary">提交</el-button>
      </div>
      <h3 class="review-re_title">最新留言：</h3>
      <div class="review-re">
        <ul class="review-re_content clearfix">
          <li v-for="item in messageDate" class="review-re_list">
            <span class="review-re_text">{{item.content}}</span><span class="review-re_time">{{new Date(item.time).toLocaleDateString()+'-'+new Date(item.time).toLocaleTimeString()}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      date: '',
      messageDate: []
    }
  },
  methods: {
    handleIconClick(ev) {
      this.input = '';
    },
    messagereq() {
      const _this = this;
      this.date = new Date();
      this.axios.get('api/message/add', {
        params: {
          date: _this.date,
          content: _this.input
        }
      }).then(function (res) {
        if (res.data.code === 0) {
          _this.messageDate.unshift({content:_this.input,time:_this.date});
          _this.input = '';
          _this.$notify({
            title: '成功',
            message: '留言成功！',
            type: 'success'
          });
        }
      }).catch(function (err) {
        console.log(err);
        _this.$notify.error({
          title: '错误',
          message: '留言失败，请检查网络稍后重试！'
        });
      })
    }
  },
  created() {
      const _this = this;
      this.axios.get('api/message').then(function (res) {
        if (res.data.code === 0) {
          _this.messageDate = res.data.data;
        }
      }).catch(function (err) {
        console.log(err);
      })
    }
}
</script>

<style lang="stylus" scoped>
@import '../static/css/common.styl'
.flexB
  flexDiv()
.flexC
  flexChild()
.review-wrap
  padding .4rem
  color #333
  .review-box
    background #e5eaf2
    padding .4rem
    border-radius .03rem
    .review-title
      padding .2rem 0
      border-bottom 1px solid #c9c9c9
      font-size .18rem
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
    .review-re
      width 70%
      margin .2rem 0 0 0
      padding 0 0 .2rem 0
      border-right 1px solid #e74851
      .review-re_content
        padding 0 .2rem
        .review-re_list
          position relative
          float right
          width 80%
          margin .2rem 0 0 0
          padding .1rem
          border-radius .03rem
          line-height .3rem
          background rgba(94,165,27,0.5)
          // .review-re_text
          .review-re_time
            position absolute
            display block
            top 0
            right -2.15rem
            width 1.5rem
            padding 0 .1rem
            border-radius .03rem
            color #fff
            font-size .16rem
            text-align center
            background rgba(94,165,27,0.9)
          .review-re_time:after
            content ''
            display block
            position absolute
            left -.29rem
            top 50%
            transform translate(0,-50%)
            width .1rem
            height .1rem
            border-radius 50%
            background #e74851

    
</style>