<template>
  <div>
    <div class="ams-menu-sub">
      <div class="sub-title">
        <a
          href="javaScript:;"
          :class="{ hover: index == 1 }"
          @click="selectPath('/home/user', 1)"
          >账号信息</a
        >
        <a
          href="javaScript:;"
          :class="{ hover: index == 2 }"
          @click="selectPath('/home/role', 2)"
          >角色信息</a
        >
        <a
          href="javaScript:;"
          :class="{ hover: index == 3 }"
          @click="selectPath('/home/resources', 3)"
          >资源管理</a
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
      pathList: ["/home/user", "/home/role", "/home/resources"],
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
