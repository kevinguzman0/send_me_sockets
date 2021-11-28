import React from 'react';
import Login from './components/Home/Login'
import Register from './components/Home/Register'
import Admin from './components/Admin/Admin'
import Client from './components/Admin/Client'
import { Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home-admin" element={<Admin />} />
                <Route path="/home-client" element={<Client />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App