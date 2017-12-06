<template>
  <div v-loading.body="loading" element-loading-text="正在提交，请稍后">
    <el-row class="tac">
      <el-col :span="8">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-view"></i>计划总览</template>
            <el-menu-item-group>
              <template slot="title">查看任务</template>
              <el-menu-item index="1-1">查看全部计划</el-menu-item>
              <el-menu-item index="1-2">查看周计划</el-menu-item>
              <el-menu-item index="1-3">查看月计划</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2"><i class="el-icon-plus"></i>计划添加</el-menu-item>
        </el-menu>
      </el-col>
  
      <!--内容-->
      <div class="reRow-content">
  
        <plan-add v-show="nowPage === 'plan_add'" @subRequest="request"></plan-add>
  
        <plan-edit :nowKey="nowKey" v-show="nowPage === 'plan_edit'"></plan-edit>
  
      </div>
    </el-row>
  </div>
</template>

<script>
import plan_add from './child/plan_add.vue'
import plan_edit from './child/plan_edit.vue'

import {
  getDate
} from '../../../../static/js/script'

const regexp_1 = /\S/; // 非空白字符
const nowD = new Date;

export default {
  data() {
    return {
      loading: false,
      active: 0,
      nowPage: 'plan_add',
      nowKey: ''
    }
  },
  components: {
    "plan-add": plan_add,
    "plan-edit": plan_edit
  },
  methods: {
    // 侧导航
    request(sta) {
      this.loading = !this.loading;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      this.nowKey = key;
      if (keyPath[0] === '2') {
        // 添加页
        this.nowPage = 'plan_add';
      } else if (keyPath[0] === '1') {
        // 浏览页
        this.nowPage = 'plan_edit';
      } else {
        // 添加页
        this.nowPage = 'plan_add';
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../static/css/common.styl'
.flexB
  flexDiv()
.flexC
  flexChild()
.el-row
  flexDiv()
  .el-col
    flexChild()
  .reRow-content
    flexChild(4)
    margin 0 0 0 .1rem
    border-radius .03rem
    padding .4rem .4rem 1.4rem .4rem
    background #eef1f6
</style>