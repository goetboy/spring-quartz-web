<template>
    <div class="main">
        <div id="router">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>任务管理</el-breadcrumb-item>
                <el-breadcrumb-item><a href="list">任务列表</a></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div id="action">
            <!-- <el-form :model="formData" size="medium">
                      <el-form-item label="具体查询">
                          <el-input type="seach" v-model="formData.search" placeholder="请输入" style="width:400px">
                              <el-select slot="prepend" v-model="formData.searchType" placeholder="请选择" style="width:100px">
                                  <el-option v-for="item in page.searchType" :key="item.value" :label="item.text"
                                             :value="item.value"></el-option>
                              </el-select>
                              <el-button icon="el-icon-search" slot="append" @click="search(1)"></el-button>
                          </el-input>
                      </el-form-item>
            </el-form>-->
            <el-button type="primary" @click="showAddForm" size="small">添加任务</el-button>
            <el-button type="primary" @click="showUpdateForm" size="small">修改任务</el-button>

            <!--<el-popover
                    placement="top"
                    width="160"
                    v-model="page.isdelete">
                <p>确定删除任务吗？</p>
                <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="page.isdelete = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="deleteBatch() ;page.isdelete = false">确定</el-button>
                </div>
                <el-button class="el-button&#45;&#45;primary" slot="reference" size="small">删除任务</el-button>
            </el-popover>-->
            <el-button class="el-button" type="primary" slot="reference" @click="deleteBatch" size="small">删除任务
            </el-button>
        </div>

        <div id="container">
            <el-table :data="batchs" stripe highlight-current-row @current-change="selectedRow" height="520">
                <!--   <el-table-column prop="scheduleJobId" width="80px" label="Id"></el-table-column>-->
                <el-table-column prop="jobName" label="任务名"></el-table-column>
                <el-table-column prop="aliasName" label="别名"></el-table-column>
                <el-table-column prop="jobGroup" label="分组" width="100px"></el-table-column>
                <el-table-column prop="cronExpression" label="表达式"></el-table-column>
                <el-table-column prop="url" label="执行类"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column prop="status" :formatter="formatStatus" label="状态"></el-table-column>
                <el-table-column label="操作" fixed="right" prop="status">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status!='1'" @click="pauseBatch(scope.row)" type="text"
                                   size="small">暂停
                        </el-button>
                        <el-button v-if="scope.row.status==='1'" @click="resumeBatch(scope.row)" type="text"
                                   size="small">恢复
                        </el-button>
                        <br/>
                        <el-button @click="runOncBatch(scope.row)" type="text"
                                   size="small">运行一次
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--页面弹出框-->
            <div>
                <!--任务添加对话框-->
                <el-dialog title="添加任务"
                           close-on-click-modal open="open"
                           :visible.sync="page.batchAddFormData.showDialog"
                           v-if="page.batchAddFormData.showDialog"
                           @closed="page.batchAddFormData.showDialog=false">
                    <batch-add-form ref="addFormDialog" v-if=" page.batchAddFormData.hackReset"
                                    @close-dialog="page.batchAddFormData.showDialog=false"></batch-add-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="page.batchAddFormData.showDialog=false">取 消</el-button>
                        <el-button type="primary"
                                   @click=" $refs.addFormDialog.Submit();initPage">确 定
                        </el-button>
                    </div>
                </el-dialog>

                <!--任务修改对话框-->
                <el-dialog title="修改任务" close-on-click-modal
                           v-if="page.batchUpdateFormData.showDialog"
                           :visible.sync="page.batchUpdateFormData.showDialog"
                           @closed="page.batchUpdateFormData.showDialog=false"
                           open="open">
                    <batch-update-form :batch="page.selected" ref="updateFormDialog"
                                       @close-dialog="page.batchUpdateFormData.showDialog=false">

                    </batch-update-form>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="page.batchUpdateFormData.showDialog = false">取 消</el-button>
                        <el-button type="primary"
                                   @click=" $refs.updateFormDialog.Submit();initPage()">确 定
                        </el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
        <div id="page">
            <!-- :pager-count="7" -->
            <el-pagination
                    layout="total,sizes,prev,pager,next,jumper"
                    :background="true"
                    :page-sizes="[10,20,30,50,100]"
                    :page-size="20"
                    :total="pages.total"
                    @size-change="sizeChange"
                    @current-change="currentChange"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
    import batchApi from "../../assets/api/batch";
    import BatchAddForm from "../../components/batchManage/batchAddForm"
    import BatchUpdateForm from "../../components/batchManage/batchUpdateForm"

    export default {
        components: {
            BatchAddForm, BatchUpdateForm
        },
        data() {
            return {
                page: {
                    selected: "",//选中行
                    isdelete: false,//是否删除
                    batchAddFormData: {
                        showDialog: false,//显示添加对话框
                        hackReset: true,
                    },
                    batchUpdateFormData: {
                        showDialog: false,//显示修改对话框
                        hackReset: true,
                    }
                },
                formData: {
                    curPage: 1,
                    itemsPerPage: 20,
                },
                batchs: [],//任务列表
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
                this.axios.get(batchApi.LIST, {params: this.formData}).then(function (data) {
                    console.log(data);
                    vm.pages = data;
                    vm.batchs = data.data;
                });
            },
            //显示添加页面
            showAddForm() {
                this.page.batchAddFormData.showDialog = true;
            },
            //显示更新页面
            showUpdateForm() {
                if (!this.page.selected) {
                    this.$message.error("请选择一个任务");
                    return;
                }
                this.page.batchUpdateFormData.showDialog = true;
            },
            //删除任务
            deleteBatch() {
                let vm = this;
                if (!this.page.selected) {
                    this.$message.error("请选择一个任务");
                    return;
                }
                this.$confirm('将删除此任务, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let delBatch = this.page.selected;
                    axios.post(batchApi.DELETE, delBatch.scheduleJobId).then(function (data) {
                        vm.initPage();
                    });
                }).catch(() => {
                    //取消操作，什么也不做 不能去掉这个分支 否则页面会报异常
                })
            },
            //暂停任务
            pauseBatch(row) {
                let vm = this;
                axios.post(batchApi.PAUSE, row.scheduleJobId).then(function (data) {
                    vm.$message.success("已经暂停任务");
                    vm.initPage();
                });
            },
            //恢复任务
            resumeBatch(row) {
                let vm = this;
                axios.post(batchApi.RESUME, row.scheduleJobId).then(function (data) {
                    vm.$message.success("已经恢复任务");
                    vm.initPage();
                });
            } ,
            //运行一次
            runOncBatch(row) {
                let vm = this;
                axios.post(batchApi.RUNONC, row.scheduleJobId).then(function (data) {
                    vm.$message.success("成功运行");
                    vm.initPage();
                });
            },//格式化状态
            formatStatus(row, col) {
                switch (row.status) {
                    case  '-1':
                        return '不存在';
                    case  '1':
                        return '暂停';
                    case  '2':
                        return '完成';
                    case  '3':
                        return '出错';
                    case  '4':
                        return '阻塞';
                    case  '0':
                        return '正常';
                    default:
                        return "未知";
                }
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
            //选中行
            selectedRow(currentRow) {
                let vm = this;
                vm.page.selected = currentRow;
            }
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

