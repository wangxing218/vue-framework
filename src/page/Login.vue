<template>
  <div class="flex-column height-full">
    <div class="pdb-bg">{{ name }}</div>
    <van-button type="primary" @click="name = 'Clicked'">Login</van-button>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
  name: 'Login',
  data() {
    return {
      name: 'Login',
    }
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {},
}
</script>