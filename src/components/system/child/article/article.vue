<template>
  <el-row class="tac">
    <el-col :span="8">
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-edit"></i>文章编辑</template>
          <el-menu-item-group>
            <template slot="title">文章查询</template>
            <el-menu-item index="1-1">查看全部</el-menu-item>
            <el-menu-item index="1-2">查看原创</el-menu-item>
            <el-menu-item index="1-3">查看转载</el-menu-item>
          </el-menu-item-group>
          <!--<el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>-->
        </el-submenu>
        <el-menu-item index="2"><i class="el-icon-plus"></i>添加文章</el-menu-item>
      </el-menu>
    </el-col>
  
    <div class="reRow-content">
      <article-add v-show="nowPage === 'article_add'"></article-add>
      <article-edit :nowKey="nowKey" v-show="nowPage === 'article_edit'"></article-edit>
    </div>
  </el-row>
</template>

<script>
import article_add from './child/article_add.vue'
import article_edit from './child/article_edit.vue'

export default {
  data() {
    return {
      active: 0,
      nowPage: 'article_add',
      nowKey: ''
    }
  },
  components: {
    'article-add': article_add,
    'article-edit': article_edit
  },
  methods: {
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
        this.nowPage = 'article_add';
      } else if (keyPath[0] === '1') {
        // 浏览页
        this.nowPage = 'article_edit';
      } else {
        // 添加页
        this.nowPage = 'article_add';
      }
    }
  }
}
</script>

<style lang="">

</style>