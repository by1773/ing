<template>
  <div class="map-wrap">
    <div class="toolbar">
      <div class="btn clearfix" @click="clearDraw()">
        <span class="fa fa-repeat clear-draw"></span><span class="text">清除交互</span>
      </div>
      <div class="btn clearfix" @click="clearLayer()">
        <span class="fa fa-eraser clear-layer"></span><span class="text">清除图层</span>
      </div>
      <div class="btn clearfix" @click="addInteraction('Polygon')" :class="{active: actived === 'Polygon'}">
        <span class="fa fa-arrows polygon"></span><span class="text">面标绘</span>
      </div>
      <div class="btn clearfix" @click="addInteraction('LineString')" :class="{active: actived === 'LineString'}">
        <span class="fa fa-arrows-h line"></span><span class="text">线标绘</span>
      </div>
      <div class="btn clearfix" @click="addInteraction('Point')" :class="{active: actived === 'Point'}">
        <span class="fa fa-dot-circle-o point"></span><span class="text">点标绘</span>
      </div>
    </div>
    <div id="map"></div>
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

<style scoped>
.map-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.toolbar {
  height: 28px;
  background-color: #eee;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  align-items: center; 
}
#map {
  position: absolute;
  top: 30px;
  bottom: 0;
  width: 100%;
}
.btn {
  float: right;
  font-size: 12px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 4px;
}
.btn:hover {
  font-weight: bold;
}
.icon {
  display: inline-block;
  width: 18px;
  height: 28px;
  /*background: #eeeeee url(../../static/images/icons.png);*/
  vertical-align: middle;
}
.point {
  background-position: -76px -127px;
}
.line {
  background-position: -149px -127px;
}
.polygon {
  background-position: -166px -127px;
}
.clear-draw {
  background-position: -278px -127px;
}
.clear-layer {
  background-position: -110px -127px;
}
.active {
  color: rgb(18, 88, 175);
  font-size: 14px;
  font-weight: 700;
}
.clearfix::after {
  content: "\20";
  display: block;
  height: 0;
  clear: both;
}
</style>
