<template>
    <div class="batch-add">
        <el-form ref="batchForm" :model="batchForm" label-width="200px" :rules="batchFormRules"
                 :label-position="'right'">
            <el-form-item label="任务名称:" prop="jobName">
                <el-input type="text" v-model="batchForm.jobName" class="input" placeholder="请输入任务名"/>
            </el-form-item>
            <el-form-item label="表达式:" prop="cronExpression">
                <el-input type="text" v-model="batchForm.cronExpression" class="input"
                          @focus="page.cron.showCronBox=true;" placeholder="请输入表达式"/>
            </el-form-item>
            <el-dialog
                    title="执行时间"
                    :visible.sync="page.cron.showCronBox"
                    :close="cronDialogClose" open="page.cron.cronExpression=batchForm.cronExpression" append-to-body>
                <cron v-model="page.cron.cronExpression"></cron>
                <span slot="footer" class="dialog-footer">
    <el-button @click="page.cron.showCronBox= false">取 消</el-button>
    <el-button type="primary" @click="cronDialogClose">确 定</el-button>
  </span>
            </el-dialog>
            <el-form-item label="执行类:" prop="url">

                <el-select class="input" v-model="batch.url" placeholder="请选择">

                    <el-option
                            v-for="item in jobClassList"
                            :key="item.classPath"
                            :label="item.className"
                            :value="item.classPath">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
                <el-input type="text" v-model="batchForm.email" class="input" placeholder="请输入邮箱"/>
            </el-form-item>
            <el-form-item label="描述:">
                <el-input type="textarea" v-model="batchForm.description" prop="description" class="input"
                          placeholder="描述信息"
                />
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import batchApi from "../../assets/api/batch"
    import Cron from "../cron/cron"

    export default {
        components: {
            Cron,
        },
        props: {
            batch: Object
        },
        data() {
            return {
                page: {
                    cron: {
                        showCronBox: false,
                        cronExpression: null,
                    },
                }, jobClassList: null,//任务类列表

                //任务信息
                batchForm: {
                    scheduleJobId: this.batch.scheduleJobId,//id
                    jobName: this.batch.jobName,//任务名称
                    aliasName: this.batch.aliasName,
                    jobGroup: this.batch.jobGroup,
                    jobTrigger: this.batch.jobTrigger,
                    status: this.batch.status,
                    cronExpression: this.batch.cronExpression,//表达式
                    url: this.batch.url,//执行类
                    email: this.batch.email,//邮件
                    description: this.batch.description,//描述
                    isSync: this.batch.isSync//是否异步
                },
                //角色属性校验
                batchFormRules: {
                    jobName: [
                        {required: true, message: "请输入任务名", trigger: "blur"}
                    ],
                    cronExpression: [
                        {required: true, message: "请输入表达式", trigger: "blur"}
                    ],
                    email: [
                        {type: 'email', message: "请输入正确的邮箱", trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: "请输入执行类", trigger: "blur"}
                    ],
                    description: [
                        {max: 200, message: "描述不能太长", trigger: "blur"}
                    ]
                }
            }
        },
        mounted() {
            this.initPage();
        },
        methods: {
            //初始化页面
            initPage: function (query) {
                let vm = this;
                this.axios.get(batchApi.JOBLIST).then(response => {
                    vm.jobClassList = response;
                })
            },
            //角色添加提交
            Submit: function () {
                let self = this;
                this.$refs.batchForm.validate(valid => {
                    if (valid) {
                        axios.post(batchApi.UPDATE, self.batchForm).then(response => {
                            this.$message.success("修改成功!");
                            self.$emit('close-dialog');
                        })
                    } else {
                        self.$message({
                            showClose: true,
                            message: "输入信息不完整",
                            type: "warning"
                        });
                        return false;
                    }
                });
            },

            //关闭cron对话框
            cronDialogClose() {
                let vm = this;
                vm.$set(vm.batchForm, 'cronExpression', vm.page.cron.cronExpression);
                vm.page.cron.showCronBox = false;
            },
        },
        watch: {
            //监听role变化 需要触发更新
            batch: function (val) {
                this.batchForm = val;
            }
        },
    }

</script>
<style>
    .batch-add {
        border-bottom-width: 1px;
        /* border-style:dotted solid double dashed;*/
        border-color: rgba(56, 130, 123, 0.91);
    }

    .input {
        width: 180px !important;
    }
</style>