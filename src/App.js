import React, { useState, useEffect ,useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import CarSection from './components/CarSection/CarSection';
import Home from './components/Home/Home'
import BookingCar from './components/Updating/BookingCar';
import UserBookings from './components/UserBookings/UserBookings';
import AddCar from './components/Updating/AddCar';
import EditCar from './components/Updating/EditCar';
import AdminHome from './Pages/AdminHome';
import Login from './components/Registrations/Login'
import Register from './components/Registrations/Register'
import './App.css'
 
function App() {
 
  

  return (

    <div>

        <BrowserRouter>
          <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<CarSection />} />
          <Route path='/booking/:carid' element={<BookingCar />} />
          <Route path='/userbookings' element={<UserBookings />} />
          <Route path='/addcar' element={<AddCar />} />
          <Route path='/editcar/:carid' element={<EditCar />} />
          <Route  path='/admin' element={<AdminHome /> } />
          <Route  path='/login' element={<Login /> } />
          <Route  path='/register' element={<Register /> } />
          </Routes>
        </BrowserRouter>
          
        </div>
  );
}

export default App;


