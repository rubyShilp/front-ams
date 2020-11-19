<template>
  <div>
    <div class="ams-menu-sub">
      <div class="sub-title">
        <a
          href="javaScript:;"
          :class="{ hover: index == 1 }"
          @click="selectPath('/home/record', 1)"
          >考勤记录</a
        >
        <a
          href="javaScript:;"
          :class="{ hover: index == 2 }"
          @click="selectPath('/home/rule', 2)"
          >考勤规则</a
        >
        <a
          href="javaScript:;"
          :class="{ hover: index == 3 }"
          @click="selectPath('/home/equipment', 3)"
          >考勤设备</a
        >
      </div>
    </div>
    <div class="sub-main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 1,
      pathList: ["/home/record", "/home/rule", "/home/equipment"],
    };
  },
  beforeMount() {
    for (let i = 0; i < this.pathList.length; i++) {
      if (this.$route.path === this.pathList[i]) {
        this.index = i + 1;
      }
    }
  },
  methods: {
    selectPath(pathUrl, index) {
      this.index = index;
      this.$router.push(pathUrl);
    },
  },
};
</script>