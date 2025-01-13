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
            <CardTitle>《千字文》</CardTitle>
            <CardDescription>南朝 · 周兴嗣</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-3">
            <p>
              《千字文》出自南朝才人周兴嗣，全文由完全不重复的一千个字组成，包含了天文、地理、历史、社会、伦理、教育等等多方面的知识，是我国历史上综合性启蒙教育读物的开山之作。
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
                显示解释
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
            <h1 class="text-xl font-bold text-center">千字文</h1>
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
                  class="qzw_yiwen"
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
import { data } from "@/data/ancientCulture/qianziwen"; // 数据导入

const contentList = ref(data); // 数据

const activeToggle = ref<string[]>([]);
const fontSize = ref<number>(16);

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

// 将内容分为每组4个字
const getGroups = (content) => {
  const groups = [];
  for (let i = 0; i < content.length; i += 4) {
    groups.push(content.slice(i, i + 4));
  }
  return groups;
};
</script>

<style scoped>
/* 整体布局样式 */
.flex {
  display: flex;
}

.h-full {
  height: 100%;
}

.w-full {
  width: 100%;
}

/* 拼音和汉字样式 */
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

/* 内容区样式 */
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
  display: inline-flex; /* 使用inline-flex确保在同一行内显示 */
  flex-direction: column; /* 垂直排列拼音和汉字 */
  align-items: center; /* 中心对齐 */
  width: 25%;
}

.qzw_yiwen {
  margin-top: 10px;
  font-style: italic;
  color: #666; /* 注释颜色 */
}
</style>
