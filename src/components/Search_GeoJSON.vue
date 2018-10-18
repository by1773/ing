<template>
    <div>
        <div class="select" style="margin: 10px 0">
          <v-region @values="regionChange" class="form-control"></v-region>
          <span>所选地区:{{region}}</span>
        </div>
        <div id="map" class="map">
          <div class="spin" v-if="isSpin"><Spin size="large"></Spin></div>
        </div>
    </div>
</template>

<script>
  import Map from 'ol/Map.js'
  import View from 'ol/View.js'
  import {defaults as defaultControls} from 'ol/control.js'
  import TileLayer from 'ol/layer/Tile.js'
  import { mapState } from 'vuex'
  import XYZ from 'ol/source/XYZ.js'
  import WMTS from 'ol/source/WMTS.js'
  import GeoJSON from 'ol/format/GeoJSON'
  import {fromLonLat} from 'ol/proj.js';
  import Feature from 'ol/Feature.js';
  import { Vector as VectorLayer} from 'ol/layer.js';
  import {OSM, Vector as VectorSource} from 'ol/source.js';
  import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
  import {LineString, Point, Polygon} from 'ol/geom.js';
  export default {
    name: 'Accessible',
    data(){
      return {
        map: '',
        region:'未选择',
        isSpin:false,
        vectorLayer:null
      }
    },
    mounted(){
       this.mapInit()
    },
    computed:{...mapState(['count'])},
    methods: {
      //===========创建Map=============
      mapInit(){
        this.map = new Map({
        layers: [
          new TileLayer({
           source: new XYZ({
              // 天地图加载
              url: 'http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}',
              wrapX: true,
              })
          }),
          new TileLayer({
           source: new XYZ({
              // 天地图加载
              url: 'http://t4.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}',
              // url:"http://t0.tianditu.gov.cn/cva_w/wmts?tk=5fc85d4954c383955d0627f173746e67",
              wrapX: true,
              // tileUrlFunction: tileUrlFunction
              })
          })
        ],
        target: 'map',
        controls: defaultControls({
          attributionOptions: {
            collapsible: false
          }
        }),
        view: new View({
          projection: 'EPSG:3857',
          center:  fromLonLat([106, 26]),
          // projection: 'EPSG:4326',
          // center:[106,26],
          zoom:10,
          minZoom:4,
          maxZoom:18,
        })
      });
      },
      //===========请求================
      regionChange(d) {
        this.isSpin = true
        this.region = (!d.province&&!d.city&&!d.area&&!d.town)?'please select': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
        // this.keywords = (!d.province&&!d.city&&!d.area&&!d.town)?'please select': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
        if(d.province&&d.city&&d.area&&d.town){
          this.keywords = `${this.getValue(d.province)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
        }else if(d.province&&d.city&&d.area){
          this.keywords = `${this.getValue(d.province)}${this.getValue(d.area)}`.trim();
        }else if(d.province&&d.city){
          this.keywords = `${this.getValue(d.province)}${this.getValue(d.city)}`.trim();
        }else if(d.province&&d.area){
          this.keywords = `${this.getValue(d.province)}${this.getValue(d.area)}`.trim();
        }else{
          this.keywords = `${this.getValue(d.province)}`.trim();
        }
        this.getData(this.keywords)
      },
      getValue(obj){
        return obj?obj.value:'';
      },
      getData(data){
        console.log(data)
        this.axios.get(
          'http://api.tianditu.gov.cn/administrative',
          {
            params:{
              postStr:{
                searchWord: data,
                searchType:'1',
                needSubInfo:'false',
                needAll:'false',
                needPolygon:'true',
                needPre:'true'
              },
              tk:'5fc85d4954c383955d0627f173746e67'
            }
          })
        .then((response)=>{
          let res = response.data.data[0].points;
          let bound = response.data.data[0].bound;
          let v = fromLonLat([response.data.data[0].lnt,response.data.data[0].lat])
          // let v = [response.data.data[0].lnt,response.data.data[0].lat]
          this.map.getView().setCenter(v)
          this.map.getView().setZoom(9)
          this.expent = bound.split(',').map(Number)
          this.removeLayers(this.vectorLayer)
          this.drawLayers(res)
        })
        .catch((error)=>{
          console.log(error);
        });
      },
      //======绘制边界==========================
      drawLayers(reg){
          let sunArr =[]
          let temp1 =[]
          let temp2 =[]
          let arr = reg[0].region.split(',')
          arr.map((i,e)=>{
            let temparr =[]
            let arr1 =  i.split(' ')
            sunArr.push(fromLonLat(arr1.map(Number)))
          })
          temp1.push(sunArr)
          temp2.push(temp1)
            let geojsonObjects = {
              'type': 'FeatureCollection',
              'crs': {
                'type': 'name',
                'properties': {
                  // 'name': 'EPSG:3857'
                   'name': 'EPSG:4326'
                }
              },
              'features': [{
                'type': 'Feature',
                'geometry': {
                  'type': 'MultiPolygon',
                  'coordinates':temp2
                }
              }]
            };
            let vectorSource = new VectorSource({
              features: (new GeoJSON()).readFeatures(geojsonObjects
                // {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'}
                )
            });

            this.vectorLayer = new VectorLayer({
              source: vectorSource,
              style: this.styleFunction
            });
        this.map.addLayer(this.vectorLayer)
        this.isSpin=false
      },
      //================样式=====================
      styleFunction(feature) {
        let styles = {
          'LineString': new Style({
            stroke: new Stroke({
              color: 'green',
              width: 1
            })
          }),
          'MultiLineString': new Style({
            stroke: new Stroke({
              color: 'green',
              width: 1
            })
          }),
          'MultiPolygon': new Style({
            stroke: new Stroke({
              color: 'red',
              width: 1
            }),
            fill: new Fill({
              color: 'rgba(255, 255, 0, 0.1)'
            })
          }),
          'Polygon': new Style({
            stroke: new Stroke({
              color: 'blue',
              lineDash: [4],
              width: 3
            }),
            fill: new Fill({
              color: 'rgba(0, 0, 255, 0.1)'
            })
          })
        };
        return styles[feature.getGeometry().getType()];
      },
      //================移除图层=====================
      removeLayers(layEle){
        let layers = this.map.getLayers()
          this.map.removeLayer(layEle)
          console.log(this.map)
        }
    },
    watch: {
      isSpin: function () {
        console.log('changed')
      }
    },
    
  }
</script>
<style type="text/css">
  .map{
    position: relative;
  }
  .spin{
    position: absolute;
    top: 50%;left:50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999;
  }
</style>
