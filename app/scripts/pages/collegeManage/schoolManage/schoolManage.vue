<template>
  <div class="equipment-main">
    <div class="left-main-center">
      <div class="left-main-from-table">
        <div class="from-right">
          <el-form :inline="true">
            <el-form-item>
              <el-input
                placeholder="请输入学校名称"
                size="mini"
                v-model="initData.school"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="query(0)" size="mini">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" @click="show('add')">新增</el-button>
            </el-form-item>
            <el-form-item label="">
              <el-button size="mini" @click="show('moreDel')"
                >批量删除</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div class="table-border">
          <el-table
            height="460px"
            ref="table"
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
            <el-table-column prop="schoolname" label="学校名称" sortable>
            </el-table-column>
            <el-table-column prop="schoolattr" label="教育局" sortable>
            </el-table-column>
            <el-table-column prop="principal" label="学校负责人" sortable>
            </el-table-column>
            <el-table-column prop="telephone" label="学校电话" sortable>
            </el-table-column>
            <el-table-column label="学校类型" sortable>
              <template class="table-operation" v-slot="scope">
                {{ scope.row.schooltype | schoolFil }}
              </template>
            </el-table-column>
            <el-table-column prop="schoolstate" label="学校状态" sortable>
            </el-table-column>
            <el-table-column prop="address" label="学校地址" sortable>
            </el-table-column>
            <el-table-column prop="remark" label="备注"> </el-table-column>
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
                    :page-size="pageSize"
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
            :rules="school_rules"
            ref="handleForm"
          >
            <el-form-item
              label="学校名称"
              prop="schoolname"
              label-width="100px"
            >
              <el-input
                v-model="handleData.schoolname"
                :disabled="type === 'detail'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="学校属性"
              prop="schoolattr"
              label-width="100px"
            >
              <el-input
                v-model="handleData.schoolattr"
                :disabled="type === 'detail'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="学校负责人"
              prop="principal"
              label-width="100px"
            >
              <el-input
                v-model="handleData.principal"
                :disabled="type === 'detail'"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="telephone" label-width="100px">
              <el-input
                v-model="handleData.telephone"
                :disabled="type === 'detail'"
              ></el-input>
            </el-form-item>
            <el-form-item label="学校地址" prop="address" label-width="100px">
              <el-input
                v-model="handleData.address"
                :disabled="type === 'detail'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="学校类型"
              prop="schooltype"
              label-width="100px"
            >
              <el-select
                v-model="handleData.schooltype"
                :disabled="type === 'detail'"
              >
                <el-option
                  v-for="item in schooltypes"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属省市" prop="procity" label-width="100px">
              <el-cascader
                :disabled="type === 'detail'"
                v-model="procity"
                placeholder="试试搜索：北京"
                :options="options"
                @change="procityChange"
                clearable
                filterable
              >
              </el-cascader>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="cancel('handleForm')"
              >关闭</el-button
            >
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
  </div>
</template>
<script src="./schoolManage.js"></script>
