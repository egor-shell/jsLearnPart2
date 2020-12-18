export default class HelperForm {
    patternName = /(^[А-Я])([а-я]{1,15})$|(^[A-Z])([a-z]{1,15})$/
    patternEmail = /([A-Za-z0-9]{1,})\@([a-z]{1,})\.([a-z]{1,})/
    patternPhone = /^\+7\(\d{3}\)\d{3}\-\d{4}$/
    patternMessage = /.{1,}/im
    
    form = ''

    constructor() {
        this.addForm()
        this.addClose()
        this.addInput('text', 'name')
        this.addInput('text', 'phone')
        this.addInput('email', 'email')
        this.addInput('text', 'text')
        this.addSumbit()
        this.checkValid()
    }

    addForm() {
        const main = document.querySelector('.main')
        const btnForm = document.createElement('button')
        btnForm.classList.add('main__form-open')
        btnForm.addEventListener('click', () => {
            this.form.classList.toggle('disable')
        })
        const closeIc = document.createElement('span')
        closeIc.innerHTML = '?'
        btnForm.appendChild(closeIc)
        const form = document.createElement('form')
        form.classList.add('main__form')
        form.classList.add('disable')
        form.addEventListener('submit', event => {
            event.preventDefault()
        })
        this.form = form
        main.appendChild(btnForm)
        main.appendChild(form)
    }
    addInput(type, use) {
            switch (use) {
                case 'name':
                    const inputName = document.createElement('input')
                    inputName.classList.add('main__form-input')
                    inputName.setAttribute('placeholder', 'Введите Имя')
                    inputName.setAttribute('id', `${use}`)
    
                    this.form.appendChild(inputName)

                    break
                
                    case 'phone':
                        const inputPhone = document.createElement('input')
                        inputPhone.classList.add('main__form-input')
                        inputPhone.setAttribute('placeholder', 'Ваш телефон')
                        inputPhone.setAttribute('id', `${use}`)
    
                        this.form.appendChild(inputPhone)
                        break

                    case 'email':
                        const inputEmail = document.createElement('input')
                        inputEmail.classList.add('main__form-input')
                        inputEmail.setAttribute('placeholder', 'Ваш E-mail')
                        inputEmail.setAttribute('id', `${use}`)
        
                        this.form.appendChild(inputEmail)
                        break

                    case 'text':
                        const inputText = document.createElement('input')
                        inputText.classList.add('main__form-input')
                        inputText.setAttribute('placeholder', 'Введите сообщение')
                        inputText.setAttribute('id', `${use}`)
        
                        this.form.appendChild(inputText)
                        break
                    }
    }

    addSumbit () {
        const btn = document.createElement('button');
        btn.innerText = 'Отправить'
        btn.classList.add('main__form-sumbit')
        btn.addEventListener('click', () => {
            this.checkValidBtn()
        })
        this.form.appendChild(btn)
    }
    addClose() {
        const btn = document.createElement('button')
        btn.classList.add('main__form-close')
        btn.innerHTML = '<span>X</span>'
        btn.addEventListener('click', () => {
            const form = document.querySelector('.main__form')
            form.classList.toggle('disable')
        })
        this.form.appendChild(btn)
    }
    checkValidBtn() {
        const inputs = document.querySelectorAll('input')
        
        for (let input of inputs) {
            let check
            switch (input.id) {
                case 'name':
                    check = this.patternName.test(input.value)
                    break;
                case 'email':
                    check = this.patternEmail.test(input.value)
                    break;
                case 'phone':
                    check = this.patternPhone.test(input.value)
                    break;
                case 'text':
                    check = this.patternMessage.test(input.value)
                    break;
            }

            if(check) {
                console.log('Good')
                input.classList.remove(input.className)
                input.classList.add('valid')
            } else {
                console.log('Try')
                input.classList.remove(input.className)
                input.classList.add('invalid')
            }
        }
    }
    checkValid() {
        const inputs = document.querySelectorAll('input')
        
        for (let input of inputs) {
            input.addEventListener('blur', () => {
                let check
                switch (input.id) {
                    case 'name':
                        check = this.patternName.test(input.value)
                        break;
                    case 'email':
                        check = this.patternEmail.test(input.value)
                        break;
                    case 'phone':
                        check = this.patternPhone.test(input.value)
                        break;
                    case 'text':
                        check = this.patternMessage.test(input.value)
                        break;
                }

                if(check) {
                    console.log('Good')
                    input.classList.remove(input.className)
                    input.classList.add('valid')
                } else {
                    console.log('Try')
                    input.classList.remove(input.className)
                    input.classList.add('invalid')
                }
            })
        }
    }
}