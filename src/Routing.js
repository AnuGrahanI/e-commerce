import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import {Provider, useSelector} from "react-redux";
import { store } from './Context/Store'; 
import Home from './pages/Homes';
import Login from './pages/Login';

import Productitem from './pages/Productitem'
import ShowItem from './pages/ShowItem';
import Account from './pages/Account';
import Basket from './pages/Basket';




const Routing = () => {
  const state=useSelector(({stateSlice})=>stateSlice)
  //console.log(state,'rout')
  return (
    <BrowserRouter> 
  {state.islogedin ? (
    <>
        <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/Basket' element={<Basket/>}/>
      <Route path='/item/:itemId' element={ <Productitem/>}/>
      <Route path='/showItem' element={<ShowItem/>}/>
      <Route path='/Account' element={<Account/>}/>
      <Route path='*' element={<Navigate to={"/Home"}></Navigate>} />
      </Routes>
    </>
  ) : (
    <>
     <Routes>
      <Route path='/' element={<Login />} />
      <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  )}

      </BrowserRouter>
  )
}
const StoreProvider=()=>{
  return <Provider store={store}>
    <Routing/>
  </Provider>
}

export default StoreProvider