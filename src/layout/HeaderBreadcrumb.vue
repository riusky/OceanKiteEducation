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
      <Popover>
        <PopoverTrigger as-child>
          <span
            class="icon-container"
            @mouseover="hoverIcon = 'paint'"
            @mouseleave="hoverIcon = ''"
          >
            <PaintBrushIconOutline
              v-if="hoverIcon !== 'paint'"
              class="size-6"
            />
            <PaintBrushIcon v-else class="size-6" />
          </span>
        </PopoverTrigger>
        <PopoverContent :side-offset="8" align="end" class="w-96">
          <ThemeCustomizer :all-colors="allColors" />
        </PopoverContent>
      </Popover>

      <!-- 鼠标悬停切换图标显示 -->
      <span
        class="icon-container"
        @mouseover="hoverIcon = 'minus'"
        @mouseleave="hoverIcon = ''"
      >
        <MinusCircleIconOutline
          v-if="hoverIcon !== 'minus'"
          class="size-6"
          @click="minimizeWindow"
        />
        <MinusCircleIcon v-else class="size-6" @click="minimizeWindow" />
      </span>
      <!-- 动态切换最大化/还原图标 -->

      <span
        class="icon-container"
        @mouseover="hoverIcon = 'max'"
        @mouseleave="hoverIcon = ''"
      >
        <PlusCircleIconOutline
          v-if="hoverIcon !== 'max'"
          class="size-6"
          @click="maximizeWindow"
        />
        <PlusCircleIcon v-else class="size-6" @click="maximizeWindow" />
      </span>
      <span
        class="icon-container"
        @mouseover="hoverIcon = 'close'"
        @mouseleave="hoverIcon = ''"
      >
        <XCircleIconOutline
          v-if="hoverIcon !== 'close'"
          class="size-6"
          @click="closeWindow"
        />
        <XCircleIcon v-else class="size-6" @click="closeWindow" />
      </span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { getCurrentWindow } from "@tauri-apps/api/window";
import {
  XCircleIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/vue/24/solid";
import {
  XCircleIcon as XCircleIconOutline,
  MinusCircleIcon as MinusCircleIconOutline,
  PlusCircleIcon as PlusCircleIconOutline,
} from "@heroicons/vue/24/outline";
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
import ThemeCustomizer from "@/components/theming/ThemeCustomizer.vue";
import type { Color } from "@/components/theming/types/colors";
import { PaintBrushIcon } from "@heroicons/vue/24/solid";
import { PaintBrushIcon as PaintBrushIconOutline } from "@heroicons/vue/24/outline";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useConfigStore } from "@/store/config";
import { LanguageIcon } from "@heroicons/vue/24/solid";
import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
const { t, locale, translationCh, translationEn } = useTranslationLang();
// 窗口操作
const appWindow = getCurrentWindow();
const isMaximized = ref(false);
const hoverIcon = ref(""); // 追踪鼠标悬停的图标状态

const allColors: Color[] = [
  "zinc",
  "rose",
  "blue",
  "green",
  "orange",
  "red",
  "slate",
  "stone",
  "gray",
  "neutral",
  "yellow",
  "violet",
];

// 初始化窗口状态
onMounted(() => {
  appWindow.isMaximized().then((maximized) => {
    isMaximized.value = maximized;
  });
});

// 窗口最大化/还原
function maximizeWindow() {
  appWindow.isMaximized().then((maximized) => {
    if (maximized) {
      appWindow.unmaximize();
    } else {
      appWindow.maximize();
    }
    isMaximized.value = !maximized;
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

const { theme, radius } = useConfigStore();

// Whenever the component is mounted, update the document class list
onMounted(() => {
  document.documentElement.style.setProperty("--radius", `${radius.value}rem`);
  document.documentElement.classList.add(`theme-${theme.value}`);
});

// Whenever the theme value changes, update the document class list
watch(theme, (theme) => {
  document.documentElement.classList.remove(
    ...allColors.map((color) => `theme-${color}`),
  );
  document.documentElement.classList.add(`theme-${theme}`);
});

// Whenever the radius value changes, update the document style
watch(radius, (radius) => {
  document.documentElement.style.setProperty("--radius", `${radius}rem`);
});
</script>

<style scoped>
.icon-container {
  position: relative;
  cursor: pointer;
  transition: transform 0.2s;
}

.icon-container:hover {
  transform: scale(1.1);
}
</style>
