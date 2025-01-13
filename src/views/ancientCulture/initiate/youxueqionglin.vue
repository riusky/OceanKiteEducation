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
            <CardTitle>幼学琼林</CardTitle>
            <CardDescription>明朝 · 程登吉</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-3 overflow-y-auto">
            <p>
              《幼学琼林》是骈体文写成的，全书全部用对偶句写成，容易诵读，便于记忆。全书内容广博、包罗万象，被称为中国古代的百科全书。
            </p>

            <!-- 卷册选择 -->
            <Select v-model="selectedVolume">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="请选择卷册" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>卷册</SelectLabel>
                  <SelectItem
                    v-for="(volume, index) in uniqueVolumes"
                    :key="index"
                    :value="volume"
                  >
                    {{ volume }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <!-- 章节列表 -->
            <div v-if="currentChapters.length" class="mt-4">
              <ul class="title-list overflow-y-auto max-h-[300px]">
                <TooltipProvider>
                  <li
                    v-for="(chapter, index) in currentChapters"
                    :key="index"
                    class="title-item cursor-pointer p-2 rounded"
                    :class="{
                      'bg-primary-foreground text-primary':
                        selectedChapter.number === chapter.number,
                    }"
                    @click="selectChapter(chapter)"
                  >
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <span class="truncate"
                          >{{ chapter.number }} - {{ chapter.title }}</span
                        >
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{{ chapter.number }} - {{ chapter.title }}</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                </TooltipProvider>
              </ul>
            </div>

            <!-- 功能切换 -->
            <div class="flex flex-col gap-2 mt-4">
              <div class="flex items-center gap-2">
                <Checkbox
                  id="show-pinyin"
                  :checked="activeToggle.includes('pinyin')"
                  @update:checked="toggleOption('pinyin')"
                />
                <label for="show-pinyin" class="font-medium leading-none">
                  显示拼音
                </label>
              </div>
              <div class="flex items-center gap-2">
                <Checkbox
                  id="show-explanation"
                  :checked="activeToggle.includes('explanation')"
                  @update:checked="toggleOption('explanation')"
                />
                <label for="show-explanation" class="font-medium leading-none">
                  显示解释
                </label>
              </div>
            </div>

            <!-- 字号调整 -->
            <div class="flex items-center space-x-3 mt-4">
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
              {{
                selectedChapter
                  ? selectedChapter.number + " - " + selectedChapter.title
                  : "章节内容"
              }}
            </h1>
          </CardHeader>
          <!-- 动态章节内容 -->
          <CardContent class="flex-1 overflow-y-auto">
            <div
              v-if="selectedChapter"
              class="content"
              :style="{ fontSize: fontSize + 'px' }"
            >
              <!-- 每段内容 -->
              <div
                v-for="(section, sectionIndex) in selectedChapter.content"
                :key="sectionIndex"
                class="mb-6"
              >
                <!-- 拼音和文字网格布局 -->
                <div class="pinyin-grid content-item">
                  <!-- 添加两个占位格子，用于首行空格 -->
                  <span class="pinyin-cell indent-placeholder" />
                  <span class="pinyin-cell indent-placeholder" />

                  <!-- 拼音和文字 -->
                  <span
                    v-for="(verse, verseIndex) in section.verses"
                    :key="verseIndex"
                    class="pinyin-cell"
                  >
                    <i v-if="activeToggle.includes('pinyin')" class="pinyin">
                      {{ verse.pinyin }}
                    </i>
                    <b class="character">{{ verse.character }}</b>
                  </span>
                </div>

                <!-- 段落解释 -->
                <div
                  v-if="activeToggle.includes('explanation')"
                  class="explanation mt-2"
                >
                  <h3 class="text-sm">
                    {{ section.explanation }}
                  </h3>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
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
import { data } from "@/data/ancientCulture/youxueqionglin";

// 状态
const selectedVolume = ref(data[0].volume); // 默认选择第一卷
const selectedChapter = ref(data[0].chapters[0]); // 默认选择第一章
const activeToggle = ref<string[]>(["pinyin", "explanation"]); // 默认显示拼音和解释
const fontSize = ref<number>(16); // 默认字号

// 计算卷册和章节
const uniqueVolumes = computed(() => data.map((item) => item.volume));
const currentChapters = computed(() => {
  const volumeData = data.find((item) => item.volume === selectedVolume.value);
  return volumeData ? volumeData.chapters : [];
});

// 切换章节
const selectChapter = (chapter) => {
  selectedChapter.value = chapter;
};

// 切换功能
const toggleOption = (option: string) => {
  const index = activeToggle.value.indexOf(option);
  if (index === -1) {
    activeToggle.value.push(option);
  } else {
    activeToggle.value.splice(index, 1);
  }
};

// 字号调整
const increaseFontSize = () => {
  fontSize.value += 2;
};
const decreaseFontSize = () => {
  fontSize.value = Math.max(12, fontSize.value - 2);
};
</script>

<style scoped>
.pinyin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr)); /* 动态网格 */
  gap: 8px; /* 每个格子的间距 */
  place-items: center; /* 居中对齐 */
  text-align: center;
}

.pinyin-cell {
  display: flex;
  flex-direction: column; /* 让拼音在文字上方 */
  align-items: center;
  justify-content: center;
  text-align: center;
}

.indent-placeholder {
  visibility: hidden; /* 隐藏占位格子，但保留空间 */
}

.pinyin {
  font-size: 0.9em;
  line-height: 1; /* 紧贴文字 */
  color: hsl(var(--primary));
}

.character {
  margin-top: 2px;
  font-size: 1.4em;
  font-weight: bold;
}

.explanation {
  padding: 10px;
  color: hsl(var(--accent-foreground));
  text-indent: 2em; /* 首行缩进 */
  background: hsl(var(--accent));
  border: 1px solid hsl(var(--background));
  border-radius: 8px;
}

.content-item {
  padding: 10px;
  color: hsl(var(--primary));
  background: hsl(var(--primary-foreground));

  /* border: 1px solid hsl(var(--primary)); */
  border-radius: 5px; /* 边框圆角 */
}
</style>
