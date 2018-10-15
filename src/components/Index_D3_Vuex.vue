<template>
    <div>
        <!-- <h1>{{ $t("message.hello") }}</h1> -->
        <!-- <h2></h2> -->
        <h1 style="color: red">{{count}}<i class="fa fa-photo"></i></h1>
        <button @click = "add(1)">+</button> <button @click = "reduce()">-</button>
        <svg width="500" height="270">
          <g style="transform: translate(0, 10px)">
            <path :d="line" />
          </g>
        </svg>
        <!-- <v-region @values="regionChange" class="form-control"></v-region> -->
    </div>
</template>

<script>
  import * as d3 from 'd3'
  import { mapState, mapMutations, mapActions } from 'vuex';
  export default {
    name: 'index',
    data(){
      return {
        message: 'Hellow',
        data: [99, 71, 78, 25, 36, 92],
        line: '',
      }
    },
    computed:{...mapState(["count"])},
    mounted(){
      $('h2').text(this.message);
       this.calculatePath();
    },
    methods:{
    ...mapMutations([  
        'add','reduce'
    ]),
    ...mapActions(['addAction','reduceAction']),
    getScales() {
      const x = d3.scaleTime().range([0, 430]);
      const y = d3.scaleLinear().range([210, 0]);
      d3.axisLeft().scale(x);
      d3.axisBottom().scale(y);
      x.domain(d3.extent(this.data, (d, i) => i));
      y.domain([0, d3.max(this.data, d => d)]);
      return { x, y };
    },
    calculatePath() {
      const scale = this.getScales();
      const path = d3.line()
        .x((d, i) => scale.x(i))
        .y(d => scale.y(d));
      this.line = path(this.data);
    },
    regionChange(data){
      let value = data.stringify() ;
      console.log(value)
            console.log(data,typeof data);

        }
    }
  }
</script>
<style type="text/css" scoped>
  div {
    /*display: flex;*/
    /*flex-direction: row;*/
    /*justify-content: center;*/
  }
  svg{margin: 25px;}
  path{fill: none;
    stroke: #76BF8A;
    stroke-width: 3px
  }
</style>