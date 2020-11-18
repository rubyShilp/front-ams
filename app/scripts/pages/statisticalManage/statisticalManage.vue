<template>
  <div>
    <div class="ams-menu-sub">
      <div class="sub-title">
        <a href="#">学院统计</a>
        <a href="#">学院统计</a>
      </div>
    </div>
    <div class="sub-menu-center">
      <el-container style="position: absolute;height: 100%;width: 100%;">
        <el-aside class="left-batch-wrap">
          <el-tree
            :data="data"
            :props="defaultProps"
            highlight-current
            default-expand-all
          ></el-tree>
        </el-aside>
        <el-container>
          <el-header>
            <el-form :inline="true">
              <el-form-item label="学校名称">
                <el-input placeholder="请输入学校名称"></el-input>
              </el-form-item>
              <el-form-item label="日期">
                <el-date-picker
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-header>
          <el-main>
            <div class="table-border">
              <el-table>
                <el-table-column prop="date" label="学校"> </el-table-column>
                <el-table-column prop="name" label="迟到人数">
                </el-table-column>
                <el-table-column prop="address" label="早退人数">
                </el-table-column>
                <el-table-column prop="address" label="旷课人数">
                </el-table-column>
                <el-table-column prop="address" label="请假人数">
                </el-table-column>
                <el-table-column prop="address" label="体温异常">
                </el-table-column>
                <el-table-column prop="address" label="心率异常">
                </el-table-column>
                <el-table-column prop="address" label="活动最差">
                </el-table-column>
              </el-table>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>
