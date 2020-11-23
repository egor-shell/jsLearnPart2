class AbstractCart {
    items = []

    constructor(items = []) {
        this.items = items
    }

    findGood(gun) {
        return this.items.filter(item => item.name === gun.name)[0]
    }

    add (item) {
        const findedItem = (gun => {
            return this.items.filter(item => item.name === gun.name)
        })

        const addedPromise = new Promise(resolve => {
            if (findedItem) {
              findedItem.inc()
            } else {
              this.items.push(item)
            }
            resolve()
        })

        addedPromise.then(this.render.bind(this))
    }

    remove (item) {
        const findedItem = (gun => {
            return this.items.filter(item => item.name === gun.name)
        })

        const addedPromise = new Promise (resolve => {
            if (findedItem.counter > 1) {
                findedItem.dec()
            } else {
                // todo
            }
        })

        addedPromise.then(this.render.bind(this))
    }

    render () {
        this.items.forEach(item => {
            item.render()
        })
    }
}
class List extends AbstractCart {
    _cartInstanse = null
    _pageCounter = 1

    constructor(CartInstanse) {
        super()
        this._cartInstanse = CartInstanse

        let goodsPromise = this.fetchItems()
        goodsPromise.then(() => {
            this.render()
        })
    }

    fetchItems () {
        const result = fetch('./database1.json')
        return result
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.items.push(...data.data.map(cur => {
                    return new Item (cur, this._cartInstanse)
                }))
            })
            .catch(() => {
                console.log('Error')
              })
    }

    render() {
        console.log(this)
    }
}
class Item {
    tag = ''
    name = ''
    price = 0
    img = ''
    count = 1

    constructor (tag, name, price, img) {
        this.tag = tag
        this.name = name
        this.price = price
        this.img = img
    }

    inc() {
        this.count++
    }
    dec() {
        this.count--
    }
}

const ListInstanse = new List()