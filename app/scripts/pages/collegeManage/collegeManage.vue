<template>
  <div>
    <div class="ams-menu-sub">
      <div class="sub-title">
        <a
          href="javaScript:;"
          :class="{ hover: index == 1 }"
          @click="selectPath('/home/schoolManage', 1)"
          >学校管理</a
        >
        <a
          href="javaScript:;"
          :class="{ hover: index == 2 }"
          @click="selectPath('/home/gradeManage', 2)"
          >年级管理</a
        >
        <a
          href="javaScript:;"
          :class="{ hover: index == 3 }"
          @click="selectPath('/home/classManage', 3)"
          >班级管理</a
        >
        <a
          href="javaScript:;"
          :class="{ hover: index == 4 }"
          @click="selectPath('/home/studentManage', 4)"
          >学生管理</a
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
      pathList: ["/home/schoolManage", "/home/gradeManage", "/home/classManage","/home/studentManage"],
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