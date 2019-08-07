<template>
  <ul class="ui-page">
    <li class="page-total">共<b>{{total}}</b>条 </li>
    <li :class="{disabled:pageIndex <= 1}" @click="prev">上页</li>
    <li :class="{active:pageIndex === 1}" @click="first">1</li>
    <li v-show="pagerStart === 2" @click="go(2)">2</li>
    <li class="page-more" v-show="pagerStart > 2" @click="go(pageIndex - pagerCount + 1)">..</li>
    <li v-for="item in pager" :class="{active:pageIndex === item}" @click="go(item)" :key="item">{{item}}</li>
    <li v-show="pagerEnd === pages -1" @click="go(pagerEnd)">{{pagerEnd}}</li>
    <li class="page-more" v-show="pagerEnd < pages -1" @click="go(pageIndex + pagerCount - 1)">..</li>
    <li v-if="pages > 1" :class="{active:pageIndex === pages}" @click="end">{{pages}}</li>
    <li :class="{disabled:pageIndex >= pages}" @click="next">下页</li>
  </ul>
</template>
<script>
export default {
  name: 'UiPage',
  data() {
    return {
      pagerStart: 1,
      pagerEnd: 1,
    }
  },
  props: {
    // 当前页
    pageIndex: {
      type: Number,
      default: 1
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 总数
    total: {
      type: Number,
      default: 0
    },
    // 中间页码数，必须为奇数
    pagerCount: {
      type: Number,
      default: 5
    }
  },
  computed: {
    // 总页数
    pages() {
      return Math.ceil(this.total / this.pageSize)
    },
    // 中间页面数组
    pager() {
      var pageArr = []
      var offset = (this.pagerCount + 1) / 2
      var start = this.pageIndex - offset
      var end = this.pageIndex + offset
      if (start < 1) {
        end = end + (1 - start)
        start = 1
      }
      if (end > this.pages) {
        start = start - (end - this.pages)
        end = this.pages
        start =  start < 1 ? 1 : start
      }
      this.pagerStart = start
      this.pagerEnd = end
      for (let i = start + 1; i < end; i++) {
        pageArr.push(i)
      }
      return pageArr
    }
  },
  methods: {
    // 转到指定页码
    go(index) {
      if(this.pageIndex === index) return
      this.$emit('update:pageIndex', index)
      this.$emit('page-change', index)
    },
    // 上一页
    prev() {
      if (this.pageIndex <= 1) return
      this.go(this.pageIndex - 1)
    },
    // 下一页
    next() {
      if (this.pageIndex >= this.pages) return
      this.go(this.pageIndex + 1)
    },
    // 首页
    first() {
      if (this.pageIndex <= 1) return
      this.go(1)
    },
    // 尾页
    end() {
      if (this.pageIndex >= this.pages) return
      this.go(this.pages)
    }
  }
}
</script>
<style lang="scss" scoped>
.ui-page {
  display: inline-block;
  user-select: none;
}
.ui-page > li,
.ui-page > li.disabled:hover{
  display: inline-block;
  height: 40px;
  border: 1px solid #ccc;
  font-size: 14px;
  line-height: 38px;
  text-align: center;
  border-radius: 3px;
  padding: 0 14px;
  cursor: pointer;
  color: #333;
  float: left;
  margin-left: 10px;
}
.ui-page > li:first {
  margin-left: 0;
}
.ui-page > li:hover {
  border-color: #0080ff;
  color: #0080ff;
}
.ui-page > li.active {
  background-color: #0080ff;
  border-color: #0080ff;
  color: #fff;
}
.ui-page > li.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.ui-page > li.disabled:hover {
  cursor: not-allowed;
}

.ui-page > .page-total,
.ui-page > .page-total:hover{
  border-color: transparent;
  color: #666;
  cursor: default;
}

.ui-page > .page-total > b {
  color: #0080ff;
  font-weight: normal;
  padding: 0 3px;
}
</style>


