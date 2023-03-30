<template>
    <div class="flex">
        <!-- 左边栏 -->
        <div class="w-20 p-2 relative mr-4 h-full">
            <div class="fixed top-32">
                <div class="mb-5 w-12 h-12 cursor-pointer rounded-full flex justify-center items-center relative bg-white"
                    @click="addLike(article.id, article.like)">
                    <img v-if="userInfo && article.like.includes(userInfo.id)" src="../../assets/pc/like-active.png"
                        class="w-5 h-5" />
                    <img v-else src="../../assets/littleIcon/like.png" class="w-5 h-5" />
                    <div class="absolute text-white rounded-lg px-1 -top-1 left-8 text-xs bg-slate-300"
                        :class="userInfo && article.like.includes(userInfo.id) ? 'like-active' : ''">{{
                            article.like.length }}</div>
                </div>
                <div class="mb-5 w-12 h-12 cursor-pointer rounded-full flex justify-center items-center relative bg-white">
                    <img src="../../assets/littleIcon/news.png" class="w-5 h-5" />
                    <div class="absolute text-white rounded-lg px-1 -top-1 left-8 text-xs bg-slate-300">{{
                        article.comment.length }}</div>
                </div>
                <div class="mb-5 w-12 h-12 cursor-pointer rounded-full flex justify-center items-center relative bg-white">
                    <img src="../../assets/littleIcon/star.png" class="w-5 h-5" />
                    <div class="absolute text-white rounded-lg px-1 -top-1 left-8 text-xs bg-slate-300">{{
                        article.collection.length }}</div>
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
            <!-- 评论区 -->
            <div>
                <textarea v-model="content" placeholder="输入评论" class="rich-input " />
            </div>
            <div class="flex justify-end mt-2 ">
                <button class="submit cursor-pointer" @click="addComment">发布</button>
            </div>
            <div class="px-2">
                <!-- 评论第一级 -->
                <div v-for="item in commentData" :key="item.id">
                    <div v-if="item.commentId === 0" class="flex py-4">
                        <div>
                            <img src="../../assets/pc/a5945c85ceb8414582c437bbeae74a9a_tplv-k3u1fbpfcp-no-mark_240_240_240_160.webp"
                                class="w-10 h-10 rounded-full " />
                        </div>
                        <div class="ml-4 flex-1">
                            <div class="flex justify-between">
                                <div class="text-base">{{ item.userName }}</div>
                                <div class="text-sm text-gray-500">1天前</div>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">{{ item.title }}</div>
                            <div class="flex mt-2">
                                <div>
                                    <div>
                                        <div v-if="item.like.length && userInfo && !item.like.includes(userInfo.id)"
                                            class="flex text-sm text-gray-400 items-center cursor-pointer"
                                            @click="addReplyLike(item.id, item.like)">
                                            <img src="../../assets/pc/like.png" class="w-4 h-4 mr-1" />
                                            <span>{{ item.like.length }}</span>
                                        </div>
                                        <div v-else-if="userInfo && item.like.includes(userInfo.id)"
                                            class="flex text-sm text-gray-400 items-center cursor-pointer"
                                            @click="addReplyLike(item.id, item.like)">
                                            <img src="../../assets/pc/like-active.png" class="w-4 h-4 mr-1" />
                                            <span class="text-blue-600">{{ item.like.length }}</span>
                                        </div>
                                        <div v-else class="flex text-sm text-gray-400 items-center cursor-pointer"
                                            @click="addReplyLike(item.id, item.like)">
                                            <img src="../../assets/pc/like.png" class="w-4 h-4 mr-1" />
                                            <span>点赞</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div v-if="replyId === item.id"
                                        class="flex items-center text-sm text-gray-400 ml-4 cursor-pointer"
                                        @click="closeInput">
                                        <img src="../../assets/pc/comment.png" class="w-4 h-4 mr-2" />
                                        <span style="color: #1e80ff;">取消回复</span>
                                    </div>
                                    <div v-else class="flex items-center text-sm text-gray-400 ml-4 cursor-pointer"
                                        @click="showInput(item.id)">
                                        <img src="../../assets/pc/comment.png" class="w-4 h-4 mr-2" />
                                        <span>回复</span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="replyId === item.id">
                                <div>
                                    <textarea v-model="replyContent" placeholder="输入评论" class="rich-input " />
                                </div>
                                <div class="flex justify-end mt-2">
                                    <button class="submit cursor-pointer" @click="addReply(item.id)">发布</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 评论第二级 -->
                    <div class="mt-4 ml-14" style="background: rgba(247,248,250,.7);">
                        <div v-for="childItem in commentData" :key="childItem.id">
                            <div v-if="item.id === childItem.commentId && childItem.commentId !== 0" class="p-4 flex">
                                <div>
                                    <img src="../../assets/pc/a5945c85ceb8414582c437bbeae74a9a_tplv-k3u1fbpfcp-no-mark_240_240_240_160.webp"
                                        class="w-6 h-6 rounded-full " />
                                </div>
                                <div class="ml-4 flex-1">
                                    <div class="flex justify-between">
                                        <div class="text-base">{{ childItem.userName }}</div>
                                        <div class="text-sm text-gray-500">1天前</div>
                                    </div>
                                    <div class="text-sm text-gray-600 mt-2">{{ childItem.title }}</div>
                                    <div class="flex mt-2">
                                        <div>
                                            <div v-if="childItem.like.length && !childItem.like.includes(userInfo.id)"
                                                class="flex text-sm text-gray-400 items-center cursor-pointer"
                                                @click="addReplyLike(childItem.id, childItem.like)">
                                                <img src="../../assets/pc/like.png" class="w-4 h-4 mr-1" />
                                                <span>{{ childItem.like.length }}</span>
                                            </div>
                                            <div v-else-if="childItem.like.includes(userInfo.id)"
                                                class="flex text-sm text-gray-400 items-center cursor-pointer"
                                                @click="addReplyLike(childItem.id, childItem.like)">
                                                <img src="../../assets/pc/like-active.png" class="w-4 h-4 mr-1" />
                                                <span class="text-blue-600">{{ childItem.like.length }}</span>
                                            </div>
                                            <div v-else class="flex text-sm text-gray-400 items-center cursor-pointer"
                                                @click="addReplyLike(childItem.id, childItem.like)">
                                                <img src="../../assets/pc/like.png" class="w-4 h-4 mr-1" />
                                                <span>点赞</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div v-if="replyId === childItem.id"
                                                class="flex items-center text-sm text-gray-400 ml-4 cursor-pointer"
                                                @click="closeInput">
                                                <img src="../../assets/pc/comment.png" class="w-4 h-4 mr-2" />
                                                <span style="color: #1e80ff;">取消回复</span>
                                            </div>
                                            <div v-else class="flex items-center text-sm text-gray-400 ml-4 cursor-pointer"
                                                @click="showInput(childItem.id)">
                                                <img src="../../assets/pc/comment.png" class="w-4 h-4 mr-2" />
                                                <span>回复</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="replyId === childItem.id" class="mt-2">
                                        <div>
                                            <textarea v-model="replyContent" placeholder="输入评论" class="rich-input " />
                                        </div>
                                        <div class="flex justify-end mt-2">
                                            <button class="submit cursor-pointer" @click="addReply(item.id)">发布</button>
                                        </div>
                                    </div>
                                </div>
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

