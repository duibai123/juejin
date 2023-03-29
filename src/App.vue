<template>
  <div class="out-container">
    <!-- <Index></Index> -->
    <RouterView></RouterView>
  </div>
</template>
<script setup lang="ts">
import Index from './views/index.vue'
</script>
<style scoped>
.out-container {
  width: 100vw;
  /* height: 100vh; */
  min-height: 100vh;
  background: #f4f4f4;
}
</style>
