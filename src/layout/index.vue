<!-- eslint-disable prettier/prettier -->
<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeaderNavigation
        :active-team="activeTeam"
        :teams="data.teams"
        @teamSelected="setActiveTeam"
      />
      <SidebarContentNavigation
        :nav-main="data.navMain"
        :projects="data.projects"
        @toggleActive="toggleActive"
      />
      <SidebarFooterUserMenu :user="data.user" />
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <HeaderBreadcrumb />
      <MainContent />
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import SidebarHeaderNavigation from "./SidebarHeaderNavigation.vue";
import SidebarContentNavigation from "./SidebarContentNavigation.vue";
import SidebarFooterUserMenu from "./SidebarFooterUserMenu.vue";
import HeaderBreadcrumb from "./HeaderBreadcrumb.vue";
import MainContent from "./MainContent.vue";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";

import { Frame, Map, PieChart } from "lucide-vue-next";
import avatar from "@/assets/32x32.png";
// Import data from TS files
import { teams } from "@/layout/data/teams";
import { navigation } from "@/layout/data/navigation";
import { useRouter } from "vue-router";

const router = useRouter(); // 创建 router 实例
const activeNavMain = ref([]);
const data = reactive({
  user: {
    name: "riusky",
    email: "riusky@163.com",
    avatar: avatar,
  },
  teams: teams,
  navMain: activeNavMain,
  projects: [
    {
      name: "在线科举学习平台",
      url: "#",
      icon: Frame,
    },
    {
      name: "科举考试模拟系统",
      url: "#",
      icon: PieChart,
    },
    {
      name: "科举考试资源中心",
      url: "#",
      icon: Map,
    },
  ],
});

const activeTeam = ref(data.teams[0]);
onMounted(() => {
  activeNavMain.value = navigation[teams[0].key];

  // 查找 isActive 为 true 的 URL
  const activeItemUrl = getActiveItemUrl();
  if (activeItemUrl) {
    router.push(activeItemUrl); // 跳转到获取到的 URL
  }
});

// 获取 activeNavMain 中 items 数组的 isActive URL
function getActiveItemUrl() {
  for (const navItem of activeNavMain.value) {
    // 遍历 navMain
    const activeItem = navItem.items.find((item) => item.isActive); // 查找 items 中 isActive 为 true 的项
    if (activeItem) {
      return activeItem.url; // 返回找到的 URL
    }
  }
  return null; // 如果没有找到返回 null
}

function setActiveTeam(team) {
  activeNavMain.value = navigation[team.key];
  activeTeam.value = team;
  // 查找 isActive 为 true 的 URL
  const activeItemUrl = getActiveItemUrl();
  if (activeItemUrl) {
    router.push(activeItemUrl); // 跳转到获取到的 URL
  }
}

function toggleActive(currentItem) {
  console.log(currentItem);
  data.navMain.forEach((item) => {
    item.isActive = item.title !== currentItem.title ? false : item.isActive;
  });
  // 如果当前项目的 isActive 为 true
  if (currentItem.isActive) {
    // 查找 items 数组中第一个 isActive 为 true 的项
    const activeItem = currentItem.items.find((item) => item.isActive);

    if (activeItem) {
      router.push(activeItem.url); // 跳转到找到的 URL
    }
  }
}
</script>