import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import { getStorage } from '../../utils/storage'
import { Viewer } from '@bytemd/vue-next'
import '../Editor/editor.scss'
import router from '../../router';
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
type UserInfo = {
    id: number
    account: string
    password: string
}
const replyId = ref()
const userInfo = ref<UserInfo>()
const content = ref('')
const replyContent = ref('')
const articleId = ref()
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
const showInput = (id: number) => {
    replyId.value = id
}
const testData = [
    {
        id: 1,
        title: "111111111",
        commentId: 0
    },
    {
        id: 2,
        title: "111111111",
        commentId: 0
    },
    {
        id: 3,
        title: "2222222222",
        commentId: 1
    },
]
type Article = {
    id: number
    title: string
    content: string
    like: number[]
    comment: number[]
    collection: number[]
}
const article = reactive<Article>({
    id: 0,
    title: '',
    content: '',
    like: [],
    comment: [],
    collection: []
})
type CommentData = {
    id: number
    userName: string
    like: number[]
    title: string
    date: string
    commentId: number
    postId: number
}[]
const commentData = ref<CommentData>([])
const getArticle = (id: number) => {
    axios.get(`http://localhost:3000/contents/${id}`).then((res) => {
        console.log('res', res)
        article.title = res.data.title
        article.content = res.data.content
        article.like = res.data.like
        article.comment = res.data.news
        article.collection = res.data.collect
    })
        .catch(() => {
            console.log('失败')
        })
}
const addLike = (id: number, like: number[]) => {
    if (!userInfo.value) {
        alert('暂未登录，请登录')
        return
    }
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
        console.log('res', res)
        article.title = res.data.title
        article.content = res.data.content
        article.like = res.data.like
        article.comment = res.data.news
        article.collection = res.data.collect
    })
        .catch(() => {
            console.log('失败')
        })
}
const addReplyLike = (id: number, like: number[]) => {
    if (!userInfo.value) {
        alert('暂未登录，请登录')
        return
    }
    const isLikeIndex = like.indexOf(userInfo.value.id)
    const newLike = like
    if (isLikeIndex !== -1) {
        newLike.splice(isLikeIndex, 1)
    } else {
        newLike.push(userInfo.value.id)
    }
    axios.patch(`http://localhost:3000/comments/${id}`, {
        like: newLike
    }).then((res) => {
        console.log('res', res)
    })
        .catch(() => {
            console.log('失败')
        })
}
const getComments = (id: number) => {
    axios.get(`http://localhost:3000/comments/?postId=${id}`).then((res) => {
        commentData.value = res.data
    })
}
const addComment = () => {
    if (!content.value) {
        console.log('还没内容呢')
        return
    }
    axios.post(`http://localhost:3000/comments`, {
        title: content.value,
        userName: userInfo.value?.account,
        like: [],
        postId: articleId.value,
        date: "",
        commentId: 0
    }).then((res) => {
        console.log(res)
        getComments(articleId.value)
        content.value = ''
        replyId.value = 0
    })
}
const addReply = (id: number) => {
    if (!replyContent.value) {
        console.log('还没内容呢')
        return
    }
    axios.post(`http://localhost:3000/comments`, {
        title: replyContent.value,
        userName: userInfo.value?.account,
        like: [],
        postId: articleId.value,
        date: "",
        commentId: id
    }).then((res) => {
        console.log(res)
        getComments(articleId.value)
        replyContent.value = ''
        replyId.value = 0
    })
}
const closeInput = () => {
    replyId.value = 0
}
onMounted(() => {
    userInfo.value = getStorage('token')
    console.log(userInfo.value)
    articleId.value = route.query.id
    getArticle(articleId.value)
    getComments(articleId.value)
    console.log('打开了沸点')
})
</script>
<style scoped>
.text-color:hover {
    color: #1e80ff;
    background: rgb(228, 228, 228);
}

.like-active {
    background-color: #1e80ff;
}


.rich-input {
    width: 100%;
    min-height: 64px;
    box-sizing: border-box;
    line-height: 22px;
    font-size: 14px;
    border: 1px #f2f3f5 solid;
    background-color: #f2f3f5;
    padding: 10px;
    outline: none;
}

.rich-input:focus {
    background-color: white;
    border: 1px solid #1e80ff;
}

.submit {
    flex: 0 0 auto;
    margin-left: auto;
    width: 72px;
    text-align: center;
    font-size: 14px;
    line-height: 36px;
    background: #1e80ff;
    border-radius: 4px;
    color: #fff;
    padding: 0;
    cursor: pointer;
}
</style>