<template>
<el-row>
  <el-col :span="24">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-bottom: 15px">
        <el-col :span="6">
          <el-input placeholder="请输入用户名" v-model="query.name" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="list" border stripe ref="userTable" style="width: 100%">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="name" label="用户名" align="center"/>
        <el-table-column prop="nickName" label="昵称" align="center"/>
        <el-table-column prop="email" label="邮箱" align="center"/>
        <el-table-column prop="mobile" label="手机号" align="center"/>
        <el-table-column prop="createTime" label="创建时间" align="center"/>
      </el-table>
    </el-card>
  </el-col>
</el-row>
</template>

<script>
import base from "../api/base";

export default {
  name: "contact",
  data() {
    return {
      query: {
        current: 1,
        size: 10,
        name: ''
      },
      list: []
    }
  },
  created() {
    this.page()
  },
  methods: {
    async page() {
      this.$request.get(base.baseUrl + '/contact/', {
        params: this.query
      }).then(res => {
        if (res.data.data.records.length > 0) {
          this.list = res.data.data.records;
        }
      }).catch(err => {
        console.log(err);
      })
    },
  },
}
</script>
<style scoped>
</style>