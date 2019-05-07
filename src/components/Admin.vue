<template>
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-8">
        <!-- new pizza  -->
        <new-pizza></new-pizza>
      </div>
      <div class="col-sm-12 col-md-4">
        <!--    品种展示    -->
        <h3 class="text-muted my-5">菜单</h3>
        <table class="table">
          <thead class="table table-default">
            <tr>
              <th>品种</th>
              <th>删除</th>
            </tr>
          </thead>
          <tbody v-for="item in getMenuItems" :key="item.name">
            <tr>
              <td>{{item.name}}</td>
              <td>
                <button @click="deleteData(item)" class="btn btn-outline-danger btn-sm">x</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import NewPizza from './NewPizza'

  export default {
    data(){
      return{
        getMenuItems: []
      }
    },
    components:{
      'new-pizza': NewPizza
    },
    created() {
      fetch("https://wd9519199794alqwsb.wilddogio.com/HYmenu.json")
        .then(res=>{
          return res.json()
        })
        .then(data=>{
          // console.log(data);
          let menuArray = [];
          for(let key in data){
            // console.log(data[key])
            data[key].id = key;
            menuArray.push(data[key])
          }
          this.getMenuItems = menuArray
        })
    },
    methods:{
      deleteData(item){
        fetch("https://wd9519199794alqwsb.wilddogio.com/HYmenu/"+item.id+'.json',{
          method:"DELETE",
          headers:{
            'Content-type':'application/json'
          }
        })
          .then(res => res.json())
          .then(data => this.$router.push({name:'menuLink'}))
          .catch(err => console.log(err))
      }
    }
  }
</script>

<style>

</style>
