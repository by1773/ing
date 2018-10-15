export const backToChina = ({commit}, type) => {
    commit('BACK_CHINA', type)
}

export const hideCurrentModule = ({commit}, type) => {
    commit('HIDE_MODULE', type)
}

export const addAction = (context) => {
		// context.commit('add',10)
		setTimeout(()=>{
			context.commit('reduce')
		},1000)
    console.log('我比reduce提前执行');
}

export const reduceAction = ({commit}) => {
		commit('reduce')

}

