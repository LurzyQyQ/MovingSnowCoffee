# 瑞幸咖啡商城接口文档

```txt
邮箱正则：/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
```

```txt
配置axios
npm i axios vue-axios --save

在main.js引入
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
```

```txt
局部配置携带cookie
withCredentials 表示跨域请求时是否需要使用凭证
withCredentials: false, // 默认的

配置请求基础路径
axios.defaults.baseURL = 'http://192.168.48.131:10002'

全局配置请求时携带cookie
axios.defaults.withCredentials = true

配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

```

```txt
vue-cookies

参考链接 https://www.jianshu.com/p/60c13168cc8f

安装
npm i vue-cookies --save

使用
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

设置cookie
过期时间以秒为单位
this.$cookies.set(键名, 值, 过期时间)

```


```txt
vscode 当前项目全局匹配 ctrl+shift+f

比如删除所有

全局匹配语句
console.log()

使用正则匹配
console.log\(.*\);?


vue-cli4 打包

1、删除路由的history模式
2、保证vue项目没有任何vue抛出的警告或者错误
3、去除所有console.log()语句
4、在根目录下创建vue.config.js, 写入 module.exports = {publicPath: './'}

console.log\(.*\);?
```

```txt
安装sublime text3
ctrl+shift+p，输入 install package control, 然后回车

通过package control安装插件
ctrl+shift+p, 输入install, 选择 package control: install packge

等待加载插件仓库后，输入安装的插件名称

```

# 0C34BA 主题色
# 646566 灰色

```txt
早上6-12
下午12-18
晚上18-24
深夜24-06
```

```txt
登录怎么实现的？
登录后怎么存储数据的？（如何保持登录状态）

前后端分离， 使用token验证登录

前端后端混合，服务器生成一个session(会话), 服务器返回一个sessionId给前端，前端使用cookie将sessionId保存，后面每次访问有关于用户信息的页面，都必须携带sessionId到后台验证，如果验证通过，则允许访问，否则直接拦截

token是一个加密字符串
前端使用一个正确的账号和密码跟服务器换取一个合法token，服务器将token返回给前端，前端将token保存在cookie或者本地存储，后面每次访问有关于用户信息的页面，都必须携带token到后台验证，如果验证通过，则允许访问，否则直接拦截
```

# appkey 
```txt
  U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=
```

```txt

  注册接口
  请求地址：http://www.kangliuyong.com:10002/register
  请求类型： POST
  请求参数： {
    appkey: 你的appkey,
    nickName: 昵称,
    password: 密码,
    phone: 手机号
  }

```

```txt

  登录接口
  请求地址：http://www.kangliuyong.com:10002/login
  请求类型： POST
  请求参数： {
    appkey: 你的appkey,
    password: 密码,
    phone: 手机号
  }


  返回数据含有token
    token: 一个加密字符串
    token一般用于身份验证(登录验证)

    前端使用一个正确的账号和正确密码，向后台服务器换取一个合法token, 然后将token返回到前端，前端将token保存在cookie、sessionStorage、localStorage中，然后如果访问有关于用户个人信息的页面时，必须携带token到后台服务器验证，后台服务器验证通过，则放行，否则，则拦截操作
```

```txt
keep-alive: 保持失活的路由组件状态, 如果访问过的路由组件，则再次访问时，不会触发组件的生命周期钩子
```
```txt
  查询购物车商品总数量接口
  请求地址：http://www.kangliuyong.com:10002/shopcartCount
  请求类型： GET
  请求参数： {
    appkey: 你的appkey,
    tokenString: token字符串
  }

```

```txt
  获取购物车商品条目 (不是商品总数量)
  请求地址：http://www.kangliuyong.com:10002/shopcartRows
  请求类型： GET
  请求参数： {
    appkey: 你的appkey,
    tokenString: token字符串
  }

```

```txt
  查询用户所有购物车数据接口
  请求地址：http://www.kangliuyong.com:10002/findAllShopcart
  请求类型： GET
  请求参数： {
    appkey: 你的appkey,
    tokenString: token字符串
  }

```

