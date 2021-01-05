import * as loginServer from "./login.server.js";
import { isMobile } from "@/util/tools.js";
import { isPc } from "@/util/core";
export default {
  data() {
    return {
      user: {
        account: "",
        code: "",
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
          if (isPc()) {
            this.$router.push("/h5/main");
          } else {
            this.$router.push("/home/homePage");
          }
        }
      });
    },
    //注册
    registered() {
      this.$router.push("/registered");
    },
  },
};
