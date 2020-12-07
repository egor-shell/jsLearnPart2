<template>
    <button @click="onCartClick" class=""></button>
</template>

<script>
export default {
    components: {}

    methods: {
        onCartClick () {
            const btn = document.querySelector('.header-block__basket)
            btn.classList.toggle('disable')
    }
}
</script>