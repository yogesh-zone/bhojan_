import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './componemts/Home';
import {BrowserRouter as Router , Route,Routes} from "react-router-dom"
import Header from './componemts/layouts/Header';
import Footer from './componemts/layouts/Footer';
import Login from './componemts/Login';
import OrderFood from './componemts/OrderFood';
import Item from './componemts/Item';
import Resturant from './componemts/Resturant';
import store from './store'; 
import AddRestaurant from './componemts/AddRestaurant';
import {links} from "./componemts/layouts/Utility"
import { loadUser, registerRest } from './actions/allAction';
import MyDetails from './componemts/MyDetails';
import { useSelector } from 'react-redux'; 
import ContactUs from './componemts/Contact';
import DashBoard from './componemts/DashBoard';
// let user=false;
function App() {
  useEffect(() => {
    
    store.dispatch(loadUser());
  
  }, [])
  const {user} = useSelector(state=>state.user);
  return (
      <Router>
        <Routes>
          <Route  exact path="/" element={<Home/>} />
          <Route path="/orderOnline/" element={<OrderFood heading={"order online :)"}  isItem/>}/>
          <Route path="/dineOut/" element={<OrderFood heading={"dine-out resturants in delhi"} />}/>
          <Route path="/item/:id" element={<Item/>}/>
          <Route path="/restaurant/:id" element={<Resturant/>}/>
          <Route path="/ContactUs" element={<ContactUs/>}/>
          <Route path="/add-restaurant" element={<AddRestaurant/>}/>
          <Route path="/users/me" element={<MyDetails user={user}/>}/>
          <Route path={`${user && user.role==="admin" ? "/dashbord":"/#"}`} element={<DashBoard />}/>
        </Routes>
        <Footer/>
        <ToastContainer/>
      </Router>
      );
}


export default App;
