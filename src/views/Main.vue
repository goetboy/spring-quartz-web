<template>
    <div>
        <el-container>
            <!-- top -->
            <el-header>
                <!--头部-->
                <top-navbar></top-navbar>
            </el-header>

            <el-container>
                <el-aside>
                    <!-- 菜单 -->
                    <left-navbar></left-navbar>
                </el-aside>
                <!--主页面-->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style>
    .el-container {
        height: 97vh;
        /*min-width: 800px;*/
        overflow: hidden;
    }

    .el-header {
        padding: 0px !important;
    }

    .el-aside {
        width: 200px !important;
    }

    .el-main {
        background-color: #f2f2f2 !important;
        border: 1px solid #eee;
        padding: 10px !important;
    }
</style>

<script>

    import LeftNavbar from "./LeftNavbar.vue"
    import TopNavbar from "./TopNavbar.vue"

    export default {
        data() {
            return {}
        },

        components: {
            TopNavbar,
            LeftNavbar
        }
    }
</script>



