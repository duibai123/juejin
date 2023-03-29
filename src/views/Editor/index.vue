<template>
    <div class="w-full bg-white">
        <div class="h-16 px-7 flex">
            <div class="h-16 flex-1"><input v-model="articleData.title" placeholder="输入文章标题..." class="title-input" /></div>
            <div class="flex items-center">
                <div class="text-sm text-gray-400 mx-2">保存成功</div>
                <div class="text-sm flex items-center justify-center mx-2 h-8 rounded-sm cursor-pointer"
                    style="color: #1d7dfa;width: 76px;border: 1px solid #1d7dfa;">草稿箱</div>
                <div @click="publish"
                    class="text-sm flex items-center justify-center cursor-pointer text-white mx-2 h-8 rounded-sm"
                    style="width: 62px;background: #1d7dfa;">发布</div>
                <div class="mx-2"><img src="../../assets/transform.png" class="w-5 h-5" /></div>
                <div class="mx-2"><img
                        src="../../assets/pc/a5945c85ceb8414582c437bbeae74a9a_tplv-k3u1fbpfcp-no-mark_240_240_240_160.webp"
                        class="w-8 h-8 rounded-full"></div>
            </div>
        </div>
        <Editor :value="articleData.content" :plugins="plugins" @change="handleChange" />
    </div>
</template>
  
<script lang="ts" setup>

import { ref, reactive } from 'vue'
import axios from 'axios'
import gfm from '@bytemd/plugin-gfm'
import { Editor } from '@bytemd/vue-next'
import 'bytemd/dist/index.css'
import './editor.scss'

const articleData = reactive({
    title: '',
    content: ''
})
const plugins = ref([
    gfm(),
    // Add more plugins here
])
const handleChange = (v: string) => {
    articleData.content = v
}
const publish = () => {
    axios.post('http://localhost:3000/contents', {
        title: articleData.title,
        content: articleData.content,
        like: [],
        news: [],
        collect: []
    }).then((res) => {
        console.log('res', res)
    })
        .catch(() => {
            console.log('失败')
        })
}
</script>
<style  scoped>
:deep(.bytemd) {
    height: 1000px;
}

.title-input {
    height: 100%;
    font-size: 24px;
    width: 100%;
    border: 0;
    outline: none;
}

:deep(.CodeMirror-hscrollbar) {
    bottom: 0;
    left: 0;
    /* overflow-y: hidden; */
    /* overflow-x: scroll; */
}

:deep(.bytemd-preview) {
    @apply content-none
}
</style>