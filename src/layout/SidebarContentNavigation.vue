<template>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>分类</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible
          v-for="item in navMain"
          :key="item.title"
          v-model:open="item.isActive"
          as-child
          :default-open="item.isActive"
          class="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger as-child @click="toggleActive(item)">
              <SidebarMenuButton :tooltip="item.title">
                <component :is="item.icon" />
                <span>{{ item.title }}</span>
                <ChevronRight
                  class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem
                  v-for="subItem in item.items"
                  :key="subItem.title"
                >
                  <SidebarMenuSubButton as-child>
                    <RouterLink :to="subItem.url">
                      <span>{{ subItem.title }}</span>
                    </RouterLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
    <SidebarProjects :projects="projects" />
  </SidebarContent>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import SidebarProjects from "./SidebarProjects.vue";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-vue-next";

interface NavItem {
  title: string;
  url: string;
  icon: any;
  isActive?: boolean;
  items?: SubNavItem[];
}

interface SubNavItem {
  title: string;
  url: string;
}

// 定义项目类型
interface Project {
  name: string;
  url: string;
  icon: any; // 根据实际类型替换
}

const props = defineProps<{
  navMain: NavItem[];
  projects: Project[];
}>();

const emit = defineEmits<{
  (e: "toggle-active", currentItem: NavItem): void;
}>();

const toggleActive = (currentItem: NavItem) => {
  emit("toggle-active", currentItem);
};
</script>
