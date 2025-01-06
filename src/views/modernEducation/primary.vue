<template>
  <div class="container flex">
    <div class="content-wrapper">
      <div class="header">
        <h4>《三字经》</h4>
        <p>宋朝 · 王应麟</p>
      </div>

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
                  class="qzw"
                >
                  <i v-if="activeToggle.includes('pinyin')" class="pinyin">{{
                    char.pinyin
                  }}</i>
                  <b class="character">{{ char.character }}</b>
                </span>
              </span>
            </li>
          </ul>
          <div v-if="activeToggle.includes('explanation')" class="qzw_yiwen">
            <p>{{ item.explanation }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="controls flex flex-col justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              :variant="activeToggle.includes('pinyin') ? 'default' : 'outline'"
              class="tooltip-button"
              @click="toggleOption('pinyin')"
            >
              显示拼音
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>点击以显示拼音</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              :variant="
                activeToggle.includes('explanation') ? 'default' : 'outline'
              "
              class="tooltip-button"
              @click="toggleOption('explanation')"
            >
              显示解释
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>点击以显示解释</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="outline"
              class="tooltip-button"
              @click="increaseFontSize"
            >
              加大字号
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>点击以加大字号</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="outline"
              class="tooltip-button"
              @click="decreaseFontSize"
            >
              减小字号
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>点击以减小字号</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { data } from "@/data/ancientCulture/three_character_classic"; // 导入数据

const contentList = ref(data); // 将导入的数据赋值给组件的响应式变量

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
.container {
  display: flex;
  padding: 20px;
}

.header {
  margin-bottom: 20px; /* 和下方内容的间距 */
  text-align: center; /* 文本居中 */
}

.header h4 {
  margin: 0; /* 去掉默认的外边距 */
  font-size: 1.5em; /* 设置标题字体大小 */
}

.header p {
  margin: 5px 0 0; /* 上边距 */
  font-size: 1.2em; /* 添加作者的字体大小 */
}

.content-wrapper {
  flex-grow: 1; /* 使内容区域可扩展 */
  overflow: hidden; /* 防止出现滚动条 */
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
  border: 1px solid #ccc;
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

  /* font-style: italic; 注释为斜体 */
}

.controls {
  display: flex;
  flex-direction: column;
  margin-left: 20px; /* 控制器的边距 */
}

.active {
  background-color: #e2e2e2; /* 激活状态的背景 */
}

.tooltip-button {
  margin-bottom: 10px; /* 为每个按钮添加下边距 */
}
</style>
