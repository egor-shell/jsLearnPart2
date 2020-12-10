<template>
    <div class="main__line-item">
        <h2 class="main__line-item-header">{{ tag }}</h2>
        <div class="main__line-item-gun">
            <img :src="img" alt="item" class="main__line-item-big">
            <div class="main__line-item-round"></div>
         </div>
         <h3 class="main__line-item-name">{{ name }}</h3>
         <h3 class="main__line-item-price">{{ price }} руб.</h3>
        <button class="main__line-item-buy">
            <p class="main__line-item-buy__text">Купить</p>
        </button>
    </div>
</template>
<script>
export default {
    props: {
        tag: String,
        name: String,
        price: Number,
        img: String,
    }
}
</script>