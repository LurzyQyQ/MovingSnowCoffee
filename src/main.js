import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import 'font-awesome/css/font-awesome.min.css'
import 'animate.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import {
  Tabbar,
  TabbarItem ,
  Toast,
  NavBar ,
  Stepper ,
  GoodsAction, 
  GoodsActionIcon, 
  GoodsActionButton,
  Swipe, 
  SwipeItem,
  Lazyload,
  Form ,
  Field ,
  Button,
  Icon,
  Checkbox, 
  CheckboxGroup,
  SwipeCell,
  AddressList,
  AddressEdit,
  SubmitBar,
} from 'vant';

Vue
  .use(Tabbar)
  .use(TabbarItem)
  .use(VueAxios, axios)
  .use(Toast )
  .use(NavBar)
  .use(Stepper)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Form)
  .use(Field)
  .use(Button)
  .use(Icon)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(SwipeCell)
  .use(AddressList)
  .use(AddressEdit)
  .use(SubmitBar)

//设置请求基础路径
axios.defaults.baseURL = "http://www.kangliuyong.com:10002"

// 添加axios拦截器
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //发送请求之前,显示加载中mask
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });


  let appkey = "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=";
  if(config.method === "post"){
    //进行post请求参数序列化
    config.data = config.data || {};
    let dataString = "";
    for(let key in config.data){
      dataString += `${key}=${config.data[key]}&`
    }
    config.data = dataString + "appkey=" + appkey;
  }else if(config.method === "get"){
    config.params = config.params || {};
    config.params.appkey = appkey;
  }
  return config;
}, error => {
  // 对请求错误做些什么
  Toast.clear();
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  //服务器响应数据后关闭加载提示
  Toast.clear();
  return response;
}, error => {
  // 对响应错误做点什么
  Toast.clear();
  return Promise.reject(error);
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
