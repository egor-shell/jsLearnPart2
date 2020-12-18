import List from './List.js'
export default class Cart extends List {
    constructor(items) {
        if (Cart._instance) {
            return Cart._instance
        }

        super(items)
        this.init()

        Cart._instance = this
    }

    init() {
        const block = document.createElement('div')
        block.classList.add('basket-block')

        const btn = document.createElement('button')
        btn.innerHTML = `<svg class="header-block__basket-ic" width="40" height="40" viewBox="0 0 40 40" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12.9998 33.9993C14.6566 33.9993 15.9997 35.3424 15.9997 36.9992C15.9997 38.6561 14.6566 39.9992 12.9998 39.9992C11.343 39.9992 9.99984 38.6561 9.99984 36.9992C9.99984 35.3424 11.343 33.9993 12.9998 33.9993ZM30.9993 33.9993C32.6561 33.9993 33.9992 35.3424 33.9992 36.9992C33.9992 38.6561 32.6561 39.9992 30.9993 39.9992C29.3425 39.9992 27.9993 38.6561 27.9993 36.9992C27.9993 35.3424 29.3425 33.9993 30.9993 33.9993ZM1.99996 0H5.99988C6.91107 0 7.69646 0.613668 7.92995 1.47545L7.97658 1.69585L8.94643 7.99984H37.9992C39.1987 7.99984 40.109 9.04117 39.9894 10.2005L39.9516 10.4336L36.6477 25.3011C36.0642 27.9269 33.8111 29.8281 31.1552 29.9884L30.7907 29.9994H13.4314C10.5885 29.9994 8.15377 28.0082 7.56515 25.2593L7.50129 24.9118L4.28407 3.99992H1.99996C0.895412 3.99992 0 3.10451 0 1.99996C0 0.974308 0.772065 0.128983 1.76672 0.0134552L1.99996 0H5.99988H1.99996ZM35.5061 11.9998H9.56185L11.4548 24.3036C11.5933 25.2042 12.3193 25.8872 13.2065 25.9869L13.4315 25.9995H30.7907C31.65 25.9995 32.4036 25.4524 32.6798 24.6564L32.7431 24.4334L35.5061 11.9998Z"
                            fill="white" />
                    </svg>`
        btn.classList.add('header-block__basket')

        const list = document.createElement('div')
        list.classList.add('basket-block__block')
        list.innerHTML = `
            <div class="basket-block__header">Ваша корзина:</div>
            <div class="basket-block__item-empty">Пуста</div>
            <div class="basket-block__item">Пуста</div>
            <button class="basket-block__buy">
                <p class="basket-block__buy-text">Оплатить</p>
            </button>
        `

        btn.addEventListener('click', () => {
            list.classList.toggle('disable')
        })

        block.appendChild(list)


        const placeToRenderHeader = document.querySelector('.header-block')
        placeToRenderHeader.appendChild(btn)
        const placeToRenderMain = document.querySelector('.main')
        if (placeToRenderMain) {
            placeToRenderMain.appendChild(block)
        }

        this.render()
    }
    getSumTemplate() {
        const sum = this.items.reduce((sum, gun) => {
            return sum + gun.price * gun.count
        }, 0)

        const block = document.createElement('div')
        block.classList.add('basket-block__sum-block')
        block.innerHTML = `<p class="basket-block__sum">Сумма: ${sum} руб.</p>`

        return block
    }
    getCountTemplate() {
        const count = this.items.reduce((count, gun) => {
            return count +  gun.count
        }, 0)

        const block = document.createElement('div')
        block.classList.add('basket-block__count-block')
        block.innerHTML = `<p class="basket-block__count">${count}</p>`

        return block
    }

    getEmptyTemplate() {
        const block = document.createElement('div')
        block.classList.add('basket-block__empty')
        block.innerHTML = `Пуста`

        return block
    }

    getContactTemplate() {
        const nameRegExp = /([a-z]+)|([а-я]+)/i

        const contactButton = document.createElement('button')
        contactButton.classList.add('main__contact')

        const contactBlock = document.createElement('div')
        contactBlock.classList.add('main__contack-block')
        contactBlock.innerHTML = `<input class="main__contact-name>`
    }

    render() {
        const placeToRender = document.querySelector('.basket-block__block')
        if (!placeToRender) {
            return
        }

        placeToRender.innerHTML = ''

        this.items.forEach(item => {
            const template = item.getCartTemplate()
            placeToRender.appendChild(template)
        })

        if (this.items.length) {
            placeToRender.appendChild(this.getSumTemplate())
        } else {
            placeToRender.appendChild(this.getEmptyTemplate())
        }

        const countPlaceToRender = document.querySelector('.header-block__basket')
        if (!countPlaceToRender) {
            return
        }
        if (this.items.length) {
            countPlaceToRender.appendChild(this.getCountTemplate())
        }
    }
}