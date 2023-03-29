<template>
    <div class="px-5 py-6 flex justify-between flex-wrap flex-row">
        <div v-for="item in props.overviewData" :key="item.title"
            style="width: 32%;height: 126px;margin-bottom: 10px; background: #f7f8fa;padding: 16px 20px;">
            <div class="text-sm flex items-center mb-1">
                <span>{{ item.title }}</span>
                <img v-if="item.title === '文章展示数'" src="../assets/question.svg" class="h-3.5 w-3.5" />
            </div>
            <div class=" mb-1 flex items-center font-bold" style="font-size: 32px;">{{ item.allNum }}</div>
            <div class="flex text-sm text-gray-500">
                <span>较前日</span>
                <span class="ml-2">{{ item.newNum }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
type overview = {
    title: string,
    allNum: number,
    newNum: number
}[]
const props = defineProps<{ overviewData: overview }>()
// const overviewData = [
//     {
//         title: '总关注者数',
//         allNum: 11,
//         newNum: 10
//     },
//     {
//         title: '文章展示数',
//         allNum: 11,
//         newNum: 10
//     },
//     {
//         title: '文章阅读数',
//         allNum: 11,
//         newNum: 10
//     },
//     {
//         title: '文章点赞数',
//         allNum: 11,
//         newNum: 10
//     },
//     {
//         title: '文章评论数',
//         allNum: 11,
//         newNum: 10
//     },
//     {
//         title: '文章收藏数',
//         allNum: 11,
//         newNum: 10
//     },
// ]
</script>
<style scoped></style>
  