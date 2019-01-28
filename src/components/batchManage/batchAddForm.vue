<template>
    <div class="batch-add">
        <el-form ref="batch" :model="batch" label-width="200px" :rules="batchFormRules" :label-position="'right'">
            <el-form-item label="任务名称:" prop="jobName" ref="jobName">
                <el-input type="text" v-model="batch.jobName" class="input" placeholder="请输入任务名"/>
            </el-form-item>
            <el-form-item label="表达式:" prop="cronExpression" ref="cronExpression">
                <el-input type="text" v-model="batch.cronExpression" class="input" @focus="page.cron.showCronBox=true"
                          placeholder="corn从左到右（用空格隔开）：秒 分 小时 月份中的日期 月份 星期中的日期 年份"/>
            </el-form-item>
            <el-dialog
                    title="执行时间"
                    :visible.sync="page.cron.showCronBox"
                    :close="cronDialogClose" append-to-body>
                <cron v-model="page.cron.cronExpression"></cron>
                <span slot="footer" class="dialog-footer">
    <el-button @click="page.cron.showCronBox= false">取 消</el-button>
    <el-button type="primary" @click="cronDialogClose">确 定</el-button>
  </span>
            </el-dialog>
            <el-form-item label="执行类:" prop="url" ref="url">
                <el-select class="input" v-model="batch.url" placeholder="请选择">
                    <el-option
                            v-for="item in jobClassList"
                            :key="item.classPath"
                            :label="item.className"
                            :value="item.classPath">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email" ref="email">
                <el-input type="text" v-model="batch.email" class="input" placeholder="请输入邮箱"/>
            </el-form-item>
            <el-form-item label="描述:" prop="description" ref="description">
                <el-input type="textarea" v-model="batch.description" class="input"
                          placeholder="描述信息"
                />
            </el-form-item>

        </el-form>
    </div>
</template>
<script>
    import batchApi from "../../assets/api/batch"
    import Cron from "../../components/cron/cron"

    export default {
        components: {Cron},

        data() {
            return {
                page: {
                    cron: {
                        showCronBox: false,
                        cronExpression: null,
                    },
                },
                jobClassList: null,//任务类列表
                //任务信息
                batch: {
                    jobName: null,//任务名称
                    cronExpression: null,
                    url: null,
                    email: null,
                    description: null,
                    isSync: false
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
                        {required: true, message: "请输入执行类", trigger: ["blur", "change"]}
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
                //获取任务类信息
                this.axios.get(batchApi.JOBLIST).then(response => {
                    vm.jobClassList = response;
                }).catch(function () {
                    vm.jobClassList = null
                })

            },
            //角色添加提交
            Submit: function () {
                let self = this;
                this.$refs.batch.validate(valid => {
                    if (valid) {
                        axios.post(batchApi.SAVE, self.batch).then(response => {
                            this.$message.success("添加成功!");
                            self.batch = {
                                jobName: null,//任务名称
                                cronExpression: null,
                                url: null,
                                email: null,
                                description: null,
                                isSync: false
                            };
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
            //关闭对话框
            cronDialogClose() {
                let vm = this;
                vm.$set(vm.batch, 'cronExpression', vm.page.cron.cronExpression);
                //局部校验
                vm.$refs.batch.validateField('cronExpression')
                vm.page.cron.showCronBox = false;
            }
        }
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