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
            <CardTitle>宋词三百首</CardTitle>
            <CardDescription>清朝 · 朱孝臧</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-3 overflow-y-auto">
            <p>
              《宋词三百首》，由上彊村民朱孝臧于1924年编定的《宋词三百首》，共收宋代词人八十八家，词三百首。
            </p>

            <!-- 分类选择 -->
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

            <!-- 诗标题列表 -->
            <div v-if="filteredTitles.length" class="mt-4">
              <ul class="title-list overflow-y-auto max-h-[300px]">
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
            <CardDescription class="text-center">
              {{
                selectedTitle
                  ? `${selectedTitle.dynasty} · ${selectedTitle.author}`
                  : "无"
              }}
            </CardDescription>
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
                <div
                  v-for="(
                    paragraph, paragraphIndex
                  ) in selectedTitle.pinyinCharacters"
                  :key="paragraphIndex"
                  class="pinyin-paragraph"
                >
                  <div class="pinyin-grid">
                    <span class="indent" />
                    <span
                      v-for="(char, charIndex) in paragraph"
                      :key="charIndex"
                      class="pinyin-cell"
                    >
                      <i
                        v-if="activeToggle.includes('pinyin')"
                        class="pinyin"
                        >{{ char.pinyin }}</i
                      >
                      <b class="character">{{ char.character }}</b>
                    </span>
                  </div>
                </div>
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
                <div v-html="selectedTitle.translation" />
              </div>

              <!-- 评析 -->
              <div
                v-if="activeToggle.includes('commentary')"
                class="commentary mt-4"
              >
                <h3 class="font-bold text-lg">评析：</h3>
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
import { data } from "@/data/ancientCulture/songci300";

// 初始化章节选择数据
const selectedCategory = ref(data[0].category);
const selectedTitle = ref(data[0]);
const activeToggle = ref<string[]>(["pinyin", "annotations"]);
const fontSize = ref<number>(16);

const uniqueCategories = computed(() => [
  ...new Set(data.map((item) => item.category)),
]);

const filteredTitles = computed(() => {
  return data.filter((item) => item.category === selectedCategory.value);
});

const selectTitle = (title) => {
  selectedTitle.value = title;
};

const toggleOptions = [
  { id: "pinyin", label: "显示拼音" },
  { id: "annotations", label: "显示注释" },
  { id: "translation", label: "显示翻译" },
  { id: "commentary", label: "显示评析" },
];

const toggleOption = (option: string) => {
  const index = activeToggle.value.indexOf(option);
  if (index === -1) {
    activeToggle.value.push(option);
  } else {
    activeToggle.value.splice(index, 1);
  }
};

const increaseFontSize = () => {
  fontSize.value += 2;
};

const decreaseFontSize = () => {
  fontSize.value = Math.max(12, fontSize.value - 2);
};

watch(selectedCategory, () => {
  selectedTitle.value = filteredTitles.value[0];
});
</script>

<style scoped>
.pinyin-paragraph {
  margin-bottom: 1em;
}

.pinyin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 4px;
  place-items: center center;
}

.indent {
  grid-column: span 2;
}

.pinyin-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60px;
  text-align: center;
}

.pinyin {
  font-size: 0.9em;
  color: #666;
}

.character {
  margin-top: 4px;
  font-size: 1.4em;
  font-weight: bold;
}

.annotations,
.translation,
.commentary {
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
}
</style>
