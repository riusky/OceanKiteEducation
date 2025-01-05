import { $t } from "@/plugins/i18n";

export default {
  path: "/modernEducation", // 主路由路径：古代文化
  redirect: "/modernEducation/primary", // 默认重定向到 "国学启蒙"
  meta: {
    title: $t("AncientCulture.index"), // 路由标题：古代文化
  },
  children: [
    {
      path: "/modernEducation/primary", // 路由路径：国学启蒙
      name: "primary", // 路由名称
      component: () => import("@/views/modernEducation/primary.vue"), // 对应的组件路径
      meta: {
        title: $t("AncientCulture.initiate"), // 路由标题：国学启蒙
      },
    },
    {
      path: "/modernEducation/middle", // 路由路径：国学启蒙
      name: "middle", // 路由名称
      component: () => import("@/views/modernEducation/middle.vue"), // 对应的组件路径
      meta: {
        title: $t("AncientCulture.initiate"), // 路由标题：国学启蒙
      },
    },
    {
      path: "/modernEducation/high", // 路由路径：国学启蒙
      name: "high", // 路由名称
      component: () => import("@/views/modernEducation/high.vue"), // 对应的组件路径
      meta: {
        title: $t("AncientCulture.initiate"), // 路由标题：国学启蒙
      },
    },
  ],
};
