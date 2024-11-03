<template>
  <header
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
      <PinOff />
      <Pin />
      <Minus @click="maximizeWindow" />
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

// 可以在这里定义各个图标对应的处理函数
function maximizeWindow() {
  console.log("Maximize window");
  // 添加你的最大化逻辑，比如调整某个元素的CSS属性
}

function minimizeWindow() {
  console.log("Minimize window");
  // 添加你的最小化逻辑
}

function closeWindow() {
  console.log("Close window");
  // 添加关闭窗口的逻辑，如隐藏某个元素
}
</script>

<style scoped>
/* 这里你可以定义一些自定义样式来调整图标的尺寸和颜色 */
</style>
