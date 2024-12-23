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
import { ref, reactive } from "vue";
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

const data = reactive({
  user: {
    name: "riusky",
    email: "riusky@163.com",
    avatar: avatar,
  },
  teams: [
    {
      name: "首页",
      logo: GalleryVerticalEnd,
      plan: "拂堤杨柳醉春烟",
    },
    {
      name: "国学",
      logo: GalleryVerticalEnd,
      plan: "拂堤杨柳醉春烟",
    },
    {
      name: "现代教育",
      logo: GalleryVerticalEnd,
      plan: "拂堤杨柳醉春烟",
    },
    {
      name: "大学",
      logo: AudioWaveform,
      plan: "鸢飞戾天者，望峰息心。",
    },
    {
      name: "职业",
      logo: AudioWaveform,
      plan: "鸢飞戾天者，望峰息心。",
    },
    {
      name: "工具",
      logo: AudioWaveform,
      plan: "鸢飞戾天者，望峰息心。",
    },
    {
      name: "资讯",
      logo: AudioWaveform,
      plan: "鸢飞戾天者，望峰息心。",
    },
    {
      name: "道场",
      logo: AudioWaveform,
      plan: "鸢飞戾天者，望峰息心。",
    },
  ],
  navMain: [
    {
      title: "国学启蒙",
      url: "/ancientCulture/initiate",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "启蒙",
          url: "#",
        },
        {
          title: "声律",
          url: "#",
        },
      ],
    },
    {
      title: "诸子百家",
      url: "/ancientCulture/hundredSchools",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "诸子",
          url: "#",
        },
        {
          title: "百家",
          url: "#",
        },
      ],
    },
    {
      title: "四书五经",
      url: "/ancientCulture/fourBooksFiveClassics",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "四书",
          url: "#",
        },
        {
          title: "五经",
          url: "#",
        },
      ],
    },
    {
      title: "文学名著",
      url: "/ancientCulture/literaryClassics",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "红楼梦",
          url: "#",
        },
        {
          title: "西游记",
          url: "#",
        },
        {
          title: "水浒传",
          url: "#",
        },
        {
          title: "三国演义",
          url: "#",
        },
        {
          title: "聊斋志异",
          url: "#",
        },
        {
          title: "喻世明言",
          url: "#",
        },
        {
          title: "警世通言",
          url: "#",
        },
        {
          title: "醒世恒言",
          url: "#",
        },
        {
          title: "初刻拍案惊奇",
          url: "#",
        },
        {
          title: "二刻拍案惊奇",
          url: "#",
        },
      ],
    },
    {
      title: "二十四史",
      url: "/ancientCulture/twentyFourHistories",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "史记",
          url: "#",
        },
        {
          title: "汉书",
          url: "#",
        },
        {
          title: "后汉书",
          url: "#",
        },
        {
          title: "三国志",
          url: "#",
        },
        {
          title: "晋书",
          url: "#",
        },
        {
          title: "宋书",
          url: "#",
        },
        {
          title: "南齐书",
          url: "#",
        },
        {
          title: "梁书",
          url: "#",
        },
        {
          title: "陈书",
          url: "#",
        },
        {
          title: "魏书",
          url: "#",
        },
        {
          title: "北齐书",
          url: "#",
        },
        {
          title: "周书",
          url: "#",
        },
        {
          title: "隋书",
          url: "#",
        },
        {
          title: "南史",
          url: "#",
        },
        {
          title: "北史",
          url: "#",
        },
        {
          title: "旧唐书",
          url: "#",
        },
        {
          title: "新唐书",
          url: "#",
        },
        {
          title: "旧五代史",
          url: "#",
        },
        {
          title: "新五代史",
          url: "#",
        },
        {
          title: "宋史",
          url: "#",
        },
        {
          title: "辽史",
          url: "#",
        },
        {
          title: "金史",
          url: "#",
        },
        {
          title: "元史",
          url: "#",
        },
        {
          title: "明史",
          url: "#",
        },
      ],
    },
    {
      title: "古典小说",
      url: "/ancientCulture/classicalNovels",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "才子佳人",
          url: "#",
        },
        {
          title: "谴责讽世",
          url: "#",
        },
        {
          title: "神魔志怪",
          url: "#",
        },
        {
          title: "古典侠义",
          url: "#",
        },
        {
          title: "历史演义",
          url: "#",
        },
        {
          title: "公案小说",
          url: "#",
        },
        {
          title: "笔记小说",
          url: "#",
        },
      ],
    },
    {
      title: "四库全书",
      url: "/ancientCulture/fourLibrary",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "经部",
          url: "#",
        },
        {
          title: "史部",
          url: "#",
        },
        {
          title: "子部",
          url: "#",
        },
        {
          title: "集部",
          url: "#",
        },
      ],
    },
  ],
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

function setActiveTeam(team) {
  activeTeam.value = team;
}

function toggleActive(currentItem) {
  data.navMain.forEach((item) => {
    item.isActive = item.title !== currentItem.title ? false : item.isActive;
  });
}
</script>
