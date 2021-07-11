import React, {useEffect, useState} from 'react'
import './App.css';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart , Checkout} from './components';
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';



const App=() =>{
 const [products, setProducts] = useState([]);
const [cart, setCart] = useState({})
const [order, setOrder] = useState({});
const [errorMessage, setErrorMessage] = useState('');
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  //this for cart

  const fetchCart= async () =>{
    setCart(await commerce.cart.retrieve())
  } 

  const handleAddTocart = async (productId, quantity) =>{
    const {cart}= await commerce.cart.add(productId, quantity); 
    setCart(cart)
  }
  const handleUpdate= async (productId, quantity) => {
    const {cart}= await commerce.cart.update(productId,{quantity} );
    setCart(cart)
  }
const handleRemoveFromCart=async (productId)=>{
  const {cart}= await commerce.cart.remove(productId)
  setCart(cart)
}
const handleEmptyCart= async ()=>{
  const {cart}= await commerce.cart.empty();
  setCart(cart)
}

const refreshCart = async () => {
  const newCart = await commerce.cart.refresh();

  setCart(newCart);
};

const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {

  try {
    const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

    setOrder(incomingOrder);

    refreshCart();
  } catch (error) {
    setErrorMessage(error.data.error.message);
  }
};



    useEffect(() => {

      fetchProducts();
fetchCart();
    }, []);
    

  return (
    <Router>
    <div>
      <Navbar totalItems={cart.total_items}  />
                <Switch>
                <Route exact  path='/'>
                <Products products={products} onAddToCart={handleAddTocart} />
                </Route>

            <Route excat path='/cart'>
            <Cart cart={cart}  handleUpdate={handleUpdate} 
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
            </Route>   
            <Route exact path='/Checkout'>
          <Checkout cart={cart}
          order={order}
           onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};



export default App