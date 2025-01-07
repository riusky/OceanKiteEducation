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
                        >{{ char.pinyin }}</i
                      >
                      <b class="character">{{ char.surname }}</b>
                    </DrawerTrigger>
                  </span>
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
          <DrawerTitle>百家姓: {{ selectedItem.surname }}</DrawerTitle>
        </DrawerHeader>
        <div class="flex w-full h-full overflow-hidden">
          <div class="w-1/3 border-r overflow-y-auto p-4">
            <!-- 左侧内容 -->
            <h5><strong>历史来源</strong></h5>
            <div v-html="selectedItem.history || '暂无数据'" />
          </div>
          <div class="w-1/3 border-r overflow-y-auto p-4">
            <!-- 中间内容 -->
            <h5><strong>家族名人</strong></h5>
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
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { data } from "@/data/ancientCulture/baijiaxing_single"; // 导入数据

const contentList = ref(data); // 将导入的数据赋值给组件的响应式变量
const activeToggle = ref<string[]>([]);
const fontSize = ref<number>(16);
const selectedItem = ref(data[0]);

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
const openDrawer = (item) => {
  selectedItem.value = item;
};

// 将内容数据分组为每行（根据需要调整）
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
    lines.push(chars.slice(i, i + 4)); // 每4个字符为一组
  }

  // 组合每4组，形成完整的行
  const result = [];
  for (let i = 0; i < lines.length; i += 4) {
    result.push(lines.slice(i, i + 4)); // 每4组成为一行
  }

  return result;
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
  border-radius: 5px; /* 边框圆角 */
}

.content-item-list {
  display: flex; /* 一行显示所有组 */
  justify-content: space-around; /* 每组之间均等分配空间 */
}

.group {
  display: flex; /* 使每组内4个字并排显示 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  width: 25%; /* 每组占用25%的宽度，确保4组在一行 */
}

.qzw {
  display: inline-flex;
  flex-direction: column; /* 拼音和汉字竖直排列 */
  align-items: center; /* 中心对齐 */
  margin: 0 5px; /* 字符间的间距 */
  cursor: pointer; /* 鼠标悬停时显示为点击状态 */
  transition:
    background-color 0.3s,
    color 0.3s; /* 平滑过渡效果 */
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
