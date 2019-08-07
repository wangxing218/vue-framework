<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="文本框">
        <el-input v-model="search.user" placeholder="文本框"></el-input>
      </el-form-item>
      <el-form-item label="下拉框">
        <el-select v-model="search.region" placeholder="下拉框">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="date1" label="时间">
        <el-date-picker type="date" placeholder="选择日期" v-model="search.date"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList(true)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="listData" tooltip-effect="dark" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="电影名称" width="120">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column prop="year" label="年份" width="120">
      </el-table-column>
      <el-table-column prop="rating.average" label="评分"></el-table-column>
    </el-table>
    <div class="block pdt-bg">
      <app-page @page-change="pageChange" :page-index.sync="pageIndex" :total="total"></app-page>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: {},
      listData: [],
      multipleSelection: [],
      total: 0,
      pageSize: 10,
      pageIndex: 1
    }
  },
  computed: {
    start() {
      return (this.pageSize - 1) * 10
    }
  },
  components: {},
  mounted() {
    this.getList(true)
  },
  methods: {
    // 获取列表
    async getList(reload = false) {
      if(reload === true) this.pageIndex = 1
      const data = await this.$ajax.get('/movies', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      this.listData = data.subjects
      this.total = data.total
    },
    pageChange(page) {
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style>
</style>