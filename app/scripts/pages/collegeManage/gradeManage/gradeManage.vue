<template>
  <div class="equipment-main">
    <div class="left-main-center">
      <div class="left-main-from-table">
        <div class="from-right">
          <el-form :inline="true">
            <el-form-item>
              <el-input placeholder="请输入学校名称" size="mini"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="onSubmit" size="mini">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="add" size="mini">新增</el-button>
            </el-form-item>
            <el-form-item label="">
              <el-button  size="mini">批量删除</el-button>
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
             @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="100"> </el-table-column>
            <el-table-column label="序号" type="index" align="center">
            </el-table-column>
            <el-table-column prop="gradename" label="年级名称" sortable>
            </el-table-column>
            <el-table-column prop="schoolname" label="学校名称" sortable>
            </el-table-column>
            <el-table-column prop="reMark" label="备注" sortable>
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
           <pagination
            v-show="total>0"
            :total="total"
            :page.sync="currentPage"
            :limit.sync="pageSize"
            @pagination="query"
          ></pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script src='./gradeManage.js'></script>