import { menuArray } from './data.js' // Imports menu items in an array from a file

let cart
const storedCart = localStorage.getItem('cart')
cart = storedCart ? JSON.parse(storedCart) : []

const hiddenElements = document.querySelectorAll('.hidden')
const cartTotal = document.querySelector('.cart-total-price')
const paymentModal = document.querySelector('.order-payment')
const orderSummary = document.querySelector('.order-summary')
const orderButton = document.querySelector('.complete-order')

const menuList = menuArray
   .map((menu) => {
      const { name, ingredients, id, price, image } = menu
      return `
   <li>
        <div class="menu-item">
       <img src="${image}" class="item-img" />
       <div class="item" data-productid="${id}">
          <h2 class="item-name">${name}</h2>
          <p class="item-description">${ingredients}</p>
          <h4 class="item-price">${price}</h4>
       </div>
       <button class="item-button add" id="add" data-productid="${id}">+</button>
        </div>
    </li>`
   })
   .join('')

function runApplication() {
   document.addEventListener('click', (e) => {
      // Display Menu and add items to cart when the + button is cliqued
      if (e.target.id === 'add') {
         const productid = e.target.dataset.productid
         const productElement = document.querySelector(
            `.item[data-productid='${productid}']`
         )
         const name = productElement.querySelector('.item-name').innerText
         const price = productElement.querySelector('.item-price').innerText
         cart.push({ id: generateId(), name: name, price: price })
         localStorage.setItem('cart', JSON.stringify(cart))

         const cartList = cart
            .map((item) => {
               const { id, name, price } = item
               return `
            <li>
               <div class="cart">
                  <div class="cart-items item-one" data-itemidtoremove="${id}">
                     <h3 class="cart-item-name">${name}</h3>
                     <p class="cart-item-remove" id="cart-item-remove" data-itemidtoremove="${id}">remove</p>
                     <h4 class="item-price">$${price}</h4>
                  </div>
            </li>
             `
            })
            .join('')

         const cartTotalPrice = cart
            .reduce((acc, item) => acc + Number(item.price), 0)
            .toFixed(2)
         document.getElementById('order-summary-list').innerHTML = cartList // Renders the Cart on the page
         cartTotal.innerText = cartTotalPrice
      }
      // Display Menu and add items to cart when the + button is cliqued

      if (e.target.id === 'cart-item-remove') {
         const productid = e.target.dataset.itemidtoremove
         cart = cart.filter((item) => item.id !== productid)
         const cartList = cart
            .map((item) => {
               const { id, name, price } = item
               return `
         <li>
            <div class="cart">
               <div class="cart-items item-one" data-itemidtoremove="${id}">
                  <h3 class="cart-item-name">${name}</h3>
                  <p class="cart-item-remove" id="cart-item-remove" data-itemidtoremove="${id}">remove</p>
                  <h4 class="item-price">$${price}</h4>
               </div>
         </li>
          `
            })
            .join('')
         const cartTotalPrice = cart
            .reduce((acc, item) => acc + Number(item.price), 0)
            .toFixed(2)
         document.getElementById('order-summary-list').innerHTML = cartList // Renders the Cart on the page
         cartTotal.innerText = cartTotalPrice

         if (cart.length === 0) {
            localStorage.removeItem('cart')
         } else {
            localStorage.setItem('cart', JSON.stringify(cart))
         }
      }

      if (e.target.id === 'complete-order') {
         paymentModal.style.display = 'flex'
         orderSummary.style.display = 'none'
         orderButton.style.display = 'none'
      }

      if (e.target.id === 'pay') {
         const customerName = document.querySelector('.client-name').value
         const cardNumber = document.querySelector('.card-number').value
         const cardCvv = document.querySelector('.card-cvv').value
         const thankYouNote = document.querySelector('.payment-completed')
         if (customerName === '') {
            document.querySelector('.name-alert').classList.add('show')
            document.querySelector('.card-alert').classList.add('hidden')
            document.querySelector('.cvv-alert').classList.add('hidden')
         } else if (cardNumber === '') {
            document.querySelector('.card-alert').classList.add('show')
            document.querySelector('.name-alert').classList.add('hidden')
            document.querySelector('.cvv-alert').classList.add('hidden')
         } else if (cardCvv === '') {
            document.querySelector('.cvv-alert').classList.add('show')
            document.querySelector('.name-alert').classList.add('hidden')
            document.querySelector('.card-alert').classList.add('hidden')
         } else {
            paymentModal.style.display = 'none'
            orderSummary.style.display = 'none'
            orderButton.style.display = 'none'
            thankYouNote.style.display = 'block'
            thankYouNote.innerHTML = `Thanks, ${customerName} ! Your order is on it's way`
            customerName = ''
            cardNumber = ''
            cardCvv = ''
         }
      }
      toggleHiddenClass()
   })
   render()
}
// rendre cette fonction plus specifique et n'affichant pas TOUS
// les elements hidden
function toggleHiddenClass() {
   hiddenElements.forEach((element) => {
      element.classList.remove('hidden')
      element.classList.add('show')
   })
}
function render() {
   document.getElementById('menu-list').innerHTML = menuList // Renders the Menu on the page
}
function generateId() {
   return crypto.randomUUID()
}
document.addEventListener('DOMContentLoaded', (event) => {
   runApplication()
})
