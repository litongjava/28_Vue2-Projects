<template>
<div>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <el-row :gutter="20" style="margin-bottom: 15px">
          <el-col :span="6">
            <el-input v-model="query.name" clearable placeholder="请输入用户名">
              <el-button slot="append" icon="el-icon-search" @click="serach"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-button type="primary" icon="el-icon-plus" @click="addDialogVisible=true">新增</el-button>
        <el-button type="warning" icon="el-icon-edit" @click="updateBtn">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteBatch">删除</el-button>
        <el-table ref="userTable" :data="list" border stripe style="width: 100%">
          <el-table-column type="selection" width="55"/>
          <el-table-column align="center" label="用户名" prop="name"/>
          <el-table-column align="center" label="昵称" prop="nickName"/>
          <el-table-column align="center" label="邮箱" prop="email"/>
          <el-table-column align="center" label="手机号" prop="mobile"/>
          <el-table-column align="center" label="创建时间" prop="createTime"/>
        </el-table>
        <el-pagination
          :current-page="query.current"
          :page-size="query.size"
          :page-sizes="[10, 20, 30, 40, 50]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </el-card>
    </el-col>
  </el-row>
  <!--新增弹窗-->
  <el-dialog
    :visible.sync="addDialogVisible"
    center
    title="新增"
    width="30%"
  >
    <el-form ref="addRuleForm" :model="addDataForm" :rules="addRules" label-width="90px">
      <el-form-item label="用户名">
        <el-input v-model="addDataForm.name" prop="name"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="addDataForm.nickName" prop="nickName"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="addDataForm.mobile" prop="mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="addDataForm.email" prop="email"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="insertSubmit">确 定</el-button>
    </span>
  </el-dialog>
  <!--修改弹窗-->
  <el-dialog
    center
    title="修改"
    :visible.sync="updateDialogVisible"
    width="30%"
  >
    <el-form :model="updateDataForm" ref="updateRuleForm" :rules="addRules" label-width="90px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="updateDataForm.name"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="updateDataForm.nickName"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="updateDataForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="updateDataForm.email"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="updateDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="insertSubmit">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import base from "../api/base";

export default {
  name: "contact",
  data() {
    // 手机校验
    let validatorPhone = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    };
    let validatorEmail = function (rule, value, callback) {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (value === '') {
        callback(new Error('邮箱不能为空'))
      } else if (!mailReg.test(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    };
    return {
      query: {
        current: 1,
        size: 10,
        name: ''
      },
      list: [],
      total: 0,
      addDialogVisible: false,
      addDataForm: {
        name: '',
        nickName: '',
        email: '',
        mobile: ''
      },
      updateDialogVisible: false,
      updateDataForm: {
        name: '',
        nickName: '',
        email: '',
        mobile: '',
        id: ''
      },
      addRules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
        ],
        nickName: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {validator: validatorPhone, trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: validatorEmail, trigger: 'blur'}
        ]
      }
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
          this.total = res.data.data.total;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    serach() {
      // 再次调用加载列表数据方法
      this.page();
    },
    //当前每页数量改变事件
    handleSizeChange(newSize) {
      this.query.size = newSize;
      this.page();
    },
    // 当前页数改变事件
    handleCurrentChange(current) {
      this.query.current = current;
      this.page();
    },
    // 新增提交
    insertSubmit() {
      // 判断是否通过校验
      this.$refs['addRuleForm'].validate((valid) => {
        if (valid) {
          debugger;
          const headers = {"content-type": "application/json;charset=UTF-8"};
          this.$request.post(base.baseUrl + '/contact/create', JSON.stringify(this.addDataForm), {headers: headers}).then(res => {
            if (res.data.code == 0 || res.data.data == true) {
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
              this.addDialogVisible = false;
              this.page();
            } else {
              this.$message({
                type: 'error',
                message: '保存失败!'
              });
            }
          }).catch(err => {
            console.log(err);
          })
        } else {
          return false;
        }
      });
    },
    // 修改
    updateBtn() {
      // 判断是否勾选了 ，无勾选不予弹窗，并给予提示
      // userTable 为table 的ref
      const _selectData = this.$refs.userTable.selection;
      if (_selectData.length === 0) {
        this.$message({
          message: '请选择一行数据',
          type: 'warning'
        });
        return false;
      } else if (_selectData.length > 1) {
        this.$message({
          message: '只能选中一行数据哦',
          type: 'warning'
        });
        return false;
      }
      // 显示弹窗
      this.updateDialogVisible = true;
      // 将选中的数据进行赋值
      this.updateDataForm = _selectData[0];
    },
    deleteBatch() {
      const ids = [];
      const _selectData = this.$refs.userTable.selection;
      if (_selectData.length === 0) {
        this.$message({
          message: '请至少选择一行数据',
          type: 'warning'
        });
        return false;
      }
      for (const i in _selectData) {
        ids.push(_selectData[i].id)
      }
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const headers = {"content-type": "application/json;charset=UTF-8"};
        this.$request.post(base.baseUrl+'/contact/delete/', JSON.stringify(ids),{headers:headers}).then(res => {
          if (res.data.code == 0 || res.data.data == true) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.addDialogVisible = false;
            this.getUserList();
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        return false;
      });
    }
  },
}
</script>
<style scoped>
</style>