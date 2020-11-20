export default {
    data() {
      return {
        dataList: [],
      };
    },
    beforeMount() {
      for (let i = 0; i < 20; i++) {
        this.dataList.push({
           grade: "一年级",
          school: "深圳市实验小学",
          reMark: "~~",
        });
      }
    },
    methods: {
      //
    },
  };
  