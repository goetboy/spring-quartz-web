"use strict";

import Vue from 'vue';
import axios from "axios";
import {Loading, Message} from "element-ui";
import {getCookie} from "../utils/cookie";
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';
//axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);
var loadinginstace;
_axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        /* loadinginstace = Loading.service({fullscreen: true});
         if (getCookie('token')) {
             config.headers.Authorization = 'Bearer_' + getCookie('token');
         }*/

        return config;
    },
    function (error) {
        console.log(error)
        //  loadinginstace.close();
        return Promise.reject(Message({
            message:'请求异常',
            type:'error'
        }));
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        // loadinginstace.close();
        if (response.status == 200) {/*
            let data = response.data;
            switch (data.success) {
                //如果正常
                case 0:
                    return data.data;
                //如果异常
                case 1:
                    Promise.rejected(Message({
                        showClose: true,
                        message: data.message,
                        type: "error"
                    }))
                    break;
                //未知情况
                default:

                    Promise.rejected(Message({
                        showClose: true,
                        message: "未知状态",
                        type: "error"
                    }))
            }*/
            return response.data;
        }

    },
    function (error) {
        Error

        console.log(error.message)
        //loadinginstace.close();
        //异常处理
        if (error.response) {
            let response = error.response
            switch (response.status) {
                //服务器异常
                case 500:
                    Promise.rejected(Message({
                        showClose: true,
                        message: response.data,
                        type: "error"
                    }))
                    break;
                case 1001:
                    Promise.rejected(Message({
                        showClose: true,
                        message: response.data,
                        type: "error"
                    }))
                    break;
                case 400:
                    Promise.rejected(Message({
                        showClose: true,
                        message: '请求参数异常，请重试',
                        type: "error"
                    }))

                    break;
                //找不到接口
                case 403:
                    Promise.rejected(Message({
                        showClose: true,
                        message: response.data.message,
                        type: 'error'
                    }))
                    break;
                default:
                    Promise.rejected(Message({
                        showClose: true,
                        message: '未知错误',
                        type: 'error'
                    }))
            }

        }
        if (error.message === 'Network Error') {
            return Promise.rejected(Message({
                showClose: true,
                message: '网络异常，无法连接服务器',
                type: 'error'
            }))
        }

        return Promise.rejected(Message({
            showClose: true,
            message: '未知错误',
            type: 'error'
        }));
    }
);

Plugin.install = function (Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

Vue.use(Plugin)

export default Plugin;
