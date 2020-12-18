<template>
  <div>{{ name }} - {{ price }}</div>
</template>

<script>
export default {
    props: {
        name: String,
        price: Number,
    }
}
</script>

<style>

</style>