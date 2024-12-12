import { $t } from "@/plugins/i18n";

export default {
  path: "/ancientCulture", // 主路由路径：古代文化
  redirect: "/ancientCulture/initiate", // 默认重定向到 "国学启蒙"
  meta: {
    title: $t("AncientCulture.index"), // 路由标题：古代文化
  },
  children: [
    {
      path: "/ancientCulture/initiate", // 路由路径：国学启蒙
      name: "Initiate", // 路由名称
      component: () => import("@/views/ancientCulture/initiate.vue"), // 对应的组件路径
      meta: {
        title: $t("AncientCulture.initiate"), // 路由标题：国学启蒙
      },
    },
    {
      path: "/ancientCulture/hundredSchools", // 路由路径：诸子百家
      name: "HundredSchools", // 路由名称
      component: () => import("@/views/ancientCulture/hundredSchools.vue"), // 对应的组件路径
      meta: {
        title: $t("AncientCulture.hundredSchools"), // 路由标题：诸子百家
      },
    },
    {
      path: "/ancientCulture/fourBooksFiveClassics", // 路由路径：四书五经
      name: "FourBooksFiveClassics", // 路由名称
      component: () =>
        import("@/views/ancientCulture/fourBooksFiveClassics.vue"), // 对应的组件路径
      meta: {
        title: $t("AncientCulture.fourBooksFiveClassics"), // 路由标题：四书五经
      },
    },
    {
      path: "/ancientCulture/literaryClassics", // 路由路径：文学名著
      name: "LiteraryClassics", // 路由名称
      component: () => import("@/views/ancientCulture/literaryClassics.vue"), // 对应的组件路径
      meta: {
        title: $t("AncientCulture.literaryClassics"), // 路由标题：文学名著
      },
    },
    {
      path: "/ancientCulture/twentyFourHistories", // 路由路径：二十四史
      name: "TwentyFourHistories", // 路由名称
      component: () => import("@/views/ancientCulture/twentyFourHistories.vue"), // 对应的组件路径
      meta: {
        title: $t("AncientCulture.twentyFourHistories"), // 路由标题：二十四史
      },
    },
    {
      path: "/ancientCulture/classicalNovels", // 路由路径：古典小说
      name: "ClassicalNovels", // 路由名称
      component: () => import("@/views/ancientCulture/classicalNovels.vue"), // 对应的组件路径
      meta: {
        title: $t("AncientCulture.classicalNovels"), // 路由标题：古典小说
      },
    },
    {
      path: "/ancientCulture/fourLibrary", // 路由路径：四库全书
      name: "FourLibrary", // 路由名称
      component: () => import("@/views/ancientCulture/fourLibrary.vue"), // 对应的组件路径
      meta: {
        title: $t("AncientCulture.fourLibrary"), // 路由标题：四库全书
      },
    },
  ],
} satisfies RouteConfigsTable;
