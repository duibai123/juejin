<template>
    <div class="flex">
        <!-- 左边栏 -->
        <div class="w-44 p-2 bg-white mr-4" style="height:520px;">
            <div v-for="(item, index) in leftNav" :key="index" class="p-3 flex items-center cursor-pointer">
                <img :src="item.img" class="w-4 h-4 mr-3" />
                <span style="color: #515767;">{{ item.text }}</span>
            </div>
            <div v-for="(item, index) in recommend" :key="index" class="p-3 flex items-center cursor-pointer">
                <span style="color: #515767;font-size: 14px;opacity: 0.8;margin-left: 28px;">{{ item }}</span>
            </div>
        </div>
        <!--中间内容  -->
        <div class=" mr-4 " style="width: 720px;">
            <div>
                <div class="p-5 bg-white">
                    <div class="h-28 bg-gray-200">
                    </div>
                </div>
                <div class="flex justify-between bg-white px-5 pb-5">
                    <div class="flex items-center">
                        <div v-for="item in linkLabel" :key="item.id"
                            class="flex items-center mr-4 cursor-pointer text-color">
                            <img :src="item.img" class="w-4 h-4" />
                            <span class="text-sm ml-1">{{ item.name }}</span>
                        </div>
                    </div>
                    <div class="w-24 h-9 flex justify-center items-center text-white rounded-lg"
                        style="background: #1e80ff;">发布</div>
                </div>
            </div>
            <!-- 内容列表 -->
            <div class="bg-white  pt-5 mt-5">
                <div class="flex px-5">
                    <div>
                        <img src="../../assets/pc/a5945c85ceb8414582c437bbeae74a9a_tplv-k3u1fbpfcp-no-mark_240_240_240_160.webp"
                            class="w-12 h-12 rounded-full" />
                    </div>
                    <div class="ml-3">
                        <div>斩空</div>
                        <div class="text-sm text-gray-500 mt-1">
                            <span>前端工程师</span>
                            <span class="mx-1">.</span>
                            <span>17分钟前</span>
                        </div>
                        <div class="text-sm mt-3">推荐几本书，最近心里有点烦躁</div>
                        <div class="pb-4 mt-3 flex">
                            <div class="text-xs py-1 px-2 flex rounded-2xl " style="background: #EAF2FF;color:#1e80ff ;">
                                <img src="../../assets/leftnav/yycircle.png" class="w-4 h-4 mr-1" />
                                <span>读书会 ></span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 分享，评论，点赞交互区 -->
                <div class="flex h-9 items-center " style="border-top:rgb(228, 228, 228) 1px solid">
                    <div v-for="item in btnData" :key="item.id" class="flex w-60 justify-center">
                        <div class="flex">
                            <img :src="item.img" class="w-4 h-4" />
                            <span class="text-xs text-gray-500 ml-1">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
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
import 'bytemd/dist/index.css'
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
const leftNav = [
    {
        img: 'src/assets/leftnav/time.png',
        text: '最新'
    },
    {
        img: 'src/assets/leftnav/hot.png',
        text: '热门'
    },
    {
        img: 'src/assets/leftnav/care.png',
        text: '关注'
    },
    {
        img: 'src/assets/leftnav/quan.png',
        text: '我的圈子'
    },
    {
        img: 'src/assets/leftnav/tuijian.png',
        text: '推荐圈子'
    },
]
const recommend = ['技术交流圈', '内推招聘广场', 'AI聊天室', '树洞一下', '上班摸鱼', '更多']
const linkLabel = [
    {
        id: 1,
        img: 'src/assets/leftnav/smile.png',
        name: '表情'
    },
    {
        id: 1,
        img: 'src/assets/leftnav/picture.png',
        name: '图片'
    },
    {
        id: 1,
        img: 'src/assets/leftnav/link.png',
        name: '链接'
    },
    {
        id: 1,
        img: 'src/assets/leftnav/huati.png',
        name: '话题'
    },
]
const btnData = [
    {
        id: 1,
        img: 'src/assets/pc/share.png',
        name: '分享'
    },
    {
        id: 2,
        img: 'src/assets/pc/comment.png',
        name: '评论'
    },
    {
        id: 3,
        img: 'src/assets/pc/like.png',
        name: '点赞'
    },
]
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
const article = ref([])
const getArticle = () => {
    axios.get('http://localhost:3000/contents/4').then((res) => {
        console.log('res', res)
        article.value = res.data
    })
        .catch(() => {
            console.log('失败')
        })
}
onMounted(() => {
    getArticle()
    console.log('打开了沸点')
})
</script>
<style scoped>
.text-color:hover {
    color: #1e80ff;
    background: rgb(228, 228, 228);
}
</style>