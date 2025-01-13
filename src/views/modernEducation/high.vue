<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex flex-grow w-full">
      <!-- 左侧章节选择部分 -->
      <div
        class="p-2 transition-all duration-300 overflow-y-auto"
        style="
          width: 300px;
          min-width: 300px;
          max-width: 300px;
          height: calc(100vh - 64px);
        "
      >
        <Card class="h-full flex flex-col">
          <CardHeader>
            <CardTitle>论语</CardTitle>
            <CardDescription>春秋战国 · 孔子及其弟子</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-3 overflow-y-auto">
            <p>
              《论语》是孔子及其弟子的语录结集，由孔子弟子及再传弟子编写而成，至战国前期成书。全书共20篇492章，以语录体为主，叙事体为辅，主要记录孔子及其弟子的言行，较为集中地体现了孔子的政治主张、伦理思想、道德观念及教育原则等。
            </p>
            <Select v-model="selectedChapter">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="请选择一个章节" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>章节</SelectLabel>
                  <SelectItem
                    v-for="(chapter, index) in uniqueChapters"
                    :key="index"
                    :value="chapter"
                  >
                    {{ chapter }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <!-- Title 列表 -->
            <div v-if="currentTitles.length" class="mt-4">
              <ul class="title-list overflow-y-auto max-h-[300px]">
                <TooltipProvider>
                  <li
                    v-for="(title, index) in currentTitles"
                    :key="index"
                    class="title-item cursor-pointer p-2 rounded"
                    :class="{
                      'bg-primary-foreground text-primary':
                        selectedTitle.title === title.title,
                    }"
                    @click="selectedTitle = title"
                  >
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <span class="truncate">{{ title.title }}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{{ title.title }}</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                </TooltipProvider>
              </ul>
            </div>
            <!-- 显示拼音 -->
            <div class="flex flex-row items-center gap-x-2">
              <Checkbox
                id="show-pinyin"
                :checked="activeToggle.includes('pinyin')"
                @update:checked="toggleOption('pinyin')"
              />
              <label for="show-pinyin" class="font-medium leading-none">
                显示拼音
              </label>
            </div>

            <!-- 显示注释 -->
            <div class="flex flex-row items-center gap-x-2">
              <Checkbox
                id="show-annotations"
                :checked="activeToggle.includes('annotations')"
                @update:checked="toggleOption('annotations')"
              />
              <label for="show-annotations" class="font-medium leading-none">
                显示注释
              </label>
            </div>

            <!-- 显示翻译 -->
            <div class="flex flex-row items-center gap-x-2">
              <Checkbox
                id="show-translation"
                :checked="activeToggle.includes('translation')"
                @update:checked="toggleOption('translation')"
              />
              <label for="show-translation" class="font-medium leading-none">
                显示翻译
              </label>
            </div>

            <!-- 显示评析 -->
            <div class="flex flex-row items-center gap-x-2">
              <Checkbox
                id="show-commentary"
                :checked="activeToggle.includes('commentary')"
                @update:checked="toggleOption('commentary')"
              />
              <label for="show-commentary" class="font-medium leading-none">
                显示评析
              </label>
            </div>

            <!-- 调整字号 -->
            <div class="flex items-center space-x-3">
              <Button
                variant="secondary"
                class="w-8 h-8"
                @click="decreaseFontSize"
                >-</Button
              >
              <span class="text-sm font-medium">{{ fontSize }}</span>
              <Button
                variant="secondary"
                class="w-8 h-8"
                @click="increaseFontSize"
                >+</Button
              >
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- 右侧内容展示区域 -->
      <div
        class="p-2 transition-all duration-300 overflow-y-auto w-full"
        style="height: calc(100vh - 64px)"
      >
        <Card class="h-full flex flex-col">
          <!-- 动态章节标题 -->
          <CardHeader>
            <h1 class="text-xl font-bold text-center">
              {{ selectedTitle ? selectedTitle.title : "章节内容" }}
            </h1>
          </CardHeader>
          <!-- 动态章节内容 -->
          <CardContent class="flex-1 overflow-y-auto">
            <div
              v-if="selectedTitle"
              class="content"
              :style="{ fontSize: fontSize + 'px' }"
            >
              <!-- 内容展示 -->
              <div class="content-item">
                <ul class="content-list">
                  <li
                    v-for="(char, charIndex) in selectedTitle.details.content"
                    :key="charIndex"
                    class="qzw hover:bg-foreground hover:text-primary-foreground"
                  >
                    <i v-if="activeToggle.includes('pinyin')" class="pinyin">
                      {{ char.pinyin }}
                    </i>
                    <b class="character">{{ char.character }}</b>
                  </li>
                </ul>
              </div>

              <!-- 注释 -->
              <div
                v-if="activeToggle.includes('annotations')"
                class="annotations mt-4"
              >
                <h3 class="font-bold text-lg">注释：</h3>
                <ul class="annotation-list">
                  <li
                    v-for="(annotation, index) in selectedTitle.details
                      .annotations"
                    :key="index"
                  >
                    {{ annotation }}
                  </li>
                </ul>
              </div>

              <!-- 翻译 -->
              <div
                v-if="activeToggle.includes('translation')"
                class="translation mt-4"
              >
                <h3 class="font-bold text-lg">翻译：</h3>
                <p>{{ selectedTitle.details.translation }}</p>
              </div>

              <!-- 评析 -->
              <div
                v-if="activeToggle.includes('commentary')"
                class="commentary mt-4"
              >
                <h3 class="font-bold text-lg">评析：</h3>
                <p>{{ selectedTitle.details.commentary }}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// 数据导入
