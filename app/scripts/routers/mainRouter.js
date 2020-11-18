const mainRouter = [
  {
    path: "/home",
    component: () => import("@/pages/home/home.vue"),
    meta: { scrollToTop: true, requireAuth: true },
    children: [
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
          },
        ],
      },
    ],
  },
];
export default mainRouter;
