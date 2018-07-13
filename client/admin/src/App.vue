<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .cms-page{
    height: 100%;
    overflow: hidden;
    padding-left: 200px;
    background-color: #f0f0f0;
    color: #666;

    .side{
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      width: 190px;
      margin-left: -200px;
      float: left;

      .el-menu{
        height: 100%;

        .iconfont{
            margin-right: 10px;
        }

      }
    }
    .content{
      overflow-y: auto;
      height: 100%;
      width: 100%;
      float: left;
      background-color: #fff;
      padding: 10px;
    }
  }
</style>
<template>
  <div class="cms-page">
    <div class="side">
      <el-menu
        :router="true"
        class="el-menu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="0" :route="{name:'product'}">
          <i class="iconfont icon-personal-center"></i>
          <span slot="title">商品</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <keep-alive><router-view/></keep-alive>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cms-page',
    data () {
      return {
      }
    }
  }
</script>


