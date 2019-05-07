import VueRouter from 'vue-router'
import Home from "./components/Home"
import Menu from "./components/Menu"
import Admin from "./components/Admin"
import About from "./components/About/About"
import Login from "./components/Login"
import Register from "./components/Register"

//二级路由
import Contact from './components/About/Contact'
import Delivery from './components/About/Delivery'
import History from './components/About/History'
import OrderingGuide from './components/About/OrderingGuide'

//三级路由
import Phone from './components/About/contact/Phone'
import PersonName from './components/About/contact/PersonName'

export const routes = [
  {path:'/',name:"homeLink",components:{
    default: Home,
    'orderingGuide':OrderingGuide,
    'delivery':Delivery,
    'history':History
  }},
  {path:'/menu',component:Menu,name:"menuLink"},
  {path:'/admin',component:Admin,name:"adminLink"},
  {path:'/about',redirect:'/about/contact',component:About,name:"aboutLink",
  children:[
    {path:'/about/contact',redirect:'/about/contact/personName',name:'contactLink',component:Contact,children:[
      {path:'/about/contact/phone',name:'phoneNumber',component:Phone},
      {path:'/about/contact/personName',name:'personName',component:PersonName}
    ]},
    {path:'/about/delivery',name:'deliveryLink',component:Delivery},
    {path:'/about/history',name:'historyLink',component:History},
    {path:'/about/orderingGuide',name:'orderingGuideLink',component:OrderingGuide},
  ]},
  {path:'/login',component:Login,name:"loginLink"},
  {path:'/register',component:Register,name:"registerLink"},
  {path:'*',redirect:'/'}
]

