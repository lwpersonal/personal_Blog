<template>
  <div id="app">
    <div class="wrap" id="wrap">
      <App-head></App-head>
      <!-- 网页主体 -->
      <router-view>
        </router-view>
      <App-foot></App-foot>
    </div>
  </div>
</template>

<script>
// import home from './components/home/home.vue'
import head from './components/head/head.vue'
import foot from './components/foot/foot.vue'

export default {
  name: 'app',
  components: {
    "App-head": head,
    "App-foot": foot
  }
}

</script>

<style lang="stylus">
</style>
