<template>
  <div class="content-2">
    <div class="clearfix">
      <div v-for="(item, index) in nowData.content" class="plan-box">
        <el-card class="box-card">
          <div slot="header" class="clearfix plan-edit_box">
            <el-button @click="deletePlan(item,index)" style="float: right;" type="primary">删除</el-button>
            <p class="plan-edit_title" style="line-height: 36px;">{{item.title}}</p>
            <p class="plan-edit_time">开始时间：{{new Date(item.startTime).getFullYear()}}年{{new Date(item.startTime).getMonth()+1}}月{{new Date(Date.parse(item.startTime)).getDate()}}日
            </p>
            <p class="plan-edit_time">结束时间：{{new Date(item.endTime).getFullYear()}}年{{new Date(item.endTime).getMonth()+1}}月{{new Date(Date.parse(item.endTime)).getDate()}}日
            </p>
            <p>类型：{{item.type}}</p>
            <p>描述：{{item.description}}</p>
          </div>
          <div v-for="i in item.plan" :key="i" class="plan-edit_son">
            <span>{{ i.content }}</span>
            <span class="iconfont" v-if="i.status==='no'" style="color:#de5246;">&#xe8dc;</span><span class="iconfont" v-else-if="i.status==='yes'" style="color:#007046;">&#xe8db;</span>
            <span>{{i.difficulty}}&nbsp;</span>
          </div>
        </el-card>
      </div>
    </div>
    <el-button class="btn-plan_edit" type="primary" :loading="loadingSta" @click="load" :disabled="loadSta">加载更多</el-button>
  </div>
</template>

<script>
import waterfall from 'async/waterfall';
export default {
  data() {
    return {
      nowData: [],
      loadingSta: false,
      loadSta: false,
      planIndex: {
        all: 0,
        week: 0,
        month: 0,
        num: 10
      }
    }
  },
  props: ['nowKey'],
  watch: {
    nowKey() {
      const _this = this;
      let paramsobj = {};
      if (this.nowKey === '1-1') {
        this.planIndex.all = 0;
        this.request('all', true);
      } else if (this.nowKey === '1-2') {
        this.planIndex.week = 0;
        this.request('week', true);
      } else if (this.nowKey === '1-3') {
        this.planIndex.month = 0;
        this.request('month', true);
      } else {
      }
    }
  },
  methods: {
    load() {
      if (this.nowKey === '1-1') {
        this.request('all');
      } else if (this.nowKey === '1-2') {
        this.request('week');
      } else if (this.nowKey === '1-3') {
        this.request('month');
      }
    },
    deletePlan(item, index) {
      const _this = this;
      let paramsobj = {};
      paramsobj = {
        params: {
          id: item.id
        }
      };
      this.axios.get('api/plan/delete', paramsobj).then(function (res) {
        if (res.data.code === 0) {
          _this.nowData.content.splice(index, 1);
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
    request(type, status) {
      this.loadingSta = true;
      const _this = this;
      let paramsobj = {};
      paramsobj = {
        params: {
          type: type,
          p1: this.planIndex[type],
          p2: this.planIndex.num
        }
      };
      this.axios.get('api/plan', paramsobj).then(function (res) {
        console.log(res.data);
        if (status) {
          _this.nowData = res.data.content;
        } else {
          _this.nowData.content = _this.nowData.content.concat(res.data.content.content);
        }
        console.log(_this.nowData.content);
        _this.planIndex[type]++;
        _this.loadingSta = false;
        if (res.data.content.content.length < 10) {
          console.log('sssss');
          _this.loadSta = true;
        } else {
          _this.loadSta = false;
        }
      }).catch(function (err) {
        console.log(err);
      })
    }
  },
  created() { },
  computed: {
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../../static/css/common.styl'
.content-2
  color #333
  font-size .12rem
  .plan-box:nth-child(2n)
    margin 0 0 0 .6rem
  .plan-box:nth-child(2n-1)
  .plan-box
    display inline-block
    position relative
    margin 0 0 .2rem 0
    width 45%
    .plan-edit_box
      color #0577b6
      >p
        line-height .3rem
        font-size .14rem
      .plan-edit_title
        line-height .4rem
        font-size .18rem
        color #333
    .plan-edit_son
      >span:nth-child(1)
        display inline-block
        width 80%
      >span:nth-child(2)
        float right
      >span:nth-child(3)
        float right
      >span
        line-height .2rem
        margin 0 0 .1rem 0
  .btn-plan_edit
    display block
    margin .4rem auto 0 auto 
</style>