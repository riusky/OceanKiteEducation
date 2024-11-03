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
      />
      <!-- <SidebarProjects :projects="data.projects" /> -->
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
import { ref } from "vue";
import SidebarHeaderNavigation from "./SidebarHeaderNavigation.vue";
import SidebarContentNavigation from "./SidebarContentNavigation.vue";
import SidebarProjects from "./SidebarProjects.vue";
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
  SquareTerminal,
} from "lucide-vue-next";
import avatar from "@/assets/32x32.png";
const data = {
  user: {
    name: "riusky",
    email: "riusky@163.com",
    avatar: avatar,
  },
  teams: [
    {
      name: "小学",
      logo: GalleryVerticalEnd, // 小学使用图标
      plan: "拂堤杨柳醉春烟", // 描述诗句
    },
    {
      name: "初中",
      logo: BookOpen, // 初中使用书本图标
      plan: "长风破浪会有时",
    },
    {
      name: "高中",
      logo: Command, // 高中使用命令图标
      plan: "海内存知己，天涯若比邻。",
    },
    {
      name: "大学",
      logo: AudioWaveform, // 大学使用音频波形图标
      plan: "鸢飞戾天者，望峰息心。",
    },
  ],
  navMain: [
    {
      title: "课程管理",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "所有课程",
          url: "#",
        },
        {
          title: "添加课程",
          url: "#",
        },
        {
          title: "课程分类",
          url: "#",
        },
      ],
    },
    {
      title: "学生管理",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "学生列表",
          url: "#",
        },
        {
          title: "绩效分析",
          url: "#",
        },
        {
          title: "通知与通讯",
          url: "#",
        },
      ],
    },
    {
      title: "教学资源",
      url: "#",
      icon: GalleryVerticalEnd,
      items: [
        {
          title: "教材下载",
          url: "#",
        },
        {
          title: "试卷与练习",
          url: "#",
        },
        {
          title: "多媒体资料",
          url: "#",
        },
      ],
    },
    {
      title: "账户设置",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "个人信息",
          url: "#",
        },
        {
          title: "权限管理",
          url: "#",
        },
        {
          title: "支付设置",
          url: "#",
        },
        {
          title: "使用情况",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "在线教学平台",
      url: "#",
      icon: Frame,
    },
    {
      name: "学生互动论坛",
      url: "#",
      icon: PieChart,
    },
    {
      name: "学习进度追踪",
      url: "#",
      icon: Map,
    },
  ],
};
const activeTeam = ref(data.teams[0]);

function setActiveTeam(team) {
  activeTeam.value = team;
}
</script>
