import {
    post
} from '@/lib/http'
import router from '@/pages/index/router'
import adminRouter from '@/pages/admin/router'
export default {
    state: {
        categoryList: [],
    },
    mutations: {
        setCategoryList(state, data) {
            state.categoryList = data;
        },
    },
    actions: {
        getCategoryListAction(context) {
            post("/category", {}, (data) => {
                context.commit('setCategoryList', data.data);
            });
        },
        addCategoryAction(context, data) {
            post("/category/add", {
                name: data.name,
                description: data.description
            }, (data) => {
                adminRouter.push('/admin/manage_category')
                context.dispatch('getCategoryListAction');
            });
        },
    },
    modules: {}
}