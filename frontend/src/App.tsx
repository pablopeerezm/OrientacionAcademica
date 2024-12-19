import React from 'react';
import './App.css';
import { UserProfile } from './pages/UserProfile';
import { Home } from './pages/Home';
import { OrientadorProfile } from './pages/OrientadorProfile';
import { AdminProfile } from './pages/AdminProfile';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

export const editBaseOptions = {
  method: 'PUT',
  headers: {
    'accept' : 'application/json',
    'Content-Type' : 'application/json'
  },
}

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin-profile" element={<AdminProfile/>} />
        <Route path="/user-profile" element={<UserProfile/>} />
        <Route path="/orientador-profile" element={<OrientadorProfile/>} />
      </Routes>
    </BrowserRouter>
      
  );
}

