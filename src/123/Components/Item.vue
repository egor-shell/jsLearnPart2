<template>
    <div class="main__line-item">
        <h2 class="main__line-item-header">{{ currentItem.tag }}</h2>
        <div class="main__line-item-gun">
            <img :src="currentItem.img" alt="item" class="main__line-item-big">
            <div class="main__line-item-round"></div>
         </div>
         <h3 class="main__line-item-name">{{ currentItem.name }}</h3>
         <h3 class="main__line-item-price">{{ currentItem.price }} руб.</h3>
        <button class="main__line-item-buy" @click="addToCart">
            <p class="main__line-item-buy__text">Купить {{ currentItem.id}}</p>
        </button>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    props: {
        id: String,
    },
    computed: {
        ...mapGetters('goods', [
            'getData',
            'getItemsInCart'
        ]),
        currentItem () {
          return this.getData[this.id] || {}
        }
    },
    methods: {
        ...mapActions('goods', [
            'addInCart',
        ]),
        addToCart() {
            this.$emit('addInCart', this.id)
            // console.log(this.getData[this.id].id)
        },
    },
}
</script>