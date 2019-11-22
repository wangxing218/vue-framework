<template>
  <div class="dialog" v-show="showBox">
    <transition name="fade">
      <div class="mask" v-show="show" @click="modalClicked"></div>
    </transition>
    <transition name="slide" @afterLeave="afterLeave">
      <div class="wrap" v-show="show">
        <div class="header">
          <slot name="header"></slot>  
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="bottom">
          <slot name="footer"></slot>  
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import '~@asset/css/_var';
.dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
}
.mask {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.wrap {
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  width: 250px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow:0px 6px 12px 0px rgba(0,0,0,0.4);
}
.content {
  @include clearfix();
  padding: 20px 30px;
  word-break: break-all;
  line-height: 1.6;
  font-size: 14px;
  text-align: center;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.2s;
}
.fade-leave-active {
  transition: opacity 0.2s 0.2s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -70vh);
}
.slide-enter-active {
  transition: transform 0.2s 0.2s, opacity 0.2s 0.2s;
}
.slide-leave-active {
  transition: transform 0.2s, opacity 0.2s;
}
</style>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    modalClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showBox: false
    }
  },
  watch: {
    show(val) {
      if (val === true) this.showBox = true
    }
  },
  methods: {
    close() {
      this.$emit('close')
      this.$emit('update:show', false)
    },
    afterLeave(el, done) {
      this.$emit('closed')
      this.showBox = false
    },
    modalClicked(){
      if(!this.modalClose) return
      this.close()
    }
  }
}
</script>

