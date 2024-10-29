import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import TransitInfo from './TransitInfo';
import './index.css'; 


const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-4">

            <Main />
            <TransitInfo />
            </main>
            <Footer />
        </div> 
    );
};

export default App;
