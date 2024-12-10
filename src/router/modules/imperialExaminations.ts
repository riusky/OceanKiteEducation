import { $t } from "@/plugins/i18n";

export default {
  path: "/ancientCulture",
  redirect: "/ancientCulture/initiate",
  meta: {
    icon: "ri:artboard-line",
    title: $t("dicom.dicom"),
  },
  children: [
    {
      path: "/ancientCulture/initiate",
      name: "FrameBoard",
      component: () => import("@/views/dicom/index2.vue"),
      meta: {
        title: $t("dicom.dicom"),
      },
    },
  ],
} satisfies RouteConfigsTable;
