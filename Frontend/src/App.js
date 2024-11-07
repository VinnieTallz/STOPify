import React from 'react';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import './index.css'; 

const App = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
        <Header/>
            <main className="flex-grow p-4">
                <Main />
            </main>
            <Footer />
        </div> 
    );
};
export default App;