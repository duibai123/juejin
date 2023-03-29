<template>
    <div class="flex">
        <!-- 左边栏 -->
        <div class="w-20 p-2 relative mr-4 h-full">
            <div class="fixed top-32">
                <div class="mb-5 w-12 h-12 cursor-pointer rounded-full flex justify-center items-center relative bg-white">
                    <img src="../../assets/littleIcon/like.png" class="w-5 h-5" />
                    <div class="absolute text-white rounded-lg px-1 -top-1 left-8 text-xs bg-slate-300">{{
                        article.like.length }}</div>
                </div>
                <div class="mb-5 w-12 h-12 cursor-pointer rounded-full flex justify-center items-center relative bg-white">
                    <img src="../../assets/littleIcon/news.png" class="w-5 h-5" />
                    <div class="absolute text-white rounded-lg px-1 -top-1 left-8 text-xs bg-slate-300">{{
                        article.news.length }}</div>
                </div>
                <div class="mb-5 w-12 h-12 cursor-pointer rounded-full flex justify-center items-center relative bg-white">
                    <img src="../../assets/littleIcon/star.png" class="w-5 h-5" />
                    <div class="absolute text-white rounded-lg px-1 -top-1 left-8 text-xs bg-slate-300">{{
                        article.collect.length }}</div>
                </div>
                <div class="mb-5 w-12 h-12 cursor-pointer rounded-full flex justify-center items-center relative bg-white">
                    <img src="../../assets/littleIcon/share.png" class="w-5 h-5" />
                </div>
                <div class="mb-5 w-12 h-12 cursor-pointer rounded-full flex justify-center items-center relative bg-white">
                    <img src="../../assets/littleIcon/warn.png" class="w-5 h-5" />
                </div>
                <div class="mb-5 w-12 h-12 cursor-pointer rounded-full flex justify-center items-center relative bg-white">
                    <img src="../../assets/littleIcon/position.png" class="w-5 h-5" />
                </div>
            </div>
        </div>
        <!--中间内容  -->
        <div class=" mr-4 bg-white px-4" style="width: 820px;">
            <div class="text-2xl font-bold mb-5 mt-4">{{ article.title }}</div>
            <Viewer :value="article.content"></Viewer>
        </div>
        <!-- 右边内容 -->
        <div style="width: 260px;">
            <div class="p-5 flex items-center justify-between bg-white rounded-lg" style="height: 90px;">
                <div class="w-27 h-9 flex flex-col justify-center">
                    <div class="text-base font-bold">晚上好!</div>
                    <div class="text-xs text-gray-400 mt-1">点亮社区的每一天</div>
                </div>
                <div class="w-18 h-9 text-sm flex justify-center items-center rounded-lg"
                    style="color: #1e80ff;background: #f4f9ff;width: 74px;border: #b3d5ff 1px solid;">
                    去签到
                </div>
            </div>
            <div class="mt-5 rounded-lg h-28">
                <img src="../../assets/pc/384b868a01084b3ba1d0319074f0c958_tplv-k3u1fbpfcp-no-mark_480_400_0_0.webp"
                    class="w-full h-full rounded-lg" />
            </div>
            <div class="mt-5 rounded-lg h-28">
                <img src="../../assets/pc/532987b900094225a5fbf5f1d1c37081_tplv-k3u1fbpfcp-no-mark_480_400_0_0.webp"
                    class="w-full h-full rounded-lg" />
            </div>
            <div class="p-5 mt-5 flex items-center justify-between bg-white rounded-lg" style="height: 90px;">
                <div class="w-12 h-12">
                    <img class="w-full h-full"
                        src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-qrcode.b3f37e7.png" />
                </div>
                <div class=" flex flex-col justify-between ">
                    <div class="text-base font-bold">下载稀土掘金APP</div>
                    <div class="text-xs text-gray-400 mt-1">一个帮助开发者成长的社区</div>
                </div>
            </div>
            <div class="mt-5 bg-white py-3">
                <div v-for="item in linkData" :key="item.name" class="flex  items-center h-12 px-5">
                    <img :src="item.img" class="w-9 h-9" />
                    <span class="text-base ml-3">{{ item.name }}</span>
                </div>
            </div>
            <div class="mt-5 ">
                <div v-for="(item, index) in bottomLabel" :key="index" class="h-7 flex text-xs text-gray-500">
                    <div class="w-14 mr-1" v-for="items in item.label" :key="items">{{ items }}</div>
                </div>
                <div class="h-7 text-xs text-gray-500">举报邮箱: &nbsp; feedback@xitu.io</div>
                <div class="h-7  text-xs text-gray-500">座机电话: &nbsp; 010-8343495</div>
                <div class="h-7  text-xs text-gray-500">京ICP备18012699号-3: &nbsp; 2023稀土掘金</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import { Viewer } from '@bytemd/vue-next'
import '../Editor/editor.scss'
import router from '../../router';
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const linkData = [
    {
        img: 'src/assets/pc/01.png',
        name: '稀土掘金漫游指南'
    },
    {
        img: 'src/assets/pc/02.png',
        name: '掘金浏览器插件'
    },
    {
        img: 'src/assets/pc/03.png',
        name: '掘金翻译计划'
    },
    {
        img: 'src/assets/pc/04.png',
        name: '官方微博'
    },
    {
        img: 'src/assets/pc/05.png',
        name: '微信公众号'
    }
]
const bottomLabel = [
    {
        label: ['用户协议', '营业执照', '隐私政策', '关于我们']
    },
    {
        label: ['站点地图', '使用指南', '友情链接', '更多文章']
    }
]
const article = reactive({
    title: '',
    content: '',
    like: [],
    news: [],
    collect: []
})
const getArticle = (id: number) => {
    axios.get(`http://localhost:3000/contents/${id}`).then((res) => {
        console.log('res', res)
        article.title = res.data.title
        article.content = res.data.content
        article.like = res.data.like
        article.news = res.data.news
        article.collect = res.data.collect
    })
        .catch(() => {
            console.log('失败')
        })
}
onMounted(() => {
    console.log(route.query.id)
    const articleId = route.query.id
    getArticle(articleId)
    console.log('打开了沸点')
})
</script>
<style scoped>
.text-color:hover {
    color: #1e80ff;
    background: rgb(228, 228, 228);
}
</style>