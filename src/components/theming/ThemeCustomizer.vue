<script lang="ts" setup>
import type { Color } from "./types/colors";
import { colors } from "@/lib/registry";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RADII, useConfigStore } from "@/store/config";
import { SunIcon, MoonIcon, CheckIcon } from "@heroicons/vue/24/outline";
import { useColorMode } from "@vueuse/core";
import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
import { LanguageIcon } from "@heroicons/vue/24/solid";

const { t, locale, translationCh, translationEn } = useTranslationLang();
defineProps<{
  allColors: Color[];
}>();

const { theme, radius, setRadius, setTheme, isDark, setIsDark } =
  useConfigStore();

const mode = useColorMode();
</script>

<template>
  <div class="p-4">
    <div class="grid space-y-1">
      <h1 class="text-md text-foreground font-semibold">
        {{ t("Setting.Customize") }}
      </h1>
      <p class="text-xs text-muted-foreground">
        {{ t("Setting.CustomizeMessage") }}
      </p>
    </div>
    <div class="space-y-1 pt-4">
      <Label for="color" class="text-xs"> {{ t("Setting.Color") }} </Label>
      <div class="grid grid-cols-3 gap-2 py-1">
        <Button
          v-for="(color, index) in allColors"
          :key="index"
          variant="outline"
          class="h-8 justify-start px-3"
          :class="color === theme ? 'border-foreground border-2 font-bold' : ''"
          @click="setTheme(color)"
        >
          <span
            class="h-5 w-5 rounded-full flex items-center justify-center"
            :style="{ backgroundColor: colors[color][7].rgb }"
          >
            <CheckIcon v-if="color === theme" class="h-3 w-3 text-white" />
          </span>
          <span class="ml-2 text-xs capitalize">
            {{ t(`Color.${color}`) }}
          </span>
        </Button>
      </div>
    </div>
    <div class="space-y-1 pt-2">
      <Label for="radius" class="text-xs"> {{ t("Setting.Radius") }} </Label>
      <div class="grid grid-cols-5 gap-2 py-1">
        <Button
          v-for="(r, index) in RADII"
          :key="index"
          variant="outline"
          class="h-8 justify-center px-3"
          :class="r === radius ? 'border-foreground border-2 font-bold' : ''"
          @click="setRadius(r)"
        >
          <span class="text-xs">
            {{ r }}
          </span>
        </Button>
      </div>
    </div>
    <div class="space-y-1.5 pt-2">
      <Label for="theme" class="text-xs"> {{ t("Setting.Theme") }} </Label>

      <div class="flex space-x-2 py-1">
        <Button
          class="h-8"
          variant="outline"
          :class="{ 'border-2 border-foreground font-bold': mode == 'light' }"
          @click="mode = 'light'"
        >
          <SunIcon class="w-4 h-4 mr-2" />
          <span class="text-xs">{{ t("Setting.Light") }}</span>
        </Button>
        <Button
          class="h-8"
          variant="outline"
          :class="{ 'border-2 border-foreground font-bold': mode == 'dark' }"
          @click="mode = 'dark'"
        >
          <MoonIcon class="w-4 h-4 mr-2" />
          <span class="text-xs">{{ t("Setting.Dark") }}</span>
        </Button>
      </div>
    </div>
    <div class="space-y-1.5 pt-2">
      <Label for="theme" class="text-xs"> t("Setting.Language") </Label>

      <div class="flex space-x-2 py-1.5">
        <Button
          class="h-8"
          variant="outline"
          :class="{ 'border-2 border-foreground font-bold': locale === 'zh' }"
          @click="translationCh"
        >
          <!-- <SunIcon class="w-4 h-4 mr-2" /> -->
          <span class="text-xs">{{ t("language.zh") }}</span>
        </Button>
        <Button
          class="h-8"
          variant="outline"
          :class="{ 'border-2 border-foreground font-bold': locale === 'en' }"
          @click="translationEn"
        >
          <!-- <MoonIcon class="w-4 h-4 mr-2" /> -->
          <span class="text-xs"> {{ t("language.en") }}</span>
        </Button>
      </div>
    </div>
  </div>
</template>
