import React from 'react';
import Map from './Map.js';
import About from './AboutUs.js';
import Contact from './ContactUs.js';

const Main = () => {
    return (
        <div className="container my-4">
            <div className="row md:mx-5">
                <div className="col-lg-8">
                    <Map />
                </div>
                <div className="col-lg-4">
                    {/* <TransitInfo /> */}
                    {/* <About />
                    <Contact /> */}
                </div>
            </div>
        </div>
    );
};

export default Main;
