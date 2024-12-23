<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <!-- Tab 切换栏 -->
    <Tabs default-value="enlightenment" class="w-full">
      <TabsList class="grid w-full grid-cols-4">
        <TabsTrigger
          v-for="(tab, index) in tabs"
          :key="index"
          :value="tab.value"
        >
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>

      <!-- 动态生成 TabsContent -->
      <TabsContent v-for="(tab, index) in tabs" :key="index" :value="tab.value">
        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card v-for="(item, itemIndex) in tab.items" :key="itemIndex">
            <CardHeader>
              <CardTitle>{{ item.title }}</CardTitle>
              <CardDescription>朝代：{{ item.dynasty }}</CardDescription>
              <CardDescription>作者：{{ item.author }}</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="line-clamp">
                {{ item.description }}
              </p>
            </CardContent>
            <CardFooter class="flex justify-end">
              <Button>学而时习之</Button>
            </CardFooter>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 数据
const tabs = [
  {
    value: "enlightenment", // 启蒙篇的英文值
    label: "启蒙篇", // 中文标签
    items: [
      {
        title: "《三字经》",
        dynasty: "宋朝",
        author: "王应麟",
        description:
          "《三字经》与《百家姓》、《千字文》并称为三大国学启蒙读物。《三字经》三字一句，朗朗上口，短小精悍，通俗易懂。以“人之初，性本善”起篇，叙述了三纲五常十义，五谷六畜七情，四书六经诸子，历史朝代更迭，最后以著名事例作结。通篇涵盖了中国传统文化文学、历史、天文、地理等知识，宣扬了传统伦理思想，如“仁、义、诚、敬、孝”。",
      },
      {
        title: "《百家姓》",
        dynasty: "南朝",
        author: "周兴嗣",
        description:
          "《百家姓》是中华姓氏的蒙学识字书籍，采用四言韵句，对不同的姓氏进行了排列，句句押韵。全篇504个姓氏，占流传至今还在使用的三千个姓氏的六分之一，但是已经包含了大部分人口的姓氏，具有很强的代表性。",
      },
      {
        title: "《千字文》",
        dynasty: "南朝",
        author: "周兴嗣",
        description:
          "《千字文》出自南朝才人周兴嗣，全文由完全不重复的一千个字组成，包含了天文、地理、历史、社会、伦理、教育等等多方面的知识，是我国历史上综合性启蒙教育读物的开山之作。",
      },
    ],
  },
  {
    value: "exhortation", // 训诫篇的英文值
    label: "训诫篇", // 中文标签
    items: [
      {
        title: "《弟子规》",
        dynasty: "清朝",
        author: "不详",
        description: "《弟子规》是用来教授弟子应有的行为规范和道德准则的书籍。",
      },
      {
        title: "《论语》",
        dynasty: "春秋",
        author: "孔子",
        description:
          "《论语》是记录孔子及其弟子言行的语录体著作，反映了孔子及其学派的思想。",
      },
      {
        title: "《朱子家训》",
        dynasty: "宋朝",
        author: "朱熹",
        description:
          "《朱子家训》是朱熹对家规、家教的总结，强调家庭教育的重要性。",
      },
    ],
  },
  {
    value: "poetry", // 诗歌篇的英文值
    label: "诗歌篇", // 中文标签
    items: [
      {
        title: "《唐诗三百首》",
        dynasty: "唐朝",
        author: "不详",
        description:
          "《唐诗三百首》是唐代诗歌的经典选集，涵盖了多个著名诗人的作品。",
      },
      {
        title: "《宋词三百首》",
        dynasty: "宋朝",
        author: "不详",
        description:
          "《宋词三百首》是宋代词作的经典选集，汇集了大量优秀的词作。",
      },
    ],
  },
  {
    value: "allusions", // 典故篇的英文值
    label: "典故篇", // 中文标签
    items: [
      {
        title: "《幼学琼林》",
        dynasty: "清朝",
        author: "不详",
        description:
          "《幼学琼林》是针对儿童启蒙教育的书籍，汇集了许多典故与习俗。",
      },
      {
        title: "《增广贤文》",
        dynasty: "清朝",
        author: "不详",
        description:
          "《增广贤文》是一本介绍为人处世道理的书籍，是后世流传甚广的家教书。",
      },
    ],
  },
];
</script>

<style scoped>
.line-clamp {
  display: -webkit-box;
  height: calc(1.5em * 8); /* 根据行高设置总高度，例如1.5em是行高 */
  overflow: hidden;
  line-height: 1.5em; /* 确保行高与高度一致 */
  text-overflow: ellipsis;
  -webkit-line-clamp: 8; /* 显示的行数 */
  -webkit-box-orient: vertical;
}
</style>
