import * as loginServer from "./../login/login.server.js";
import { isMobile, isCombination } from "@/util/tools.js";
export default {
  data() {
    return {
      user: {
        phone: "",
        loginPwd: "",
        againPwd: "",
      },
    };
  },
  methods: {
    //注册
    registered() {
      if (!isMobile(this.user.phone)) {
        this.$message.warning("请输入正确的手机号");
        return false;
      }
      if (
        !isCombination(this.user.loginPwd) ||
        !isCombination(this.user.againPwd)
      ) {
        this.$message.warning("密码必须包含数字或字母");
        return false;
      }
      if (this.user.loginPwd.length < 8 || this.user.againPwd.length < 8) {
        this.$message.warning("密码长度不得小于八位");
        return false;
      }
      if (this.user.againPwd !== this.user.loginPwd) {
        this.$message.warning("两次输入密码不一致");
        return false;
      }
      loginServer.registered(this.user).then((res) => {
        if (res.success) {
          this.$message.success("账号注册成功!");
          this.$router.push("/login");
        }
      });
    },
  },
};
