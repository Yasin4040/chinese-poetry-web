<template>
  <div class="container">
    <div class="search-box">
      <input v-model="searchQuery" class="search-input" placeholder="输入诗词名或作者..." />
      <button @click="debouncedSearch" class="search-button">搜索</button>
    </div>

    <div v-show="poems.length > 0">
      <div class="poem-list">
        <div v-for="poem in poems" :key="poem.pId" class="poetry">
          <div class="inner-wrapper">
            <div class="title">{{ poem.title }}</div>
            <div class="author">{{ poem.dynastyStr }} {{ poem.authorStr }}</div>
            <div class="content">
              <p v-html="optimizeParagraphs(poem.paragraph)"></p>
            </div>
            <div id="notes" v-if="poem.note">
              <h4 class="ui header">注释</h4>
              <div class="notes content">
                {{ poem.note }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-show="searchQuery !== '' && poems.length === 0" class="no-results">未找到匹配的诗词。</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { PoetryVO } from '@/interfaces/PoetryVO' // 根据实际文件路径进行调整
import axios from 'axios'
import _ from 'lodash'

export default defineComponent({
  setup() {
    const searchQuery = ref('')
    const poems = ref([] as PoetryVO[]) // 将 poems 数组类型设置为 PoetryVO[]

    const search = async () => {
      try {
        const response = await axios.get(`/api/poem/search?word=${searchQuery.value}`)
        poems.value = response.data
      } catch (error) {
        console.error('搜索失败:', error.response.data)
      }
    }

    const debouncedSearch = _.debounce(search, 300)
    const optimizeParagraphs = (paragraph) => {
      if (!paragraph) {
        return '' // 如果输入的段落为空或为null，则返回空字符串
      }
      return paragraph.replace(/\n/g, '</p><p>')
    }
    return {
      searchQuery,
      poems,
      debouncedSearch,
      optimizeParagraphs
    }
  }
})
</script>
<style scoped>
/* 基础样式 */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5; /* 淡灰色背景 */
  color: #333;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #e9f5e9; /* 淡绿色背景 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.search-input {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #c1e2b3; /* 淡绿色边框 */
  border-radius: 4px;
  width: 100%;
  margin-bottom: 10px;
}
.search-button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #4caf50; /* 绿色按钮 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.search-button:hover {
  background-color: #45a049;
}
.poetry {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
}
.title,
.author {
  margin-bottom: 10px;
}
.content p {
  margin-bottom: 10px;
}
.no-results {
  color: #d9534f; /* 红色提示 */
  text-align: center;
} /* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
}
</style>
