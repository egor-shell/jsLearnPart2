const state = {
    data: 'Hello World!',
}
const mutations = {
    setData(state, newData) {
        state.data = newData
    }
}
const actions = {
    chacgeData ({ commit }) {
        fetch('/api/getData')
            .then(res => {
                return res.json
            })
            .then(data => {
                commit('setData', data)
            })
    }
}
const getters = {
    getData: state => state.data
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}