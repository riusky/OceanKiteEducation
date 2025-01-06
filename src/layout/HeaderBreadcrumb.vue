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
            <BreadcrumbLink>{{ currentItem?.title }}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>{{
              transformI18n(currentRoute.meta.title)
            }}</BreadcrumbPage>
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
import { ref, onMounted, watch, toRaw, defineProps } from "vue";
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
import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
const { t, locale } = useTranslationLang();
import { transformI18n } from "@/plugins/i18n";
import { useRoute, useRouter } from "vue-router";
import { getParentPaths, findRouteByPath } from "@/router/utils";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";

// 定义参数
const props = defineProps({
  currentItem: {
    type: Object,
    required: true,
  },
});

interface Route {
  path: string;
  name: string;
  meta?: {
    title: string;
  };
  query?: Record<string, any>;
  params?: Record<string, any>;
  id?: number;
  parentId?: number;
  pathList?: number[]; // 可以根据需求制定更详细的类型
}

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

const route = useRoute();
const levelList = ref<Route[]>([]);
const router = useRouter();
const routes: any = router.options.routes;
const multiTags: any = useMultiTagsStoreHook().multiTags;
const currentRoute = ref<Route>({
  path: "",
  name: "",
  meta: {
    title: "",
  },
});

// 获取面包屑功能
const getBreadcrumb = (): void => {
  // 当前路由信息
  currentRoute.value = findRouteByPath(router.currentRoute.value.path, routes);

  const parentRoutes = getParentPaths(
    router.currentRoute.value.name as string,
    routes,
    "name",
  );

  const matched = [];

  parentRoutes.forEach((path) => {
    if (path !== "/") matched.push(findRouteByPath(path, routes));
  });

  matched.push(currentRoute);

  matched.forEach((item, index) => {
    if (currentRoute.value?.query || currentRoute.value?.params) return;
    if (item?.children) {
      item.children.forEach((v) => {
        if (v?.meta?.title === item?.meta?.title) {
          matched.splice(index, 1);
        }
      });
    }
  });

  levelList.value = matched.filter(
    (item) => item?.meta && item?.meta.title !== false,
  );
};

watch(
  () => route.path,
  () => {
    getBreadcrumb();
  },
  {
    deep: true,
  },
);

// 初始化窗口状态
onMounted(() => {
  getBreadcrumb();
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

// 更新文档的类列表
onMounted(() => {
  document.documentElement.style.setProperty("--radius", `${radius.value}rem`);
  document.documentElement.classList.add(`theme-${theme.value}`);
});

// 监听 theme 和 radius 变化
watch(theme, (theme) => {
  document.documentElement.classList.remove(
    ...allColors.map((color) => `theme-${color}`),
  );
  document.documentElement.classList.add(`theme-${theme}`);
});

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
