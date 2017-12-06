<template>
  <div class="content-1">
    <div class="reRow-title">
      <el-steps :space="300" :active="active">
        <el-step title="步骤 1" description="制定计划表，确定计划时间。"></el-step>
        <el-step title="步骤 2" description="制定单个计划。"></el-step>
        <el-step title="步骤 3" description="查看计划信息，确认提交。"></el-step>
      </el-steps>
    </div>
  
    <div v-show="active === 0" class="reRow-form1">
      <el-row class="demo-autocomplete">
        <el-col class="plan-col" :span="12">
          <el-autocomplete class="inline-input plan-input" v-model="state1" :fetch-suggestions="querySearch" placeholder="请输入标题" @select="handleSelect"></el-autocomplete>
          <div class="plan-title" v-html="mes_1"></div>
        </el-col>
      </el-row>
      <div class="textarea-content">
        <el-input class="textarea-input" type="textarea" :autosize="{ minRows: 2}" placeholder="请输入计划描述" v-model="textarea">
        </el-input>
        <div class="textarea-mes" v-html="mes_2"></div>
      </div>
      <div class="date-box flexB">
        <div class="flexC" style="text-align: right;">
          <el-select v-model="optionValue" style="margin: 0 0 .2rem 0" placeholder="周计划/月计划">
            <el-option v-for="item in options" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div v-show="optionValue === 'week'" class="block flexC" style="margin-right: .2rem;text-align: left;">
          <span class="demonstration">周</span>
          <el-date-picker v-model="date1" type="week" format="yyyy 第 WW 周" placeholder="选择周">
          </el-date-picker>
        </div>
        <div v-show="optionValue === 'month'" class="block flexC" style="margin-right: .2rem;text-align: left;">
          <span class="demonstration">月</span>
          <el-date-picker v-model="date1" type="month" placeholder="选择月">
          </el-date-picker>
        </div>
  
      </div>
    </div>
  
    <div v-show="active === 1" class="reRow-form2">
      <div class="flexB">
        <el-input class="flexC" placeholder="计划详情" icon="circle-close" v-model="input2" :on-icon-click="handleIconClick">
        </el-input>
        <div class="plan-title" v-html="mes_21"></div>
      </div>
      <el-radio-group style="margin: .4rem 0 0 0" v-model="radio1">
        <el-radio :label="'easy'"><span class="iconfont face" style="color:#007046;">&#xe8da;</span>&nbsp;容易</el-radio>
        <el-radio :label="'ordinary'"><span class="iconfont face" style="color:#0577b6;">&#xe8db;</span>&nbsp;一般</el-radio>
        <el-radio :label="'difficult'"><span class="iconfont face" style="color:#de5246;">&#xe8dc;</span>&nbsp;困难</el-radio>
      </el-radio-group>
      <el-button v-show="!subReq" style="display: block;margin: .4rem auto 0 auto;" :disabled="true" type="primary">生成计划</el-button>
      <el-button v-show="subReq" style="display: block;margin: .4rem auto 0 auto;" plain @click="planCreat" type="primary">生成计划</el-button>
      <div class="plan-content">
        <el-table :data="plan" border style="width: 6rem;margin: 0 auto;" max-height="250">
          <el-table-column fixed prop="content" label="内容" width="300">
          </el-table-column>
          <el-table-column prop="difficulty" label="类型" width="160">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="138">
            <template scope="scope">
              <el-button plain @click.native.prevent="deleteRow(scope.$index, plan)" type="text" size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  
    <div v-show="active === 2" class="reRow-form3">
      <el-card class="box-card reRow-form3_card">
        <div v-if="state1" slot="header" class="clearfix reRow-form3_title" style="line-height: 36px;">{{state1}}
          <div class="reRow-form3_date" v-if="date1">开始时间：{{date1.getFullYear()}}年{{date1.getMonth()+1}}月{{date1.getDate()}}日
            <div>类型：{{optionValue}}</div>
            <div>描述：{{textarea}}</div>
            </di>
          </div>
        </div>
        <div v-if="plan" v-for="item in plan" class="reRow-form3_item">
          {{ item.content }}
          <div style="float:right;color:#de5246;">{{ item.difficulty }}</div>
        </div>
      </el-card>
    </div>
  
    <div class="btn-box">
      <el-button class="btn-sub" @click="last">上一步</el-button>
      <el-button v-show="!request" class="btn-sub" @click="next">下一步</el-button>
      <el-button v-show="request" @click="subRequest" class="btn-sub">提交</el-button>
    </div>
  
  </div>
</template>

<script>
import {
  getDate
} from '../../../../../static/js/script'

