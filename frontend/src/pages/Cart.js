import React, {useState} from 'react'


const Cart = () => {

  return (
    <div>
      <form className='create'>
        <h3>Add a food to cart</h3>
        <label>Food</label>
        <select>
            <option value="default">-Select a food item-</option>
            <option value="pizza">Pizza</option>
            <option value="pasta">Pasta</option>
            <option value="burger">Burger</option>
            <option value="momos">Momos</option>
            <option value="sandwich">Sandwich</option>
        </select>
        <label>Quantity</label>
        <input type="number"/>
        <button>Add item</button>
      </form>
    </div>
  )
}

export default Cart
