export const menuArray = [
   {
      name: 'Pizza',
      ingredients: ['pepperoni ', 'mushrom ', 'mozarella'],
      id: generateId(),
      price: 23.97,
      image: './images/pizza.svg',
   },
   {
      name: 'Hamburger',
      ingredients: ['beef ', ' cheese ', ' lettuce'],
      id: generateId(),
      price: 13.99,
      image: './images/hamburger.svg',
   },

   {
      name: 'Hot-Dog',
      ingredients: ['hot-dog', 'hot-sauce', 'mayo'],
      id: generateId(),
      price: 9.59,
      image: './images/hotdog.svg',
   },
   {
      name: 'Soda',
      ingredients: ['coke ', ' sprite ', ' lemonade'],
      id: generateId(),
      price: 2.69,
      image: './images/juice.svg',
   },
   {
      name: 'Beer',
      ingredients: ['grain, hops, yeast, water'],
      id: generateId(),
      price: 4.99,
      image: './images/beer.svg',
   },
]

function generateId() {
   return crypto.randomUUID()
}
