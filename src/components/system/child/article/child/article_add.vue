<template>
  <div class="article-add_box">
  
    <div class="flexB">
      <el-input data-key="title" class="flexC flexone" placeholder="文章标题" icon="close" v-model="article.title" :on-icon-click="handleIconClick">
      </el-input>
  
      <el-input data-key="sort" class="flexC flextwo" placeholder="文章类型" icon="close" v-model="article.sort" :on-icon-click="handleIconClick">
      </el-input>
    </div>
  
    <div class="flexB">
      <el-input data-key="author" class="flexC flexone" placeholder="作者" icon="close flexone" v-model="article.author " :on-icon-click="handleIconClick ">
      </el-input>
  
      <el-input data-key="href" class="flexC flextwo" placeholder="文章连接" icon="close " v-model="article.href " :on-icon-click="handleIconClick ">
      </el-input>
    </div>
  
    <div class="flexB ">
      <el-select class="flexC flexone" v-model="byself" placeholder="原创文章">
        <el-option label="是" value="true"></el-option>
        <el-option label="否" value="false"></el-option>
      </el-select>
  
      <el-date-picker class="flexC flextwo" v-model="nowdate" type="daterange" placeholder="选择日期">
      </el-date-picker>
    </div>
  
    <!--文本编辑器-->
    <div class="editor ">
      <v-editor :input-content="inputContent " :upload-url="uploadURL " v-model="outputContent ">
      </v-editor>
    </div>
  
    <el-button type="primary" style="margin: .5rem 0 0 0;" :disabled="requestSta" :loading="request" @click="submit">提交</el-button>
  
  </div>
</template>

<script>
import Editor from './Editor.vue'

export default {
  data() {
    return {
      // 编辑器
      inputContent: 'author is AI',
      request: false,
      outputContent: '',
      // 图片上传地址
      uploadURL: '/api/article/imgUrl',
      // 选择输入框
      article: {
        title: '',
        sort: '',
        author: '',
        href: ''
      },
      byself: '',
      nowdate: ''
    }
  },
  components: {
    'v-editor': Editor
  },
  computed: {
    requestSta() {
      if (this.article.title && this.article.sort && this.inputContent && this.byself && this.nowdate) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    submit() {
      console.log(this.outputContent);
      let params = new URLSearchParams();
      const _this = this;
      params.append('content', this.outputContent);
      params.append('date', this.nowdate);
      params.append('byself', this.byself);
      params.append('article', JSON.stringify(this.article));
      this.axios.post('api/article/add', params).then(function (res) {
        console.log(res.data);
        _this.$notify({
          title: '成功',
          message: '提交成功！',
          type: 'success'
        });
      }).catch(function (err) {
        _this.$notify.error({
          title: '错误',
          message: '提交错误，请稍后重试！'
        });
      })
    },
    handleIconClick(ev) {
      let key = $(ev.target).parent().attr('data-key');
      this.article[key] = '';
    }
  },
  created() {
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../../static/css/common.styl'
.flexB
  flexDiv()
.flexC
  flexChild()
.my-autocomplete
  li
    line-height normal
    padding 7px
    .name
      text-overflow ellipsis
      overflow hidden
    .addr
      font-size 12px
      color #b4b4b4
    .highlighted .addr
      color: #ddd
.article-add_box
  text-align center
  .flexone
    margin 0 .5rem .5rem .5rem
  .flextwo
    margin 0 .5rem .5rem .5rem
</style>