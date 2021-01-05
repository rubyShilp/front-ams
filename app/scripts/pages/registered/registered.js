import * as loginServer from "./../login/login.server.js";
import { isMobile, isCombination } from "@/util/tools.js";
import { restTime } from "@/util/core.js";
export default {
  data() {
    return {
      user: {
        phone: "",
        loginPwd: "",
        smsKey: "",
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
        type: 2,
      };
      loginServer.smsSendCode(params).then((res) => {
        if (res.success) {
          this.$message.success("验证码成功!");
          restTime("codeSms");
        }
      });
    },
    //注册
    registered() {
      if (!isMobile(this.user.phone)) {
        this.$message.warning("请输入正确的手机号");
        return false;
      }
      if (!isCombination(this.user.loginPwd)) {
        this.$message.warning("密码必须包含数字或字母");
        return false;
      }
      if (this.user.loginPwd.length < 8) {
        this.$message.warning("密码长度不得小于八位");
        return false;
      }
      if (this.user.smsKey === "") {
        this.$message.warning("请输入验证码");
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
