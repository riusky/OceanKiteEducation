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
            <CardTitle>中庸</CardTitle>
            <CardDescription>南宋朝 · 子思</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-3 overflow-y-auto">
            <p>
              《中庸》是一篇论述儒家人性修养的散文，原是《礼记》第三十一篇，相传为子思所作，是儒家学说经典论著。
            </p>

            <!-- 分类选择 -->
            <Select v-model="selectedChapter">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="请选择章节" />
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

            <!-- 标题列表 -->
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
                    @click="selectTitle(title)"
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

            <!-- 功能切换 -->
            <div class="flex flex-col gap-2 mt-4">
              <div
                v-for="option in toggleOptions"
                :key="option.id"
                class="flex items-center gap-2"
              >
                <Checkbox
                  :id="option.id"
                  :checked="activeToggle.includes(option.id)"
                  @update:checked="toggleOption(option.id)"
                />
                <label :for="option.id" class="font-medium leading-none">{{
                  option.label
                }}</label>
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
                <div class="pinyin-grid">
                  <span class="indent" />
                  <span
                    v-for="(char, charIndex) in selectedTitle.details.content"
                    :key="charIndex"
                    class="pinyin-cell"
                  >
                    <i v-if="activeToggle.includes('pinyin')" class="pinyin">{{
                      char.pinyin
                    }}</i>
                    <b class="character">{{ char.character }}</b>
                  </span>
                </div>
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
import { data } from "@/data/sishu/zhongyong";

// 初始化章节选择数据
const selectedChapter = ref(data[0].chapter);
const selectedTitle = ref(data[0]);
const activeToggle = ref<string[]>(["pinyin", "annotations"]);
const fontSize = ref<number>(16);

const uniqueChapters = computed(() => [
  ...new Set(data.map((item) => item.chapter)),
]);

const currentTitles = computed(() => {
  return data.filter((item) => item.chapter === selectedChapter.value);
});

const selectTitle = (title) => {
  selectedTitle.value = title;
};

const toggleOptions = [
  { id: "pinyin", label: "显示拼音" },
  { id: "annotations", label: "显示注释" },
  { id: "translation", label: "显示翻译" },
  { id: "commentary", label: "显示评析" },
];

const toggleOption = (option: string) => {
  const index = activeToggle.value.indexOf(option);
  if (index === -1) {
    activeToggle.value.push(option);
  } else {
    activeToggle.value.splice(index, 1);
  }
};

const increaseFontSize = () => {
  fontSize.value += 2;
};

const decreaseFontSize = () => {
  fontSize.value = Math.max(12, fontSize.value - 2);
};

watch(selectedChapter, () => {
  selectedTitle.value = currentTitles.value[0];
});
</script>

<style scoped>
.pinyin-paragraph {
  margin-bottom: 4px;
}

.pinyin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 4px;
  place-items: center center;
}

.indent {
  grid-column: span 2;
}

.pinyin-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* height: 60px; */
  text-align: center;
}

.pinyin {
  font-size: 0.9em;
  color: hsl(var(--primary));
}

.character {
  margin-top: 4px;
  font-size: 1.4em;
  font-weight: bold;
}

.content-item {
  color: hsl(var(--primary));
  background: hsl(var(--primary-foreground));

  /* border: 1px solid hsl(var(--primary)); */
  border-radius: 5px; /* 边框圆角 */
}

.annotations,
.translation,
.commentary {
  padding: 10px;
  margin-top: 20px;
  background: hsl(var(--muted));
  border: 1px solid hsl(var(--background));
  border-radius: 8px;
}

.title-list {
  max-height: 200px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.title-item {
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.title-item:hover {
  background-color: var(--primary-hover);
}

.title-item.bg-primary-foreground {
  background-color: var(--primary-selected);
}
</style>
