<template>
  <div class="equipment-main">
    <div class="left-main-center">
      <div class="left-main-from-table">
        <div class="from-right">
          <el-form :inline="true">
            <el-form-item>
              <el-input placeholder="请输入手机号" size="mini" v-model="initData.phone"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入用户昵称" size="mini" v-model="initData.nickname"></el-input>
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
            <el-table-column
              prop="phone"
              label="手机号"
              :show-overflow-tooltip="true"
              sortable
            >
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" sortable>
            </el-table-column>
            <el-table-column prop="portraiturl" label="头像" sortable>
            </el-table-column>
            <el-table-column  label="用户状态" sortable>
              <template v-slot="prop">
                {{prop.row.userstatus |userStatu}}
              </template>
            </el-table-column>
            <el-table-column label="性别" sortable>
              <template v-slot="prop">
                {{prop.row.sex |sexName}}
              </template>
            </el-table-column>
            <el-table-column prop="haswx" label="微信授权" sortable>
            </el-table-column>
            <el-table-column prop="birthday" label="出生日期" sortable>
            </el-table-column>
            <el-table-column label="操作" width="250">
              <template class="table-operation" slot-scope="scope">
                <a href="javaScript:;" @click="show('giverole',scope.row)"
                  ><i class="el-icon-view"></i>权限分配</a
                >
                <span>|</span>
                <a href="javaScript:;"  @click="show('edit',scope.row)"
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
            :total="total"
            :page.sync="currentPage"
            :limit.sync="pagesize"
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
       <el-form class="form" :model="handleData" :rules="user_rules" ref="handleForm" v-if="type !== 'giverole'">
           <el-form-item label="用户ID" prop="usercode" label-width="120px" v-if="type === 'edit'">
            <el-input v-model="handleData.usercode"></el-input>
           </el-form-item>
           <el-form-item label="用户昵称" prop="nickname" label-width="120px">
            <el-input v-model="handleData.nickname" autocomplete="off"></el-input>
           </el-form-item>
           <el-form-item label="手机号码" prop="phone" label-width="120px">
            <el-input v-model="handleData.phone" autocomplete="off"></el-input>
           </el-form-item>
           <el-form-item label="登陆密码" prop="loginpwd" label-width="120px">
            <el-input v-model="handleData.loginpwd" show-password  autocomplete="new-password"></el-input>
           </el-form-item>
           <el-form-item label="用户状态" prop="userstatus" label-width="120px" v-if="type === 'edit'">
           <el-select v-model="handleData.userstatus">
               <el-option
                  v-for="item in status"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
               </el-option>
            </el-select>
           </el-form-item>
       </el-form>
       <!--权限分配-->
       <el-form class="form"  :rules="role_rules" style="height: 60vh;overflow: auto;" ref="roleForm" v-else>
          <el-form-item label="用户角色" prop="userRole" label-width="120px">
           <el-select v-model="userRole">
               <el-option
                  v-for="item in roles"
                  :key="item.rolecode"
                  :label="item.rolename"
                  :value="item.rolecode">
               </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色绑定"  label-width="120px">
            <el-tree
              :data="roleTrees"
              ref="tree"
              show-checkbox
               :check-strictly="checkStrictly"
              node-key="id"
              :props="defaultProps">
            </el-tree>
          </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button size="small"  v-if="type!=='giverole'" @click="cancel('handleForm')">关闭</el-button>
         <el-button size="small" v-if="type==='giverole'" @click="close">关闭</el-button>
         <el-button v-if="type==='giverole'" size="small" @click="handle('giverole')">保存</el-button>
         <el-button v-if="type==='add'" size="small" @click="handle('add','handleForm')">新增</el-button>
         <el-button v-if="type==='edit'" size="small" @click="handle('edit','handleForm')">修改</el-button>
      </div>
      </el-dialog>
      </div>
    </div>
    <!----详情编辑---->
  </div>
</template>
<script src="./userManage.js"></script>
