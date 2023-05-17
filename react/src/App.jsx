import {useState, useEffect } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import axios from 'axios'

import './App.css'

import HomeScreen from './pages/Home'
import ProductScreen from './pages/Product'
import CartScreen from './pages/Cart'
import LoginScreen from './pages/Login'
import RegisterScreen from './pages/Register'
import ForgotPasswordScreen from './pages/ForgetPassword'
import ResetPasswordScreen from './pages/ReserPassword'

import Navbar from './components/Navbar'
import Backdrop from './components/Backdrop'
import SideDrawer from './components/SideDrawer'

function App() {
  const [sideToggle, setSideToggle] = useState(false)

  const user = JSON.parse(localStorage.getItem('profile'))



  return (
   <>
   <Navbar click={()=>setSideToggle(true)}/>
   <SideDrawer show={sideToggle} click={()=>setSideToggle(false)}/>
   <Backdrop show={sideToggle} click={()=>setSideToggle(false)}/>

   <Routes>

     <Route path='/' element={!user ? <LoginScreen/> : <HomeScreen/>} />
     <Route path='/login' element={<LoginScreen/>} />
     <Route path='/register' element={<RegisterScreen/>} />
     <Route path='/forgotpassword' element={<ForgotPasswordScreen/>} />
     <Route path='/passwordreset/:token' element={<ResetPasswordScreen/>} />
     <Route path='/product/:id' element={<ProductScreen/>} />
     <Route path='/cart' element={<CartScreen/>} />
   </Routes>
   </>
  );
}

export default App;
