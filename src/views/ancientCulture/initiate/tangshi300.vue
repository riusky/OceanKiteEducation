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
            <CardTitle>唐诗三百首</CardTitle>
            <CardDescription>清朝 · 孙洙</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-3 overflow-y-auto">
            <p>
              《唐诗三百首》共选入唐代诗人77位，计311首诗，其中五言古诗33首，乐府46首，七言古诗28首，七言律诗50首，五言绝句29首，七言绝句51首，诸诗配有注释和评点。
            </p>

            <Select v-model="selectedCategory">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="请选择分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>分类</SelectLabel>
                  <SelectItem
                    v-for="(category, index) in uniqueCategories"
                    :key="index"
                    :value="category"
                  >
                    {{ category }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <!-- Title 列表 -->
            <div v-if="filteredTitles.length" class="mt-4">
              <ul class="title-list overflow-y-auto max-h-[200px]">
                <TooltipProvider>
                  <li
                    v-for="(title, index) in filteredTitles"
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

            <!-- 调整字号 -->
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
            <CardDescription class="text-center">{{
              selectedTitle
                ? `${selectedTitle.dynasty} · ${selectedTitle.author}`
                : "无"
            }}</CardDescription>
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
                  <!-- 判断 pinyinCharacters 的长度是否为 1 -->
                  <template v-if="selectedTitle.pinyinCharacters.length === 1">
                    <li>
                      <!-- 字符展示 -->
                      <div class="content-item-list">
                        <span
                          v-for="(char, charIdx) in [
                            { pinyin: '', character: '' },
                            { pinyin: '', character: '' },
                          ].concat(selectedTitle.pinyinCharacters[0])"
                          :key="charIdx"
                          class="qzw2"
                        >
                          <i
                            v-if="activeToggle.includes('pinyin')"
                            class="pinyin"
                            >{{ char.pinyin }}</i
                          >
                          <b class="character">{{ char.character }}</b>
                        </span>
                      </div>

                      <!-- 特殊展示结构 -->
                      <!-- <div
                        v-for="(char, charIndex) in selectedTitle
                          .pinyinCharacters[0]"
                        :key="charIndex"
                        class="content-item-list"
                      >
                        <i
                          v-if="activeToggle.includes('pinyin')"
                          class="pinyin"
                          >{{ char.pinyin }}</i
                        >
                        <b class="character">{{ char.character }}</b>
                      </div> -->
                    </li>
                  </template>
                  <!-- 常规展示结构 -->
                  <template v-else>
                    <li
                      v-for="(
                        line, lineIndex
                      ) in selectedTitle.pinyinCharacters"
                      :key="lineIndex"
                      class="qzw flex"
                    >
                      <div
                        v-for="(char, charIndex) in line"
                        :key="charIndex"
                        class="flex flex-col items-center m-1"
                      >
                        <i
                          v-if="activeToggle.includes('pinyin')"
                          class="pinyin"
                          >{{ char.pinyin }}</i
                        >
                        <b class="character">{{ char.character }}</b>
                      </div>
                    </li>
                  </template>
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
                    v-for="(annotation, index) in selectedTitle.annotations"
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
                <!-- 使用 v-html 渲染 HTML 格式 -->
                <div v-html="selectedTitle.translation" />
              </div>

              <!-- 评析 -->
              <div
                v-if="activeToggle.includes('commentary')"
                class="commentary mt-4"
              >
                <h3 class="font-bold text-lg">评析：</h3>
                <!-- 使用 v-html 渲染 HTML 格式 -->
                <div v-html="selectedTitle.comments" />
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
import { data } from "@/data/ancientCulture/tangshi300";

// 初始化章节选择数据
const selectedCategory = ref(data[0].category); // 初始化选中第一个章节
const selectedTitle = ref(data[0]); // 初始化为第一个诗歌
const activeToggle = ref<string[]>(["pinyin", "annotations"]); // 默认显示拼音和注释
const fontSize = ref<number>(16);

// 获取分类列表
const uniqueCategories = computed(() => [
  ...new Set(data.map((item) => item.category)),
]);

// 当前分类的标题列表
const filteredTitles = computed(() => {
  return data.filter((item) => item.category === selectedCategory.value);
});

// 切换选中标题
const selectTitle = (title) => {
  selectedTitle.value = title;
};

// 功能选项
const toggleOptions = [
  { id: "pinyin", label: "显示拼音" },
  { id: "annotations", label: "显示注释" },
  { id: "translation", label: "显示翻译" },
  { id: "commentary", label: "显示评析" },
];

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

// 监听章节变化，自动设置默认的第一个 title
watch(selectedCategory, (newChapter) => {
  if (newChapter) {
    selectedTitle.value = filteredTitles.value[0]; // 默认选择第一个 title
  }
});
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

.content-list {
  display: flex;
  flex-direction: column; /* 垂直排列每一行 */
  padding: 0;
  margin: 0;
  list-style: none; /* 去掉默认的列表样式 */
}

.qzw {
  display: flex; /* 使用 flex 布局一行中的字 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.qzw.special-display {
  gap: 20px; /* 调整每个字之间的间距 */
  justify-content: center; /* 水平居中 */
}

.qzw div {
  display: flex;
  flex-direction: column; /* 拼音和汉字垂直排列 */
  align-items: center; /* 居中对齐 */
  min-width: 50px; /* 每列的最小宽度，确保对齐 */
  text-align: center; /* 文字居中 */
}

.qzw2 {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.pinyin {
  font-size: 0.8em; /* 拼音字体 */
  line-height: 1; /* 紧凑行高 */
}

.character {
  font-size: 1.5em; /* 汉字字体 */
  line-height: 1.5; /* 保证垂直间距 */
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

.content-item-list {
  display: flex;
  flex-wrap: wrap; /* 自动换行 */
}
</style>
