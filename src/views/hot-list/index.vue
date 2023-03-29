<template>
    <div class="flex">
        <!-- 左侧导航栏 -->
        <div style="width: 260px;" class="bg-white mr-5">
            <HotMenu :menuData="menuData" @jumpPage="jumpPage"></HotMenu>
        </div>
        <div class="w-96 bg-white">
            <RouterView></RouterView>
        </div>
    </div>
</template>
<script setup lang="ts">
import HotMenu from '../../components/HotMenu.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const menuData = [
    {
        title: '掘金文章榜',
        children: [
            {

                title: '综合'
            },
            {

                title: '后端'
            },
            {

                title: '前端'
            },
        ]
    },
    {
        title: '精选专栏榜',
        children: []
    },
    {
        title: '推荐作者榜',
        children: []
    },
    {

        title: '优质作者榜',
        children: [
            {

                title: '后端'
            },
            {

                title: '前端'
            },
        ]
    },
]
const jumpPage = (val: number) => {
    if (val === 0) {
        router.push('/Articles')
    } else if (val === 1) {
        router.push('/Columns')
    }
}
</script>
<style scoped></style>
  