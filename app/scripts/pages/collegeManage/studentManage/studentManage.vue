<template>
  <div class="sub-menu-center">
    <el-container style="position: absolute; height: 100%; width: 100%">
      <el-aside class="left-batch-wrap">
        <el-tree
          :data="data"
          :props="defaultProps"
          highlight-current
          default-expand-all
        ></el-tree>
      </el-aside>
      <div class="left-main-center">
        <div class="left-main-from-table">
          <div class="from-right">
            <el-form :inline="true">
              <el-form-item label="学校名称">
                <el-input placeholder="请输入学校名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">新增</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="ImportStudent">导入学生</el-button>
              </el-form-item>
              <el-form-item label="">
                <el-button type="primary">批量删除</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="table-border">
            <el-table
              height="460px"
              :data="dataList"
              style="width: 100%"
              :header-cell-style="{
                'text-align': 'center',
                'font-size': '14px',
              }"
              :row-style="{ height: '40px' }"
              :cell-style="{ padding: 0 + 'px', 'text-align': 'center' }"
            >
              <el-table-column type="selection" width="100"> </el-table-column>
              <el-table-column label="序号" type="index" align="center">
              </el-table-column>
              <el-table-column prop="number" label="学生编号" sortable>
              </el-table-column>
              <el-table-column prop="imei" label="IMEI码" sortable>
              </el-table-column>
              <el-table-column prop="name" label="姓名" sortable>
              </el-table-column>
              <el-table-column prop="age" label="年龄" sortable>
              </el-table-column>
              <el-table-column prop="gender" label="性别" sortable>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template class="table-operation">
                  <a href="javaScript:;"><i class="el-icon-view"></i>详情</a>
                  <span>|</span>
                  <a href="javaScript:;"><i class="el-icon-edit"></i>编辑</a>
                  <span>|</span>
                  <a href="javaScript:;"><i class="el-icon-delete"></i>删除</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>
<script src='./studentManage.js'></script>