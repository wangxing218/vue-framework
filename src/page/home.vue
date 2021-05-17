<template>
  <div class="flex-column">
    <div class="title">{{name}}</div>
    <img src="@/image/logo.gif" alt="">
  </div>
</template>

<style lang="scss" scoped>
.title{
  color: $color-blue;
  display: flex;
  font-size: 12px;
  height: 35px;
  background: url('~@/image/icon.png') no-repeat;
}
</style>

<script>
function api(){
  const arr = [1,2,3]
  return new Promise(resolve=>{
    setTimeout(()=>{
      if(arr.includes(3)){
        resolve('ok')
      }
    }, 1000)
  })
}

export default {
  data() {
    return {
      name: '这个录'
    }
  },
  components: {},
  computed: {},
  async mounted() {
    const data = await api()
    this.name = data
  },
  methods: {}
}
</script>