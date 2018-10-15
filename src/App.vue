<template>
  <div id="app">
      <div id="nav" >
          <router-link v-for = "(item,index) in navData" :key = "index"  :to="item.link">
            <span>{{item.name}}</span>
          </router-link>
      </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
  return {
    navData:[
      {name:'Index_D3_Vuex',link:'/index'},
      {name:'Map_Interactions',link:'/map'},
      {name:'Search_GeoJSON',link:'/serch'},
      {name:'XYZ_Titled',link:'/XYZ_Title'}
    ]
  }
},
mounted(){
  
},
methods:{
  print(){
    console.log(this.navData)
  }
}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-weight: bold;
}

#map{
  width: 100%;
  height: 700px
}
#nav{
  display: flex;
  height: 60px;
  flex-direction: row;
  justify-content: center;
  align-items: center
}
#nav a{
  padding:0 12px;
}
#nav .active{
  color:red;
}
</style>
