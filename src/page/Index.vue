<template>
  <div class="height-full flex-column align-stretch">
    <div class="pd-md flex justify-around bg-light">
      <router-link to="/">首页</router-link>
      <router-link to="/login">登录</router-link>
    </div>
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
export default {
  data() {
    return {
      name: '这个来了就是的'
    }
  },
  components: {},
  computed: {},
  mounted() {
    this.dataList;
  },
  methods: {}
}
</script>