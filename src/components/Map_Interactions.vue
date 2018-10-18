<template>
  <div class="map-wrap">
    <div class="bar">
      <div class="toolbar">
        <div class="bar-left">
          <ul class="bar_left_ul">
            <li class="diff">
              <a><span class="fa fa-repeat clear-draw"></span><span class="text">路网</span></a>
            </li>
            <li class="diff">
              <a><span class="fa fa-repeat clear-draw"></span><span class="text">地形</span></a>
            </li>
            <li @click="clearDraw()">
              <a><span class="fa fa-repeat clear-draw"></span><span class="text">清除交互</span></a>
            </li>
            <li @click="clearLayer()">
              <a><span class="fa fa-eraser clear-layer"></span><span class="text">清除图层</span></a>
            </li>
            <li @click="addInteraction('Polygon')" :class="{active: actived === 'Polygon'}">
              <a><span class="fa fa-arrows polygon"></span><span class="text">面标绘</span></a>
            </li>
            <li  @click="addInteraction('LineString')" :class="{active: actived === 'LineString'}">
              <a><span class="fa fa-arrows-h line"></span><span class="text">线标绘</span></a>
            </li>
            <li @click="addInteraction('Point')" :class="{active: actived === 'Point'}">
              <a><span class="fa fa-dot-circle-o point"></span><span class="text">点标绘</span></a>
            </li>
          </ul>
          <div class="dz">
            <p>
              <p style="cursor: help;">我们为您提供定制影像服务，实时获取最新影像。</p>
              <a >我要定制>></a>
            </p>
          </div>
        </div>
        <div class="bar-right">
          <ul class="bar_right_ul">
            <li>
              <a class="fa fa-search"></a>
            </li>
            <li>
              <a class="fa fa-gear"></a>
            </li>
            <li>
              <a class="fa fa-refresh"></a>
            </li>
          </ul>
        </div>
       </div>
    </div>
    <div id="map"></div>
    <div class="slider_menu">
      <span class="fa fa-globe"></span>
      <span class="earthText">样例</span>
      <span class="fa fa-angle-double-right"></span>
    </div>
  </div>
</template>

