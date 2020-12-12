const state = {
    data: {},
    itemsOnPage: [],
    itemsInCart: [],
}
const mutations = {
    setData(state, newData) {
        state.data = {...state.data, ...newData}
        state.itemsOnPage.push(...Object.keys(newData))
    },
    addInCart(state, id) {
        state.itemsInCart.push(id)
    }
}
const actions = {
    requestData ({ commit }, page = 1) {
        if (!page) {
            return
        }
        return fetch(`/itemsList/${page}`)
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(data => {
                console.log(data)
                commit('setData', data)
            })
    },
    addInCart ({ state, commit }, id) {
        commit('addInCart', id)
    }
}
const getters = {
    getData: state => state.data,
    getItemsOnPage: state => state.itemsOnPage,
    getItemsInCart: state => state.itemsInCart,

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}