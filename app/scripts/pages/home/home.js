import { loginOut } from "./home.server.js";
import * as mainServer from "@/pages/main/main.server.js";
export default {
  data() {
    return {
      schoolList: "",
      schoolcode: "",
      index: 0,
      treList: [],
    };
  },
  beforeMount() {
    this.initGetSchool();
    this.alerts();
    if (sessionStorage.getItem("homeIndex")) {
      this.index = sessionStorage.getItem("homeIndex");
    }
  },
  methods: {
    selectRouter(pathUrl, index) {
      this.index = index;
      sessionStorage.setItem("homeIndex", index);
      this.$router.push(pathUrl);
    },
    select(name) {
      this.name = name;
    },
    changeType(type) {
      this.tabType = type;
    },
    //初始化学校信息
    initGetSchool() {
      let params = {};
      mainServer.getSchool(params).then((res) => {
        if (res.success) {
          this.schoolList = res.resultMap.schools;
          let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
          if(userInfo.userType === 2){
             this.schoolcode = this.schoolList[0].schoolcode;
          }else{
            this.schoolcode = "";
          }
          sessionStorage.setItem("schoolList", JSON.stringify(this.schoolList));
        }
      });
    },
    //退出登录
    loginOut() {
      loginOut().then((res) => {
        if (res.success) {
          sessionStorage.removeItem("TOKEN");
          sessionStorage.removeItem("userInfo");
          this.$router.push("/login");
        }
      });
    },
    alerts() {
      this.$notify({
        title: "提示",
        message: "这是一条不会自动关闭的消息",
        duration: 0,
        offset: 75,
      });
    },
  },
};
