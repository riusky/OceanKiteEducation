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
            <CardTitle>三字经</CardTitle>
            <CardDescription>宋朝 · 王应麟</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-3">
            <p>
              《三字经》三字一句，朗朗上口，短小精悍，通俗易懂。以“人之初，性本善”起篇，叙述了三纲五常十义，五谷六畜七情，四书六经诸子，历史朝代更迭，最后以著名事例作结。通篇涵盖了中国传统文化文学、历史、天文、地理等知识，宣扬了传统伦理思想，如“仁、义、诚、敬、孝”。
            </p>

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
                id="show-explanation"
                :checked="activeToggle.includes('explanation')"
                @update:checked="toggleOption('explanation')"
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
            <h1 class="text-xl font-bold text-center">弟子规</h1>
          </CardHeader>
          <CardContent class="flex-1 overflow-y-auto">
            <div class="content" :style="{ fontSize: fontSize + 'px' }">
              <div
                v-for="(item, index) in contentList"
                :key="index"
                class="content-item"
              >
                <ul class="content-list">
                  <li
                    v-for="(group, groupIndex) in getGroups(item.content)"
                    :key="groupIndex"
                    class="content-item-list"
                  >
                    <span>
                      <span
                        v-for="(char, charIndex) in group"
                        :key="charIndex"
                        class="qzw hover:bg-foreground hover:text-primary-foreground"
                      >
                        <i
                          v-if="activeToggle.includes('pinyin')"
                          class="pinyin"
                        >
                          {{ char.pinyin }}
                        </i>
                        <b class="character">{{ char.character }}</b>
                      </span>
                    </span>
                  </li>
                </ul>
                <div
                  v-if="activeToggle.includes('explanation')"
                  class="qzw_yiwen text-sm leading-relaxed indent-2 mt-4"
                >
                  <p>{{ item.explanation }}</p>
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
import { ref } from "vue";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { data } from "@/data/ancientCulture/sanzijing"; // 导入数据

const contentList = ref(data); // 数据赋值为响应式变量

const activeToggle = ref<string[]>([]); // 拼音与注释的开关
const fontSize = ref<number>(20); // 默认字号

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

// 将内容分为每组三个字一次
const getGroups = (content) => {
  const groups = [];
  for (let i = 0; i < content.length; i += 3) {
    groups.push(content.slice(i, i + 3));
  }
  return groups;
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
  display: inline-flex; /* 使用inline-flex确保在同一行内显示 */
  flex-direction: column; /* 垂直排列拼音和汉字 */
  align-items: center; /* 中心对齐 */
  margin: 0 5px; /* 左右增加间距 */
}

.pinyin {
  font-size: 0.8em; /* 设置拼音字体为更小 */
}

.character {
  font-size: 1.5em; /* 增加汉字的字体大小 */
}

.qzw_yiwen {
  margin-top: 10px; /* 注释的上边距 */
}

.content {
  max-height: calc(
    100vh - 200px
  ); /* 设置一个最大高度，考虑 header 和控制器的高度 */

  padding: 5px; /* 为内容添加内边距 */
  overflow-y: auto; /* 使内容区域在超出最大高度时可滚动 */
}

.content-item {
  padding: 15px;
  margin-top: 20px;
  color: hsl(var(--primary));
  background: hsl(var(--primary-foreground));
  border: 1px solid hsl(var(--primary));
  border-radius: 5px; /* 边框圆角 */
}

.content-list {
  display: flex; /* 使用flex来显示列表 */
  flex-wrap: wrap; /* 允许换行 */
  padding: 0; /* 去掉内边距 */
  list-style-type: none; /* 去掉默认的列表样式 */
}

.content-item-list {
  display: inline-flex; /* 使用inline-flex确保在同一行内显示 */
  flex-direction: column; /* 垂直排列拼音和汉字 */
  align-items: center; /* 中心对齐 */
  width: 25%;
}
</style>
