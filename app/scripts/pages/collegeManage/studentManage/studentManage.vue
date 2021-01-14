<template>
  <div class="left-main-center">
    <div class="left-main-from-table">
      <div class="from-right">
        <el-form :inline="true">
          <el-form-item>
            <el-input
              placeholder="请输入学生姓名"
              v-model="initData.stuname"
              size="mini"
            >
              <i
                slot="suffix"
                class="el-input__icon el-icon-search"
                @click="query"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="show('add')" size="mini">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="download">
              下载导入模板
            </el-button>
          </el-form-item>
          <el-form-item>
            <a
              href="javaScript:;"
              style="background: #ed7d32;padding: 5px 10px 7px;font-size: 12px;border-radius: 5px;color: #fff;"
            >
              导入学生
              <input
                type="file"
                @change="uploadFile($event)"
                v-ams-file="workFile"
                style="opacity:0;position: absolute;width: 63px;left: 0px;top: 9px;cursor: pointer;"
              />
            </a>
          </el-form-item>
          <el-form-item label="">
            <el-button @click="show('moreDel')" size="mini">批量删除</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-border">
        <el-table
          height="460px"
          :data="dataList"
          style="width: 100%"
          ref="table"
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
          <el-table-column prop="sno" label="学生编号" sortable>
          </el-table-column>
          <el-table-column prop="imei" label="IMEI码" sortable>
          </el-table-column>
          <el-table-column prop="stuname" label="姓名" sortable>
          </el-table-column>
          <el-table-column prop="stuage" label="年龄" sortable>
          </el-table-column>
          <el-table-column prop="stusex" label="性别" sortable>
            <template class="table-operation" v-slot="scope">
              {{ scope.row.stusex | sexName }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="230">
            <template class="table-operation" v-slot="scope">
              <a href="javaScript:;" @click="studentImei(scope.row)"
                ><i class="el-icon-map-location"></i>定位</a
              >
              <span>|</span>
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
          :rules="student_rules"
          ref="handleForm"
        >
          <el-form-item label="学生名称" prop="stuname" label-width="120px">
            <el-input
              v-model="handleData.stuname"
              :disabled="type === 'detail'"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生编号" prop="sno" label-width="120px">
            <el-input
              v-model="handleData.sno"
              :disabled="type === 'detail'"
            ></el-input>
          </el-form-item>
          <el-form-item label="手表唯一码" prop="imei" label-width="120px">
            <el-input
              v-model="handleData.imei"
              :disabled="type === 'detail'"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生年龄" prop="stuage" label-width="120px">
            <el-input
              v-model="handleData.stuage"
              :disabled="type === 'detail'"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生性别" prop="stusex" label-width="120px">
            <el-select
              v-model="handleData.stusex"
              :disabled="type === 'detail'"
            >
              <el-option
                v-for="item in stusexs"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="学生出生日期"
            prop="birthday"
            label-width="120px"
            v-if="type !== 'edit'"
          >
            <el-date-picker
              v-model="handleData.birthday"
              type="date"
              :disabled="type === 'detail'"
              placeholder="选择出生日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="兴趣爱好" prop="expression" label-width="120px">
            <el-input
              v-model="handleData.expression"
              :disabled="type === 'detail'"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark" label-width="120px">
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
    <!--学生行程轨迹--->
    <el-dialog
      title="行程轨迹"
      width="70%"
      top="5vh"
      :visible.sync="visibleImei"
      class="abow_dialog"
    >
      <div class="content">
        <baidu-map
          v-if="visibleImei"
          class="map"
          :center="map.center"
          :zoom="map.zoom"
          @ready="handler"
        >
          <bm-polyline
            :path="lineList"
            stroke-color="#276ef9"
            :stroke-opacity="0.5"
            :stroke-weight="2"
          ></bm-polyline>
        </baidu-map>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./studentManage.js"></script>
<style scoped>
.map {
  width: 100%;
  height: 100%;
}

span {
  display: none;
}
</style>
