<template>
  <div class="equipment-main">
    <div class="left-main-center">
      <div class="left-main-from-table">
        <div class="from-right">
          <el-form :inline="true">
            <el-form-item>
              <el-input placeholder="请输入角色名称" size="mini"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="attendRolAdd()" size="mini">新增</el-button>
            </el-form-item>
            <el-form-item label="">
              <el-button size="mini" @click="attendRoleBatchRemove()"
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
            @selection-change="seletData"
          >
            <el-table-column type="selection" width="100"> </el-table-column>
            <el-table-column label="序号" type="index" align="center">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="角色名称"
              :show-overflow-tooltip="true"
              sortable
            >
            </el-table-column>
            <el-table-column prop="morschtime" label="角色状态" sortable>
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
    <!----详情编辑---->
  </div>
</template>
<script src="./roleManage.js"></script>
