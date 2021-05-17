<template>
  <transition name="mea-fade">
    <div class="mea-toast" v-show="show" :style="style">
      <div class="mea-toast-message">
        {{content}}
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      content: '',
      duration: 2000,
      style: {}
    }
  }
}
</script>
<style lang="scss" scoped>
.mea-toast {
  position: fixed;
  z-index: 9999;
  line-height: .34rem;
  left: 50%;
  transform: translate(-50%, 0);
  top: 100px;
}

.mea-toast-message {
  font-size: .28rem;
  padding: .24rem .32rem;
  text-align: center;
  color: #fff;
  border-radius: .12rem;
  background: #323232;
  opacity: .9;
}

.mea-fade-enter,
.mea-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -120px);
}

.mea-fade-enter-active,
.mea-fade-leave-active {
  transition: transform .25s , opacity .25s;
}
</style>