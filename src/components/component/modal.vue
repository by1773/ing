<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover"  v-if="isShow" @click="closeMyself"></div>
      <transition name="drop">
        <div class="dialog-content"  v-if="isShow">
          <ul class="loginRegist-title">
            <li style="background: #EEEEEE;">快速登录</li>
            <li style="position: relative;">快速注册<p class="fa fa-times" @click="closeMyself" 
              style="position: absolute;right:10px;cursor: pointer;"></p></li>
          </ul>
          <div class="loginRegist_content">
            <div class="loginRegist_left">
              <p style="padding-bottom: 16px;">下载安卓客户端，数据早知道</p>
              <img src="http://www.1010earth.com/img/android_load.png?t=3.1.4" width="154px" height="154px">
              <p style="padding: 16px 0;"> 无法扫一扫？<a >直接下载</a></p>
            </div>
            <div class="loginRegist_right">
              <form>
                <input type="text" name="" class="form-control">
                <span></span>
                <input type="password" name="" class="form-control">
                <span></span>
                <button>快速登录</button>
              </form>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    closeMyself () {
      this.$emit('on-close')
    }
  }
}
</script>

<style lang="less"> 
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .3s ease;
}
.drop-enter {
  transform: translateY(-500px);
}
.drop-leave-active {
  transform: translateY(-500px);
}

.dialog-wrap {
  width: 100%;
  height: 100%;
  .dialog-cover {
    background: #000;
    opacity: .3;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
    .dialog-content {
      position: fixed;
      max-height: 50%;
      overflow: auto;
      background: #fff;
      top: 20%;
      left: 50%;
      margin-left: -580/2px;
      z-index: 10;
      line-height: 1.6;
      z-index: 1070;
      height: 380px;
      width: 580px;
      ul{
        display: flex;align-items: center;height: 45px;
        li{display: flex;align-items: center;justify-content: center;width: 50%;height: 100% }
      }
      .loginRegist_content{
         display: flex;flex-direction: row;justify-content: space-between;
         .loginRegist_left{
          margin-left: 36px;padding-top: 40px;
            p {font-size: 14px;color: #333;text-align: center;}
         }
         .loginRegist_right{
          margin-right: 36px; padding-top: 40px;
          input{
            width: 255px;
          }
          span{
            display: block;
            width: 255px;
            padding-left: 1px;
            margin-bottom: 0;
            font-weight: normal;
            height: 30px;
            line-height: 30px;
          }
          button{
            width: 255px;
            background: #FFEB00;
            border-color: #FFEB00;
            border-radius: 3px;
            color: #333333;
          }
         }
      }
    }
  
}



</style>
