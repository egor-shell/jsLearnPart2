class Item {
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

class List {
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
class Cart extends List {
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

class GunsList extends List {
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
class HelperForm {
    patternName = /(^[А-Я])([а-я]{1,15})$|(^[A-Z])([a-z]{1,15})$/gi
    patternEmail = /([A-Za-z0-9]{1,})\@([a-z]{1,})\.([a-z]{1,})/gi
    patternPhone = /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{4}/gi

    form = ''

    constructor() {
        this.addForm()
        this.addInput('text', 'name')
        this.addInput('text', 'phone')
        this.addInput('email', 'email')
        this.addInput('text', 'text')
    }

    addForm() {
        let main = document.querySelector('.main')
        let form = document.createElement('form')
        form.classList.add('main__form')
        this.form = form
        main.appendChild(form)
    }
    addInput(type, use) {
            switch (use) {
                case 'name':
                    let inputName = document.createElement('input')
                    inputName.classList.add(`main__form-${use}`)
                    inputName.setAttribute('placeholder', 'Введите Имя')
    
                    this.form.appendChild(inputName)

                    break
                
                    case 'phone':
                        let inputPhone = document.createElement('input')
                        inputPhone.classList.add(`main__form-${use}`)
                        inputPhone.setAttribute('placeholder', 'Ваш телефон: +7(913)626-9612')
    
                        this.form.appendChild(inputPhone)
                        break

                    case 'email':
                        let inputEmail = document.createElement('input')
                        inputEmail.classList.add(`main__form-${use}`)
                        inputEmail.setAttribute('placeholder', 'Ваш E-mail: qwerty@qwerty.com')
        
                        this.form.appendChild(inputEmail)
                        break

                    case 'text':
                        let inputText = document.createElement('input')
                        inputText.classList.add(`main__form-${use}`)
                        inputText.setAttribute('placeholder', 'Введите сообщение')
        
                        this.form.appendChild(inputText)
                        break
                    }
    }
}
// class HelperForm {

//     constructor(){
//         this.getBtnHelp()
//         this.render()
//     }
//     closeBtnFun() {
//         const closeBtn = document.createElement('button')
//         closeBtn.classList.add('main__form-close')
//         closeBtn.setAttribute('type', 'button')
//         closeBtn.innerHTML = 'X'
//         return closeBtn
//     }

//     getFormTemplate() {
//         const formHelp = document.createElement('form')
//         formHelp.classList.add('main__form')
//         formHelp.classList.add('disable')
//         formHelp.innerHTML = `
//         <input 
//             type="text"
//             title="Имя и фамилия должны начинаться с заглавной буквы. Использование цифр и любых других символов запрещено."
//             id="name"
//             class="main__form-input"
//         >
//         <input
//             type="text"
//             pattern="/^(?!.*@.*@.*$)(?!.*@.*\-\-.*\..*$)(?!.*@.*\-\..*$)(?!.*@.*\-$)(.*@.+(\..{1,11})?)$/"
//             title="E-mail должен включать в себя '@'"
//             id="mail"
//             class="main__form-input"
//         >
//         <input
//             type="text"
//             pattern="/(^\+7)(\(\d{3}\))(\d{3})\-(\d{4})$/"
//             title="Телефон должен иметь вид: +7(999)999-9999"
//             id="phone"
//             class="main__form-input"
//         >
//         <input
//             type="text"
//             id="message"
//             class="main__form-input"
//         >
//         <button type="submit">Отправить</button>
//         `
//         return formHelp
//     }

//     // closeForm () {
//     //     const closeBtn = document.querySelector('.main__form-close')
//     //     closeBtn.addEventListener('click', () => {
//     //         // const formBlock = document.querySelector('.main__form')
//     //         // formBlock.classList.toggle('disable')
//     //         console.log('Close')
//     //     })
//     // }

//     getBtnHelp() {
//         const btnHelp = document.createElement('div')
//         btnHelp.classList.add('main__help-btn')
//         btnHelp.innerHTML = '<span>?</span>'
//         btnHelp.addEventListener('click', () => {
//             const form = document.querySelector('.main__form')
//             form.classList.toggle('disable')
//         })

//         return btnHelp
//     }

//     render () {
//         const placeToRender = document.querySelector('.form')
//         placeToRender.appendChild(this.getBtnHelp())
//         placeToRender.appendChild(this.getFormTemplate())
//     }
// }
const Help = new HelperForm ()
const CartInstance = new Cart ()
const GunsListInstance = new GunsList(CartInstance)
