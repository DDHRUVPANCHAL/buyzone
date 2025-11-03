import { useState } from 'react'
import { HashRouter , BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './templates/home'
import Header from './common/header';
import Products from './templates/products';
import Productdetails from './templates/productdetails';
import { ToastContainer } from 'react-toastify';
import Search from './templates/search';
import Productbycategory from './templates/productbycategory';
import Footer from './common/footer';
import Cart from './templates/cart';
import About from './templates/about';
import Contact from './templates/contact';
import Location from './templates/location';
import Checkout from './templates/checkout';
import Orders from './templates/orders';

function App() {

  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/productdetails/:id' element={<Productdetails />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/productbycategory/:category' element={<Productbycategory />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/location' element={<Location/>}></Route>
          <Route path='/checkout' element={<Checkout/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
        </Routes>
        <Footer />
        <ToastContainer />
      </HashRouter>

    </>
  )
}

export default App;
