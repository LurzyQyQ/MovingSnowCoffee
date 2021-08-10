import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    
    children: [
      {
        path: 'home',
        // 别名,默认访问该页面
        alias: "",
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('../views/Menu.vue'),
      },
      {
        path: 'shopbag',
        name: 'Shopbag',
        component: () => import('../views/Shopbag.vue'),
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('../views/My.vue'),
      },
    ]
  },
  {
    path: '/detail/:pid',
    name: "Detail",
    component: () => import("../views/Detail.vue")
  },
  {
    path: '/login',
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: '/information',
    name: "Information",
    component: () => import("../views/Information.vue")
  },
  {
    path: '/order',
    name: "Order",
    component: () => import("../views/Order.vue")
  },
  {
    path: '/collection',
    name: "Collection",
    component: () => import("../views/Collection.vue")
  },
  {
    path: '/address',
    name: "Address",
    component: () => import("../views/Address.vue")
  },
  {
    path: '/addressedit',
    name: "AddressEdit",
    component: () => import("../views/AddressEdit .vue")
  },
  {
    path: '/passwordchang',
    name: "PasswordChang",
    component: () => import("../views/PasswordChang.vue")
  },
  {
    path: '/usermanage',
    name: "UserManage",
    component: () => import("../views/UserManage.vue")
  },
  {
    path: '/looksearch',
    name: "LookSearch",
    component: () => import("../views/LookSearch.vue")
  },
  {
    path: '/editaddress',
    name: "EditAddress",
    component: () => import("../views/EditAddress.vue")
  },
  {
    path: '/orders',
    name: "Orders",
    component: () => import("../views/Orders.vue")
  },
]

const router = new VueRouter({
  routes
})

export default router
