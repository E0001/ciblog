import {
    post
} from '@/http'
import router from '@/router'

export default {
    state: {
        personalData: {},
        system: {},
        isAdmin: true,
        isShowLeftNav: true,
        isLogin: false,
        uid: localStorage.getItem('uid') ? localStorage.getItem('uid') : '',
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        countList: {
            articleCount: "",
            CategoryCount: "",
            commentCount: ""
        },
        paging: {
            pageSize: 10,
            currentPage: 1,
            type: -1,
            total: 0,
            typeName: "",
        },
        refresh: "main",
        UPLOADPATH: process.env.VUE_APP_UPLOADPATH,
    },
    mutations: {
        setSystem(state, data) {
            state.system = data;
            state.system.banner = data.banner.split("\n");
        },
        isAdmin(state, data) {
            state.isAdmin = data;
        },
        REFRESH(state, data) {
            state.refresh = data;
        },
        handleLeftNav(state, data) {
            state.isShowLeftNav = data;
        },
        setPersonalData(state, data) {
            state.personalData = data;
        },
        setLoginStatus(state, data) {
            if (data.isLogin) {
                state.isLogin = true;
                state.uid = data.uid;
                state.token = data.token;
                localStorage.setItem('uid', data.uid);
                localStorage.setItem('token', data.token);
            } else {
                state.isLogin = false;
                state.uid = undefined;
                state.token = undefined;
                localStorage.removeItem('uid');
                localStorage.removeItem('token');
            }
        },
        setCountList(state, data) {
            state.countList = data;
        },
        setPaging(state, data) {
            state.paging = data;
        }
    },
    actions: {
        getPersonalDataAction(context) {
            post("/setupc/personal", {}, (data) => {
                context.commit('setPersonalData', data.data);
            });
        },
        updatePersonalDataAction(context, data) {
            post("/setupc/updatePersonal", {
                data: data
            }, (data) => {
                context.dispatch('getPersonalDataAction');
            });
        },
        loginAction(context, data) {
            post("/login", {
                name: data.name,
                password: data.password
            }, (data) => {
                if (data.code == 200) {
                    context.commit('setLoginStatus', {
                        isLogin: true,
                        uid: data.data.uid,
                        token: data.data.token,
                    });
                    router.push("/admin");
                }

            });
        },
        alterPassAction(context, data) {
            post("/login/alterpass", {
                password: data.password,
                repassword: data.repassword,
            }, (data) => {});
        },
        logoutAction(context, data) {
            post("/login/logout", {}, (data) => {
                router.push("/login");
                context.commit('setLoginStatus', {
                    isLogin: false
                });
            });
        },
        getCountAction(context, data) {
            post("/count", {}, (data) => {
                context.commit('setCountList', data.data);
            });
        },
        getSystemAciton(context, data) {
            post("/setupc/system", {}, data => {
                context.commit('setSystem', data.data);
            });
        }
    },
    modules: {}
}