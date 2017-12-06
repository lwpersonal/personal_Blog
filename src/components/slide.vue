<template>
  <el-carousel height="450px" type="card">
    <el-carousel-item v-for="item in img">
      <div>
        <router-link style="display:block;" :to="'/articleText?id='+item.id">
          <img :src="item.img" width="100%" height="450" alt="">
          <div class="img-text">{{item.text}}</div>
        </router-link>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
// 图片资源
import img_8 from './home/img/img-8.jpg'
import img_7 from './home/img/img-7.jpg'
import img_6 from './home/img/img-1.jpg'

export default {
  name: "slide",
  data() {
    return {
      img: [
        { 
          img: img_6, 
          text: "Webpacp解析" ,
          id:24560001
        },
        { 
          img: img_7, 
          text: "Vue2进阶" ,
          id: 24650002
        },
        { 
          img: img_8, 
          text: "资本论",
          id: 24650007
        }
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../static/css/common.styl'
.el-carousel
  margin .3rem 0
  .el-col
    flexDiv()
.img-text
  position relative
  display block
  width 100%
  height 1rem
  margin -1rem 0 0 0
  text-align center
  line-height 1rem
  font-size .18rem
  color #fff
  font-weight bold
  // background-color red
  background rgba(0,0,0,0.5)

</style>