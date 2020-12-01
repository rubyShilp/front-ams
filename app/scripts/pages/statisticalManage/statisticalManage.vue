<template>
  <div>
    <div class="ams-menu-sub">
      <div class="sub-title">
        <a href="javaScript:;" class="hover">学院统计</a>
      </div>
    </div>
    <div class="sub-menu-center">
      <el-container class="sub-main">
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
                  <el-input placeholder="请输入学校名称" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="时间">
                  <el-date-picker
                    v-model="starttime"
                    type="date"
                    placeholder="开始日期"
                    size="mini"
                  >
                  </el-date-picker>
                  --
                  <el-date-picker
                    v-model="endtime"
                    type="date"
                    placeholder="结束日期"
                    size="mini"
                  >
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
                <el-table-column type="selection" width="100">
                </el-table-column>
                <el-table-column label="序号" type="index" align="center">
                </el-table-column>
                <el-table-column prop="school" label="学校" sortable>
                </el-table-column>
                <el-table-column prop="lateCount" label="迟到人数" sortable>
                </el-table-column>
                <el-table-column prop="earlyCount" label="早退人数" sortable>
                </el-table-column>
                <el-table-column prop="truancyCount" label="旷课人数" sortable>
                </el-table-column>
                <el-table-column prop="leaveCount" label="请假人数" sortable>
                </el-table-column>
                <el-table-column
                  prop="temperatureBody"
                  label="体温异常"
                  sortable
                >
                </el-table-column>
                <el-table-column prop="heartBody" label="心率异常" sortable>
                </el-table-column>
                <el-table-column prop="activityBody" label="活动最差" sortable>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="page"
                  :page-sizes="[100, 200, 300, 400]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalCount"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </el-container>
    </div>
  </div>
</template>
<script src="./statisticalManage.js"></script>
