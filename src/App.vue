<template>
  <div id="app">
    <vheader></vheader>
    <div id="content">
      <router-view/>
    </div>
    <vfooter></vfooter>
  </div>
</template>

<script>
import vheader from '@/components/vheader.vue'
import vfooter from '@/components/vfooter.vue'
export default {
  name: 'App',
  components:{
    vfooter,
    vheader
  },
  data(){
  return {
    smg:'App'
  }
},
mounted(){
  
},
methods:{
 
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
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
}

#map{
  width: 100%;
  height: 700px
}
#content{
  flex:1;
}
ul li{
	list-style: none;
}
</style>
