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
    },
    increaseCounter(state, id) {
        state.data[id].count++
    },
    removeFromCart(state, index) {
        console.log(`Remove ${index}`)
        state.itemsInCart.splice(index, 1)
    },
    decreaseCounter(state, id){
        state.data[id].count--
    },
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
        if (state.itemsInCart.find(item => item === id)) {
            commit('increaseCounter', id)
        } else {
            commit('addInCart', id)
        }
    },
    removeFromCart({ state, commit }, index) {
        let id = state.itemsInCart[index]
        if (state.data[id].count > 1) {
            commit('decreaseCounter', id)
        } else {
            commit('removeFromCart', index)
        }
    },
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