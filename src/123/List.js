export default class List {
    items = []

    constructor(items = []) {
        this.items = []
    }

    findGood(gun) {
        return this.items.filter(item => item.name === gun.name)[0]
    }

    add(item) {
        const exists = this.findGood(item)
        if (exists) {
            exists.inc()
        } else {
            this.items.push(item)
        }
        this.render()
    }

    remove(item) {
        const exists = this.findGood(item)
        if (!exists) {
            return
        }

        if (exists.count > 1) {
            exists.dec()
        } else {
            this.items = this.items.filter(gun => item.name !== gun.name)
        }
        this.render()
    }

    render() {
    }
}