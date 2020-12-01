export default {
  data() {
    return {
      starttime:new Date(new Date().getTime()-7*24*60*60*1000),
      endtime:new Date(),
      dataList: [],
      totalCount:0,//總條數
      page:1,
      pageSize:10,//每頁顯示條數
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
  beforeMount() {
    for (let i = 0; i < 20; i++) {
      this.dataList.push({
        school: "深圳实验学校",
        lateCount: 23,
        earlyCount: 2,
        truancyCount: 12,
        leaveCount: 12,
        temperatureBody: "正常",
        heartBody: "正常",
        activityBody: "正常",
      });
    }
  },
  methods: {
    //每頁顯示條數
    handleSizeChange(pageSize){
      this.pageSize=pageSize;
    },
    //跳轉的頁碼
    handleCurrentChange(page){
      this.page=page;
    },
  },
};
