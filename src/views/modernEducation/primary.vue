<template>
  <div class="container flex">
    <div class="content flex-grow" :style="{ fontSize: fontSize + 'px' }">
      <h4>三字经内容</h4>

      <div
        v-for="(item, index) in contentList"
        :key="index"
        class="content-item"
      >
        <div class="main-content">
          <div class="characters">
            <div class="full-line">
              <div class="three-characters">
                <span
                  v-for="(char, idx) in item.content"
                  :key="idx"
                  class="character"
                  >{{ char.character }}</span
                >
              </div>
            </div>
            <div class="three-pinyin">
              <span
                v-for="(char, idx) in item.content"
                :key="idx"
                class="pinyin"
                >{{ char.pinyin }}</span
              >
            </div>
          </div>
        </div>

        <div
          v-if="activeToggle.includes('explanation')"
          class="explanation-content"
        >
          <p class="italic">{{ item.explanation }}</p>
        </div>
      </div>
    </div>

    <div class="controls flex flex-col justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="outline"
              :class="{ active: activeToggle.includes('pinyin') }"
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
              :class="{ active: activeToggle.includes('explanation') }"
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
            <Button variant="outline" @click="increaseFontSize">
              加大字号
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>点击以加大字号</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" @click="decreaseFontSize">
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

// 内容列表
const contentList = ref([
  {
    // 确保每个content都是12个字，并分为4个3字句
    content: [
      { pinyin: "gǒu", character: "苟" },
      { pinyin: "bú", character: "不" },
      { pinyin: "jiào", character: "教" },
      { pinyin: "xìng", character: "性" },
      { pinyin: "nǎi", character: "乃" },
      { pinyin: "qiān", character: "迁" },
      { pinyin: "jiào", character: "教" },
      { pinyin: "zhī", character: "之" },
      { pinyin: "dào", character: "道" },
      { pinyin: "guì", character: "贵" },
      { pinyin: "yǐ", character: "以" },
      { pinyin: "zhuān", character: "专" },
    ],
    explanation:
      "缺乏教育引导，天性恐将迷失方向。教育的真谛，恰恰在于我们的凝心聚力。",
  },
]);

// 使用 ref 管理活动的选项和字号大小
const activeToggle = ref<string[]>([]);
const fontSize = ref<number>(16); // 初始字号

// 方法：切换功能选项
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
  fontSize.value += 2; // 增加2px
};

// 减小字号
const decreaseFontSize = () => {
  fontSize.value = Math.max(12, fontSize.value - 2); // 减少2px，最小12px
};
</script>

<style scoped>
.container {
  display: flex;
  padding: 20px;
}

.content {
  flex-grow: 1;
}

.content-item {
  padding: 15px;
  margin-top: 20px;
  border: 1px solid #ccc;
}

.main-content {
  font-size: inherit; /* 从父元素继承字体大小 */
}

.characters {
  display: flex;
  flex-direction: column; /* 纵向排列拼音和字符 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 居中对齐 */
  width: 80%; /* 每行占据总宽度的80% */
  margin-right: auto; /* 水平居中 */
  margin-left: auto;
}

.full-line {
  display: flex; /* 水平排列 */
  justify-content: space-between; /* 平分剩下的宽度 */
  width: 100%; /* 使用100%的宽度 */
}

.three-characters {
  display: flex; /* 横向排列字符 */
  justify-content: space-between; /* 平分宽度 */
  width: 100%; /* 使用100%的宽度 */
}

.three-pinyin {
  position: relative; /* 为每个拼音定位 */
  display: flex; /* 横向排列拼音 */
  justify-content: space-between; /* 平分宽度 */
  width: 100%; /* 使用100%的宽度 */
  margin-top: -1.5em; /* 调整位置将拼音放在字符正上方 */
}

.character {
  flex: 1; /* 平等分配宽度 */
  text-align: center; /* 字符居中 */
}

.pinyin {
  flex: 1; /* 平等分配宽度 */
  text-align: center; /* 拼音居中 */
}

.explanation-content {
  margin-top: 10px;
  font-style: italic;
}

.controls {
  display: flex;
  flex-direction: column;
  margin-left: 20px; /* 控制栏左侧间距 */
}

.controls > .button {
  margin: 10px 0; /* 控制钮之间的间距 */
}

.active {
  background-color: #e2e2e2; /* 激活状态的样式（可以根据需要调整） */
}
</style>
