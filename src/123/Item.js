export default class Item {
    tag = ''
    name = ''
    price = 0
    img = ''
    count = 1

    constructor({ tag, name, price, img }) {
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

    getAddInCartBtn() {
        const btn = document.createElement('div')
        btn.classList.add('main__line-item-buy')
        btn.innerHTML = '<p class="main__line-item-buy__text">Купить</p>'

        btn.addEventListener('click', () => {
            const CartInstance = new Cart()
            CartInstance.add(this)
            console.log(CartInstance)
        })

        return btn
    }

    getMainTemplate() {
        

        const { tag, name, price, img } = this
        const wrapper = document.createElement('div')
        wrapper.classList.add('main__line-item')
        wrapper.innerHTML = `
        <h2 class="main__line-item-header">${tag}</h2>
        <div class="main__line-item-gun">
            <img src='${this.img}' alt="item" class="main__line-item-big">
            <div class="main__line-item-round"></div>
         </div>
         <h3 class="main__line-item-name">${name}</h3>
         <h3 class="main__line-item-price">${price} руб.</h3>
    `

        wrapper.appendChild(this.getAddInCartBtn())

        return wrapper
    }

    getMinusBtn() {
        const btn = document.createElement('button')
        btn.classList.add('basket-block__amount')
        btn.innerHTML = '-'

        btn.addEventListener('click', () => {
            const CartInstance = new Cart()
            CartInstance.remove(this)
            console.log(CartInstance)
        })

        return btn
    }
    getPlusBtn() {
        const btn = document.createElement('button')
        btn.classList.add('basket-block__plus')
        btn.innerHTML = '+'

        btn.addEventListener('click', () => {
            const CartInstance = new Cart()
            CartInstance.add(this)
            console.log(CartInstance)
        })

        return btn
    }

    getCartTemplate() {
        const { tag, name, price, count } = this
        const wrapper = document.createElement('div')
        wrapper.classList.add('basket-block__item')
        wrapper.innerHTML = `
        <div class="basket-block__item__img-name">
            <img src ="${this.img}" class="basket-block__item-img"></img>
            <div class="basket-block__item-round"></div>
            <div class="basket-block__item-naming">
                <span class="basket-block__tag">${tag}</span> 
                <span>${name}</span>
            </div>
        </div>
    `
        const minus = document.createElement('div')
        minus.classList.add('basket-block__minus')
        minus.appendChild(this.getMinusBtn())
        const inputBlock = document.createElement('div')
        inputBlock.classList.add('basket-block__input-sum')
        inputBlock.innerHTML = `
            <input value="${count}" class='basket-block__input' maxlength="2" />
        `
        const infoBlock = document.createElement('span')
        infoBlock.innerHTML = `${price * count} руб.`
        const plus = document.createElement('div')
        plus.classList.add('basket-block__plusBlock')
        plus.appendChild(this.getPlusBtn())
        const footer = document.createElement('div')
        footer.classList.add('basket-block__footer')

        const controlBlock = document.createElement('div')
        controlBlock.classList.add('basket-block__control')
        controlBlock.appendChild(minus)
        controlBlock.appendChild(inputBlock)
        controlBlock.appendChild(plus)
        footer.appendChild(controlBlock)
        footer.appendChild(infoBlock)
        const input = inputBlock.querySelector('input')
        inputBlock.addEventListener('input', event => {
            const value = event.target.value
            if (value) {
                this.count = +value
                const CartInstance = new Cart()
                if (this.count) {
                    CartInstance.render()
                } else {
                    CartInstance.remove(this)
                }
            }
        })

        wrapper.appendChild(footer)
        return wrapper
    }

}