import List from './List.js'
import Item from './Item.js'
import Cart from './Cart.js'
export default class GunsList extends List {
    _cartInstanse = null
    _pageCounter = 1

    constructor(CartInstance) {
        super()
        this._cartInstanse = CartInstance

        this.initShowMoreBtn()

        let goodsPromise = this.fetchGuns()
        goodsPromise.then(() => {
            this.render()
        })
    }

    initShowMoreBtn () {
        const btn = document.querySelector('.main__button')
        btn.addEventListener('click', () => {
            this._pageCounter++
            this.fetchGuns()
            .then(() => {
                this.render()

                if (this._pageCounter > 2) {
                    const btn = document.querySelector('.main__button')
                    btn.classList.toggle('disable')
                }
            })
        })
    }

    fetchGuns () {
        const result = fetch(`./database/page${this._pageCounter}.json`)
        return result
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.items.push(...data.data.map(cur =>{
                    return new Item (cur)
                }))
            })
            .catch(e => {
                console.log(e)
            })
    }
    render() {
        const placeToRender = document.querySelector('.main__line')
        if (!placeToRender) {
            return
        }

        placeToRender.innerHTML = ''

        this.items.forEach(item => {
            const template = item.getMainTemplate()
            placeToRender.appendChild(template)
        })
    }
}

const CartInstance = new Cart ()
const GunsListInstance = new GunsList(CartInstance)
