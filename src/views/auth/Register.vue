<template>
    <div class="registerForm">
        <h3>注册</h3>
        <el-form ref="registerForm" :model="registerForm" :rules="registerFormRules" label-width="80px">

            <el-form-item label="用户名" prop="userName">
                <el-input v-model="registerForm.userName" class="input"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="registerForm.password" class="input" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
                <el-input v-model="registerForm.password2" class="input" type="password"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
                <el-input v-model="registerForm.phone" class="input"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="registerForm.email" class="input"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="registerButton" @click="registerSubmit">注册</el-button>
            </el-form-item>
        </el-form>

        <div>
            已有账号？
            <router-link to="/login">马上登陆</router-link>
        </div>
    </div>

</template>


<script>
    import {setCookie, getCookie} from "@/assets/utils/cookie";
    import authApi from "@/assets/api/auth";


    export default {
        data() {
            //密码对照
            var checkPassword = (rule, value, callback) => {
                if (this.registerForm.password != this.registerForm.password2) {
                    callback(new Error("两次输入密码不一致"));
                    return;
                }
                callback();

            }
            return {
                registerForm: {
                    userName: "",
                    password: "",
                    password2: "",
                    phone: "",
                    mail: ""
                },
                registerFormRules: {
                    userName: [
                        {required: true, message: "请输入用户名", trigger: "blur"},
                        {min: 3, message: "用户名至少3位", trigger: "blur"},
                        {max: 20, message: "用户名最多20位", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {min: 6, message: "密码至少需要输入6位", trigger: "blur"},
                        {max: 20, message: "密码最多20位", trigger: "blur"},
                        {validator: checkPassword, trigger: "change"}
                    ],
                    password2: [
                        {validator: checkPassword, trigger: "change"},
                    ],
                    phone: [
                        {required: true, message: "手机号不能为空", trigger: "blur"},
                        {
                            pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,
                            message: "手机格式不正确",
                            trigger: "blur"
                        },
                    ],
                    email: [
                        {
                            pattern: /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
                            message: "邮箱格式不正确",
                            trigger: "blur"
                        },
                    ]
                },

            };
        },

        methods: {

            registerSubmit: function () {
                let self = this;
                this.$refs.registerForm.validate(valid => {
                    if (valid) {
                        //注册
                        let registerr = {
                            userName: self.registerForm.userName,
                            password: self.registerForm.password,
                            phone: self.registerForm.phone,
                            mail: self.registerForm.mail
                        }
                        let loginParams = new URLSearchParams(registerr);
                        axios.post(authApi.register, loginParams).then(response => {
                            self.$message({
                                showClose: true,
                                message: "注册成功",
                                type: "success"
                            });
                            self.$router.push("/login");
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

        }
    };
</script>

<style scored>
    .registerForm {
        width: 400px;
        height: 600px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;

        /* 背景 */
        padding: 20px 30px 20px 30px;
        background-color: #f7f7f9;
        border-color: #ddd;
        border-width: 20px;
        border-radius: 10px 10px 10px 10px;
    }

    .input {
        width: 400px;
    }

    .registerButton {
        margin-top: 20px;
        /* padding-top: 100px; */
        width: 150px;
    }
</style>

