<template>
  <div>
    <div class="home-login">
      <el-form ref="form">
        <el-form-item>
          <h2 class="text-center">欢迎登录</h2>
        </el-form-item>
        <el-form-item>
          <el-input v-model="username" placeholder="账号" :prefix-icon="'el-icon-message'"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" type="password" placeholder="密码" :prefix-icon="'el-icon-tickets'"></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="14">
            <el-input v-model="vcode" type="tel" placeholder="验证码" :prefix-icon="'el-icon-edit'"></el-input>
          </el-col>
          <el-col :span="1"><br></el-col>
          <el-col :span="9">
            <img class="block" :src="imgCode" @click="changeCode">
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button class="block" type="primary" @click="doSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      username: '',
      password: '',
      vcode: '',
      random: 0
    }
  },
  computed: {
    ...mapState({
      user: state => state.loginUser.username
    }),
    imgCode() {
      return process.env.BASE_URL + '/vcode?' + this.random
    }
  },
  components: {},
  mounted() {
    console.log(this.user)
  },
  methods: {
    changeCode() {
      this.random = Math.random()
      import(/* webpackChunkName: "cache" */ '@util/cache').then(cache=>{
        console.log(cache)
      })
    },
    doSubmit() {
      this.$router.push('/')
    }
  }
}
</script>
<style>
.home-login {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
}
</style>