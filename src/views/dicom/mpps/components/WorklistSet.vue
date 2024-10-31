<template>
  <div class="flex flex-col items-center min-h-screen">
    <!-- Error Modal -->
    <div v-if="showErrorModal" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg text-red-600">错误</h3>
        <p>{{ errorMessage }}</p>
        <div class="modal-action">
          <button class="btn" @click="showErrorModal = false">关闭</button>
        </div>
      </div>
    </div>

    <textarea
      v-model="inputText"
      class="textarea textarea-secondary p-2 rounded-lg shadow-md mb-4 text-lg resize-none w-4/5 h-48"
      placeholder="请输入文本"
    />

    <button class="btn btn-neutral" @click="generateWorld">生成 World</button>

    <!-- 提示结果的区域 -->
    <div v-if="resultMessage" class="mt-4 text-lg text-green-600">
      {{ resultMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"; // 导入 ref 函数
import { open } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core"; // 导入 Tauri 的 invoke 函数

// 创建响应式变量
const inputText = ref<string>(""); // 使用 TypeScript 指定类型
const showErrorModal = ref(false);
const errorMessage = ref("");
const resultMessage = ref<string>(""); // 用于存储结果消息

// 显示错误弹框的函数
const showError = (message: string, error: any) => {
  if (!error) {
    errorMessage.value = message;
  } else {
    errorMessage.value = message + ": " + error;
  }
  showErrorModal.value = true;
};

// 打开文件选择器
const openFileSelector = async () => {
  try {
    // 打开文件选择器对话框
    const file = await open({
      multiple: false,
      directory: true,
    });

    if (file) {
      console.log("已选择文件: ", file);
      return file;
    } else {
      return false;
    }
  } catch (error) {
    showError("打开文件选择器失败", error);
    return false;
  }
};

// 定义方法
const generateWorld = async () => {
  if (!inputText.value) {
    showError("没有输入任何内容，请先输入内容!", "");
    return;
  }

  const fileDir = await openFileSelector();
  if (fileDir) {
    try {
      // 调用 Tauri 的 world 生成方法
      const result = await invoke("export_excel", {
        content: inputText.value,
        rootDirectory: fileDir,
      });

      // 显示收到的结果到页面
      resultMessage.value = `操作成功: ${result}`;
    } catch (error) {
      showError("生成过程失败", error);
    }
  } else {
    showError("未选择文件", "");
  }
};
</script>

<style scoped>
/* 额外的样式可以在这里添加 */
</style>
