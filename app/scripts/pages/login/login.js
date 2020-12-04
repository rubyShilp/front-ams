import * as loginServer from "./login.server.js";
import { isMobile } from "@/util/tools.js";
export default {
  data() {
    return {
      user: {
        account: "15927933331",
        code: "123456",
        loginType: 2,
      },
    };
  },
  methods: {
    //登录
    login() {
      if (!isMobile(this.user.account)) {
        this.$message.warning("请输入正确的手机号");
        return false;
      }
      let params = this.user;
      loginServer.login(params).then((res) => {
        if (res.success) {
          sessionStorage.setItem("TOKEN", res.resultMap.userKey);
          sessionStorage.setItem("userInfo", JSON.stringify(res.resultMap));
          this.$router.push("/home/homePage");
        }
      });
    },
    //注册
    registered() {
      this.$router.push("/registered");
    },
  },
};
