import {APIProvider} from '@vis.gl/react-google-maps';
import {createRoot} from "react-dom/client";
import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './index.css'; 



const App = () => {

    return (
        <div className="flex flex-col min-h-screen">
        <Header/>
            <main className="flex-grow p-4">
                <Main />
            </main>
            <Footer />
        </div> 
    );
};

export default App;
