<template>
    <div id="map" class="map">
    </div>
</template>

<script>
  import Map from 'ol/Map.js'
  import View from 'ol/View.js'
  import TileLayer from 'ol/layer/Tile.js'
  import XYZ from 'ol/source/XYZ.js'
  import {transform} from 'ol/proj.js'
  export default {
    name: 'XYZ',
    mounted(){
      new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://tilemap.1234.gov.cn/zhengxing/MAP/satemap/{z}/{x}/{y}.png'
              // url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
            })
          })
        ],
        view: new View({
          // projection: 'EPSG:4326',
          center: transform([118.8804, 42.2663],'EPSG:4326','EPSG:3857'),
          tilePixelRatio: 2,
          zoom: 16
        })
      })
    }
  }
</script>
