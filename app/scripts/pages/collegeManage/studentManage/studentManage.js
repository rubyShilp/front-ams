export default {
    data() {
      return {
        dataList: [],
        data: [
          {
            label: "深圳市实验小学",
            children: [
              {
                label: "一年级",
                children: [
                  {
                    label: "001班",
                  },
                ],
              },
            ],
          },
          {
            label: "深圳市外国语学校",
            children: [
              {
                label: "一年级",
                children: [
                  {
                    label: "001班",
                  },
                  {
                    label: "002班",
                  },
                  {
                    label: "003班",
                  },
                ],
              },
              {
                label: "二年级",
                children: [
                  {
                    label: "001班",
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
          number: "SN001",
          imei: "254687613546",
          name: "王刚",
          age: 6,
          gender: "女"
        });
      }
    },
    methods: {
      //
    },
  };
  