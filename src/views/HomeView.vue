<template>
  <div>
    <PoemSearch />
    <!-- 这里可以添加一个组件来显示搜索结果 -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PoemSearch from '../components/PoemSearch.vue'

export default defineComponent({
  components: {
    PoemSearch
  }
})
</script>