```txt
  修改购物车商品数量接口
  请求地址：http://www.kangliuyong.com:10002/modifyShopcartCount
  请求类型： POST
  请求参数： {
    appkey: 你的appkey,
    tokenString: token字符串,
    sid: 购物车唯一标识,
    count: 商品数量
  }

```


```txt

 

```txt

  

```

```txt
  新增地址接口
  请求地址：http://www.kangliuyong.com:10002/addAddress
  请求类型： POST
  请求参数： {
    appkey: 你的appkey,
    tokenString: token字符串,
    name: 姓名,
    tel: 电话,
    province: 省份,
    city: 市,
    county: 区县,
    addressDetail: 详细地址,
    areaCode: 地区编号,
    postalCode: 邮政编码,
    isDefault: 默认地址
  }

  其中 isDefault 的值只能为 0 或者 1, ==> 0: 非默认地址, 1: 默认地址

```

```txt
  删除地址接口
  请求地址：http://www.kangliuyong.com:10002/deleteAddress
  请求类型： POST
  请求参数： {
    appkey: 你的appkey,
    tokenString: token字符串,
    aid: 地址唯一标识
  }

```

```txt
  查询地址接口
  请求地址：http://www.kangliuyong.com:10002/findAddress
  请求类型： GET
  请求参数： {
    appkey: 你的appkey,
    tokenString: token字符串
  }

```

```txt
  编辑地址接口
  请求地址：http://www.kangliuyong.com:10002/editAddress
  请求类型： POST
  请求参数： {
    appkey: 你的appkey,
    tokenString: token字符串
    aid: 地址的唯一标识
    name: 姓名,
    tel: 电话,
    province: 省份,
    city: 市,
    county: 区县,
    addressDetail: 详细地址,
    areaCode: 地区编号,
    postalCode: 邮政编码,
    isDefault: 默认地址
  }

  其中 isDefault 的值只能为 0 或者 1, ==> 0: 非默认地址, 1: 默认地址

```

```txt
  根据地址aid查询地址接口
  请求地址：http://www.kangliuyong.com:10002/findAddressByAid
  请求类型： GET
  请求参数： {
    appkey: 你的appkey,
    tokenString: token字符串,
    aid: 地址的唯一标识
  }

```
```txt
  提交订单页面查询需要购买商品接口
  请求地址：http://www.kangliuyong.com:10002/commitShopcart
  请求类型： GET
  请求参数： {
    appkey: 你的appkey,
    tokenString: token字符串,
    sids: 购物车唯一标识集合
  }
  其中 sids 值为 JSON.stringify([sid1, sid2, sid3])
```

```txt
  立即结算接口
  请求地址：http://www.kangliuyong.com:10002/pay
  请求类型： POST
  请求参数： {
    appkey: 你的appkey,
    tokenString: token字符串,
    sids: 购物车唯一标识集合,
    phone: 手机号,
    address: 收货地址,
    receiver: 收货人
  }

  其中 sids 值为 JSON.stringify([sid1, sid2, sid3])
```

```txt
  查询订单接口
  请求地址：http://www.kangliuyong.com:10002/findOrder
  请求类型： GET
  请求参数： {
    appkey: 你的appkey,
    tokenString: token字符串,
    status: 订单状态
  }


  其中 status 值为 0, 1, 2 ==> 0: 全部，1: 进行中，2: 已完成
```

```txt
  确认收货接口
  请求地址：http://www.kangliuyong.com:10002/receive
  请求类型： POST
  请求参数： {
    appkey: 你的appkey,
    tokenString: token字符串,
    oid: 订单oid
  }

```

```txt
  删除订单接口
  请求地址：http://www.kangliuyong.com:10002/removeOrder
  请求类型： POST
  请求参数： {
    appkey: 你的appkey,
    tokenString: token字符串,
    oid: 订单oid
  }

```

