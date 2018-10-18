<template>
  <div class="container">
    <div class="header">
      <div class="header-info">
      	<div class="left">
	        <div class="logo_box">
	          <img src="/static/image/nav_pic.png" alt="LOGO" width="213px" height="44px" title="logo" />
	        </div>
	        <div class="nav">
	          <ul class="headerNav" id="headerNav">
	            <li tag="li" value="0101" class="selected">
	              <router-link tag="a" to="/index">首页</router-link>
	              <div>
	              </div>
	            </li>
	            <li value="0102">
	              <router-link tag="a" to="/map">实时贵州</router-link>
	              <div>
	              </div>
	            </li>
	            <li value="0103">
	              <router-link tag="a" to="/index" target="_self">解决方案</router-link>
	              <div>
	                <router-link tag="a" to="/index" target="_self">概述</router-link>
	                <router-link tag="a" to="/index" target="_self">产品架构</router-link>
	                <router-link tag="a" to="/index" target="_self">遥感城市</router-link>
	                <router-link tag="a" to="/index" target="_self">合作洽谈</router-link>
	              </div>
	            </li>
	            <li value="0104">
	              <router-link tag="a" to="/index" target="_self">影像定制</router-link>
	              <div>
	                <router-link tag="a" to="/index" target="_self">服务介绍</router-link>
	                <router-link tag="a" to="/index" target="_self">API示例</router-link>
	                <router-link tag="a" to="/index" target="_self">定制数据</router-link>
	              </div>
	            </li>
	            <li value="0105">
	              <router-link tag="a" to="/index" target="_self">信息产品定制</router-link>
	              <div>
	                <router-link tag="a" to="/index" target="_self">产品类型</router-link>
	                <router-link tag="a" to="/index" target="_self">定制服务</router-link>
	              </div>
	            </li>
	          </ul>
	        </div>
        </div>
        <div class="login-no signIn">
        	<a >登录</a>
        </div>
      </div>
      </div>
    </div>
</template>
<script>
  export default {
  name: 'App',
  data() {
    return {
      navData:[
        {name:'首页',link:'/index'},
        {name:'实时贵州',link:'/map'},
        {name:'解决方案',link:'/index',child:[
          {
            name:'概述',
            link:'/index'
          },
          {
            name:'产品架构',
            link:'/index'
          }
        ]},
        {name:'影像定制',link:'/index'},
        {name:'信息产品定制',link:'/index'}
      ]
    }
  },
  mounted() {
  },
  methods: {
  },
  created () {
  }
}

</script>
<style type="text/css" scoped lang="less">
.header {
  width: 100%;
  height: 80px;

  .header-info {
    width: 1200px;
    margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
    .left {
 			 display: flex;
 			 flex-direction: row;
 			 justify-content: flex-start;
 			 align-items: center;
	    .logo_box {
	      padding: 0 60px 0 10px;
	    }

    	.nav {
      ul {
        float: left;
        text-align: center;

        li {
          display: inline-block;
          width: 126px;
          height: 80px;
          line-height: 80px;
          text-align: center;
          float: left;
          position: relative;

          &:hover {
            border-bottom: 7px solid #ffe400;
            background-color: #ffe400;
            height: 73px;

            >div {
              display: block;
            }
          }

          ;

          &.selected {
            height: 73px;
            border-bottom: 7px solid #ffe400;
          }

          >div {
            position: absolute;
            z-index: 100;
            top: 80px;
            left: 0px;
            width: 100%;
            background: rgba(255, 228, 0, 0.95);
            display: none;

            a {
              display: block;
              width: 126px;
              font-size: 14px;
              height: 38px;
              text-align: center;
              line-height: 38px;
              color: #000;
              direction: none
            }
          }

          >a {
            color: #000;
            display: inline-block;
            width: 126px;
            height: 73px;
          }
        }
      }
    	}
  	}
    .signIn{
	    width: 62px;
	    height: 30px;
	    border: 1px solid #000;
	    border-radius: 3px;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    cursor: pointer;
	    a{
		    color: #333;
		    font-size: 14px;
		    text-decoration: none;
		    cursor: pointer;
	    }
	    &:hover{
	    	background-color: #FFE300;
		    border: 1px solid transparent;
	    }
    }
  }
}

</style>
