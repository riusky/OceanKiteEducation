<!-- eslint-disable prettier/prettier -->
<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <!-- 卡片区域 -->
    <div class="grid auto-rows-min gap-4 md:grid-cols-3">
      <!-- 卡片 1 -->
      <Card>
        <CardHeader>
          <CardTitle>《三字经》</CardTitle>
          <CardDescription>朝代：宋朝</CardDescription>
          <CardDescription>作者：王应麟</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="line-clamp">
            《三字经》与《百家姓》、《千字文》并称为三大国学启蒙读物。《三字经》三字一句，朗朗上口，短小精悍，通俗易懂。以“人之初，性本善”起篇，叙述了三纲五常十义，五谷六畜七情，四书六经诸子，历史朝代更迭，最后以著名事例作结。通篇涵盖了中国传统文化文学、历史、天文、地理等知识，宣扬了传统伦理思想，如“仁、义、诚、敬、孝”。
          </p>
        </CardContent>
        <CardFooter class="flex justify-end">
          <Button>了解更多</Button>
        </CardFooter>
      </Card>

      <!-- 卡片 2 -->
      <Card>
        <CardHeader>
          <CardTitle>《百家姓》</CardTitle>
          <CardDescription>作者：南朝</CardDescription>
          <CardDescription>作者：周兴嗣</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="line-clamp">
            《百家姓》是中华姓氏的蒙学识字书籍，采用四言韵句，对不同的姓氏进行了排列，句句押韵。全篇504个姓氏，占流传至今还在使用的三千个姓氏的六分之一，但是已经包含了大部分人口的姓氏，具有很强的代表性。
          </p>
        </CardContent>
        <CardFooter class="flex justify-end">
          <Button>了解更多</Button>
        </CardFooter>
      </Card>

      <!-- 卡片 3 -->
      <Card>
        <CardHeader>
          <CardTitle>《千字文》</CardTitle>
          <CardDescription>作者：南朝</CardDescription>
          <CardDescription>作者：周兴嗣</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="line-clamp">
            《千字文》出自南朝才人周兴嗣，全文由完全不重复的一千个字组成，包含了天文、地理、历史、社会、伦理、教育等等多方面的知识，是我国历史上综合性启蒙教育读物的开山之作。
          </p>
        </CardContent>
        <CardFooter class="flex justify-end">
          <Button>了解更多</Button>
        </CardFooter>
      </Card>
    </div>

    <!-- 底部扩展区域 -->
    <!-- <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> -->
  </div>
</template>

<script setup>
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
