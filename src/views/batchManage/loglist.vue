<template>
    <div class="main">
        <div id="router">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>任务管理</el-breadcrumb-item>
                <el-breadcrumb-item><a href="loglist">任务日志</a></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div id="action">
        </div>

        <div id="container">
            <el-table :data="batchLogs" stripe highlight-current-row height="520">
                <!--<el-table-column prop="scheduleJobId" label="任务id" width="120px"></el-table-column>-->
                <el-table-column prop="jobName" label="任务名"></el-table-column>
                <el-table-column prop="startTime" label="执行开始时间"></el-table-column>
                <el-table-column prop="endTime" label="执行结束时间"></el-table-column>
                <el-table-column prop="state" :formatter="formatState" label="状态" width="50px"></el-table-column>
                <el-table-column prop="info" label="信息" show-overflow-tooltip></el-table-column>
            </el-table>
        </div>
        <div id="page">
            <!-- :pager-count="7" -->
            <el-pagination
                    layout="total,sizes,prev,pager,next,jumper"
                    :background="true"
                    :page-sizes="[10,20,30,50,100]"
                    :page-size="20"
                    :total="pages.itemsTotal"
                    @size-change="sizeChange"
                    @current-change="currentChange"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
    import batchLogApi from "../../assets/api/batchLog";

    export default {
        components: {},
        data() {
            return {
                page: {},
                formData: {
                    itemsPerPage: 20,
                    curPage: 1,
                },
                batchLogs: [],//任务列表
                pages: {}//分页信息
            };
        },
        created() {
        }
        ,
        mounted() {
            this.initPage();
        }
        ,
        methods: {
            initPage() {
                let vm = this;
                this.axios.get(batchLogApi.LIST, {params: this.formData}).then(function (data) {
                    console.log(data);
                    vm.pages = data;
                    vm.batchLogs = data.data;
                });
            },
            sizeChange(val) {
                let vm = this;
                vm.formData.itemsPerPage = val;
                vm.initPage();
            },
            currentChange(val) {
                let vm = this;
                vm.formData.curPage = val;
                vm.initPage();
            },
            //格式化状态
            formatState(row, col) {
                return row.state === '1' ? '正常' : row.state === '0' ? '异常' : '未知'

            },
        }
    };
</script>
<style>
    .table-expand {
        font-size: 0;
    }

    .table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .table-expand .el-form-item {
        margin: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>

