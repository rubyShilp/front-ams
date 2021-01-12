<template>
  <div class="sub-menu-center">
    <el-container style="position: absolute; height: 100%; width: 100%">
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
              <el-form-item label="学生姓名">
                <el-input
                  placeholder="学生姓名"
                  size="mini"
                  v-model="studentname"
                ></el-input>
              </el-form-item>
              <el-form-item label="时间">
                <el-date-picker
                  v-model="starttime"
                  type="date"
                  placeholder="开始日期"
                  size="mini"
                  :editable="false"
                  :clearable="false"
                >
                </el-date-picker>
                --
                <el-date-picker
                  v-model="endtime"
                  type="date"
                  placeholder="结束日期"
                  size="mini"
                  :editable="false"
                  :clearable="false"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button @click="initAttendTop(0)" size="mini">
                  查询
                </el-button>
              </el-form-item>
              <!-- <el-form-item label="">
                <el-button size="mini">批量删除</el-button>
              </el-form-item> -->
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
              <!-- <el-table-column type="selection" width="100"> </el-table-column> -->
              <el-table-column label="序号" type="index" align="center">
              </el-table-column>
              <el-table-column
                prop="imei"
                label="IMEI码"
                :show-overflow-tooltip="true"
                sortable
              >
              </el-table-column>
              <el-table-column prop="stuname" label="学生姓名" sortable>
              </el-table-column>
              <el-table-column prop="sno" label="学号" sortable>
              </el-table-column>
              <el-table-column prop="gradename" label="年级名称" sortable>
              </el-table-column>
              <el-table-column prop="classname" label="班级名称" sortable>
              </el-table-column>
              <el-table-column
                prop="printtime"
                label="签到时间"
                width="150"
                sortable
              >
                <template slot-scope="scope">
                  {{ scope.row.printtime | Date("yyyy-MM-dd hh:mm:ss") }}
                </template>
              </el-table-column>
              <el-table-column label="进出状态" sortable>
                <template slot-scope="scope">
                  <span
                    :style="{
                      color: scope.row.inoutstate == 1 ? '#000' : 'red',
                    }"
                  >
                    {{ scope.row.inoutstate | recordStatus }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column label="考勤状态" sortable>
                <template slot-scope="scope">
                  <span :style="{ color: colors[scope.row.attendstate] }">{{
                    scope.row.attendstate | attendstate
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template class="table-operation" slot-scope="scope">
                  <a href="javaScript:;" @click="detailRecord(scope.row)"
                    ><i class="el-icon-view"></i>详情</a
                  >
                  <span>|</span>
                  <a href="javaScript:;" @click="updateRecord(scope.row)"
                    ><i class="el-icon-edit"></i>修正</a
                  >
                  <!-- <span>|</span>
                  <a href="javaScript:;"><i class="el-icon-delete"></i>删除</a> -->
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20, 50, 100]"
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
    <el-dialog
      title="考勤记录详情"
      width="500px"
      :visible.sync="isRecordDetail"
    >
      <el-form
        ref="equipmentFrom"
        :model="recordDetail"
        size="mini"
        label-width="100px"
        class="equipement-from"
      >
        <el-form-item label="IMEI码：">
          {{ recordDetail.imei }}
        </el-form-item>
        <el-form-item label="学生姓名：">
          {{ recordDetail.stuname }}
        </el-form-item>
        <el-form-item label="学号：">
          {{ recordDetail.sno }}
        </el-form-item>
        <el-form-item label="年级名称：">
          {{ recordDetail.gradename }}
        </el-form-item>
        <el-form-item label="班级名称：">
          {{ recordDetail.classname }}
        </el-form-item>
        <el-form-item label="签到时间：">
          {{ recordDetail.printtime | Date("yyyy-MM-dd hh:mm:ss") }}
        </el-form-item>
        <el-form-item label="进出状态：">
          {{ recordDetail.inoutstate | recordStatus }}
        </el-form-item>
        <el-form-item label="考勤状态：">
          {{ recordDetail.attendstate | recordStatus }}
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script src="./record.js"></script>
