<template>
  <div class="equipment-main">
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
              <el-button @click="initAttendRoleQuery(0)" size="mini"
                >查询</el-button
              >
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
            <el-table-column
              prop="schoolname"
              label="学校名称"
              :show-overflow-tooltip="true"
              sortable
            >
            </el-table-column>
            <el-table-column prop="morschtime" label="上午上学时间" sortable>
            </el-table-column>
            <el-table-column prop="morhometime" label="上午放学时间" sortable>
            </el-table-column>
            <el-table-column prop="minschtime" label="下午上学时间" sortable>
            </el-table-column>
            <el-table-column prop="minhometime" label="下午放学时间" sortable>
            </el-table-column>
            <el-table-column prop="nightschtime" label="晚上上学时间" sortable>
            </el-table-column>
            <el-table-column prop="nighthometime" label="晚上放学时间" sortable>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template class="table-operation" slot-scope="scope">
                <a href="javaScript:;" @click="attendRoleDetail(scope.row, 1)"
                  ><i class="el-icon-view"></i>详情</a
                >
                <span>|</span>
                <a href="javaScript:;" @click="attendRoleDetail(scope.row, 2)"
                  ><i class="el-icon-edit"></i>编辑</a
                >
                <span>|</span>
                <a href="javaScript:;" @click="attendRoleRemove(scope.row)"
                  ><i class="el-icon-delete"></i>删除</a
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!----详情编辑---->
    <el-dialog
      :title="isDetail ? '考勤规则详情' : '考勤规则编辑'"
      width="500px"
      :visible.sync="isRule"
    >
      <el-form
        ref="ruleFrom"
        :model="ruleInfo"
        size="mini"
        label-width="130px"
        class="equipement-from"
      >
        <el-form-item label="学校名称：">
          <span v-show="isDetail"> {{ ruleInfo.schoolname }}</span>
          <span v-show="!isDetail">
            <el-input v-model="ruleInfo.schoolname"></el-input
          ></span>
        </el-form-item>
        <el-form-item label="上午上学时间：">
          <span v-show="isDetail"> {{ ruleInfo.morschtime }}</span>
          <span v-show="!isDetail">
            <el-time-select
              v-model="ruleInfo.morschtime"
              size="mini"
              :editable="false"
              :clearable="false"
            >
            </el-time-select>
          </span>
        </el-form-item>
        <el-form-item label="上午放学时间：">
          <span v-show="isDetail"> {{ ruleInfo.morhometime }}</span>
          <span v-show="!isDetail">
            <el-time-select
              v-model="ruleInfo.morhometime"
              size="mini"
              :editable="false"
              :clearable="false"
            >
            </el-time-select>
          </span>
        </el-form-item>
        <el-form-item label="下午上学时间：">
          <span v-show="isDetail"> {{ ruleInfo.minschtime }}</span>
          <span v-show="!isDetail">
            <el-time-select
              v-model="ruleInfo.minschtime"
              size="mini"
              :editable="false"
              :clearable="false"
            >
            </el-time-select>
          </span>
        </el-form-item>
        <el-form-item label="下午放学时间：">
          <span v-show="isDetail"> {{ ruleInfo.minhometime }}</span>
          <span v-show="!isDetail">
            <el-time-select
              v-model="ruleInfo.minhometime"
              size="mini"
              :editable="false"
              :clearable="false"
            >
            </el-time-select>
          </span>
        </el-form-item>
        <el-form-item label="晚上上学时间：">
          <span v-show="isDetail"> {{ ruleInfo.nightschtime }}</span>
          <span v-show="!isDetail">
            <el-time-select
              v-model="ruleInfo.nightschtime"
              size="mini"
              :editable="false"
              :clearable="false"
            >
            </el-time-select>
          </span>
        </el-form-item>
        <el-form-item label="晚上放学时间：">
          <span v-show="isDetail"> {{ ruleInfo.nighthometime }}</span>
          <span v-show="!isDetail">
            <el-time-select
              v-model="ruleInfo.nighthometime"
              size="mini"
              :editable="false"
              :clearable="false"
            >
            </el-time-select>
          </span>
        </el-form-item>
      </el-form>
      <div style="text-align: center;" v-show="!isDetail">
        <el-button @click="isRule = false">取消</el-button>
        <el-button type="primary" @click="attendRoleUpdate()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./rule.js"></script>
<style>
.el-input__inner {
  width: 230px;
}
</style>
