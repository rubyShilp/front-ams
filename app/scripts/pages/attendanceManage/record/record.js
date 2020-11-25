import * as attendanceServer from './../attendance.server.js'; 
export default {
  data() {
    return {
      dataList: [],
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
    //初始化学校年级树形结构菜单项
    initUserRole(){
      attendanceServer.userRole().then(res=>{
        if(res.success){
          this.data=res.resultMap.roleTrees
        }
      })
    }
  },
};
