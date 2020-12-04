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
            highlight-current
            :default-expand-all="false"
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
                <el-table-column
                  prop="basename"
                  :label="
                    scoolType == 1
                      ? '学校名称'
                      : scoolType == 2
                      ? '年級名称'
                      : '班級名称'
                  "
                  :show-overflow-tooltip="true"
                  sortable
                  width="110"
                >
                </el-table-column>
                <el-table-column
                  prop="sumbelatecount"
                  label="迟到人数"
                  sortable
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="sumleaveearlycount"
                  label="早退人数"
                  sortable
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="sumleavecount"
                  label="旷课人数"
                  width="100"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="sumleavecount"
                  label="请假人数"
                  width="100"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="sumtruantcount"
                  label="旷课人數"
                  sortable
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="sumtempecount"
                  label="体温异常"
                  width="100"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="sumheartratecount"
                  label="心率异常"
                  sortable
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="sumlessactivitycount"
                  label="活动最差"
                  sortable
                  width="100"
                >
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template class="table-operation" slot-scope="scope">
                    <a href="javaScript:;"><i class="el-icon-view"></i>详情</a>
                    <span>|</span>
                    <a href="javaScript:;"><i class="el-icon-edit"></i>编辑</a>
                    <span>|</span>
                    <a
                      href="javaScript:;"
                      @click="statisticalRemove(scope.row)"
                    >
                      <i class="el-icon-delete"></i>删除</a
                    >
                  </template>
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
