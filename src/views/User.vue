<template>
  <div class="user">
    <el-dialog title="提示" :before-close="handleClose" :visible.sync="dialogVisible" width="50%">
      <!-- 用户的表单区域 -->
      <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <div class="block">
            <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-DD">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="user-header">
      <el-button @click="handleAdd" type="primary"> +新增 </el-button>
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入姓名" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-main" style="height: 500px">
      <el-table stripe :data="tableData" size="mini" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sexLabel" label="性别">
          <template slot-scope="scope">
            <span>
              {{ scope.row.sex == 1 ? "男" : "女" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span>
              <el-button @click="handleEdit(scope.row)" size="mini">编辑</el-button>
              <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="Count" @current-change="pageChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
//删除用户永远删不完，更换页数后再进行姓名搜索无数据，姓名搜索有时会出现不相关的数据
import { addUser, getUser, editUser, delUser } from "@/api";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      Type: 0, //区分点击的是新增还是编辑，0代表新增，1代表编辑
      Count: 0, //数据总条数
      pageData: {
        page: 1,
        limit: 10,
      }, //整理获取列表数据时传递的参数（当前页码和每一页数据条数）
      userForm: {
        name: "",
      },
    };
  },
  methods: {
    //获取列表数据
    getList() {
      getUser({ ...this.userForm, ...this.pageData }).then(({ data }) => {
        this.Count = data.count || 0;
        this.tableData = data.list;
      });
    },
    //提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.Type === 0) {
            addUser(this.form).then(() => {
              //重新获取列表数据
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              //重新获取列表数据
              this.getList();
            });
          }
          this.handleClose();
        }
      });
    },
    //取消提交
    cancel() {
      this.handleClose();
    },
    //关闭弹窗的回调
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    //点击新增按钮的回调
    handleAdd() {
      this.dialogVisible = true;
      this.Type = 0;
    },
    // 编辑操作的回调
    handleEdit(row) {
      this.dialogVisible = true;
      this.Type = 1;
      this.form = row;
    },
    //删除操作的回调
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //重新获取列表数据
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //页数改变的回调
    pageChange(val) {
      this.pageData.page = val;
      this.getList();
    },
    //查询
    onSubmit() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less">
.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-main {
  position: relative;

  .pager {
    position: absolute;
    bottom: -10px;
    right: 20px;
  }
}
</style>
