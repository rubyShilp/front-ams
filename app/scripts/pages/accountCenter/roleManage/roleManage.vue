<template>
  <div class="equipment-main">
    <div class="left-main-center">
      <div class="left-main-from-table">
        <div class="from-right">
          <el-form :inline="true">
            <el-form-item>
              <el-input
                placeholder="请输入角色名称"
                size="mini"
                v-model="rolename"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" @click="query">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="show('add')" size="mini">新增</el-button>
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
            :data="dataList"
            ref="table"
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
            <el-table-column
              prop="rolename"
              label="角色名称"
              :show-overflow-tooltip="true"
              sortable
            >
            </el-table-column>
            <el-table-column label="角色状态" sortable>
              <template class="table-operation" v-slot="scope">
                {{ scope.row.rolestatus | resourceStatu }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="250">
              <template class="table-operation" v-slot="scope">
                <a href="javaScript:;" @click="show('roleEdit', scope.row)"
                  ><i class="el-icon-view"></i>分配资源</a
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
            <pagination
              :total="total"
              :page.sync="currentPage"
              :limit.sync="pagesize"
              @pagination="query"
            ></pagination>
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
            :rules="role_rules"
            ref="handleForm"
            v-if="type !== 'roleEdit'"
          >
            <el-form-item label="角色名称" prop="rolename" label-width="120px">
              <el-input v-model="handleData.rolename"></el-input>
            </el-form-item>
            <el-form-item
              label="角色状态"
              prop="rolestatus"
              label-width="120px"
            >
              <el-select v-model="handleData.rolestatus">
                <el-option
                  v-for="item in roles"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色级别" prop="level" label-width="120px">
              <el-select v-model="handleData.level">
                <el-option
                  v-for="item in levels"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!--权限分配-->
          <div style="height: 60vh;overflow: auto;" v-if="type === 'roleEdit'">
            <el-table
              ref="roleTable"
              :data="resourceData"
              tooltip-effect="dark"
              style="width: 100%"
              size="mini"
              @selection-change="roletableSelect"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <!-- <el-table-column
              label="ID"
              prop="resourcecode">
            </el-table-column> -->
              <el-table-column prop="resourcename" label="资源名称">
              </el-table-column>
            </el-table>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button
              size="small"
              v-if="type !== 'roleEdit'"
              @click="cancel('handleForm')"
              >关闭</el-button
            >
            <el-button size="small" v-if="type === 'roleEdit'" @click="close"
              >关闭</el-button
            >
            <el-button
              v-if="type === 'roleEdit'"
              size="small"
              @click="handle('roleEdit')"
              >保存</el-button
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
    <!----详情编辑---->
  </div>
</template>
<script src="./roleManage.js"></script>
