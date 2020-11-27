<template>
  <div class="sub-menu-center">
    <el-container style="position: absolute; height: 100%; width: 100%">
      <el-aside class="left-batch-wrap">
        <el-tree
          :data="data"
          :props="defaultProps"
          highlight-current
          default-expand-all
          :expand-on-click-node="false"
          @node-click="selectTreeDate"
        ></el-tree>
      </el-aside>
      <div class="left-main-center">
        <div class="left-main-from-table">
          <div class="from-right">
            <el-form :inline="true">
              <el-form-item label="学校名称">
                <el-input placeholder="请输入学校名称" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="时间">
                <el-date-picker type="date" placeholder="开始日期" size="mini">
                </el-date-picker>
                --
                <el-date-picker type="date" placeholder="结束日期" size="mini">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button @click="onSubmit" size="mini">查询</el-button>
              </el-form-item>
              <el-form-item label="">
                <el-button size="mini">批量删除</el-button>
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
              <el-table-column prop="imei" label="IMEI码" sortable>
              </el-table-column>
              <el-table-column prop="stuname" label="学生姓名" sortable>
              </el-table-column>
              <el-table-column prop="sno" label="学号" sortable>
              </el-table-column>
              <el-table-column prop="gradename" label="年级名称" sortable>
              </el-table-column>
              <el-table-column prop="classname" label="班级名称" sortable>
              </el-table-column>
              <el-table-column prop="printtime" label="签到时间" sortable>
                <template slot-scope="scope">
                  {{ scope.row.printtime | Date("yyyy-MM-dd hh:mm:ss") }}
                </template>
              </el-table-column>
              <el-table-column prop="inoutstate" label="进出状态" sortable>
              </el-table-column>
              <el-table-column prop="attendstate" label="考勤状态" sortable>
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
<script src="./record.js"></script>
