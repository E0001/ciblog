import axios from 'axios'
import {
    Notification
} from 'element-ui';
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ArticleList from '../views/ArticleList.vue'
import Article from '../views/Article.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import personalSettings from '../components/admin/personalSettings.vue'
import writeArticle from '../components/admin/writeArticle.vue'
import manageArticle from '../components/admin/manageArticle.vue'
import manageCategory from '../components/admin/manageCategory.vue'
import addCategory from '../components/admin/addCategory.vue'
import manageTag from '../components/admin/manageTag.vue'
import index from '../components/admin/index.vue'
import manageComment from '../components/admin/manageComment.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/articleList',
        name: 'articleList',
        component: ArticleList,
    },
    {
        path: '/article/:id',
        name: 'article',
        component: Article
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        children: [{
            path: '/admin',
            name: 'index',
            component: index,
        }, {
            path: '/admin/personal_settings',
            name: 'personal_settings',
            component: personalSettings,
        }, {
            path: '/admin/write_article',
            name: 'write_article',
            component: writeArticle,
        }, {
            path: '/admin/write_article/:aid',
            name: 'edit_article',
            component: writeArticle,
        }, {
            path: '/admin/manage_category',
            name: 'manage_category',
            component: manageCategory,
        }, {
            path: '/admin/add_category',
            name: 'add_category',
            component: addCategory,
        }, {
            path: '/admin/manage_tag',
            name: 'manage_tag',
            component: manageTag,
        }, {
            path: '/admin/manage_article',
            name: 'manage_article',
            component: manageArticle,
        }, {
            path: '/admin/manage_comment',
            name: 'manage_comment',
            component: manageComment,
        }]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path.indexOf("/admin") == 0) {
        axios
            .post("/api/api/client/login/check", {
                uid: localStorage.getItem('uid'),
            }, {
                headers: {
                    "Accept": "application/json",
                    'token': localStorage.getItem('token')
                },
            })
            .then(res => {
                if (res.data.code == 200) {
                    next();
                } else {
                    next('/login');
                    Notification({
                        title: "登陆失效",
                        message: "请重新登陆！",
                        type: "error"
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    } else if (from.path === '/login') {
        next();
    } else {
        next();
    }

});

export default router