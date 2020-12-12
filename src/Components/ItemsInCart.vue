<template>
    <div class="basket-block__item__img-name">
        <img src ="${this.img}" class="basket-block__item-img"></img>
        <div class="basket-block__item-round"></div>
        <div class="basket-block__item-naming">
            <span class="basket-block__tag">${tag}</span> 
            <span>${name}</span>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {

}
</script>

<style>

</style>