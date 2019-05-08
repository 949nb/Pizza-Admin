import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


export const store = new Vuex.Store({
  // 储存数据
  state:{
    menuItems:{}
  },
  // 获取数据
  getters:{
    getMenuItems(state){
      return state.menuItems
    }
  },
  //改变数据的状态
  mutations:{
    setMenuItems(state,data){
      state.menuItems = data
    },
    removeItem(state,data){
      state.menuItems.forEach((item,index)=>{
        if(item === data){
          state.menuItems.splice(index,1)
        }
      })
    },
    addMenuItem(state,data){
      state.menuItems.push(data)
    }
  },
  //应用mutations中的方法，可以用作异步函数
  actions:{

  }
});
