<template>
  <div class="system-wrap">
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">计划管理</el-menu-item>
      <el-menu-item index="2">文章管理</el-menu-item>
    </el-menu>
    <div>
      <system-plan v-if="activeIndex==='1'"></system-plan>
      <system-article v-else-if="activeIndex==='2'"></system-article>
    </div>
  </div>
</template>

<script>
import plan from './child/plan/plan.vue'
import article from './child/article/article.vue'

export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  components: {
    "system-plan": plan,
    "system-article": article
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      console.log(this.activeIndex);
      console.log(key, keyPath);
    }
  }
}

</script>

<style lang="stylus" scoped>
@import '../../static/css/common.styl'
.system-wrap
  margin 0 .1rem
.el-menu-demo
  flexDiv()
  margin .1rem 0
  li
    flexChild()
    margin 0 1rem
    text-align center
.reRow-content
  float right
  width 80%
  height 1rem
  border-radius .03rem
  background blue
</style>