<template>
  <div class="left-main-center">
    <div class="left-main-from-table">
      <div class="from-right">
        <el-form :inline="true">
          <el-form-item>
            <el-input
              placeholder="请输入班级名称"
              size="mini"
              v-model="initData.classname"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="query" size="mini">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="show('add')" size="mini">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="show('moreDel')">批量删除</el-button>
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
          ref="table"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: 0 + 'px', 'text-align': 'center' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="100"> </el-table-column>
          <el-table-column label="序号" type="index" align="center">
          </el-table-column>
          <el-table-column prop="classname" label="班级名称" sortable>
          </el-table-column>
          <el-table-column prop="teachername" label="班主任姓名" sortable>
          </el-table-column>
          <el-table-column prop="schoolname" label="学校名称" sortable>
          </el-table-column>
          <el-table-column prop="gradename" label="年级名称" sortable>
          </el-table-column>
          <el-table-column prop="remark" label="备注"> </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template class="table-operation" v-slot="scope">
              <a href="javaScript:;" @click="show('detail', scope.row)"
                ><i class="el-icon-view"></i>详情</a
              >
              <span>|</span>
              <a href="javaScript:;" @click="show('edit', scope.row)"
                ><i class="el-icon-edit"></i>编辑</a
              >
              <span>|</span>
              <a href="javaScript:;" @click="show('del', scope.row)"
                ><i class="el-icon-delete"></i>删除</a
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
      <!-- 操作模态框 -->
      <el-dialog
        :title="title"
        width="28%"
        top="5vh"
        :close-on-click-modal="false"
        :visible.sync="handle_dialog"
        :show-close="false"
        class="school_dialog"
      >
        <el-form
          class="form"
          :model="handleData"
          :rules="class_rules"
          ref="handleForm"
        >
          <el-form-item label="学校ID" label-width="100px">
            <el-input v-model="ids.schoolcode" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="年级ID" label-width="100px">
            <el-input v-model="ids.gradeId" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="班级名称" prop="classname" label-width="100px">
            <el-input
              v-model="handleData.classname"
              :disabled="type === 'detail'"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="班主任姓名"
            prop="teachername"
            label-width="100px"
          >
            <el-input
              v-model="handleData.teachername"
              :disabled="type === 'detail'"
            ></el-input>
          </el-form-item>
          <el-form-item label="班级备注" prop="remark" label-width="100px">
            <el-input
              v-model="handleData.remark"
              :disabled="type === 'detail'"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="cancel('handleForm')">关闭</el-button>
          <el-button
            v-if="type === 'add'"
            size="small"
            @click="handle('add', 'handleForm')"
            >新增</el-button
          >
          <el-button
            v-if="type === 'edit'"
            size="small"
            @click="handle('edit', 'handleForm')"
            >修改</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script src="./classManage.js"></script>
