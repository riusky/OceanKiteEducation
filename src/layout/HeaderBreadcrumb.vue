<template>
  <header
    data-tauri-drag-region
    class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear justify-between"
  >
    <div class="flex items-center gap-2 px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbLink href="#">课程管理</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>所有课程</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div class="flex items-center gap-2 mr-4">
      <!-- <PinOff /> -->
      <Pin />
      <Minus @click="minimizeWindow" />
      <MaximizeIcon @click="maximizeWindow" />
      <SquareX @click="closeWindow" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { MaximizeIcon, Minus, SquareX, PinOff, Pin } from "lucide-vue-next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

// 引入 Tauri 的窗口 API
import { getCurrentWindow } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();

// 窗口最大化
function maximizeWindow() {
  appWindow.isMaximized().then((isMaximized) => {
    if (isMaximized) {
      appWindow.unmaximize(); // 还原窗口
    } else {
      appWindow.maximize(); // 最大化窗口
    }
  });
}

// 窗口最小化
function minimizeWindow() {
  appWindow.minimize();
}

// 关闭窗口
function closeWindow() {
  appWindow.close();
}
</script>

<style scoped>
/* 这里你可以定义一些自定义样式来调整图标的尺寸和颜色 */
</style>
