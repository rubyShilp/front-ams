import * as loginServer from "./../login/login.server.js";
import { isMobile, isCombination } from "@/util/tools.js";
import { restTime } from "@/util/core.js";
export default {
  data() {
    return {
      user: {
        phone: "",
        loginpwd: "",
        smscode: "",
      },
    };
  },
  methods: {
    //获取验证码
    smsSendCode() {
      if (!isMobile(this.user.phone)) {
        this.$message.warning("请输入正确的手机号");
        return false;
      }
      let params = {
        phone: this.user.phone,
        type: 3,
      };
      loginServer.smsSendCode(params).then((res) => {
        if (res.success) {
          this.$message.success("验证码成功!");
          restTime("codeSms");
        }
      });
    },
    //确认修改密码
    confirmUpdate() {
      if (!isMobile(this.user.phone)) {
        this.$message.warning("请输入正确的手机号");
        return false;
      }
      if (!isCombination(this.user.loginpwd)) {
        this.$message.warning("密码必须包含数字或字母");
        return false;
      }
      if (this.user.loginpwd.length < 8) {
        this.$message.warning("密码长度不得小于八位");
        return false;
      }
      if (this.user.smscode === "") {
        this.$message.warning("请输入验证码");
        return false;
      }
      loginServer.retieve(this.user).then((res) => {
        if (res.success) {
          this.$message.success("密码修改成功!");
          this.$router.push("/login");
        }
      });
    },
  },
};
