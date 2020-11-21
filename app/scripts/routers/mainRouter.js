const mainRouter = [
  {
    path: "/home",
    component: () => import("@/pages/home/home.vue"),
    meta: { scrollToTop: true, requireAuth: true },
    children: [
      {
        path: "/home/homePage",
        component: () =>
          import("@/pages/homePage/homePage.vue"),
        meta: { scrollToTop: true },
      },
      {
        path: "/home/statisticalManage",
        component: () =>
          import("@/pages/statisticalManage/statisticalManage.vue"),
        meta: { scrollToTop: true },
      },
      {
        path: "/home/attendanceManage",
        component: () =>
          import("@/pages/attendanceManage/attendanceManage.vue"),
        meta: { scrollToTop: true },
        children: [
          {
            path: "/home/record",
            component: () =>
              import("@/pages/attendanceManage/record/record.vue"),
            meta: { scrollToTop: true },
          },
          {
            path: "/home/rule",
            component: () => import("@/pages/attendanceManage/rule/rule.vue"),
            meta: { scrollToTop: true },
          },
          {
            path: "/home/equipment",
            component: () =>
              import("@/pages/attendanceManage/equipment/equipment.vue"),
            meta: { scrollToTop: true },
          }
        ],
      },
      {
        path: "/home/collegeManage",
        component: () =>
          import("@/pages/collegeManage/collegeManage.vue"),
        meta: { scrollToTop: true },
        children: [
          {
            path: "/home/schoolManage",
            component: () =>
              import("@/pages/collegeManage/schoolManage/schoolManage.vue"),
            meta: { scrollToTop: true },
          },
          {
            path: "/home/gradeManage",
            component: () => import("@/pages/collegeManage/gradeManage/gradeManage.vue"),
            meta: { scrollToTop: true },
          },
          {
            path: "/home/classManage",
            component: () =>
              import("@/pages/collegeManage/classManage/classManage.vue"),
            meta: { scrollToTop: true },
          },
          {
            path: "/home/studentManage",
            component: () =>
              import("@/pages/collegeManage/studentManage/studentManage.vue"),
            meta: { scrollToTop: true },
          }
        ],
      }
    ],
  },
  {
    path: "/h5/main",
    component: () =>
      import("@/h5/main/main.vue"),
    meta: { scrollToTop: true },
  }
];
export default mainRouter;
