<template>
	<div class="header">
			<div id="nav" >
					<div>
						<img src="/static/image/nav_pic.png" width="213px" height="44px" title="logo">
					</div>
					<ul>
						<li v-for = "(item,index) in navData" :key = "index">
							<router-link :to="item.link">
		            	<span>{{item.name}}</span>
		          </router-link>
						</li>
					</ul>
      </div>
	</div>
</template>

<script type="text/javascript">
	export default{
		// name:'head',
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
		methods:{

		},
		mounted(){

		}
	}
</script>

<style type="text/css" scoped lang="less">
	#nav{
	  display: flex;
	  height: 80px;
	  flex-direction: row;
	  justify-content: center;
	  align-items: center;
	  ul{
	  	display: flex;
	  	flex-direction: row;
	  	list-style: none;
	  	li{
	  		height: 73px;
	  		display: flex;
	  		justify-content: center;
	  		align-items: center;
    		border-bottom: 7px solid #ffe400;
	  	}
	  }
	}

	#nav a{
	  padding:0 12px;
	}
	#nav .active{
	  color:red;
	}
</style>