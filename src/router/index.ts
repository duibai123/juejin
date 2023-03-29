import {createRouter, createWebHashHistory } from "vue-router";
import Home from '../views/index.vue'
import HomePage from '../views/home-page/index.vue'
import Editor from '../views/Editor/index.vue' 
import CreatorCenter  from '../views/creator-center/index.vue'
import BoilingPoint  from  '../views/boiling-point/index.vue'
import ArticleDetail  from '../views/home-page/article-detail.vue'
import ArticleList  from '../views/hot-list/index.vue'
import Articles from '../views/hot-list/article-list.vue'
import Columns from '../views/hot-list/columns.vue'
const routes = [
    {
        path:'/',
       component:Home,
       redirect:"/HomePage",
       children:[
        {
          path:'/HomePage',
          component:HomePage, 
        },
        {
            path:'/BoilingPoint',
            component:BoilingPoint, 
          },
          {
            path:'/CreatorCenter',
            component:CreatorCenter,    
        },
        {
          path:'/ArticleDetail', //文章详情页
          component:ArticleDetail,    
      },
      {
        path:'/ArticleList',
        component:ArticleList,
        children:[
          {
            path:'/Articles',
            component:Articles, 
          },
          {
              path:'/Columns',
              component:Columns, 
            }
            
         ]
      }
       ]
    },
    
    {
        path:'/Editor',
        component:Editor,     
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, 
  })

  export default router;