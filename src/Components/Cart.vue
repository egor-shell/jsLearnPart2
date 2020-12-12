<template>
    <div class="basket-block disable">
        <div class="basket-block__block">
            <div 
                class="basket-block__empty"
                v-if="!getItemsInCart.length"
            >Пуста</div>
            <div
                class="basket-block__item"
                v-for="id in getItemsInCart"
                :key="id"
                >
                {{ getData[id].name }} - {{ getData[id].count }} - {{ getData[id].price }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    components: {
    },
    computed: {
        ...mapGetters('goods', [
            'getData',
            'getItemsInCart'
        ]),
        currentItem () {
            return this.getData[this.id] || {}
        }
    }
}
</script>
<style>

</style>