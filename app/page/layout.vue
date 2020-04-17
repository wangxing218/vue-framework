<template>
  <el-container class="home-container">
    <el-header class="pdt-sm color-white bgc-gray">
      <el-col :span="10">
        <h2 class="my-title"> <img src="~@image/logo.gif" alt=""> 系统名称</h2>
      </el-col>
      <el-col class="text-right" :span="14">
        <div class="icon"></div>
        <el-button class="color-white" type="text" :icon="'el-icon-service'">admin</el-button>
        <a class="mgl-bg el-icon-bell"></a>
        <router-link :to="'/login'" class="color-white mgl-bg el-icon-upload2"></router-link>
      </el-col>
    </el-header>
    <el-container>
      <el-aside :width="'250px'" style="height: 100%;">
        <el-menu @open="handleOpen" :router="true" @close="handleClose" style="height: 100%;">
          <el-menu-item index="/">
            <i class="el-icon-document"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="/customer">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>客户管理</span>
            </template>
            <el-menu-item index="/customer">
              <i class="el-icon-edit"></i>
              <span slot="title">流程审核</span>
            </el-menu-item>
            <el-menu-item index="2-3">
              <i class="el-icon-document"></i>
              <span slot="title">客户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>子代理管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-edit"></i>
              <span slot="title">流程审核</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-document"></i>
              <span slot="title">客户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>代理商工具</span>
            </template>
            <el-menu-item index="4-4">
              <i class="el-icon-edit"></i>
              <span slot="title">流程审核</span>
            </el-menu-item>
            <el-menu-item index="4-3">
              <i class="el-icon-document"></i>
              <span slot="title">客户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-phone"></i>
              <span>财务管理</span>
            </template>
            <el-menu-item index="5-4">
              <i class="el-icon-edit"></i>
              <span slot="title">流程审核</span>
            </el-menu-item>
            <el-menu-item index="5-3">
              <i class="el-icon-document"></i>
              <span slot="title">客户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-time"></i>
              <span>账户中心</span>
            </template>
            <el-menu-item index="6-4">
              <i class="el-icon-edit"></i>
              <span slot="title">流程审核</span>
            </el-menu-item>
            <el-menu-item index="6-3">
              <i class="el-icon-document"></i>
              <span slot="title">客户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-service"></i>
              <span>消息中心</span>
            </template>
            <el-menu-item index="4">
              <i class="el-icon-edit"></i>
              <span slot="title">流程审核</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">客户列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/customer' }">客户管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pdt-lg">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      user: this.$store.state.loginUser
    }
  },
  computed: {
  },
  components: {

  },
  mounted() {
    this.$store.commit('setUser',{username:'张三'})
  },
  methods: {
    handleOpen() {},
    handleClose() {},
  }
}
</script>
<style lang="scss" scoped>
$blue: #0080ff;
$width : 100px;

$sizeMap: (0,0),
  (xs,12px),
  (sm, 14px),
  (md, 14px),
  (bg, 14px),
  (lg, 14px),
  (hg, 14px);

@mixin setSize($prefix, $css){
  @each $name,$size in $sizeMap{
    .#{$prefix}-#{$name}{ #{$css}: $size}
  }
}
@include setSize('mg','margin');

.home-container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.func {
  width: $width;
  float: left;
}
.my-title{
  display: flex;
}
.icon{
  background: url("~@image/icon.png") no-repeat;
  width: 35px;
  height: 35px;
  display: inline-block;
  vertical-align: middle;
}
</style>