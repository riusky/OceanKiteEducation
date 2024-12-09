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
      name: "小学",
      logo: GalleryVerticalEnd,
      plan: "拂堤杨柳醉春烟",
    },
    {
      name: "初中",
      logo: BookOpen,
      plan: "长风破浪会有时",
    },
    {
      name: "高中",
      logo: Command,
      plan: "海内存知己，天涯若比邻。",
    },
    {
      name: "大学",
      logo: AudioWaveform,
      plan: "鸢飞戾天者，望峰息心。",
    },
  ],
  navMain: [
    {
      title: "科举总览",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "科举制度简介",
          url: "#",
        },
        {
          title: "科举考试流程",
          url: "#",
        },
        {
          title: "科举考试历史",
          url: "#",
        },
      ],
    },
    {
      title: "蒙学",
      url: "#",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "三字经",
          url: "#",
        },
        {
          title: "千字文",
          url: "#",
        },
        {
          title: "论语",
          url: "#",
        },
      ],
    },
    {
      title: "童试（童生）",
      url: "#",
      icon: Bot,
      isActive: false,
      items: [
        {
          title: "大学",
          url: "#",
        },
        {
          title: "中庸",
          url: "#",
        },
        {
          title: "论语",
          url: "#",
        },
        {
          title: "孟子",
          url: "#",
        },
      ],
    },
    {
      title: "乡试（秀才）",
      url: "#",
      icon: Bot,
      isActive: false,
      items: [
        {
          title: "古文观止",
          url: "#",
        },
        {
          title: "诗经",
          url: "#",
        },
        {
          title: "楚辞",
          url: "#",
        },
      ],
    },
    {
      title: "会试（举人）",
      url: "#",
      icon: Bot,
      isActive: false,
      items: [
        {
          title: "论说文写作",
          url: "#",
        },
        {
          title: "时事政治",
          url: "#",
        },
        {
          title: "作诗技巧",
          url: "#",
        },
      ],
    },
    {
      title: "殿试（进士）",
      url: "#",
      icon: Bot,
      isActive: false,
      items: [
        {
          title: "礼仪法律",
          url: "#",
        },
        {
          title: "时事分析",
          url: "#",
        },
        {
          title: "策论写作",
          url: "#",
        },
      ],
    },
    {
      title: "成绩查询",
      url: "#",
      icon: GalleryVerticalEnd,
      isActive: false,
      items: [
        {
          title: "历年考生成绩",
          url: "#",
        },
        {
          title: "考试题库",
          url: "#",
        },
        {
          title: "考试复习资源",
          url: "#",
        },
      ],
    },
    {
      title: "学习资源",
      url: "#",
      icon: Settings2,
      isActive: false,
      items: [
        {
          title: "经书与经典",
          url: "#",
        },
        {
          title: "科举专题讲座",
          url: "#",
        },
        {
          title: "学习指导",
          url: "#",
        },
        {
          title: "模拟考试",
          url: "#",
        },
      ],
    },
    {
      title: "个人中心",
      url: "#",
      icon: Settings2,
      isActive: false,
      items: [
        {
          title: "个人信息",
          url: "#",
        },
        {
          title: "历年报考信息",
          url: "#",
        },
        {
          title: "反馈与建议",
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