<script>
import {Map, View} from 'ol'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import TileImage from 'ol/source/TileImage'
import VectorSource from 'ol/source/Vector'
import TileGrid from 'ol/tilegrid/TileGrid'
import Draw from 'ol/interaction/Draw'
import XYZ from 'ol/source/XYZ.js'
import {getWidth, getTopLeft} from 'ol/extent.js'
import {get as getProjection} from 'ol/proj.js'
import {fromLonLat} from 'ol/proj.js';
export default {
  data () {
    return {
      actived: ''
    }
  },
  props: ['layerIds'],
  methods: {
    initMap () {
      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
           source: new XYZ({
              // 天地图加载
              url: 'http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}',
              // url:"http://gisserver.tianditu.com/TDTService/wfs",
              wrapX: true,
              // tileUrlFunction: tileUrlFunction
              })
          }),
          new TileLayer({
           source: new XYZ({
              // 天地图加载
              url: 'http://t4.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}',
              // url:"http://gisserver.tianditu.com/TDTService/wfs",
              wrapX: true,
              // tileUrlFunction: tileUrlFunction
              })
          })
        ],
        view: new View({
          // projection: 'EPSG:4326',
          center:fromLonLat([106, 26]),
          zoom: 4,
          minZoom: 2,
          maxZoom: 14
        })
      })
      // 添加标绘图层
      this.drawSource = new VectorSource({wrapX: false})
      this.drawLayer = new VectorLayer({
        source: this.drawSource,
        index: 100
      })
      this.map.addLayer(this.drawLayer)
    },

    // 获取天地图图层数组
    getLayers () {
      let layers = []
      let ids = ['vec_c', 'eva_c', 'cva_c']
      ids.forEach(item => {
        let layer = this.getTdtlayer(item)
        layers.push(layer)
      })
      return layers
    },

    // 初始化天地图图层
    getTdtlayer (lyr) {
      var url = 'http://t0.tianditu.com/DataServer?T=' + lyr + '&X={x}&Y={y}&L={z}'
      var projection = getProjection('EPSG:4326')
      var projectionExtent = [-180, -90, 180, 90]
      var maxResolution = (getWidth(projectionExtent) / (256 * 2))
      var resolutions = new Array(16)
      for (let z = 0; z < 16; ++z) {
        resolutions[z] = maxResolution / Math.pow(2, z)
      }
      var tileOrigin = getTopLeft(projectionExtent)
      var layer = new TileLayer({
        visible: false,
        extent: [-180, -90, 180, 90],
        source: new TileImage({
          crossOrigin: 'anonymous',
          tileUrlFunction: function (tileCoord) {
            var z = tileCoord[0] + 1
            var x = tileCoord[1]
            var y = -tileCoord[2] - 1
            var n = Math.pow(2, z + 1)
            x = x % n
            if (x * n < 0) {
              x = x + n
            }
            return url.replace('{z}', z.toString())
              .replace('{y}', y.toString())
              .replace('{x}', x.toString())
          },
          projection: projection,
          tileGrid: new TileGrid({
            origin: tileOrigin,
            resolutions: resolutions,
            tileSize: 256
          })
        })
      })
      layer.id = lyr
      return layer
    },

    // 刷新地图图层的显示或隐藏
    refreshMap () {
      let layerIds = this.layerIds
      this.map.getLayers().forEach(layer => {
        if (layer.id) {
          // if (layerIds.indexOf(layer.id) > -1) {
          //   layer.setVisible(true)
          // } else {
          //   layer.setVisible(false)
          // }
        }
      })
    },

    // 添加绘制交互
    addInteraction (type) {
      this.actived = type
      this.draw && this.map.removeInteraction(this.draw)
      this.draw = new Draw({
        source: this.drawSource,
        type: type,
        freehand: true
      })
      this.map.addInteraction(this.draw)
    },

    // 清除绘制图层
    clearLayer () {
      this.drawSource.clear()
    },

    // 清除绘制交互
    clearDraw () {
      this.actived = ''
      this.map.removeInteraction(this.draw)
    }
  },
  watch: {
    layerIds: function () {
      this.refreshMap()
    }
  },
  mounted () {
    this.initMap()
    this.refreshMap()
  }
}
</script>

<style scoped lang="less">
.map-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  .bar {
    position: absolute;
    top: 0px;
    z-index: 1;
    width: 100%;
    height: 43px;
    color: #fff;
    .toolbar{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      background-color: #000;
      opacity: 0.8;
      width: 100%;
      height: 43px;
      font-size: 12px;
      overflow: hidden;
      .bar-left{
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        ul{
          display: flex;
          height: 43px;
          overflow: hidden;
          li{
            &.diff{border-right: 1px solid #454545}
            width: 90px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            a{
              cursor: pointer;
              text-decoration: none;
              color: rgb(255, 255, 255);
              .fa{
                margin-right: 6px;
              }
              &:hover{
                color: #ffe400;
              }
            }
          }
        }
        div{
          display: flex;
          align-items: center;
          border-left: 1px solid #454545;
          padding-left:10px;
          align-items: center;
           a{
            color: #ffe400;
            height: 43px;
            width: 87px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover{
              background: #ffe400;
              color: #000;
            }
          }
        }
      }
      .bar_right_ul{
        display: flex;
        padding-right: 15px;
        height: 43px;
        li{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 100%;
          &:hover{
            background: #ffe400;
            a{color: #000}
          }
          a{
            text-decoration: none;color: #fff
          }
        }
      }
    }
  } 
  .slider_menu{
    position: absolute;
    left: 0;
    top: 50%;
    width: 34px;
    padding: 5px 0 5px 0;
    height: 96px;
    color: #fff;
    background-color: #000;
    opacity: 0.82;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    span.earthText{
      width: 14px;
      font-size: 14px;
      display: inline-block;
      padding: 5px 0;
    }
    &:hover{
      background: #ffe400;
      color:#000;
    }
  }
}
</style>