const regexp_1 = /\S/; // 非空白字符
const nowD = new Date;
export default {
  data() {
    return {
      active: 0,
      restaurants: [],
      // reRow-form1
      state1: '', // 标题20170501~。。。
      textarea: '', // 描述
      request: false,
      date1: '', // 本周一的时间对象
      options: [{
        value: 'week',
        label: '周计划'
      }, {
        value: 'month',
        label: '月计划'
      }],
      optionValue: 'week',
      // reRow-form2 
      input2: '',
      radio1: 'ordinary', // easy,ordinary,difficult
      subReq: false,
      plan: [],
      // reRow-form3
    }
  },
  methods: {
    // 提示信息
    open() {
      this.$message.error('错了哦，请完善计划表信息！');
    },
    // 创建计划
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        {
          "value": getDate.getWeekStartDate() + '~' + getDate.getWeekEndDate(),
          "type": "week"
        },
        {
          "value": getDate.getMonthStartDate() + '~' + getDate.getMonthEndDate(),
          "type": "month"
        }
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    // 单个计划创建
    handleIconClick(ev) {
      this.input2 = '';
    },
    planCreat: function () {
      if (this.input2) {
        this.$notify({
          title: '成功',
          message: '计划成功创建！',
          type: 'success'
        });
        this.plan.push({ content: this.input2, difficulty: this.radio1 });
        this.input2 = '';
      } else {
        this.$notify({
          title: '警告',
          message: '出错！',
          type: 'warning'
        });
      }
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.$notify.info({
        title: '成功',
        message: '删除计划成功！'
      });
    },
    // 上下步
    next() {
      this.active++;
      if (this.active > 3) { this.active = 3; }
    },
    last() {
      this.active--;
      if (this.active <= 0) { this.active = 0; }
    },
    subRequest() {
      const _this = this;
      if (regexp_1.exec(this.state1) && this.date1 && this.plan) {
        this.$emit('subRequest');
        // this.axios.get('api/plan/add', {
        //   params: {
        //     ID: 12345
        //   }
        // }).then(function (res) {
        //   console.log(res.data);
        //   _this.nowData = res.data.content;
        // }).catch(function (err) {
        //   console.log(err);
        // })
        let params = new URLSearchParams();
        params.append('title', this.state1);
        params.append('description', this.textarea);
        params.append('startTime', this.date1);
        params.append('type', this.optionValue);
        params.append('plan', JSON.stringify(this.plan));
        this.axios.post('api/plan/add', params).then(function (res) {
          console.log(res.data);
          _this.$emit('subRequest');
          _this.nowData = res.data.content;
          _this.state1 = '';
          _this.textarea = '';
          _this.date1 = '';
          _this.plan = [];
          _this.$notify({
            title: '成功',
            message: '提交成功！',
            type: 'success'
          });
        }).catch(function (err) {
          console.log(err);
          _this.$notify.error({
            title: '错误',
            message: '提交错误，请稍后重试！'
          });
        })
      } else {
        this.open();
      }
    }
  },
  watch: {
    active: function () {
      if (this.active === 2) {
        this.request = true;
      } else {
        this.request = false;
      }
    }
  },
  computed: {
    // plantitle 提示信息
    mes_1: function () {
      if (!regexp_1.exec(this.state1)) {
        return '<span style="color: #de5246;" class="iconfont">&#xe659;</span>&nbsp;请输入非空白字符'
      } else {
        return '<span style="color: #007046;"  class="iconfont">&#xe657;</span>&nbsp;输入正确'
      }
    },
    mes_2: function () {
      let sta;
      const maxNum = 200;// 最大字符数
      let text = this.textarea;
      this.textarea.length <= maxNum ? sta = true : sta = false;
      if (sta) {
        return '<span>' + (maxNum - this.textarea.length) + '</span>/' + maxNum;
      } else {
        return '<span style="color: #de5246;">' + (maxNum - this.textarea.length) + '</span>/' + maxNum;
      }
    },
    mes_21: function () {
      if (!regexp_1.exec(this.input2)) {
        this.subReq = false;
        return '<span style="color: #de5246;" class="iconfont">&#xe659;</span>&nbsp;请输入非空白字符';
      } else {
        this.subReq = true;
        return '<span style="color: #007046;"  class="iconfont">&#xe657;</span>&nbsp;输入正确';
      }
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../../static/css/common.styl'
.flexB
  flexDiv()
.flexC
  flexChild()
.reRow-title
  text-align center
.plan-title
  flexChild()
  margin 0 0 0 .5rem
  text-align left
  line-height .36rem
  color #756F71
.reRow-form1
  padding 1rem .4rem .4rem .4rem
  text-align center
  .date-box
    margin .4rem 0 0 0
  .plan-col
    flexDiv()
    .plan-input
      flexChild()
      margin 0 0 0 2rem
  .textarea-content
    flexDiv()
    margin .5rem 0 0 0
    .textarea-input
      flexChild()
      margin 0 0 0 2rem
    .textarea-mes
      flexChild()
      margin 0 0 0 .5rem
      text-align left
      line-height .36rem
      color #756F71
.reRow-form2
  padding 1rem .4rem .4rem .4rem
  text-align center
  .face
    font-size .16rem
  .plan-content
    display flex
    flex-wrap wrap
    margin .4rem 0 0 0
    padding 0 0 .2rem 0
    text-align center
    // 去除inline-blockbug
    font-size: 0;
    -webkit-text-size-adjust:none;
    .el-table_1_column_1 .cell
      text-align left
.btn-box
  text-align center
  .btn-sub
    margin .5rem 0 0 0
.reRow-form3
  padding 1rem .4rem .4rem .4rem
  color #1f2d3d
  .reRow-form3_card
    width 50%
    margin 0 auto
    transform rotate(-5deg)
    .reRow-form3_title
      font-size .18rem
      font-weight bold
      text-align center
      .reRow-form3_date
        font-weight 400
        text-align left
        font-size .14rem
        line-height .20rem
        color #007046
    .reRow-form3_item
      line-height .26rem
</style>