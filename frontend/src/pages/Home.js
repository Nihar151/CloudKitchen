import React, {useState} from 'react'
import Cart from '../components/Cart'
import Order from '../components/Order'


const Home = () => {
  const [items, setItems] = useState([]);
    
  return (
    <div className='home'>
      <Order items={items} setItems={setItems} />
<Cart items={items} setItems={setItems} />
    </div>
  )
}

export default Home
