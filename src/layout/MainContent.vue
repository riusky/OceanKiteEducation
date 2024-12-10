<template>
  <div class="main-content-container">
    <RouterView />
  </div>
</template>

<script setup>
// 这里可以添加任何逻辑或引入相关的 Vue Composition API
</script>

<style scoped>
.main-content-container {
  box-sizing: border-box; /* 确保 padding 不影响整体尺寸 */
  display: flex;
  height: calc(100vh - 64px); /* 确保该区域撑满父容器 */
  overflow-y: auto; /* 允许纵向滚动 */
}
</style>
