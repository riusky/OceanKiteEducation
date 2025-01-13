<template>
  <div class="flex flex-col h-full w-full">
    <Drawer>
      <div class="flex flex-grow w-full">
        <!-- 左侧操作部分 -->
        <div
          class="p-3 transition-all duration-300"
          style="width: 300px; min-width: 300px; max-width: 300px"
        >
          <Card class="h-full">
            <CardHeader>
              <CardTitle>《百家姓》</CardTitle>
              <CardDescription>南朝 · 周兴嗣</CardDescription>
            </CardHeader>
            <CardContent class="flex flex-col gap-3">
              <p>
                《百家姓》是中华姓氏的蒙学识字书籍，采用四言韵句，对不同的姓氏进行了排列，句句押韵。全篇504个姓氏，占流传至今还在使用的三千个姓氏的六分之一，但是已经包含了大部分人口的姓氏，具有很强的代表性。
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
              <h1 class="text-xl font-bold text-center">百家姓</h1>
            </CardHeader>
            <CardContent class="flex-1 overflow-y-auto">
              <div class="content" :style="{ fontSize: fontSize + 'px' }">
                <ul class="content-list">
                  <li
                    v-for="(line, lineIndex) in getLines(contentList)"
                    :key="lineIndex"
                    class="content-item"
                  >
                    <div class="content-item-list">
                      <span
                        v-for="(group, groupIndex) in line"
                        :key="groupIndex"
                        class="group"
                      >
                        <span
                          v-for="(char, charIndex) in group"
                          :key="charIndex"
                          class="qzw hover:bg-foreground hover:text-primary-foreground"
                          @click="openDrawer(char)"
                        >
                          <DrawerTrigger as-child>
                            <i
                              v-if="activeToggle.includes('pinyin')"
                              class="pinyin"
                            >
                              {{ char.pinyin }}
                            </i>
                            <b class="character">{{ char.surname }}</b>
                          </DrawerTrigger>
                        </span>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- 抽屉组件 -->
      <DrawerContent class="flex flex-col h-1/2 overflow-hidden">
        <DrawerHeader>
          <DrawerTitle>百家姓: {{ selectedItem.surname }}</DrawerTitle>
          <CardDescription />
        </DrawerHeader>
        <div class="flex w-full h-full overflow-hidden">
          <div class="w-1/3 border-r overflow-y-auto p-4">
            <!-- 左侧内容 -->
            <h5><strong>历史来源</strong></h5>
            <div v-html="selectedItem.history || '暂无数据'" />
          </div>
          <div class="w-1/3 border-r overflow-y-auto p-4">
            <!-- 中间内容 -->
            <!-- <h5><strong>家族名人</strong></h5> -->
            <div v-html="selectedItem.famousNames || '暂无数据'" />
          </div>
          <div class="w-1/3 overflow-y-auto p-4">
            <!-- 右侧内容 -->
            <h5><strong>地望分布</strong></h5>
            <div v-html="selectedItem.distribution || '暂无数据'" />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
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
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { data } from "@/data/ancientCulture/baijiaxing_single"; // 导入数据

const contentList = ref(data); // 数据赋值为响应式变量
const activeToggle = ref<string[]>([]); // 拼音与注释的开关
const fontSize = ref<number>(16); // 默认字号
const selectedItem = ref(data[0]); // 选中条目数据

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

// 将内容数据分组为每行（每行四组）
const getLines = (items) => {
  const chars = items.map((item) => ({
    surname: item.surname,
    pinyin: item.pinyin,
    history: item.history,
    famousNames: item.famousNames,
    distribution: item.distribution,
  }));

  const lines = [];
  for (let i = 0; i < chars.length; i += 4) {
    lines.push(chars.slice(i, i + 4)); // 每4个字符为一行
  }

  // 组合每4组，形成完整的行
  const result = [];
  for (let i = 0; i < lines.length; i += 4) {
    result.push(lines.slice(i, i + 4)); // 每4组成为一行
  }

  return result;
};

// 打开抽屉并显示相关信息
const openDrawer = (item) => {
  selectedItem.value = item;
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
  flex-wrap: wrap;
  justify-content: space-around;
}

.group {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
}
</style>
