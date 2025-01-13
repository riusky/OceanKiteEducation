<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex flex-grow w-full">
      <!-- 左侧操作部分 -->
      <div
        class="p-3 transition-all duration-300"
        style="width: 300px; min-width: 300px; max-width: 300px"
      >
        <Card class="h-full">
          <CardHeader>
            <CardTitle>朱子家训</CardTitle>
            <CardDescription>明末清初 · 朱柏庐</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-3">
            <p>
              《朱子家训》又名《朱子治家格言》、《朱柏庐治家格言》，是以家庭道德为主的启蒙教材。《朱子家训》仅506字，精辟地阐明了修身治家之道，是一篇家教名著。其中，许多内容继承了中国传统文化的优秀特点，比如尊敬师长，勤俭持家，邻里和睦等，在今天仍然有现实意义。”。
            </p>

            <!-- 章节选择 -->
            <Separator class="my-4" label="选择章节" />
            <div>
              <Select v-model="selectedChapter">
                <SelectItem
                  v-for="(chapter, idx) in data"
                  :key="idx"
                  :value="chapter.title"
                >
                  {{ chapter.title }}
                </SelectItem>
              </Select>
            </div>

            <!-- 显示拼音 -->
            <div class="flex flex-row items-center gap-x-2">
              <Checkbox
                id="show-pinyin"
                :checked="formValues.showPinyin"
                @update:checked="(value) => (formValues.showPinyin = value)"
              />
              <label for="show-pinyin" class="font-medium leading-none">
                显示拼音
              </label>
            </div>

            <!-- 显示注释 -->
            <div class="flex flex-row items-center gap-x-2">
              <Checkbox
                id="show-explanation"
                :checked="formValues.showExplanation"
                @update:checked="
                  (value) => (formValues.showExplanation = value)
                "
              />
              <label for="show-explanation" class="font-medium leading-none">
                显示注释
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
      <div class="flex-grow p-4 transition-all duration-300">
        <Card class="h-full flex flex-col">
          <CardHeader>
            <!-- 顶部章节标题 -->
            <h1 class="text-xl font-bold text-center">{{ selectedChapter }}</h1>
          </CardHeader>
          <CardContent class="flex-1 overflow-y-auto">
            <div class="content" :style="{ fontSize: fontSize + 'px' }">
              <ul class="content-list">
                <li
                  v-for="(section, idx) in currentSections"
                  :key="idx"
                  class="content-item"
                >
                  <!-- 字符展示 -->
                  <div class="content-item-list">
                    <span
                      v-for="(char, charIdx) in [
                        { pinyin: '', character: '' },
                        { pinyin: '', character: '' },
                      ].concat(section.characters)"
                      :key="charIdx"
                      class="qzw hover:bg-foreground hover:text-primary-foreground"
                    >
                      <i v-if="formValues.showPinyin" class="pinyin">{{
                        char.pinyin
                      }}</i>
                      <b class="character">{{ char.character }}</b>
                    </span>
                  </div>

                  <!-- 注释展示 -->
                  <div
                    v-if="formValues.showExplanation"
                    class="text-sm leading-relaxed indent-2"
                    :style="{ fontSize: fontSize - 6 + 'px' }"
                  >
                    {{ section.explanation }}
                  </div>
                </li>
              </ul>
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
import { Select, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { data } from "@/data/ancientCulture/zhuzijiaxun"; // 数据导入
import { Separator } from "@/components/ui/separator";

// 左侧操作状态
const selectedChapter = ref(data[0].title);
const formValues = ref({
  showPinyin: false, // 默认不显示拼音
  showExplanation: false, // 默认不显示注释
});
const fontSize = ref(16); // 默认字号 20

// 当前章节的所有段落
const currentSections = computed(() => {
  const chapter = data.find((d) => d.title === selectedChapter.value);
  return chapter?.content || [];
});

// 控制加大和减小字号
const increaseFontSize = () => {
  fontSize.value = Math.min(fontSize.value + 2, 32); // 最大字号32
};

const decreaseFontSize = () => {
  fontSize.value = Math.max(fontSize.value - 2, 12); // 最小字号12
};
</script>

<style scoped>
/* 顶部标题居中样式 */
h1 {
  margin: 0;
  text-align: center;
}

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
  transition:
    background-color 0.3s,
    color 0.3s;
}

.pinyin {
  font-size: 0.8em;
}

.character {
  font-size: 1.5em;
}

.content {
  max-height: calc(100vh - 200px);
  padding: 5px;
  overflow-y: auto;
}

.content-list {
  padding: 0;
  list-style-type: none;
}

.content-item {
  padding: 15px;
  margin-top: 20px;
  color: hsl(var(--primary));
  background: hsl(var(--primary-foreground));
  border: 1px solid hsl(var(--primary));
  border-radius: 5px; /* 边框圆角 */
}

.content-item-list {
  display: flex;
  flex-wrap: wrap; /* 自动换行 */
}
</style>
