<template>
  <div class="row">
    <!--菜单-->
    <div class="col-sm-12 col-md-8">
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>尺寸</th>
            <th>价格</th>
            <th>加入</th>
          </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.name">
          <tr>
            <td><strong>{{item.name}}</strong></td>
          </tr>
          <tr v-for="option in item.options">
            <td>{{option.size}}</td>
            <td>{{option.price}}</td>
            <td>
              <button
                @click="addToBasket(item,option)"
                class="btn btn-sm btn-outline-success">+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
<!--  购物车  -->
    <div class="col-sm-12 col-md-4">
      <div v-if="baskets.length > 0 ">
        <table class="table">
          <thead class="thead-default">
          <tr>
            <th>数量</th>
            <th>品种</th>
            <th>价格</th>
          </tr>
          </thead>
          <tbody v-for="(basket,index) in baskets" :key="index">
          <tr>
            <td>
              <button @click="decreaseQuantity(basket)" class="btn btn-sm">-</button>
              <span>{{basket.quantity}}</span>
              <button @click="increaseQuantity(basket)" class="btn btn-sm">+</button>
            </td>
            <td>{{basket.name}}-{{basket.size}}寸</td>
            <td>{{basket.price * basket.quantity}}¥</td>
          </tr>
          </tbody>
        </table>
        <p>总价：{{total + "¥"}}</p>
        <button class="btn btn-success btn-block">提交</button>
      </div>
      <div v-else> {{basketText}} </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      baskets:[],
      basketText:'购物车没有任何商品',
      getMenuItems:{}
    }
  },
  computed:{
    total(){//总价
      let totalCost = 0;
      for(let index in this.baskets){
        let individualItem = this.baskets[index];
        totalCost += individualItem.quantity * individualItem.price
      }
      return totalCost
    }
  },
  created(){
    fetch("https://wd9519199794alqwsb.wilddogio.com/HYmenu.json")
    // this.$http.get('HYmenu.json')
      .then(res=>{
        return res.json()
      })
      .then(data=>{
        console.log(data)
        this.getMenuItems = data
      })

  },
  methods:{
    addToBasket(item,option){
      let basket = {
        name:item.name,
        size:option.size,
        price:option.price,
        quantity:1
      };
      if(this.baskets.length>0){
        //过滤
        let result = this.baskets.filter((basket) =>{
          return (basket.name === item.name && basket.price === option.price)
        });

        if(result != null && result.length > 0){
          console.log(result);
          result[0].quantity++
        }else{
          this.baskets.push(basket)
        }
      }else{
        this.baskets.push(basket)
      }
    },
    decreaseQuantity(basket){
      basket.quantity--;
      if(basket.quantity < 1){
        this.removeFromBasket(basket)
      }
    },
    increaseQuantity(basket){
      basket.quantity++
    },
    removeFromBasket(basket){
      this.baskets.splice(this.baskets.indexOf(basket),1)
    }
  }
}
</script>

<style>

</style>
