export default {
    data() {
      return {
        dataList: [],
      };
    },
    beforeMount() {
      for (let i = 0; i < 20; i++) {
        this.dataList.push({
          class: "001班",
          teacherName: "李小红",
          school: "深圳市实验小学",
          grade: "一年级",
          reMark: "~~",
          createTime: "2020-11-07 22:04"
        });
      }
    },
    methods: {
      //
    },
  };
  