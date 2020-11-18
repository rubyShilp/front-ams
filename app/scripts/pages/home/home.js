export default {
  data() {
    return {
      name: "平湖学院",
      treList: []
    };
  },
  beforeMount() {
    for (let i = 0; i < 3; i++) {
      this.treList.push({
        name: "深圳实验学校12222222222222222" + i,
      });
    }
    this.name = this.treList[0].name;
  },
  methods: {
    selectRouter(pathUrl){
      this.$router.push(pathUrl)
    },
    select(name) {
      this.name = name;
    },
    changeType(type){
      this.tabType = type;
    }
  },
};
