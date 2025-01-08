<template>
  <div class="container flex">
    <Drawer>
      <div class="content-wrapper">
        <div class="header">
          <h4>《百家姓》</h4>
          <p>南朝 · 周兴嗣</p>
        </div>

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
                  <DrawerTrigger as-child>
                    <div
                      class="name-group flex hover:bg-foreground hover:text-primary-foreground"
                      @click="openDrawer(group)"
                    >
                      <span
                        v-for="(char, charIndex) in group.names"
                        :key="charIndex"
                        class="qzw"
                      >
                        <i
                          v-if="activeToggle.includes('pinyin')"
                          class="pinyin"
                        >
                          {{ char.pinyin }}
                        </i>
                        <b class="character">{{ char.character }}</b>
                      </span>
                    </div>
                  </DrawerTrigger>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="controls flex flex-col justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                :variant="
                  activeToggle.includes('pinyin') ? 'default' : 'outline'
                "
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

      <DrawerContent class="flex flex-col h-1/2 overflow-hidden">
        <DrawerHeader>
          <DrawerTitle
            >百家姓:
            {{
              selectedItem.names.map((name) => name.character).join("")
            }}</DrawerTitle
          >
        </DrawerHeader>
        <div class="flex w-full h-full overflow-hidden">
          <div class="w-1/3 border-r overflow-y-auto p-4">
            <!-- 左侧内容 -->
            <h5><strong>历史来源</strong></h5>
            <div v-html="selectedItem?.history || '暂无数据'" />
          </div>
          <div class="w-1/3 border-r overflow-y-auto p-4">
            <!-- 中间内容 -->
            <div v-html="selectedItem?.famousNames || '暂无数据'" />
          </div>
          <div class="w-1/3 overflow-y-auto p-4">
            <!-- 右侧内容 -->
            <h5><strong>地望分布</strong></h5>
            <div v-html="selectedItem?.distribution || '暂无数据'" />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
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
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { data } from "@/data/ancientCulture/baijiaxing_complex"; // 导入数据

const contentList = ref(data);

const activeToggle = ref<string[]>([]);
const fontSize = ref<number>(16);
const selectedItem = ref(data[0]); // 用于选中的姓氏信息

// 切换拼音显示功能
const toggleOption = (option: string) => {
  const index = activeToggle.value.indexOf(option);
  if (index === -1) {
    activeToggle.value.push(option);
  } else {
    activeToggle.value.splice(index, 1);
  }
};

// 打开抽屉并显示相关信息
const openDrawer = (group) => {
  selectedItem.value = group; // 将选中的组赋值给selectedItem
};

// 将内容数据分组为每行（每行展示5个数组中的元素）
const getLines = (items) => {
  const lines = [];
  for (let i = 0; i < items.length; i += 5) {
    lines.push(items.slice(i, i + 5)); // 每5个元素为一组
  }
  return lines;
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
.container {
  display: flex;
  padding: 20px;
}

.header {
  margin-bottom: 20px;
  text-align: center;
}

.header h4 {
  margin: 0;
  font-size: 1.5em;
}

.header p {
  margin: 5px 0 0;
  font-size: 1.2em;
}

.content-wrapper {
  flex-grow: 1;
  overflow: hidden;
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
  border: 1px solid #ccc;
  border-radius: 5px;
}

.content-item-list {
  display: flex; /* 一行显示所有组 */
  justify-content: space-around; /* 每组之间均等分配空间 */
}

.group {
  display: flex; /* 允许在组内横向排列 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  width: calc(20% - 10px); /* 每组占用20%的宽度，确保5组在一行 */
}

.name-group {
  display: flex; /* 在组内显示拼音和汉字左右排列 */
  align-items: center; /* 垂直居中 */
  cursor: pointer; /* 鼠标悬停时显示为点击状态 */
  transition:
    background-color 0.3s,
    color 0.3s; /* 平滑过渡效果 */
}

.qzw {
  display: flex; /* 使每个字符并排显示 */
  flex-direction: column; /* 垂直排列拼音和汉字 */
  align-items: center; /* 中心对齐 */
  margin: 0 5px; /* 字符间的间距 */
}

.pinyin {
  font-size: 0.8em; /* 拼音字体设置 */
}

.character {
  font-size: 1.5em; /* 字体大小 */
}

.controls {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.tooltip-button {
  margin-bottom: 10px; /* 为每个按钮添加下边距 */
}
</style>
