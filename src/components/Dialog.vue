<template>
    <div v-if="props.showDialog" class="show-dislog relative">

        <div>
            <div class="triangle"></div>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">

const props = defineProps<{ showDialog: boolean }>()
console.log(props.showDialog)
</script>
<style scoped>
.show-dislog {
    z-index: 999;
}

.triangle {
    margin-left: 70%;
    width: 0;
    height: 0;
    border: 10px solid;
    border-color: transparent transparent white;
}

.colse:hover {
    color: rgb(23, 23, 217);
}
</style>
  