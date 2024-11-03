<template>
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuButton
              size="lg"
              class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
              >
                <component :is="activeTeam.logo" class="size-4" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{
                  activeTeam.name
                }}</span>
                <span class="truncate text-xs">{{ activeTeam.plan }}</span>
              </div>
              <ChevronsUpDown class="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side="bottom"
            :side-offset="4"
          >
            <DropdownMenuLabel class="text-xs text-muted-foreground"
              >若有诗书藏在心</DropdownMenuLabel
            >
            <DropdownMenuItem
              v-for="(team, index) in teams"
              :key="team.name"
              class="gap-2 p-2"
              @click="$emit('teamSelected', team)"
            >
              <div
                class="flex size-6 items-center justify-center rounded-sm border"
              >
                <component :is="team.logo" class="size-4 shrink-0" />
              </div>
              {{ team.name }}
              <DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="gap-2 p-2">
              <div
                class="flex size-6 items-center justify-center rounded-md border bg-background"
              >
                <Plus class="size-4" />
              </div>
              <div class="font-medium text-muted-foreground">添加更多</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenuButton,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus, ChevronsUpDown } from "lucide-vue-next";

// 定义团队类型
interface Team {
  name: string;
  logo: any; // 根据实际类型替换
  plan: string;
}

// 定义组件的 props 类型
const props = defineProps<{
  activeTeam: Team;
  teams: Team[];
}>();

const emit = defineEmits(["teamSelected"]);
</script>

<style scoped>
/* 添加相关样式 */
</style>
