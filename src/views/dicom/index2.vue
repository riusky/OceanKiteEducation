<script setup lang="ts">
import { ref } from "vue";
import { NumberedListIcon } from "@heroicons/vue/24/solid";
import { Square3Stack3DIcon } from "@heroicons/vue/24/solid";
import { CubeTransparentIcon } from "@heroicons/vue/24/solid";
import { CircleStackIcon } from "@heroicons/vue/24/solid";
import { useRouter } from "vue-router";
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <div class="grid auto-rows-min gap-4 md:grid-cols-3">
      <div class="aspect-video rounded-xl bg-muted/50" />
      <div class="aspect-video rounded-xl bg-muted/50">
        混沌初开，乾坤始奠。 气之轻清上浮者为天，气之重浊下凝者为地。
      </div>
      <div class="aspect-video rounded-xl bg-muted/50" />
    </div>
  </div>
</template>
