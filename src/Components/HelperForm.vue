<template>
  <div>
    <button class="main__form-open" @click.stop.prevent="openForm">
        <span>?</span>
    </button>
    <form class="main__form disable">
        <button class="main__form-close" @click.stop.prevent="closeForm">
            <span>X</span>
        </button>
        <input class="main__form-input" placeholder="Введите Имя" id="name">
        <input class="main__form-input" placeholder="Ваш телефон" id="phone">
        <input class="main__form-input" placeholder="Ваш E-mail" id="email">
        <input class="main__form-input" placeholder="Введите сообщение" id="text">
        <button class="main__form-sumbit" @click.stop.prevent="sumbit">
            Отправить
        </button>
    </form>
  </div>
</template>

<script>
export default {
    methods: {
        openForm () {
            const form = document.querySelector('form')
            form.classList.toggle('disable')
        },
        closeForm () {
            const form = document.querySelector('form')
            form.classList.toggle('disable')
        },
        sumbit() {
            console.log ('Ваше сообщение отправлено!')
        }
    }

}
</script>

<style>

</style>