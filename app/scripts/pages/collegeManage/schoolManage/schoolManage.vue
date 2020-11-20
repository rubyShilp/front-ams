<template>
  <div class="equipment-main">
    <div class="left-main-center">
      <div class="left-main-from-table">
        <div class="from-right">
          <el-form :inline="true">
            <el-form-item label="学校名称">
              <el-input placeholder="请输入学校名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="add">新增</el-button>
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
            <el-table-column prop="school" label="学校名称" sortable>
            </el-table-column>
            <el-table-column prop="educationBureau" label="教育局" sortable>
            </el-table-column>
            <el-table-column prop="officials" label="学校负责人" sortable>
            </el-table-column>
            <el-table-column prop="phone" label="学校电话" sortable>
            </el-table-column>
            <el-table-column prop="type" label="学校类型" sortable>
            </el-table-column>
            <el-table-column prop="statu" label="学校状态" sortable>
            </el-table-column>
            <el-table-column prop="address" label="学校地址" sortable>
            </el-table-column>
            <el-table-column prop="reMark" label="备注">
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
  </div>
</template>
<script src='./schoolManage.js'></script>