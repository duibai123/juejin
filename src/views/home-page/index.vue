<template>
    <div class="flex relative  scrollHight" ref="scrollContainer" @scroll="handleScroll">
        <!-- 左边栏 -->
        <div class="w-44 mr-4  relative">
            <div class=" fixed p-2 bg-white w-44 " style="height: 490px;">
                <div v-for="(item, index) in leftNav" :key="index"
                    class="p-3 flex items-center text-gray-400 cursor-pointer left-nav"
                    :class="navIndex === index ? 'left-nav-active' : ''" @click="selectLeftNav(index)">
                    <img :src="item.img" class="w-4 h-4 mr-3" />
                    <span>{{ item.text }}</span>
                </div>
            </div>
        </div>
        <!--中间内容  -->
        <div class=" mr-4 " style="width: 720px;">
            <!-- 头部卡片 -->
            <div class="mb-4 pt-5 flex h-40 bg-white">
                <div v-for="(item, index) in topContent" :key="index"
                    :class="index === 1 || index === 0 ? 'show-border' : ''" style="width: 240px;padding: 0 20px;">
                    <div class="flex items-center  relative  mb-3">
                        <img :src="item.img" class="w-5 h-5 mr-2" />
                        <span>{{ item.title }}</span>
                        <span class="text-xs absolute right-0 cursor-pointer" style="color: gray;" @click="more">更多 ></span>
                    </div>
                    <div v-for="(items, tabIndex) in item.contentTitle" :key="tabIndex" class="flex   items-center mb-2">
                        <div v-if="index === 0" class="num">{{ tabIndex + 1 }}</div>
                        <div v-else class="body-dot"></div>
                        <div class="text-sm whitespace-nowrap overflow-hidden  overflow-ellipsis cursor-pointer">{{
                            items }}</div>
                    </div>
                </div>
            </div>
            <!-- 推荐和最新 -->
            <div class="bg-white mt-4 pb-5">
                <!-- 头部导航 -->
                <div class="middle-nav">
                    <div v-for="(item, index) in  middleNav" :key="item.id"
                        :class="['nav', selectIndex === index ? 'nav-active' : '']" @click="selectNav(index)">
                        <div>{{ item.name }}</div>
                        <div v-if="selectIndex === index" class="light-box"></div>
                    </div>
                </div>
                <!-- 内容列表 -->
                <div class="pt-3 px-5 ">
                    <div v-for="(item, index) in article" :key="item.id"
                        style="border-bottom: #ededed 1px solid ; cursor: pointer;margin-top: 10px;"
                        @click="toDetail(item.id)">
                        <!-- 内容标签时间名称 -->
                        <div class="content-top">
                            <div>掘金酱</div>
                            <div class="diving"></div>
                            <div>18小时前</div>
                            <div class="diving"></div>
                            <div>前端.javascript</div>
                        </div>
                        <div class="mt-4 flex pb-4">
                            <div style="width: 536px;">
                                <!-- 左侧内容 -->
                                <div class="text-base">
                                    {{ item.title }}
                                </div>
                                <div class="overflow-hidden text-ellipsis whitespace-nowrap my-2 "
                                    style="font-size: 13px;color: gray;" v-html="item.content">
                                </div>
                                <div class="flex items-center">
                                    <div class="flex items-center mr-4">
                                        <img src="../../assets/pc/eye.png" class="w-4 h-4" />
                                        <span style="font-size: 13px;color: gray;margin-left: 3px;">{{ item.collect.length
                                        }}</span>
                                    </div>
                                    <div class="flex items-center mr-4" @click.stop="addLike(item.id, item.like, index)">
                                        <img v-if="userInfo && item.like.includes(userInfo.id)"
                                            src="../../assets/pc/like-active.png" class="w-4 h-4" />
                                        <img v-else src="../../assets/pc/like.png" class="w-4 h-4" />
                                        <span style="font-size: 13px;color: gray;margin-left: 3px;">{{ item.like.length
                                        }}</span>
                                    </div>
                                    <div class="flex items-center ">
                                        <img src="../../assets/pc/comment.png" class="w-4 h-4" />
                                        <span style="font-size: 13px;color: gray;margin-left: 3px;">{{ item.news.length
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 右侧图片 -->
                            <div class="w-32 h-20 ml-5 ">
                                <img src="../../assets/pc/181b89d9629b4cb6829f1584b380b85c_tplv-k3u1fbpfcp-no-mark_240_240_240_160.webp"
                                    class="w-full h-full" />
                            </div>
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

import { ref, onMounted } from 'vue'
import axios from 'axios'
import { getStorage, setStorage } from '../../utils/storage'
// import router from '../../router';
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const selectIndex = ref(0)
const leftNav = [
    {
        img: 'src/assets/leftnav/加关注.png',
        text: '关注'
    },
    {
        img: 'src/assets/leftnav/指南针.png',
        text: '综合'
    },
    {
        img: 'src/assets/leftnav/后端开发.png',
        text: '后端'
    },
    {
        img: 'src/assets/leftnav/开发.png',
        text: '前端'
    },
    {
        img: 'src/assets/leftnav/Android.png',
        text: 'Android'
    },
    {
        img: 'src/assets/leftnav/iOS.png',
        text: 'ios'
    },
    {
        img: 'src/assets/leftnav/机器人_o.png',
        text: '人工智能'
    },
    {
        img: 'src/assets/leftnav/工具.png',
        text: '开发工具'
    },
    {
        img: 'src/assets/leftnav/代码片段.png',
        text: '代码人生'
    },
    {
        img: 'src/assets/leftnav/阅读.png',
        text: '阅读'
    },
]
const topContent = [
    {
        id: 1,
        img: 'src/assets/leftnav/article.52e2cca.png',
        title: '综合文章榜',
        contentTitle: [
            '内卷时代，是该学学webGL了',
            '既然有map了，为什么还要redis呢',
            '2023和自己聊聊'
        ]
    },
    {
        id: 2,
        img: 'src/assets/leftnav/books.ee6cdd2.png',
        title: '精选专栏榜',
        contentTitle: [
            '内卷时代，是该学学webGL了',
            '既然有map了，为什么还要redis呢',
            '2023和自己聊聊'
        ]
    },
    {
        id: 3,
        img: 'src/assets/leftnav/star.641eec7.png',
        title: '推荐收藏集',
        contentTitle: [
            '内卷时代，是该学学webGL了',
            '既然有map了，为什么还要redis呢',
            '2023和自己聊聊'
        ]
    },
]
// 推荐和最新选项卡
const middleNav = [{
    id: 1,
    name: '推荐'
},
{
    id: 2,
    name: '最新'
}]
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
const userInfo = ref()
const navIndex = ref(1)
const pageNum = ref(1)
const selectNav = (index: number) => {
    selectIndex.value = index
}
const selectLeftNav = (index: number) => {
    navIndex.value = index
}
type articleData = {
    id: number,
    title: string,
    content: string,
    like: number[],
    news: number[],
    collect: number[]
}[]
const article = ref<articleData>([])
const scrollContainer = ref()
const handleScroll = () => {
    const scrollContent = scrollContainer.value
    if (scrollContent.scrollTop + scrollContent.clientHeight >= scrollContent.scrollHeight - 1) {
        console.log('需要加载数据了')
        pageNum.value += 1
        getArticle()
    }
    // console.log("scrollTop", scrollContent.scrollTop)
    // console.log("clientHeight", scrollContent.clientHeight)
    // console.log("scrollHeight", scrollContent.scrollHeight)
}
const getArticle = () => {
    console.log('发起了请求')
    axios.get(`http://localhost:3000/contents?_page=${pageNum.value}&_limit=8`).then((res) => {
        console.log('res11', res.data)
        // article.value = res.data
        res.data.map(item => {
            article.value.push(item)
        })
        console.log('article.value', article.value)
    })
        .catch(() => {
            console.log('失败')
        })
}
const addLike = (id: number, like: [number], index: number) => {
    console.log('id', userInfo.value.id)
    const isLikeIndex = like.indexOf(userInfo.value.id)
    const newLike = like
    if (isLikeIndex !== -1) {
        newLike.splice(isLikeIndex, 1)
    } else {
        newLike.push(userInfo.value.id)
    }
    axios.patch(`http://localhost:3000/contents/${id}`, {
        like: newLike
    }).then((res) => {
        article.value[index] = res.data
    })
        .catch(() => {
            console.log('失败')
        })
}
const toDetail = (articleId: number) => {
    console.log(articleId)
    router.push({
        path: '/ArticleDetail',
        query: {
            id: articleId
        }
    })
}
const more = () => {
    router.push('/ArticleList')
}
onMounted(() => {
    getArticle()
    userInfo.value = getStorage('token')

})
</script>
<style scoped>
.num {
    background: linear-gradient(180deg, #f64242 20%, rgba(246, 66, 66, .4) 80%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    /* min-width: 0.8rem; */
    justify-content: center;
    align-items: center;
    margin-left: 6px;
    margin-right: 10px;
    display: flex;
    font-size: 14px;
    font-weight: bold;
}

.body-dot {
    background-color: #ff7426;
    width: 4px;
    height: 4px;
    margin: 0 16px 0 8px;
}

.show-border {
    border-right: #e5e5e5 1px solid;
    opacity: 0.8;
}

.middle-nav {
    height: 50px;
    border-bottom: rgb(242, 240, 240) 1px solid;
    display: flex;
    align-items: center;
    position: relative;
}

.nav {
    margin: 0 16px;
    font-size: 17px;
    color: gray;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

}

.nav:hover {
    color: #1e80ff;
}

.nav-active {
    color: rgb(19, 19, 19);
}

.light-box {
    width: 20px;
    height: 3.5px;
    background-color: #1e80ff;
    border-radius: 3px;
    position: absolute;
    bottom: 0;
}

.content-top {
    display: flex;
    font-size: 13px;
    color: gray;
    align-items: center;
}

.diving {
    width: 1px;
    height: 12px;
    background: #e5e6eb;
    margin: 0 10px;
}

.left-nav:hover {
    background: rgb(241, 240, 240);
    color: #1E80FF;
}

.left-nav-active {
    background: #eaf2ff;
    color: #1E80FF;
}

.scrollHight {
    height: 100vh;
    overflow-y: scroll;
}

::-webkit-scrollbar-thumb {
    background-color: #f4f4f4;
    outline: none;
    border-radius: 0px;
}
</style>