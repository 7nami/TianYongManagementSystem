import axios from 'axios';

const baseUrl = '/api'

// axios二次封装的核心逻辑，使用ES6的类写法 面向对象的思想
class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.instance = axios.create();
        this.interception(this.instance);
    }
    // 定义初始参数
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {},

        }
        return config
    }

    // 从中文文档网站粘贴的
    interception(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }


    // 最终需要(http)调用request方法，所以这里接收从外部传递进来的参数options
    request(options) {
        options = { ...this.getInsideConfig(), ...options }
        /* // 创建axios的实例
        const instance = axios.create()
        // 实例拦截器的绑定
        this.interception(instance)
        return instance(options) */
        return this.instance(options);
    }

}

export default new HttpRequest(baseUrl)