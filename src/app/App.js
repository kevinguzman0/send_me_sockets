import React from 'react';
import Login from './components/Login'
import Register from './components/Register'
import Admin from './components/Admin'
import Client from './components/Client'
import { Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/client" element={<Client />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App