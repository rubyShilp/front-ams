<template>
  <div class="equipment-main">
    <div class="left-main-center">
      <div class="left-main-from-table">
        <div class="from-right">
          <el-form :inline="true">
            <el-form-item label="学校名称">
              <!-- <el-input placeholder="请输入学校名称" size="mini"></el-input> -->
              <el-select v-model="schoolcode" size="mini">
                <el-option
                  v-for="item of schoolList"
                  :key="item.schoolcode"
                  :label="item.schoolname"
                  :value="item.schoolcode"
                >
                </el-option>
              </el-select>
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
              <el-button @click="initAcceptorQuery(0)" size="mini"
                >查询</el-button
              >
            </el-form-item>
            <el-form-item label="">
              <el-button size="mini" @click="acceptorBatchAdd()"
                >增加</el-button
              >
            </el-form-item>
            <el-form-item label="">
              <el-button size="mini" @click="acceptorBatchRemove()"
                >批量删除</el-button
              >
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
            @selection-change="selectData"
          >
            <el-table-column type="selection" width="100"> </el-table-column>
            <el-table-column label="序号" type="index" align="center">
            </el-table-column>
            <el-table-column
              prop="schoolname"
              label="学校名称"
              sortable
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column prop="rfidno" label="接收机编号" sortable>
            </el-table-column>
            <el-table-column prop="rfidlocation" label="接收机位置" sortable>
            </el-table-column>
            <el-table-column label="接收机方向" sortable>
              <template slot-scope="scope">
                <div v-if="scope.row.rfiddirect === 0">门外</div>
                <div v-else>门内</div>
              </template>
            </el-table-column>
            <el-table-column prop="rfidgroupid" label="接收机组" sortable>
            </el-table-column>
            <el-table-column prop="createtime" label="创建时间" sortable>
              <template slot-scope="scope">
                {{ scope.row.createtime | Date("yyyy-MM-dd hh:mm:ss") }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="220">
              <template class="table-operation" slot-scope="scope">
                <a href="javaScript:;" @click="acceptorDetial(scope.row, 1)"
                  ><i class="el-icon-view"></i>详情</a
                >
                <span>|</span>
                <a href="javaScript:;" @click="acceptorDetial(scope.row, 2)"
                  ><i class="el-icon-edit"></i>编辑</a
                >
                <span>|</span>
                <a href="javaScript:;" @click="acceptorRemove(scope.row)">
                  <i class="el-icon-delete"></i>
                  删除
                </a>
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
    <!--考勤设备详情和编辑-->
    <el-dialog
      :title="
        isDetail
          ? '考勤设备详情'
          : isAddOrUpdae
          ? '考勤设备新增'
          : '考勤设备编辑'
      "
      width="500px"
      :visible.sync="isEquipment"
    >
      <el-form
        ref="equipmentFrom"
        :model="equipmentInfo"
        size="mini"
        label-width="100px"
        class="equipement-from"
      >
        <el-form-item label="学校名称：">
          <span v-show="isDetail"> {{ equipmentInfo.schoolname }}</span>
          <span v-show="!isDetail">
            <el-select v-model="equipmentInfo.schoolcode">
              <el-option
                v-for="item of schoolList"
                :key="item.schoolcode"
                :label="item.schoolname"
                :value="item.schoolcode"
              >
              </el-option>
            </el-select>
          </span>
        </el-form-item>
        <el-form-item label="接收机编号：">
          <span v-show="isDetail"> {{ equipmentInfo.rfidno }}</span>
          <span v-show="!isDetail">
            <el-input v-model="equipmentInfo.rfidno"></el-input
          ></span>
        </el-form-item>
        <el-form-item label="接收机位置：">
          <span v-show="isDetail"> {{ equipmentInfo.rfidlocation }}</span>
          <span v-show="!isDetail">
            <el-input v-model="equipmentInfo.rfidlocation"></el-input
          ></span>
        </el-form-item>
        <el-form-item label="接收机方向：">
          <span v-show="isDetail"> {{ equipmentInfo.rfiddirect }}</span>
          <span v-show="!isDetail">
            <el-select v-model="equipmentInfo.rfiddirect">
              <el-option :value="0" :label="'门外'"></el-option>
              <el-option :value="1" :label="'门内'"></el-option>
            </el-select>
          </span>
        </el-form-item>
        <el-form-item label="接收机组：">
          <span v-show="isDetail"> {{ equipmentInfo.rfidgroupid }}</span>
          <span v-show="!isDetail">
            <el-input v-model="equipmentInfo.rfidgroupid"></el-input
          ></span>
        </el-form-item>
        <el-form-item label="创建时间：">
          <span v-show="isDetail">
            {{ equipmentInfo.createtime | Date("yyyy-MM-dd hh:mm:ss") }}</span
          >
          <span v-show="!isDetail">
            <el-date-picker
              v-model="equipmentInfo.createtime"
              type="date"
              placeholder="结束日期"
              size="mini"
              :editable="false"
              :clearable="false"
            >
            </el-date-picker>
          </span>
        </el-form-item>
      </el-form>
      <div style="text-align: center;" v-show="!isDetail">
        <el-button @click="isEquipment = false">取消</el-button>
        <el-button type="primary" @click="acceptorAddOrUpdate()"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script src="./equipment.js"></script>
