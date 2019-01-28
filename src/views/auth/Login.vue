<template>
    <div class="loginForm">
        <h3>登录</h3>
        <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules" label-width="80px">

            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" class="input"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" class="input" type="password"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" class="loginButton" @click="loginSubmit">登录</el-button>
            </el-form-item>
        </el-form>


        <div>
            没有账号？
            <router-link to="/register">马上注册</router-link>
        </div>
    </div>

</template>


<script>
    import {setCookie, getCookie} from "@/assets/utils/cookie";
    import auth_url from "@/assets/api/auth";


    export default {
        data() {
            return {
                loginForm: {
                    username: "",
                    password: ""
                },

                loginFormRules: {
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"},
                        {min:3, message: "用户名至少3位", trigger: "blur"},
                        {max:20, message: "用户名最多20位", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {min: 6, message: "密码至少需要输入6位", trigger: "blur"},
                        {max:20, message: "密码最多20位", trigger: "blur"}

                    ]
                },
                regForm: {},
                regFormRules: {}
            };
        },

        methods: {
            loginSubmit: function () {
                let self = this;
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        let loginParams = new URLSearchParams(this.loginForm);
                        axios.post(auth_url.login,
                            loginParams
                        ).then(response => {
                            self.$message({
                                showClose: true,
                                message: "登录成功",
                                type: "success"
                            });
                            sessionStorage.setItem("token",response);
                            setCookie('token',response)
                            self.$router.push("/");
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

<style>
    .loginForm {
        width: 400px;
        height: 300px;
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

    .loginButton {
        margin-top: 20px;
        /* padding-top: 100px; */
        width: 150px;
    }
</style>

