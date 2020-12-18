<template>
  <div class="equipment-main">
    <div class="left-main-center">
      <div class="left-main-from-table">
        <div class="from-right">
          <el-form :inline="true">
            <el-form-item>
              <el-input placeholder="请输入资源名称" size="mini" v-model="resourcename"></el-input>
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
              prop="resourcename"
              label="资源名称"
              :show-overflow-tooltip="true"
              sortable
            >
            </el-table-column>
            <el-table-column prop="resourceparentid" label="父节点ID" sortable>
            </el-table-column>
            <el-table-column prop="resourceurl" label="资源路径" sortable>
            </el-table-column>
            <el-table-column  label="资源状态" sortable>
              <template v-slot="props">
                 {{props.row.resourcestatus | resourceStatu}}
               </template>
            </el-table-column>
            <el-table-column  label="资源类型" sortable>
               <template v-slot="props">
                 {{props.row.resourceType | resourceType}}
               </template>
            </el-table-column>
            <el-table-column prop="resourceicon" label="资源图标" sortable>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template class="table-operation" v-slot="scope">
                <a href="javaScript:;" @click="show('detail',scope.row)"
                  ><i class="el-icon-view"></i>详情</a
                >
                <span>|</span>
                <a href="javaScript:;" @click="show('edit',scope.row)"
                  ><i class="el-icon-edit"></i>编辑</a
                >
                <span>|</span>
                <a href="javaScript:;" @click="show('del',scope.row)"
                  ><i class="el-icon-delete"></i>删除</a
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
             <pagination
            v-show="total>0"
            :total="total"
            :page.sync="currentPage"
            :limit.sync="pageSize"
            @pagination="query"
          ></pagination>
          </div>
        </div>
          <!-- 操作模态框 -->
      <el-dialog :title="title"
       width="28%"
       top="5vh"
       :close-on-click-modal="false"
       :visible.sync="handle_dialog"
       :show-close='false'
       class="school_dialog"
       >
       <el-form class="form" :model="handleData" :rules="resource_rules" ref="handleForm">
           <el-form-item label="资源ID" prop="resourcecode" label-width="120px" v-if="type === 'detail' || type === 'edit'">
            <el-input v-model="handleData.resourcecode" :disabled="type === 'detail'"></el-input>
           </el-form-item>
           <el-form-item label="资源名称" prop="resourcename" label-width="120px">
            <el-input v-model="handleData.resourcename" :disabled="type === 'detail'"></el-input>
           </el-form-item>
           <el-form-item label="资源父ID" prop="resourceparentid" label-width="120px">
            <el-input v-model="handleData.resourceparentid" :disabled="type === 'detail'"></el-input>
           </el-form-item>
           <el-form-item label="资源路径" prop="resourceurl" label-width="120px">
            <el-input v-model="handleData.resourceurl" :disabled="type === 'detail'"></el-input>
           </el-form-item>
           <el-form-item label="资源状态" prop="resourcestatus" label-width="120px">
            <el-select v-model="handleData.resourcestatus" :disabled="type === 'detail'">
               <el-option
                  v-for="item in resourcestatu"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
               </el-option>
            </el-select>
           </el-form-item>
           <el-form-item label="资源类型" prop="resourcetype" label-width="120px">
            <el-select v-model="handleData.resourcetype" :disabled="type === 'detail'">
               <el-option
                  v-for="item in types"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
               </el-option>
            </el-select>
           </el-form-item>
           <el-form-item label="资源icon图标" prop="resourceicon" label-width="120px">
            <el-input v-model="handleData.resourceicon" :disabled="type === 'detail'"></el-input>
           </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button size="small" @click="cancel('handleForm')">关闭</el-button>
         <el-button v-if="type==='add'" size="small" @click="handle('add','handleForm')">新增</el-button>
         <el-button v-if="type==='edit'" size="small" @click="handle('edit','handleForm')">修改</el-button>
      </div>
      </el-dialog>
      </div>
    </div>
    <!----详情编辑---->
  </div>
</template>
<script src="./resourcesManage.js"></script>
