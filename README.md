# luckincoffee

### 环境要求 需要 NodeJS 8.12+ 环境

### 下载

```
$ git clone https://github.com/LurzyQyQ/luckincoffee.git

$ npm install
```

### 运行
```
$ npm run serve
```
## 功能
1. 登录  
2. 注册  
3. 退出登录  
4. 用户信息   
5. 用户收藏   
6. 用户背景    
7. 用户头像  
8. 商品详情    
9. 添加商品收藏   
10. 取消商品收藏  
11. 添加购物车  
12. 选择规格  
13. 选择小搭配  
14. 主页推荐饮品  
15. 主页搜索商品  
16. 搜索列表  
17. 菜单分类列表   
18. 菜单列表左侧选项栏  
19. 切换商品分类  
20. 个人主页  
21. 地址管理  
22. 个人资料  
23. 我的收藏  
24. 设置  
25. 更换背景图片
26. 更换用户头像
27. 修改用户昵称
28. 修改个人简介
29. 修改密码
30. 新增地址
31. 修改地址
32. 注销账号
33. 购物袋
34. 选择商品结算
35. 单选,全选,增加商品数量
36. 提交订单
37. 选择地址
38. 立即结算
  

## 使用到的技术点

1. vue-router路由  
2. vue-cli脚手架
3. vue路由守卫
4. vuex
5. axios进行网络请求    
6. vant Loading (加载提示)  
7. vant Swipe轮播图   
8. 组件间通信（添加商品至购物车时，购物车数量要改变）  
......  

## 项目打包

$ npm run build即可完成打包

### 打包时要考虑的问题

dist文件夹太大？
``` 
1. 代码压缩：  
使用webpack中的uglifyjs-webpack-plugin插件(1.6M->852kb)  
vant按需引入（852kb－>459kb)    
```
```
2. 提取css插件，设置名称
使用插件extract-text-webpack-plugin提取css插件，设置名称new ExtractTextPlugin("[contenthash].css"),  
```
```
3. build.js文件拆分：提取第三方包  
通过插件CommonsChunkPlugin处理入口  
// 再加一个入口  
vendors:['vue','vue-router','axios','vue-preview'],  
//出口 
filename:'[chunkhash].js'  
plugins配置：  
// 提取公共模块  
new webpack.optimize.CommonsChunkPlugin({    
    // 清单，用来记录使用者和第三方的关系  
    names:['vendors','manifest']   
}),
```
```
4. 路由懒加载，用的时候才去加载（节省流量）  
```
