<template>
    <div class="admin-frame"
         :style="{ height: height,width:width}">
        <adminTitle :title="title">
            <i class="el-icon-refresh refresh"
               v-if="action"
               @click="refresh()"></i>
        </adminTitle>
        <slot></slot>
        <footEle></footEle>
    </div>
</template>

<script>
import footEle from "@/components/common/footEle.vue";
import adminTitle from "../common/adminTitle";
export default {
    name: "adminFrame",
    components: {
        adminTitle,
        footEle
    },
    props: {
        title: String,
        height: String,
        width: String,
        action: {
            type: Boolean,
            default: false
        }
    },
    mounted() {},
    methods: {
        refresh() {
            this.$emit("refresh-click");
        }
    }
};
</script>

<style scoped>
/* 媒体查询 */
@media screen and (max-width: 480px) {
    .admin-frame {
        width: 90% !important;
        top: 120px !important;
    }
    .refresh {
        font-size: 2rem;
    }
} /* 超小设备（手机，小于 480px） */
.admin-frame {
    width: 60%;
    margin: auto;
    text-align: left;
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 0;
}
.refresh {
    margin-left: 10px;
    cursor: pointer;
}
</style>