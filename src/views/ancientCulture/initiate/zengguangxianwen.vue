<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex flex-grow w-full">
      <!-- 左侧功能切换部分 -->
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
            <CardTitle>增广贤文</CardTitle>
            <CardDescription>明朝 · 佚名</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-3 overflow-y-auto">
            <p>
              《增广贤文》为中国古代儿童启蒙书目。又名《昔时贤文》、《古今贤文》。书名最早见之于明代万历年间的戏曲《牡丹亭》，据此可推知此书最迟写成于万历年间。后来，经过明、清两代文人的不断增补，才改成现在这个模样，称《增广昔时贤文》，通称《增广贤文》。作者一直未见任何书载，只知道清代同治年间儒生周希陶曾进行过重订，很可能是民间创作的结晶。
            </p>

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

      <!-- 右侧内容展示部分 -->
      <div
        class="p-2 transition-all duration-300 overflow-y-auto w-full"
        style="height: calc(100vh - 64px)"
      >
        <Card class="h-full flex flex-col">
          <CardHeader>
            <h1 class="text-xl font-bold text-center">增广贤文</h1>
          </CardHeader>
          <!-- 动态内容展示 -->
          <CardContent class="flex-1 overflow-y-auto">
            <div class="content" :style="{ fontSize: fontSize + 'px' }">
              <!-- 遍历所有 data 元素 -->
              <div
                v-for="(item, itemIndex) in data"
                :key="itemIndex"
                class="mb-4"
              >
                <!-- 拼音和文字展示 -->
                <div class="pinyin-grid content-item">
                  <!-- 首行空两个格子 -->
                  <span class="pinyin-cell indent-placeholder" />
                  <span class="pinyin-cell indent-placeholder" />

                  <!-- 拼音和文字 -->
                  <span
                    v-for="(term, termIndex) in item.terms"
                    :key="termIndex"
                    class="pinyin-cell"
                  >
                    <i v-if="activeToggle.includes('pinyin')" class="pinyin">
                      {{ term.pinyin }}
                    </i>
                    <b class="character">{{ term.character }}</b>
                  </span>
                </div>

                <!-- 解释 -->
                <div
                  v-if="activeToggle.includes('explanation')"
                  class="explanation mt-1"
                >
                  <h3 class="text-sm text-gray-500">{{ item.explanation }}</h3>
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

// 数据导入
import { data } from "@/data/ancientCulture/zengguangxianwen";

// 状态
const activeToggle = ref<string[]>(["pinyin", "explanation"]); // 默认显示拼音和解释
const fontSize = ref<number>(16); // 默认字号

// 功能切换
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
  margin-bottom: 4px;
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
