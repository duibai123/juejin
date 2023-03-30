<template>
    <div class="flex" style="width: 1200px;">
        <!-- 左侧导航栏 -->
        <div class="w-60 mr-5 bg-white">
            <div class="my-6 px-4">
                <div class=" flex">
                    <div><img
                            src="../../assets/pc/a5945c85ceb8414582c437bbeae74a9a_tplv-k3u1fbpfcp-no-mark_240_240_240_160.webp"
                            class="w-12 h-12 rounded-full"></div>
                    <div class="ml-2">
                        <div>爱学习的桦桦</div>
                        <div class="text-sm text-gray-500">程序员</div>
                    </div>
                </div>
                <div @click="toEditor"
                    class="h-9 mt-6 text-sm text-white flex items-center justify-center bg-blue-500 cursor-pointer">写文章
                </div>
            </div>
            <!-- 左侧菜单组件 -->
            <Menu :menuData="menuData"></Menu>
        </div>
        <div class="flex-1" style="max-width: 936px; ">
            <div class="bg-white">
                <div class="h-14 p-5 flex items-center justify-between" style="border-bottom: #e5e6eb 1px solid;">
                    <div class="text-lg">创作活动</div>
                    <div class="text-sm text-gray-500 ">查看更多 ></div>
                </div>
                <div class="p-5">
                    <div>
                        <Swiper :swiperData="swiperData"></Swiper>
                    </div>
                </div>
            </div>
            <div class="bg-white mt-5">
                <div class="h-14 px-5 flex justify-between items-center" style="border-bottom: #e5e6eb 1px solid;">
                    <div class="flex items-center">
                        <span class="text-lg">数据概览</span>
                        <img src="../../assets/question.svg" class="h-4 w-4" />
                    </div>
                    <div class="text-sm text-gray-500 ">查看更多 ></div>
                </div>
                <div>
                    <dataOverview :overviewData="overviewData"></dataOverview>
                </div>
            </div>
            <div class="bg-white mt-5">
                <div class="h-14 p-5 flex items-center" style="border-bottom: #e5e6eb 1px solid;">
                    <div class="text-lg">创作任务</div>
                </div>
                <div class="px-4 py-6 flex justify-between">
                    <div class="task px-5 flex items-center">
                        <div class="flex flex-1">
                            <div><img src="../../assets/book.png" class="w-12 h-12" /></div>
                            <div class=" ml-2">
                                <div class="flex items-center ">
                                    <span>首页成功发布文章</span>
                                    <span class="text-sm text-gray-500 mx-1">(>400字)</span>
                                    <img src="../../assets/question.svg" class="w-3.5 h-3.5">
                                </div>
                                <div class="flex items-center mt-3">
                                    <span class="text-sm">奖励矿石</span>
                                    <span style="color: #1e80ff;">10000</span>
                                </div>
                            </div>
                        </div>
                        <div class="w-20 h-8 flex items-center justify-center rounded-full text-sm text-white"
                            style="background: #1e80ff;">去完成</div>
                    </div>
                    <div class="task px-5 flex items-center">
                        <div class="flex flex-1">
                            <div><img src="../../assets/hot.png" class="w-12 h-12" /></div>
                            <div class=" ml-2">
                                <div class="flex items-center ">
                                    <span>首页成功发布沸点</span>
                                    <img src="../../assets/question.svg" class="w-3.5 h-3.5">
                                </div>
                                <div class="flex items-center mt-3">
                                    <span class="text-sm">奖励矿石</span>
                                    <span style="color: #1e80ff;">10000</span>
                                </div>
                            </div>
                        </div>
                        <div class="w-20 h-8 flex items-center justify-center rounded-full text-sm text-white"
                            style="background: #1e80ff;">去完成</div>
                    </div>
                </div>
            </div>
            <div class="bg-white mt-5 pb-6">
                <div class="h-14 px-5 flex justify-between items-center mb-5" style="border-bottom: #e5e6eb 1px solid;">
                    <div class="flex items-center">
                        <span class="text-lg">近期发布</span>
                        <img src="../../assets/question.svg" class="h-4 w-4" />
                    </div>
                </div>
                <div>
                    <div class="w-28 h-8 flex ml-5" style="background: #fafafa;padding: 3px;">
                        <div v-for="(item, index) in publishNav" :key="item" class="px-3 py-0.5
                                                                                            text-sm flex items-center"
                            :class="publishIndex === index ? 'publish-active' : ''">{{ item
                            }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Menu from '../../components/Menu.vue'
import Swiper from '../../components/Swiper.vue'
import dataOverview from '../../components/DataOverview.vue';
import router from '../../router';
const publishNav = ['文章', '沸点']
const publishIndex = ref(0)
const menuData = [
    {
        title: '首页',
        children: [],
    },
    {
        title: '内容管理',
        children: [
            {

                title: '文章管理'
            },
            {

                title: '专栏管理'
            },
            {

                title: '沸点管理'
            },
        ]
    },
    {

        title: '数据中心',
        children: [
            {

                title: '内容数据'
            },
            {

                title: '关注着数据'
            },
        ]
    },
]
const swiperData = ['src/assets/001.png', 'src/assets/002.png', 'src/assets/003.png']
const overviewData = [
    {
        title: '总关注者数',
        allNum: 11,
        newNum: 10
    },
    {
        title: '文章展示数',
        allNum: 11,
        newNum: 10
    },
    {
        title: '文章阅读数',
        allNum: 11,
        newNum: 10
    },
    {
        title: '文章点赞数',
        allNum: 11,
        newNum: 10
    },
    {
        title: '文章评论数',
        allNum: 11,
        newNum: 10
    },
    {
        title: '文章收藏数',
        allNum: 11,
        newNum: 10
    },
]
const toEditor = () => {
    router.push('/Editor')
}
</script>
<style scoped>
.task {
    width: 440px;
    height: 88px;
    border: #e5e6eb 1px solid;
}

.publish-active {
    color: #1e80ff;
    background: white;
}
</style>
  