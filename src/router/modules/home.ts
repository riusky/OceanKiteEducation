import { $t } from "@/plugins/i18n";

export default {
  path: "/",
  name: "Home",
  redirect: "/dicom",
  meta: {
    icon: "ep:home-filled",
    title: $t("menus.pureHome"),
    rank: 0,
  },
  children: [
    {
      path: "/dicom",
      name: "dicom",
      component: () => import("@/views/dicom/index.vue"),
      meta: {
        title: $t("dicom.dicom"),
      },
    },
  ],
} satisfies RouteConfigsTable;
