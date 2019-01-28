<!--左侧菜单-->
<template>
    <div class="base-menu">
        <el-menu
                default-active="2"
                background-color="#333"
                text-color=" #fff"
                active-text-color="#ffd04b"
                class="el-menu"
                :router="true">

            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>任务管理</span>
                </template>
                <el-menu-item-group>
                    <template slot="title"></template>
                    <el-menu-item index="/batch/list">任务列表</el-menu-item>
                    <el-menu-item index="/batch/log/list">执行日志</el-menu-item>

                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>


<style >
    .base-menu {
        background-color: #333;
        height: 100%;
    }
    .el-menu {
        border-right:solid 0px!important;
    }
</style>

<script>
    export default {
        data() {
            return {};
        },

        methods: {}
    };
</script>
