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
          educationBureau: "深圳市龙岗区教育局",
          officials: "万辉",
          phone: "0797-12345678",
          type: "小学",
          statu: "开学",
          address: "深圳市龙岗区平湖",
          reMark: "~~",
        });
      }
    },
    methods: {
      //
    },
  };
  