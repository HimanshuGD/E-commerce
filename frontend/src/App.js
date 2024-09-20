import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from './Pages/Welcome/welcome';
import UserHome from './Pages/User/Home/UserHome';
import AboutUs from './Pages/aboutus';
import SellerHome from './Pages/Seller/Home/SellerHome';
import MyAccount from './Pages/User/Pages/MyAccount/MyAccount';
import './App.css';
// import MyCart from './Pages/User/Pages/Cart/Cart';
import MyAccSeller from './Pages/Seller/Pages/MyAccount/MyAccount';
import Success from '../src/Pages/User/Pages/Cart/Success';
import Cancel from '../src/Pages/User/Pages/Cart/Cancel';
import Payment from '../src/Pages/User/Pages/Cart/Payment';



function App() {
  return (
    <div className='App' >
      <BrowserRouter>
        <Routes>
          <Route index element={<Welcome />} />
          <Route path="userhome" element={<UserHome />} />
          <Route path="sellerhome" element={<SellerHome />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="MyAccount/:userId" element={<MyAccount />} />
          <Route path="MySellingAccount/:userId" element={<MyAccSeller />} />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
          <Route path="pay/userId/:userId" element={<Payment />}/>
          {/* <Route path="MyCart/:userId" element={<MyCart />} /> */}
          {/* <Route path="product" element={<ProductPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

