export default {
    HIDE_MODULE (state, type) {
        state.show = type
    },

    BACK_CHINA(state,type){
        
    },
  	increment (state) {
      // 变更状态
      state.count++
    },
   	add(state,n){
        state.count+=n;
    },
    reduce(state){
        state.count-=1;
    }

}
