import React from 'react';
import Map from './Map';
import TransitInfo from './TransitInfo';
import About from './AboutUs';
import Contact from './ContactUs';

const Main = () => {
    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-lg-8">
                    <Map />
                </div>
                <div className="col-lg-4">
                    {/* <TransitInfo /> */}
                    <About/>
                    <Contact/>
                </div>
            </div>
        </div>
    );
};

export default Main;
