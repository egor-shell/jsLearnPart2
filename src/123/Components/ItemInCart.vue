<template>
    <div class="basket-block__item__img-name">
        <!--<img :src="currntItem.img" class="basket-block__item-img"></img>
            <div class="basket-block__item-round"></div> -->
        <div class="basket-block__item-naming">
            <span class="basket-block__tag">{{ currentItem.tag }}</span> 
            <span>{{ currentItem.name }}</span>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    props: {
        id: String,
    },
    computed: {
        ...mapGetters ('goods', [
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
        ]),
    },
    mounted: {
    }
}
</script>

<style>

</style>