import {
  useParams
} from "react-router-dom";
import './App.css';
import {
  Route,
  Routes,
} from 'react-router-dom';
import Home from './components/home/Home';
import NotFound from './components/notfound/NotFound';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import SelectSize from './components/sections/select-size/SelectSize';
import SelectIngredients from './components/sections/select-ingredients/SelectIngredients';
import { useEffect, useState } from 'react';
import { IOrderData } from './interfaces'
import Cart from './components/cart/Cart';
import Login from './auth/login/Login';
import Register from './auth/register/Register';
import Profile from './components/profile/Profile';
import RequireAuth from './auth/RequireAuth';
import * as axios from 'axios';
import useAuth from './hooks/useAuth';
import { ServerConfig } from './config/server.config';
import { useNavigate, useLocation } from 'react-router-dom';
import { PizzaData } from './components/home/PizzaData';


const sizeInitialState = {
  id: NaN,
  name: '',
  price: NaN
}

function App() {
  // contains global orders data
  const [orderData, setOrderData] = useState<IOrderData>({ size: sizeInitialState, ingredients: [] });
  const authContext = useAuth();
  // contains global cart data
  const [cartItems, setCartItems] = useState<IOrderData[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // fetch cartItems from api
    axios.default.get(`${ServerConfig.development.url}/cart`, { headers: { 'Authorization': `Bearer ${authContext.token}` } }).then((response) => {
      response.data.forEach((item: any) => {
        var cart: IOrderData = { size: {...sizeInitialState}, ingredients: [] }
        // set size properties
        cart.size.id = item.id;
        
        // set ingredient properties
        item.cartItem.forEach((cartitem:any)=>{
          let ingredient:any = {}
          ingredient.id = cartitem.ingredientId;
          ingredient.name = cartitem.ingredient.name;
          ingredient.price = cartitem.ingredient.price;
          
          cart.ingredients.push(ingredient)
        })

        cart.size.price = item.price - cart.ingredients.reduce((a, b)=>{return a + b.price}, 0)
        cart.size.name = PizzaData.sizes.filter((value)=>{return value.price === cart.size.price})[0].name
      
        cartItems.push(cart)
        setCartItems([...cartItems])
      })
    })
  }, [authContext.loggedIn, authContext.token])

  const handleAddToCart = async () => {
    // if orderdata exists then add to cart and reset orderdata
    if (!isNaN(orderData.size.price) && orderData.ingredients.length > 0) {
      // check if logged in
      if (authContext.loggedIn && authContext.token) {
        const price = orderData.size.price + orderData.ingredients.map((item) => item.price).reduce((a, b) => a + b, 0);
        const ingredients = orderData.ingredients.map((item) => { return { "ingredientId": item.id } })
        await axios.default.post(`${ServerConfig.development.url}/cart`, {
          price, cartItem: ingredients
        }, {
          headers: {
            'Authorization': `Bearer ${authContext.token}`
          }
        })

        alert("Added To Cart Successfully")
        setCartItems([...cartItems, orderData])
        setOrderData({ ...orderData, ingredients: [] })
      } else {
        // if not logged in then force to login
        navigate('/login',
          {
            state: {
              from: location
            },
            replace: true
          })
      }
    } else {
      alert('Please select a size and ingredients')
    }
  }

  return (
    <div className="App">
      <Navbar cartItems={cartItems}></Navbar>
      <Routes>

        {/* // public Routes */}

        <Route path="/" element={Home()} />
        <Route path="/login" element={Login()} />
        <Route path="*" element={NotFound()} />
        <Route path="/select-size" element={SelectSize({ orderData, setOrderData })} />
        <Route path="/select-ingredients" element={SelectIngredients({ orderData, setOrderData, handleAddToCart })} />
        <Route path="/cart" element={Cart({ cartItems, setCartItems })} />
        <Route path='/register' element={Register()} />

        {/* // protected routes */}
        <Route element={RequireAuth()}>
          <Route path='/profile' element={Profile()} />
        </Route>

      </Routes>
      <Footer></Footer>
    </div>
  );
}


function withRouter(Component:any) {
  function ComponentWithRouterProp(props:any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter(App);
