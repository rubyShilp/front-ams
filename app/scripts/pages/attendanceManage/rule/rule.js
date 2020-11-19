export default {
  data() {
    return {
      dataList: [],
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
    //
  },
};
