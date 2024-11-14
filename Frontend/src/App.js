import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import Map from './components/Map.js';
import About from './components/AboutUs.js';
import Contact from './components/ContactUs.js';
import './index.css';

const App = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <div className="flex justify-center items-center flex-grow p-4">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/contact-us" element={<Contact />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};
export default App;