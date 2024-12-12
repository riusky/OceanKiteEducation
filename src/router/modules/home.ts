import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  redirect: "/ancientCulture",
  component: Layout,
  meta: {
    title: $t("menus.pureHome"),
    rank: 0,
  },
} satisfies RouteConfigsTable;
