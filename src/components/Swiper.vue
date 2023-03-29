<template>
    <div class="container">
        <div v-for="(item, index) in props.swiperData" :key="item">
            <Transition>
                <div v-if="currentIndex === index" class="slid-img" @mouseenter="enterMouse" @mouseleave="leaveMouse">
                    <img :src="item" class="w-full h-full" />
                </div>
            </Transition>
        </div>

    </div>
    <div class="flex items-center justify-center mt-3">
        <div v-for="(item, index) in props.swiperData" :key="item" @click="changeSwiper(index)"
            :class="['swiper-bar', currentIndex === index ? 'bar-active' : '']">
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{ swiperData: string[] }>()

// const imgData = ['src/assets/001.png', 'src/assets/002.png', 'src/assets/003.png']
const currentIndex = ref(0)
const isMouseHover = ref(false)
const changeSwiper = (index: number) => {
    currentIndex.value = index
}
const circulateSwiper = () => {
    if (currentIndex.value !== props.swiperData.length - 1) {
        ++currentIndex.value
    } else {
        currentIndex.value = 0
    }
}
const enterMouse = () => {
    isMouseHover.value = true
}
const leaveMouse = () => {
    isMouseHover.value = false
}

onMounted(() => {
    setInterval(() => {
        if (!isMouseHover.value) {
            circulateSwiper()
        }
    }, 5000)
})


</script>
<style scoped>
.container {
    width: 100%;
    height: 250px;
    display: flex;
    position: relative;
    overflow: hidden;
}

.slid-img {
    width: 100%;
    height: 250px;
    transition: all 0.5s;
    position: absolute;
}

.swiper-bar {
    width: 30px;
    height: 4px;
    background-color: rgb(205, 205, 205);
    margin: 0 5px;
    cursor: pointer;
}

.bar-active {
    background-color: #6aa1ff;
}

@keyframes slidein {
    from {
        margin-left: 100%;

    }

    to {
        margin-left: 0%;

    }
}

.v-enter-active,
.v-leave-active {
    /* transition: opacity 0.5s ease; */
    transform: translateX(0);
}

.v-enter-from {
    transform: translateX(100%);
}

.v-leave-to {
    transform: translateX(-100%);
}
</style>
  