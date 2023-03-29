<template>
  <div @click="colseDialog">
    <!-- 头部导航 -->
    <div class=" w-full h-16"></div>
    <div class=" flex justify-center items-center fixed bg-white h-16 left-0 right-0 top-0 z-50">
      <div class=" flex items-center">
        <img :src="headerLogo" class="w-28 h-6">
        <!-- 导航栏 -->
        <div v-for="(item, index) in headerBar" :key="index"
          class="h-16 text-sm flex items-center cursor-pointer ml-5 header-nav"
          :class="navIndex === index ? 'nav-active' : ''" @click="toChildPage(item, index)">{{ item }} </div>
        <img src="../assets/header1.png" class=" w-28 h-8 left-4" style="margin-left: 12px;" />
        <div class="h-9 flex rounded-md p-0.5 box-border ml-12" style="border: rgb(167, 166, 166) 1px solid;">
          <input placeholder="探索稀土掘金" class=" w-56 pl-1 border-none input-border" />
          <div class=" flex items-center  w-11 h-8 justify-center" style="background-color: #f2f3f5;">
            <img src="../assets/search.png" class="w-5 h-4" />
          </div>
        </div>
        <div class="h-9 rounded-md flex ml-6 " style="background-color: #1e80ff;">
          <div @click="toCreatorCenter" class="px-3 text-white h-9 flex items-center cursor-pointer"
            style="font-size: 14px;border-right: rgba(229, 229, 229, 0.2) 1px solid;">创作者中心</div>
          <div class="w-5 flex items-center justify-center relative" @click.stop="openDialog1">
            <img v-if="showDialog1" src="../assets/pc/up3.png" class="w-3 h-3" />
            <img v-else src="../assets/down.png" class="w-3 h-3" />
            <div class="absolute top-6 -left-12">
              <Dialog :showDialog="showDialog1">
                <div class="w-32 h-50 bg-white p-3 text-black ">
                  <div v-for="item in linkNav" :key="item"
                    class="px-3 h-9 text-sm flex justify-center items-center cursor-pointer link-nav">{{
                      item }}</div>
                </div>
              </Dialog>
            </div>
          </div>
        </div>
        <div class=" flex items-center ml-3">
          <img src="../assets/vip.svg" class="w-6 h-6" />
          <span style="font-size: 14px;color: #86909c;margin-left: 5px;">会员</span>
        </div>
        <!-- 登录注册功能 -->
        <div v-if="userInfo" class="ml-5 relative">
          <img src="../assets/pc/a5945c85ceb8414582c437bbeae74a9a_tplv-k3u1fbpfcp-no-mark_240_240_240_160.webp"
            class="w-8 h-8 rounded-full " />
          <!-- <div>
            <Dialog :showDialog=""></Dialog>
          </div> -->
        </div>
        <div v-else class="flex h-9  items-center justify-center ml-5 cursor-pointer login" @click.stop="showLogin">
          <div>登录</div>
          <div class="login-btn"></div>
          <div>注册</div>
          <div class="absolute top-9 -left-48">
            <Dialog :showDialog="showDialog">
              <div class="w-64 h-52 bg-white  text-black relative">
                <!-- <div @click="colse" class="absolute right-3 -top-1 text-gray-500 text-lg  colse">x</div> -->
                <div class="flex flex-col justify-center items-center">
                  <div class="mt-3">
                    <div>账号：</div>
                    <div><input v-model="userLogin.account" placeholder="请输入账号" class="login-input" />
                    </div>
                  </div>
                  <div class="mt-3">
                    <div>密码：</div>
                    <div><input v-model="userLogin.password" type="password" placeholder="请输入密码" class="login-input" />
                    </div>
                  </div>
                  <div @click="loginUp"
                    class="w-36 h-8 text-white text-base bg-blue-500 rounded-md mt-3 flex justify-center items-center">
                    登录</div>
                  <div class="flex justify-center mt-2">
                    <span>首次使用？</span>
                    <span class="text-blue-500">点我注册</span>
                  </div>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </div>

    <!-- 内容 -->
    <div class=" flex justify-center items-center mt-3">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import Dialog from '../components/Dialog.vue'
import router from '../router';
import { getStorage, setStorage } from '../utils/storage'
const headerLogo = 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
const headerBar = ['首页', '沸点', '课程', '直播', '活动', '竞赛', '商城', 'APP', '插件']
const linkNav = ['写文章', '发沸点', '写笔记', '写代码', '草稿箱']
const showDialog = ref(false)
const showDialog1 = ref(false)
const navIndex = ref(0)
const userLogin = reactive({
  account: '',
  password: ''
})
const welfare = [
  {
    img: 'src/assets/0001.webp',
    title: '免费试学课程'
  },
  {
    img: 'src/assets/0001.webp',
    title: '收藏有用文章'
  },
  {
    img: 'src/assets/0001.webp',
    title: '查阅浏览足迹'
  },
  {
    img: 'src/assets/0001.webp',
    title: '订阅优质专栏'
  },
  {
    img: 'src/assets/0001.webp',
    title: '体验签到抽奖'
  },
  {
    img: 'src/assets/0001.webp',
    title: '提升成长等级'
  },
]
const userInfo = ref()
const toCreatorCenter = () => {
  router.push('/CreatorCenter')
}
const toChildPage = (item: string, index: number) => {
  navIndex.value = index
  if (item === '首页') {
    router.push('/HomePage')
  } else if (item === '沸点') {
    router.push('/BoilingPoint')
  }
}
const openDialog1 = () => {
  showDialog1.value = !showDialog1.value
}
const showLogin = () => {
  showDialog.value = true
}

const loginUp = () => {
  axios.get('http://localhost:3000/users', {
    params: {
      account: userLogin.account,
      password: userLogin.password
    }
  }).then((res) => {
    console.log('res', res.data)
    if (res.data) {
      setStorage('token', res.data[0])
      showDialog.value = false
      console.log('-------', getStorage('token'))
    }

  })
    .catch(() => {
      console.log('登录失败')
    })
}
const colseDialog = () => {
  showDialog.value = false
  showDialog1.value = false
}
onMounted(() => {
  userInfo.value = getStorage('token') === null ? '' : getStorage('token')
  console.log('进来了一个页面', getStorage('token'))

})
</script>
<style scoped>
.header-nav:hover {
  border-bottom: #1e80ff 2px solid;
}

.login {
  color: #007FFF;
  font-size: 14px;
  border: #007FFF 1px solid;
  background-color: #f4f9ff;
  width: 102px;
  border-radius: 5px;
  position: relative;
}

.login-btn {
  display: inline-block;
  vertical-align: middle;
  margin: 0 6px;
  background-color: #abcdff;
  height: 12px;
  width: 1.5px;
}

.input-border {
  border: 0;
  outline: none;
  font-size: 14px;
}

.nav-active {
  color: #1e80ff;
}

.link-nav:hover {
  background: rgb(236, 235, 235);
}

.login-input {
  border: gray 1px solid;
  height: 28px;
  outline: none;
  border-radius: 5px;
}

.colse:hover {
  color: rgb(39, 39, 237);
}
</style>