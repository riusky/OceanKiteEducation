import { $t } from "@/plugins/i18n";

export default [
  {
    path: "/dicom",
    redirect: "/worklist",
    meta: {
      title: $t("status.pureLoad"),
      showLink: false,
      rank: 102,
    },
  },
] satisfies Array<RouteConfigsTable>;
