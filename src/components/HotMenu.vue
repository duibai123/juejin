<template>
    <div class="px-2 py-2">
        <div v-for="(item, index) in props.menuData" :key="item.title">
            <div
                :class="['menu', selectIndex[0] === index && !item.children?.length ? 'menu-active' : '', selectIndex[0] === index && item.children?.length ? 'menu-select' : '']">
                <div class="flex items-center">
                    <!-- <div><img src="../assets/pc/index.png" class="w-4 h-4"></div> -->
                    <div class="ml-2" @click="selectMenu(item, index)">{{ item.title }}</div>
                </div>
                <div v-if="item.children?.length" class="mr-4" @click="expandHotMenu(index)">
                    <img v-if="expandMenu.includes(index)" src="../assets/pc/up2.png" class="w-4 h-4">
                    <img v-else src="../assets/pc/down2.png" class="w-4 h-4">
                </div>
            </div>
            <!-- v-if="item.isShow" -->
            <div v-if="expandMenu.includes(index)">
                <div v-for="(childItem, childIndex) in item.children" :key="childItem.title"
                    @click="selectChileMenu(childIndex, index)"
                    :class="['child', selectIndex[0] === index && selectIndex[1] === childIndex ? 'child-active' : '']">{{
                        childItem.title
                    }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
type MenuData = {
    title: string
    children?: MenuData
}[]

type Props = {
    menuData: MenuData
}

const props = defineProps<Props>()
const selectIndex = ref([0, 0])
const expandMenu = ref<number[]>([])
const selectMenu = (item: MenuData[number], index: number) => {
    console.log(item)
    if (!item.children?.length) {
        console.log('index', index)
        selectIndex.value[0] = index
        expandMenu.value = []
    } else {
        expandMenu.value = [index]
        selectIndex.value[0] = index
        selectIndex.value[1] = 0
    }
    emit('jumpPage', index)
}
const selectChileMenu = (childIndex: number, index: number) => {
    selectIndex.value[0] = index
    selectIndex.value[1] = childIndex
}
const emit = defineEmits(['jumpPage'])
const expandHotMenu = (index: number) => {
    const expandIndex = expandMenu.value.indexOf(index)
    if (expandIndex !== -1) {
        expandMenu.value.splice(expandIndex, 1)
    } else {
        expandMenu.value.push(index)
    }
}
</script>
<style scoped>
.menu {
    display: flex;
    height: 48px;
    align-items: center;
    justify-content: space-between;
    padding-left: 28px;
    cursor: pointer;
}

.menu-active {
    background: #EAF2FF;
    color: #1E80FF;
}

.menu-select {
    background: #EAF2FF;
    color: #1E80FF;
}

.child {
    color: gray;
    height: 48px;
    line-height: 48px;
    padding-left: 53px;
    cursor: pointer;
}

.child-active {
    /* background: #EAF2FF; */
    color: #1E80FF;
}
</style>
  