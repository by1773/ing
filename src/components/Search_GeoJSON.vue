<template>
    <div>
        <div class="select" style="margin: 10px 0">
          <v-region @values="regionChange" class="form-control"></v-region>
          <span>KeyWords:{{keywords}}</span>
        </div>
        <div id="map"></div>
    </div>
</template>

<script>
  import Map from 'ol/Map.js'
  import View from 'ol/View.js'
  import {defaults as defaultControls} from 'ol/control.js'
  import TileLayer from 'ol/layer/Tile.js'
  import { mapState } from 'vuex'
  import XYZ from 'ol/source/XYZ.js'
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
        region:'',
        regions:'',
        keywords:'未选择'
      }
    },
    mounted(){
       this.map = new Map({
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
          center:  fromLonLat([106, 26]),
          // center:[0,0],
          zoom:10,
          // minZoom:4,
          // maxZoom:10,
        })
      });
    },
    computed:{...mapState(['count'])},
    methods: {
      //===========请求=============
      regionChange(d) {
        this.region = (!d.province&&!d.city&&!d.area&&!d.town)?'please select': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
        this.keywords = this.region
        this.getData(this.region)
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
          let v = fromLonLat([response.data.data[0].lnt,response.data.data[0].lat])
          this.map.getView().setCenter(v)
          this.drawLayers(res)
        })
        .catch((error)=>{
          console.log(error);
        });
      },
      //======绘制边界==========================
      drawLayers(reg){
          let sunArr =[]
          let arr = reg[0].region.split(',')
         arr.map((i,e)=>{
          let temparr =[]
          let arr1 =  i.split(' ')
          temparr.push(fromLonLat(arr1))
          sunArr.push(temparr)
         })
        
          let GeoJSON_data =  {
              'type': 'Feature',
              'geometry': {
                'type': 'MultiLineString',
                'coordinates': sunArr
              }
            }
            var geojsonObject = {
              'type': 'FeatureCollection',
              'crs': {
                'type': 'name',
                'properties': {
                  'name': 'EPSG:3857'
                }
              },
              'features': [{
                'type': 'Feature',
                'geometry': {
                  'type': 'MultiLineString',
                  'coordinates':sunArr
                }
              }]
            };
             // console.log(GeoJSON_data)
             var vectorSource = new VectorSource({
                features: (new GeoJSON()).readFeatures(geojsonObject)
              });
              console.log( (new GeoJSON()).readFeatures(geojsonObject))
          //====================================================================
           var source = new VectorSource({
              url: 'http://openlayers.org/en/latest/examples/data/geojson/switzerland.geojson',
              format: new GeoJSON()
            });
           var style = new Style({
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0.6)'
            }),
            stroke: new Stroke({
              color: '#319FD3',
              width: 1
            }),
            image: new CircleStyle({
              radius: 5,
              fill: new Fill({
                color: 'rgba(255, 255, 255, 0.6)'
              }),
              stroke: new Stroke({
                color: '#319FD3',
                width: 1
              })
            })
            });
           var vectorLayer = new VectorLayer({
              source: vectorSource,
              style: style
            });
          //====================================================================
          // const lineFeature = new Feature(
               // new LineString(v));
          const polygonFeature = new Feature(
            new Polygon([[[-5e6, -1e6], [-4e6, 1e6], [-3e6, -1e6]]]));
        //   let vectorLayer = new VectorLayer({
        //      features: [lineFeature,polygonFeature],
        //     style: new Style({
                
        // stroke: new Stroke({
        //   width: 10,
        //   color: 'red',
        //   lineDash: [4],
        // }),
        // fill: new Fill({
        //   color: 'red'
        // })
        //         }),
        //   });

       
        this.map.addLayer(vectorLayer)
        console.log(this.map.getLayers())
      },
      alerts(){
        alert('333')
      }
    }
    
  }
</script>
