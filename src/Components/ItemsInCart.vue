<template>
    <div class="basket-block__item">
        <div class="basket-block__item__img-name">
            <img :src="currentItem.img" class="basket-block__item-img">
            <div class="basket-block__item-round"></div>
            <div class="basket-block__item-naming">
                <span class="basket-block__tag">{{ currentItem.tag }}</span> 
                <span>{{ currentItem.name }}</span>
            </div>
        </div>
        <div class="basket-block__footer">
            <div class="basket-block__control">
                <div class="basket-block__minus">
                    <button class="basket-block__amount" @click="onMinusClick">
                        -
                    </button>
                </div>
                <div class="basket-block__input-sum">
                    <input :value="currentItem.count" type="text" class="basket-block__input" maxlength="2">
                </div>
                <div class="basket-block__plusBlock">
                    <button class="basket-block__plus" @click="onPlusClick">
                        +
                    </button>
                </div>
            </div>
            <span>{{currentItem.price}}</span>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    props: {
        id: String,
        index: Number
    },
    computed: {
        ...mapGetters('goods', [
            'getData',
            'getItemsInCart'
        ]),
        currentItem() {
            return this.getData[this.id] || {}
        }
    },
    methods: {
        ...mapActions('goods', [
            'addInCart',
            'removeFromCart'
        ]),
        onPlusClick() {
            this.addInCart(this.id)
        },
        onMinusClick() {
            this.removeFromCart(this.index)
        }
    }
}
</script>

<style>

</style>