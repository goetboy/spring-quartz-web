import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import batchList from "@/views/batchManage/list.vue";
import batchLogList from "@/views/batchManage/loglist.vue";
import Main from '@/views/Main.vue';
//import {getCookie} from './assets/utils/cookie'
Vue.use(Router);
export default new Router({
    //使用history需要服务器支持
  //  mode: 'history',
    base: 'exceptionSystem',//process.env.BASE_URL,
    routes: [
        /* {
           path: '/',
           name: 'home',
           component: Home
         },*/
        /* {
           path: '/about',
           name: 'about',
           // route level code-splitting
           // this generates a separate chunk (about.[hash].js) for this route
           // which is lazy-loaded when the route is visited.
           component: () => import(/!* webpackChunkName: "about" *!/ './views/About.vue')
         }*/
        {
            path: '/',
            component: Main,
            meta: { requiresAuth: true },
            redirect: '/batch/list',
            children: [
                // {
                //     path: 'resetPassword',
                //     component: ResetPassword,
                //     children: [{
                //         name: 'resetPasswordForMobile',
                //         path: 'mobile',
                //         component: ResetPasswordForm,
                //         props: true
                //     },
                //         {
                //             name: 'resetPasswordForEmail',
                //             path: 'email',
                //             component: ResetPasswordForm,
                //             props: true
                //         }
                //     ]
                // },
                {
                    path: "/batch/list",
                    component: batchList,
                    children: []
                },
                {
                    path: "/batch/log/list",
                    component: batchLogList,
                    children: []
                },
            ]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        }
    ]
});
//# sourceMappingURL=router.js.map