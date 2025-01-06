import { $t } from "@/plugins/i18n";

export default {
  path: "/university",
  redirect: "/university/calculus", // 默认重定向到微积分
  meta: {
    title: $t("university.index"), // 假设有一个对应的国际化字段
  },
  children: [
    // 高等数学
    {
      path: "/university/calculus",
      name: "calculus",
      component: () => import("@/views/university/calculus.vue"),
      meta: {
        title: $t("university.calculus"),
      },
    },
    {
      path: "/university/linear-algebra",
      name: "linear-algebra",
      component: () => import("@/views/university/linear-algebra.vue"),
      meta: {
        title: $t("university.linearAlgebra"),
      },
    },
    {
      path: "/university/ordinary-differential-equations",
      name: "ordinary-differential-equations",
      component: () =>
        import("@/views/university/ordinary-differential-equations.vue"),
      meta: {
        title: $t("university.ordinaryDifferentialEquations"),
      },
    },
    {
      path: "/university/statistics",
      name: "statistics",
      component: () => import("@/views/university/statistics.vue"),
      meta: {
        title: $t("university.statistics"),
      },
    },
    {
      path: "/university/solid-geometry",
      name: "solid-geometry",
      component: () => import("@/views/university/solid-geometry.vue"),
      meta: {
        title: $t("university.solidGeometry"),
      },
    },
    {
      path: "/university/complex-functions",
      name: "complex-functions",
      component: () => import("@/views/university/complex-functions.vue"),
      meta: {
        title: $t("university.complexFunctions"),
      },
    },
    // 软件工程
    {
      path: "/university/software-development-basics",
      name: "software-development-basics",
      component: () =>
        import("@/views/university/software-development-basics.vue"),
      meta: {
        title: $t("university.softwareDevelopmentBasics"),
      },
    },
    {
      path: "/university/software-testing-and-maintenance",
      name: "software-testing-and-maintenance",
      component: () =>
        import("@/views/university/software-testing-and-maintenance.vue"),
      meta: {
        title: $t("university.softwareTestingAndMaintenance"),
      },
    },
    {
      path: "/university/agile-development",
      name: "agile-development",
      component: () => import("@/views/university/agile-development.vue"),
      meta: {
        title: $t("university.agileDevelopment"),
      },
    },
    {
      path: "/university/database-systems",
      name: "database-systems",
      component: () => import("@/views/university/database-systems.vue"),
      meta: {
        title: $t("university.databaseSystems"),
      },
    },
    {
      path: "/university/cloud-computing",
      name: "cloud-computing",
      component: () => import("@/views/university/cloud-computing.vue"),
      meta: {
        title: $t("university.cloudComputing"),
      },
    },
    // 高等物理
    {
      path: "/university/classical-mechanics",
      name: "classical-mechanics",
      component: () => import("@/views/university/classical-mechanics.vue"),
      meta: {
        title: $t("university.classicalMechanics"),
      },
    },
    {
      path: "/university/thermodynamics",
      name: "thermodynamics",
      component: () => import("@/views/university/thermodynamics.vue"),
      meta: {
        title: $t("university.thermodynamics"),
      },
    },
    {
      path: "/university/quantum-mechanics",
      name: "quantum-mechanics",
      component: () => import("@/views/university/quantum-mechanics.vue"),
      meta: {
        title: $t("university.quantumMechanics"),
      },
    },
    {
      path: "/university/electromagnetism",
      name: "electromagnetism",
      component: () => import("@/views/university/electromagnetism.vue"),
      meta: {
        title: $t("university.electromagnetism"),
      },
    },
    {
      path: "/university/relativity",
      name: "relativity",
      component: () => import("@/views/university/relativity.vue"),
      meta: {
        title: $t("university.relativity"),
      },
    },
    // 高等化学
    {
      path: "/university/organic-chemistry",
      name: "organic-chemistry",
      component: () => import("@/views/university/organic-chemistry.vue"),
      meta: {
        title: $t("university.organicChemistry"),
      },
    },
    {
      path: "/university/inorganic-chemistry",
      name: "inorganic-chemistry",
      component: () => import("@/views/university/inorganic-chemistry.vue"),
      meta: {
        title: $t("university.inorganicChemistry"),
      },
    },
    {
      path: "/university/physical-chemistry",
      name: "physical-chemistry",
      component: () => import("@/views/university/physical-chemistry.vue"),
      meta: {
        title: $t("university.physicalChemistry"),
      },
    },
    {
      path: "/university/analytical-chemistry",
      name: "analytical-chemistry",
      component: () => import("@/views/university/analytical-chemistry.vue"),
      meta: {
        title: $t("university.analyticalChemistry"),
      },
    },
    {
      path: "/university/materials-chemistry",
      name: "materials-chemistry",
      component: () => import("@/views/university/materials-chemistry.vue"),
      meta: {
        title: $t("university.materialsChemistry"),
      },
    },
  ],
};