import { data } from "@/data/ancientCulture/lunyu";

// 初始化章节选择数据
const selectedChapter = ref(data[0].chapter); // 初始化选中第一个章节
const selectedTitle = ref(data[0]); // 初始化选中第一个章节的第一个 title
const activeToggle = ref<string[]>(["pinyin", "annotations"]); // 默认显示拼音和注释
const fontSize = ref<number>(16);

// 获取去重后的章节列表
const uniqueChapters = computed(() => [
  ...new Set(data.map((item) => item.chapter)),
]);

// 当前选中章节下的所有标题
const currentTitles = computed(() => {
  return data.filter((item) => item.chapter === selectedChapter.value);
});

// 监听章节变化，自动设置默认的第一个 title
watch(selectedChapter, (newChapter) => {
  if (newChapter) {
    selectedTitle.value = currentTitles.value[0]; // 默认选择第一个 title
  }
});

// 切换功能选项
const toggleOption = (option: string) => {
  const index = activeToggle.value.indexOf(option);
  if (index === -1) {
    activeToggle.value.push(option);
  } else {
    activeToggle.value.splice(index, 1);
  }
};

// 增加字号
const increaseFontSize = () => {
  fontSize.value += 2;
};

// 减小字号
const decreaseFontSize = () => {
  fontSize.value = Math.max(12, fontSize.value - 2);
};
</script>

<style scoped>
.flex {
  display: flex;
}

.h-full {
  height: 100%;
}

.w-full {
  width: 100%;
}

.qzw {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
  cursor: pointer;
}

.pinyin {
  font-size: 0.8em;
}

.character {
  font-size: 1.5em;
}

.content-item {
  color: hsl(var(--primary));
  background: hsl(var(--primary-foreground));
}

.annotations {
  padding: 10px;
  background: hsl(var(--muted));
  border-radius: 8px;
}

.annotation-list {
  padding: 0;
  list-style: none;
}

.translation,
.commentary {
  padding: 10px;
  margin-top: 20px;
  background: hsl(var(--muted));
  border: 1px solid hsl(var(--background));
  border-radius: 8px;
}

.title-list {
  max-height: 200px; /* 固定高度 */
  padding: 0;
  margin: 0;
  overflow-y: auto; /* 滚动条 */
  list-style: none;
}

.title-item {
  padding: 5px 10px;
  overflow: hidden;
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /* 保证一行显示 */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.title-item:hover {
  background-color: var(--primary-hover); /* 使用 shadcn-vue 的颜色系统 */
}

.title-item.bg-primary-100 {
  background-color: var(--primary-selected); /* 选中状态颜色 */
}

.overflow-y-auto {
  overflow-y: auto; /* 启用滚动条 */
}
</style>
