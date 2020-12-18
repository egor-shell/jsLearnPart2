<template>
    <div class="basket-block disable">
        <div class="basket-block__block">
            <div 
                class="basket-block__empty"
                v-if="!getItemsInCart.length"
            >Пуста</div>
            <ItemsInCart
                v-for="(id, index) in getItemsInCart"
                :key="id"
            :id="id"
                :index="index"
            />
        </div>
        <div class="basket-block__sum-block" v-if="!getItemsInCart.length">
        </div>
        <div class="basket-block__sum-block" v-if="getItemsInCart.length">
            <p class="basket-block__sum">Сумма: {{ amountPrice }}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ItemsInCart from './ItemsInCart.vue'
export default {
    components: {
        ItemsInCart
    },
    computed: {
        ...mapGetters('goods', [
            'getData',
            'getItemsInCart'
        ]),
        ...mapActions('goods', [
            'amountPrice'
        ]),
        amountPrice() {
            return this.getItemsInCart.reduce((sum, cur) => {
                const data = this.getData[cur]
                sum += +data.price * data.count
                return sum
            }, 0)
        },
    },
}
</script>
<style>
</style>