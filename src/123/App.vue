<template>
    <section class="bg" id="App">
        <headerBlock />
        <main>
            <div class="container">
                <div class="main__line">       
                    <Item 
                        v-for="id in getItemsOnPage"
                        :key="id"
                        :id="id"
                    />
                    <div class="main__btn-block">
                        <button class="main__button" @click="fetchMore">Показать ещё</button>
                    </div>
                </div>
            </div>
            <Cart />
            <HelperForm />
        </main>
    </section>
</template>

<script>
import headerBlock from './Components/headerBlock.vue'
import Item from './Components/Item.vue'
import Cart from './Components/Cart.vue'
import HelperForm from './Components/HelperForm.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
      Cart,
      headerBlock,
      Item,
      HelperForm,
  },
  data() {
      return {
          items: [],
          page: 1
      }
  },
  methods: {
    ...mapActions('goods', [
        'requestData'
    ]),
    fetchMore() {
        console.log(this.page)
        this.requestData(this.page)
            .then(() => {
                this.page++
            })
    },
    addToCart(data){
        console.log(data)
    }
  },
  computed: {
      ...mapGetters('goods', [
          'getItemsOnPage',
          'getItemsInCart'
      ]),
        // currentItem () {
        //   return this.getData[this.id] || {}
        // }
  },
  mounted() {
      this.fetchMore()
  }
}
</script>