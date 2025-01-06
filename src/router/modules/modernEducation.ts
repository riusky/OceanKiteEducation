import { $t } from "@/plugins/i18n";

export default {
  path: "/modernEducation",
  redirect: "/modernEducation/primary",
  meta: {
    title: $t("modernEducation.index"),
  },
  children: [
    {
      path: "/modernEducation/primary",
      name: "primary",
      component: () => import("@/views/modernEducation/primary.vue"),
      meta: {
        title: $t("modernEducation.primary"),
      },
    },
    {
      path: "/modernEducation/middle",
      name: "middle",
      component: () => import("@/views/modernEducation/middle.vue"),
      meta: {
        title: $t("modernEducation.middle"),
      },
    },
    {
      path: "/modernEducation/high",
      name: "high",
      component: () => import("@/views/modernEducation/high.vue"),
      meta: {
        title: $t("modernEducation.high"),
      },
    },
  ],
};
