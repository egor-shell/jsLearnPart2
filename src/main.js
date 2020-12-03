import List from './List.js'
import Item from './Item.js'
import Cart from './Cart.js'
import GunsList from './GunsList.js'
import HelperForm from './HelperForm.js'

const CartInstance = new Cart ()
const GunsListInstance = new GunsList(CartInstance)
const Help = new HelperForm ()