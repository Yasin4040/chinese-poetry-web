<template>
  <div class="app">
    <h1>古诗词搜索</h1>
    <Poetry />
  </div>
</template>

<script lang="ts">
import Poetry from './components/PoemSearch.vue'
export default {
  name: 'App', //组件名
  components: { Poetry } //注册组件
}
</script>

<style>
.app {
  background-color: #ddd;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}
</style>
