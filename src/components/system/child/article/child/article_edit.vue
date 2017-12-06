<template>
  <div class="article-box">
    <el-card v-for="(item,index) of nowData" class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;font-size:.18rem;">{{item.title}}</span>
        <el-button style="float: right;" type="primary" @click="deletePlan(item.id,index)">删除</el-button>
      </div>
      <div class="text item">
        {{'作者 ' + item.author }}
      </div>
      <div class="text item">
        {{'类型 ' + item.sort }}
      </div>
      <div class="text item">
        {{'时间 ' + new Date(item.time).toLocaleDateString()+'-'+new Date(item.time).toLocaleTimeString()}}
      </div>
      <div class="text item">
        {{'原创 ' + item.byself }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowData: []
    }
  },
  props: ['nowKey'],
  watch: {
    nowKey() {
      const _this = this;
      if (this.nowKey === '1-1') {
        this.request();
      } else if (this.nowKey === '1-2') {
        this.request('true');
      } else if (this.nowKey === '1-3') {
        this.request('false');
      } else {
      }
    }
  },
  methods: {
    deletePlan(id, index) {
      const _this = this;
      let paramsobj = {};
      paramsobj = {
        params: {
          id: id
        }
      };
      this.axios.get('api/article/delete', paramsobj).then(function (res) {
        if (res.data.code === 0) {
          _this.nowData.splice(index, 1);
          _this.$notify({
            title: '成功',
            message: '删除成功！',
            type: 'success'
          });
        } else {
          _this.$notify.error({
            title: '错误',
            message: '出错！'
          });
        }
      }).catch(function (err) {
        console.log(err);
      })
    },
    request(byself, sort) {
      const _this = this;
      let paramsobj = {
        params: {}
      };
      if (byself) {
        $.extend(paramsobj.params, { byself: byself });
      }
      if (sort) {
        $.extend(paramsobj.params, { sort: sort });
      }
      this.axios.get('api/article', paramsobj).then(function (res) {
        _this.nowData = res.data.data;
      }).catch(function (err) {
        console.log(err);
      })
    }
  },
  created() {
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../../static/css/common.styl'

.box-card
  width 4.8rem
  margin 0 0 .2rem 0
  color #333
  
.box-card:nth-child(2n)
  float right
.box-card:nth-child(2n-1)
  float left
.text 
  font-size .14rem
.item 
  padding .1rem 0
.clearfix:before,.clearfix:after 
  display table
  content ""
.clearfix:after
  clear both
</style>