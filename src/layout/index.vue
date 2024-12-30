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
        @toggleSubActive="toggleSubActive"
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

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
} from "lucide-vue-next";
import avatar from "@/assets/32x32.png";
// Import data from TS files
import { teams } from "@/layout/data/teams";
import { navigation } from "@/layout/data/navigation";

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
});

function setActiveTeam(team) {
  activeNavMain.value = navigation[team.key];
  activeTeam.value = team;
}

function toggleActive(currentItem) {
  data.navMain.forEach((item) => {
    item.isActive = item.title !== currentItem.title ? false : item.isActive;
  });
}

function toggleSubActive(currentItem) {
  data.navMain.forEach((item) => {
    item.isActive = item.title !== currentItem.title ? false : item.isActive;
  });
}
</script>
