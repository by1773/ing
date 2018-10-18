<template>
  <div class="slide" v-on:mouseover="stop()" v-on:mouseout="move()">
    <div class="slideshow">
      <transition-group tag="ul" name="image">
        <li v-for="(img, index) in imgArray" v-show="index===mark" :key="index">
          <router-link tag="a" to="/index">
            <img :src='img'>
          </router-link>
        </li>
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timer: null, //定时器
      mark: 0, //比对图片索引的变量
      imgArray: [
        'http://api.1010earth.com/v1/img/outLink/d4ebd5e5-46b2-4ef8-a0be-3e189ef18e15.jpg',
        'http://api.1010earth.com/v1/img/outLink/fa5d4ac1-74fa-4fd5-895a-9aa3c87bd151.jpg',
        'http://api.1010earth.com/v1/img/outLink/ae132be1-e542-4e58-9fb6-b2d3f1eebc04.jpg',
        'http://api.1010earth.com/v1/img/outLink/d4ebd5e5-46b2-4ef8-a0be-3e189ef18e15.jpg'
      ],
    }
  },
  mounted() {

  },
  methods: {
    autoPlay() {
      this.mark++;
      if (this.mark === 4) {
        this.mark = 0
      }
    },
    play() {
      this.timer = setInterval(this.autoPlay, 4000)
    },
    change(i) {
      this.mark = i
    },
    stop() {
      clearInterval(this.timer)
    },
    move() {
      this.timer = setInterval(this.autoPlay, 4000)
    }
  },
  created() {
    this.play()
  }
}

</script>
<style type="text/css" scoped lang="less">
.slide {
  width: 100%;
  height: 460px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;

  .image-enter-active {
    transform: translateX(0);
    transition: all 1s ease;
  }

  .image-leave-active {
    transform: translateX(-100%);
    transition: all 1s ease;
  }

  .image-enter {
    transform: translateX(100%);
  }

  .image-leave {
    transform: translateX(0);
  }

  .slideshow {
    width: 100%;
    height: 460px;

    li {
      position: absolute;
    }

    .bar {
      position: absolute;
      width: 100%;
      bottom: 10px;
      margin: 0 auto;
      z-index: 10;
      text-align: center;
    }

    .bar span {
      width: 20px;
      height: 5px;
      border: 1px solid;
      background: white;
      display: inline-block;
      margin-right: 10px;
    }

    .active {
      background: red !important;
    }
  }
}

</style>
