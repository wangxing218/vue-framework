<template>
  <pub-dialog :show.sync="show" @close="close">
    <div class="dg-con" v-html="content"></div>
    <div class="dg-bottom" slot="footer">
      <div class="dg-btn" @click="cancel" v-if="cancelText">{{cancelText}}</div>
      <div class="dg-btn sure" @click="sure">{{sureText}}</div>
    </div>
  </pub-dialog>
</template>

<script>
import PubDialog from './dialog.vue'
export default {
  props:{
    content:'',
    sureText:'确定',
    cancelText:'取消'
  },
  data() {
    return {
      show: false,
    }
  },
  mounted() {},
  methods: {
    cancel() {
      this.show = false
      this.$emit('cancel')
    },
    sure() {
      this.show = false
      this.$emit('sure')
    },
    close() {
      this.show = false
      this.$emit('close')
    }
  },
  components: { PubDialog }
}
</script>

<style lang="scss" scoped>
.dg-bottom{
  padding: 10px 10px 20px;
  display: flex;
  justify-content: space-between;
}
.dg-btn{
  flex: 1;
  height: 40px;
  line-height: 38px;
  border:1px solid rgba(45,45,49, .2);
  border-radius:4px;
  text-align: center;
  font-size: 14px;
  margin: 0 10px;
  &.sure{
    color:$color-red;
    border-color: $color-red;
  }
}
.dg-con{
  @include clearfix();
  padding-top: 10px;
}
</style>