<template>
  <div>
    <div class="ams-menu-sub">
      <div class="sub-title">
        <a
          href="javaScript:;"
          :class="{ hover: index == 1 }"
          >监控记录</a
        >
        <a
          href="javaScript:;"
          :class="{ hover: index == 2 }"
          @click="selectPath('/home/fenceconfig', 2)"
          >围栏配置</a
        >
        <a
          href="javaScript:;"
          :class="{ hover: index == 3 }"
          >设备终端</a
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
      index: 2,
      pathList: ["", "/home/fenceManage", ""],
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