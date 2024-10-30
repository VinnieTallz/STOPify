import React from 'react';
import Map from './Map';
import TransitInfo from './TransitInfo';

const Main = () => {
    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-lg-8">
                    <Map />
                </div>
                <div className="col-lg-4">
                    <TransitInfo />
                </div>
            </div>
        </div>
    );
};

export default Main;
