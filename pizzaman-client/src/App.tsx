import './App.css';
import {
  Link,
  Route,
  Routes
} from 'react-router-dom'
import Home from './components/home/Home';
import NotFound from './components/notfound/NotFound';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import SelectSize from './components/sections/select-size/SelectSize';
import SelectIngredients from './components/sections/select-ingredients/SelectIngredients';
import { useEffect, useState } from 'react';
import {IOrderData} from './interfaces'
import Cart from './components/cart/Cart';

const sizeInitialState = {
  id: NaN,
  name: '',
  price: NaN
}

function App() {
  // contains global orders data
  const [orderData, setOrderData] = useState<IOrderData>({size: sizeInitialState, ingredients: []});

  // contains global cart data
  const [cartItems, setCartItems] = useState<IOrderData[]>([]);
  
  useEffect(()=>{console.log(orderData, cartItems)}, [orderData, cartItems])

  const handleAddToCart = () => {
    // if orderdata exists then add to cart and reset orderdata
    if(orderData.size && orderData.ingredients.length > 0){
      setCartItems([...cartItems, orderData])
      setOrderData({size: sizeInitialState, ingredients: []})
    }else{
      alert('Please select a size and ingredients')
    }
  }

  return (
    <div className="App">
      <Navbar cartItems={cartItems}></Navbar>
      <Routes>
        <Route path="/" element={Home()} />
        <Route path="/select-size" element={SelectSize({orderData, setOrderData})}/>
        <Route path="/select-ingredients" element={SelectIngredients({orderData, setOrderData, handleAddToCart})} />
        <Route path="/cart" element={Cart({cartItems, setCartItems})} />
        <Route path="*" element={NotFound()} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
